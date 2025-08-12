class NGRMarkets extends HTMLElement {
  // @ts-ignore
  HOST = __HOST__;
  MAIN_CSS = "native-geo-markets.min.css";
  SHOW_RULES = {
    load: "everyload",
    cookie: "cookie",
    session: "session",
  };
  VARS = {
    KEY: "ngr-markets-session",
    CLOSED_KEY: "ngr-markets-closed",
  };

  constructor() {
    super();
    this.template = this.querySelector("#NGR-Markets-Template");
    this.stylesheet = document.querySelector(`[href*='${this.MAIN_CSS}']`);
    this.widgetIcon = this.dataset.widgetIcon;
    this.widgetStickyIcon = this.dataset.widgetStickyIcon;
    this.modal = null;
    this.customOpenerIconSrc = this.dataset.customOpenerIconSrc;
    this.testMode = false;
    // @ts-ignore
    this.userLocale = this.dataset.lng || window.Shopify.locale;
    this.shopifyTemplate = this.dataset.shopifyTemplate;
    this.shopifytemplateDir = this.dataset.shopifyTemplateDir;
    this.flagSrc = this.dataset.flagSrc;
    this.marketCountries = null;
    this.userGeoData;
  }

  async connectedCallback() {
    this.checkTestMode();
    this.clearLocalData();

    if (!this.stylesheet) {
      console.error("[NGR APP]: Stylesheet not found. Contact app support.");
      return;
    }

    const response = await this.getData();
    if (!response || (!response && !response.status) || !response.data) {
      console.error("[NGR APP]: Store data not found. Contact app support.");
      return;
    }

    const geoData = await this.getGeo();
    if (!geoData || !geoData?.country) {
      console.error(
        "[NGR APP]: GEO Location not detected. Contact app support.",
      );
      return;
    }

    this.userGeoData = geoData;
    const { markets, configs } = response.data;
    if (!markets) {
      console.warn("[NGR APP]: Shopify Markets not configured.");
      return;
    }

    if (configs?.widget) {
      if (this.topBarMoveTop(configs?.basicConfigs?.type)) return;

      const widget = this.widget(markets, configs);
      if (!widget) {
        console.error("[NGR APP]: Widget not found. Contact app support.");
        return;
      }

      const customStyles = this.genCustomStyles(configs);
      const shadowRoot = this.attachShadow({ mode: "closed" });
      shadowRoot.appendChild(this.stylesheet);
      if (customStyles) shadowRoot.appendChild(customStyles);
      shadowRoot.appendChild(widget);
      this.customOpenerIcon();
      this.widgetEvents(shadowRoot, configs?.basicConfigs?.showFrequency);
      await this.widgetLogic(shadowRoot, configs?.basicConfigs, markets);
      this.displayWidget();
    }
  }

  checkTestMode() {
    if (
      window.location.search.includes("ngr-markets-test") ||
      window.location.hash === "#ngr-markets-test" ||
      // @ts-ignore
      (this.dataset.testMode === "true" && window.Shopify.designMode)
    ) {
      this.testMode = true;
    }
  }

  clearLocalData() {
    if (window.location.hash === "#ngr-clear-user-data") {
      this.deleteCookie(this.VARS.KEY);
      this.deleteCookie(this.VARS.CLOSED_KEY);
      sessionStorage.removeItem(this.VARS.KEY);
      sessionStorage.removeItem(this.VARS.CLOSED_KEY);
    }
  }

  async getData() {
    // @ts-ignore
    const store_url = window?.Shopify?.shop;
    const dataEndpoint = `${this.HOST}/api/shop-markets?shop=${store_url}`;
    try {
      const response = await fetch(dataEndpoint).then((resp) => resp.json());
      return response;
    } catch (e) {
      console.log("Error", e);
    }
  }

  async getGeo() {
    const savedUserData = this.getCookie(this.VARS.KEY);
    if (savedUserData && !this.testMode) {
      return JSON.parse(savedUserData);
    }
    const countries = await this.getCountriesJSON();
    const userGeo = await fetch("/browsing_context_suggestions.json").then(
      (resp) => resp.json(),
    );

    if (!countries || !userGeo)
      return console.error(
        "[NGR APP]: User GEO location or countries list not detected. Contact app support please.",
      );
    const userCountry = userGeo?.detected_values?.country.handle;
    const userLocation = {
      country_name:
        userGeo?.detected_values?.country?.name ||
        userGeo?.detected_values?.country_name,
      country: userCountry,
      continent: countries[userCountry]?.continent,
    };

    this.setCookie(this.VARS.KEY, JSON.stringify(userLocation), 7);
    window[this.VARS.KEY] = userLocation;
    return userLocation;
  }

  topBarMoveTop(type) {
    if (type === "topbar" && !this.hasAttribute("data-moved")) {
      this.setAttribute("data-moved", "");
      document.body.insertBefore(this, document.body.firstChild);
      this.displayWidget();
      return true;
    }

    return false;
  }

  widget(markets, configs) {
    if (!this.template || !markets || !configs) return;
    const { basicConfigs, advancedConfigs, plan } = configs;
    // @ts-ignore
    const html = this.template?.content?.cloneNode(true);
    const modal = html.querySelector("[data-ngr-markets-modal]");
    this.modal = modal;

    if (plan === 2 && advancedConfigs && advancedConfigs?.html_id !== "") {
      modal.setAttribute("id", advancedConfigs?.html_id);
    }

    return this.builder(html, basicConfigs, markets, plan);
  }

  genCustomStyles(configs) {
    if (!configs) return;
    const { basicConfigs, advancedConfigs, plan } = configs;
    const custom_styles = document.createElement("style");
    let custom_css = "";

    if (basicConfigs && !advancedConfigs?.disable_basic_css && plan !== 3) {
      const {
        modalBgColor,
        modalTextColor,
        modalBorderColor,
        buttonsBgColor,
        buttonsColor,
        font,
      } = basicConfigs;

      custom_css += `
        .ngr-markets-modal{
          ${
            font && font != "" && font !== "inherit" && font !== "undefined"
              ? "font-family:'" + font + "', sans-serif;"
              : ""
          }
        }
        .ngr-markets-modal__content{
          ${modalBgColor != "" ? "background-color:" + modalBgColor + ";" : ""}
          ${modalTextColor != "" ? "color:" + modalTextColor + ";" : ""}
          ${
            modalBorderColor != ""
              ? "border-color:" + modalBorderColor + ";"
              : ""
          }
        }
        ${
          modalBgColor != "" &&
          ".ngr-markets-modal__close{ background-color:" +
            modalBgColor +
            " !important;}"
        }
        .ngr-markets-modal__form-content .select select{
          ${
            font && font != "" && font !== "inherit" && font !== "undefined"
              ? "font-family:'" + font + "', sans-serif;"
              : ""
          }
        }
        .ngr-markets-modal__button-main{
            ${
              buttonsBgColor != ""
                ? "background-color:" + buttonsBgColor + ";"
                : ""
            }
            ${buttonsColor != "" ? "border-color:" + buttonsColor + ";" : ""}
            ${buttonsColor != "" ? "color:" + buttonsColor + ";" : ""}
            ${font != "" ? "font-family:'" + font + "', sans-serif;" : ""}
        }
        .ngr-markets-modal__button-main:hover{
            ${
              buttonsColor != "" ? "background-color:" + buttonsColor + ";" : ""
            }
            ${
              buttonsBgColor != "" ? "border-color:" + buttonsBgColor + ";" : ""
            }
            ${buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : ""}
        }
        `;
    }
    if (advancedConfigs && advancedConfigs.css !== "" && plan === 2) {
      custom_css += advancedConfigs.css;
    }

    custom_styles.textContent = custom_css
      .replace(/\n/g, "")
      .replace(/  +/g, "");
    return custom_styles;
  }

  customOpenerIcon() {
    const customOpener = document.querySelectorAll(
      "[href$='#ngr-markets-open']",
    );
    if (
      this.customOpenerIconSrc &&
      this.customOpenerIconSrc !== "" &&
      customOpener?.length
    ) {
      const iconElement = this.builOpenerIconElement(this.customOpenerIconSrc);
      if (!iconElement) return;
      for (let index = 0; index < customOpener.length; index++) {
        const element = customOpener[index];
        if (element?.textContent?.includes("[ngr-markets-icon]")) {
          element.innerHTML = element.innerHTML.replace(
            /\[ngr\-markets\-icon]/g,
            iconElement,
          );
        }
      }
    }
  }

  // @ts-ignore
  widgetEvents(shadowRoot, showFrequency, plan) {
    const _self = this;
    const modalElement = shadowRoot.querySelector("[data-ngr-markets-modal]");
    if (!modalElement) return;

    const closeButton = modalElement.querySelector("[data-ngr-markets-close]");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        _self.closeModal(modalElement, showFrequency);
      });
    }

    const toggleButton = modalElement.querySelector(
      "[data-ngr-markets-toggle]",
    );
    if (toggleButton) {
      toggleButton.addEventListener("click", () => {
        _self.toggleModal(modalElement, showFrequency);
      });
    }

    const submitButton = modalElement.querySelector(
      "[data-ngr-markets-button]",
    );
    if (submitButton) {
      submitButton.addEventListener("click", (e) => {
        _self.analytics();
        if (
          modalElement.querySelector("[name='country_code']")?.value ===
            // @ts-ignore
            window?.Shopify?.country &&
          modalElement.querySelector("[name='language_code']")?.value ===
            // @ts-ignore
            window?.Shopify?.locale
        ) {
          e.preventDefault();
          _self.closeModal(modalElement, showFrequency);
          return;
        }
        _self.closeModal(modalElement, showFrequency, true);
        modalElement.classList.add("loading");
        setTimeout(() => {
          modalElement.classList.remove("loading");
        }, 5000);
      });
    }

    document.addEventListener("click", (event) => {
      if (event) {
        const element =
          // @ts-ignore
          event.target.closest("[data-ngr-markets-open]") ||
          // @ts-ignore
          event.target.closest("[href$='#ngr-markets-open']");
        if (element) {
          event.preventDefault();
          _self.openModal();
        }
      }
    });
  }

  async widgetLogic(shadowRoot, basicConfigs, markets) {
    if (!basicConfigs || !shadowRoot)
      return console.error(
        "[NGR APP]: Configs or shadowRoot list not found. Contact app support please.",
      );
    const { showRules, showFrequency } = basicConfigs;

    if (this.testMode) {
      this.openModal();
      return;
    }
    if (showRules === "manual") return;

    if (showRules === "autoGeo") {
      const marketCountries = markets.MarketRegionCountry.map(
        (item) => item.code,
      );

      const savedUserData = this.getCookie(this.VARS.KEY);
      if (savedUserData && !this.testMode) {
        const userLocation = JSON.parse(savedUserData);
        if (!marketCountries.includes(userLocation.country)) return;

        this.widgetBehaviour(showFrequency, userLocation, markets);
        return;
      }

      const countries = await this.getCountriesJSON();
      const userGeo = await fetch("/browsing_context_suggestions.json").then(
        (resp) => resp.json(),
      );

      if (!countries || !userGeo)
        return console.error(
          "[NGR APP]: User GEO location or countries list not detected. Contact app support please.",
        );
      const userCountry = userGeo?.detected_values?.country.handle;
      const userLocation = {
        country_name:
          userGeo?.detected_values?.country?.name ||
          userGeo?.detected_values?.country_name,
        country: userCountry,
        continent: countries[userCountry]?.continent,
      };

      this.setCookie(this.VARS.KEY, JSON.stringify(userLocation), 7);
      window[this.VARS.KEY] = userLocation;
      if (!marketCountries.includes(userLocation.country)) return;

      this.widgetBehaviour(showFrequency, userLocation, markets);
      return;
    }
    this.widgetBehaviour(showFrequency);
  }

  widgetBehaviour(
    showFrequency = this.SHOW_RULES.session,
    userLocation,
    markets,
  ) {
    if (!userLocation?.country && showFrequency === this.SHOW_RULES.load)
      return this.openModal();

    const showModal = (showFrequency) => {
      if (
        userLocation.country !== "CH" &&
        window.location.host.includes("got-bag.com")
      )
        return;
      if (showFrequency === this.SHOW_RULES.load) {
        this.openModal();
      } else {
        const modalClosed =
          showFrequency === this.SHOW_RULES.cookie
            ? this.getCookie(this.VARS.CLOSED_KEY)
            : sessionStorage.getItem(this.VARS.CLOSED_KEY);
        if (!modalClosed) {
          this.openModal();
        }
      }
    };
    const userCountry = userLocation?.country;
    if (userCountry) {
      // @ts-ignore
      const storeCountry = window?.Shopify?.country;
      // @ts-ignore
      const storeLng = window?.Shopify?.locale;
      const defaultLng =
        // @ts-ignore
        userCountry && window?.ngr_countries_window[userCountry]?.languages[0];
      const userCountryMarketId = markets?.MarketRegionCountry?.find(
        (item) => item?.code === userCountry,
      )?.__parentId;
      const marketWebPresence = markets?.Market?.find(
        (item) => item?.id === userCountryMarketId,
      )?.webPresence;
      let availableLanguages = [];
      if (marketWebPresence) {
        const defaultL = marketWebPresence?.defaultLocale?.locale
          ? marketWebPresence?.defaultLocale?.locale
          : marketWebPresence?.defaultLocale;
        availableLanguages = [
          defaultL,
          ...((marketWebPresence?.alternateLocales?.find((item) => item.locale)
            ? marketWebPresence?.alternateLocales
                ?.filter((item) => item?.published)
                .map((item) => item.locale)
            : marketWebPresence?.alternateLocales) || []),
        ];
      }
      // console.log("availableLanguages", availableLanguages);
      const incorrectCountry =
        storeCountry && userCountry && storeCountry !== userCountry;
      const incorrectLng =
        storeLng &&
        defaultLng &&
        defaultLng !== storeLng &&
        availableLanguages?.includes(defaultLng);

      if (incorrectCountry || incorrectLng) {
        showModal(showFrequency);
      }
    } else {
      showModal(showFrequency);
    }
  }

  /**
   * Element builders
   */
  builder(html, basicConfigs, markets, plan) {
    const {
      title,
      title_locales,
      text,
      text_locales,
      buttonText,
      buttonText_locales,
      showFlag,
      // @ts-ignore
      showFrequency,
      topbarSticky,
      stickyOpener,
      stickyVerticalPosition,
      icon,
      iconWidth,
      stickyToggleIcon,
      type,
    } = basicConfigs;

    const savedUserData = this.getUserData();
    const userGeoCountry =
      savedUserData?.country_name ||
      // @ts-ignore
      window.ngr_countries_window[savedUserData?.country]?.name;

    const userGeoCountryEng =
      // @ts-ignore
      window.ngr_countries_window[savedUserData?.country]?.name;

    let localeTitle = title;
    let localeText = text;
    let localeButtonText = buttonText;
    if (plan === 2) {
      localeTitle = this.getTranslation(title, title_locales);
      localeText = this.getTranslation(text, text_locales);
      localeButtonText = this.getTranslation(buttonText, buttonText_locales);
    }
    if (userGeoCountry) {
      localeText = localeText.replace(/\[\[country\]\]/g, userGeoCountry);
    }
    if (userGeoCountryEng) {
      localeText = localeText.replace(
        /\[\[country_eng\]\]/g,
        userGeoCountryEng,
      );
    }

    const closeButton = html.querySelector("[data-ngr-markets-close]");
    const stickyIconElement = this.buildStickyIconElement(
      stickyToggleIcon,
      stickyOpener,
      savedUserData?.country,
      // @ts-ignore
      window?.Shopify?.country,
    );
    const iconElement = this.buildIconElement(icon, iconWidth);
    const titleElement = this.buildTitleElement(localeTitle);
    const textElement = this.buildTextElement(localeText, plan);
    const marketsElement = this.buildMarketsDropdowns(markets, basicConfigs);
    const flagElement = this.buildFlagElement(savedUserData?.country);

    const submitButton = html.querySelector("[data-ngr-markets-button]");
    const appendElement = html.querySelector("[data-ngr-markets-content]");

    // document.body.insertBefore(this, document.body.firstChild);

    if (type === "topbar") {
      this.modal.classList.add("top-bar");
      if (topbarSticky) {
        // @ts-ignore
        this.style.top = 0;
        this.style.position = "sticky";
        this.style.zIndex = "999999999999";
      }
      if (marketsElement) {
        marketsElement.appendChild(submitButton);
      }
    }
    if (type === "sticky") {
      this.modal.classList.add("sticky-bar");
      this.modal.style.top = stickyVerticalPosition + "%";
      setTimeout(() => {
        this.modal.classList.add("transition");
      }, 2500);
    }

    if (stickyIconElement && type === "sticky" && closeButton) {
      closeButton.removeAttribute("data-ngr-markets-close");
      closeButton.setAttribute("data-ngr-markets-toggle", "");
      closeButton.innerHTML = "";
      closeButton.appendChild(stickyIconElement);
    }

    if (iconElement) {
      appendElement.appendChild(iconElement);
    }

    if (titleElement) {
      appendElement.appendChild(titleElement);
    }

    if (textElement) {
      appendElement.appendChild(textElement);
    }

    if (flagElement && showFlag) {
      appendElement.appendChild(flagElement);
    }

    if (marketsElement) {
      appendElement.appendChild(marketsElement);
    }

    if (submitButton && localeButtonText) {
      submitButton.textContent = localeButtonText;
    }

    return html;
  }

  buildStickyIconElement(
    iconSrc,
    stickyOpener,
    geoCountryCode,
    marketCountryCode,
  ) {
    if (stickyOpener === "geo" && geoCountryCode) {
      // @ts-ignore
      iconSrc = this.flagSrc.replace(
        "ac.svg",
        `${geoCountryCode.toLowerCase()}.svg`,
      );
    } else if (stickyOpener === "market" && marketCountryCode) {
      // @ts-ignore
      iconSrc = this.flagSrc.replace(
        "ac.svg",
        `${marketCountryCode.toLowerCase()}.svg`,
      );
    } else {
      iconSrc = iconSrc === "default" ? this.widgetStickyIcon : iconSrc;
    }

    const element = document.createElement("img");
    element.loading = "lazy";
    element.alt = "Geo location toggler";
    element.width = 100;
    element.height = 100;
    element.src = iconSrc;
    return element;
  }

  buildIconElement(iconSrc, width = 100, alt = "Redirects Icon") {
    if (!iconSrc || iconSrc === "") return;
    const element = document.createElement("img");
    element.loading = "lazy";
    element.alt = alt;
    element.width = width;
    element.height = 100;
    element.src = iconSrc === "default" ? this.widgetIcon : iconSrc;

    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("ngr-markets-modal__icon");
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  buildTitleElement(title) {
    if (!title || title === "") return;
    const element = document.createElement("h2");
    element.classList.add("ngr-markets-modal__title");
    element.textContent = title;
    return element;
  }

  buildTextElement(text, plan) {
    if (
      !text ||
      text === "" ||
      plan === 3 ||
      text === "<p><br></p>" ||
      text === "<p><br/></p>"
    )
      return;
    const element = document.createElement("div");
    element.classList.add("ngr-markets-modal__text");
    element.innerHTML = text;
    return element;
  }

  buildMarketsDropdowns(marketsData, basicConfigs) {
    if (!marketsData || !marketsData.MarketRegionCountry.length) return;

    const { dropdownDefault, showLngSelector, showCountrySelector } =
      basicConfigs;

    const { MarketRegionCountry, Market, MarketWebPresence, BackupRegion } =
      marketsData;

    let preferedCountry = null;
    const sortedMarketCountries = MarketRegionCountry.sort((a, b) =>
      a.name > b.name ? 1 : -1,
    );
    const sortedMarkets = Market;

    const availableMarkets = sortedMarkets?.filter(
      (item) => item.enabled || item.status === "ACTIVE",
    );
    const availableMarketIds = availableMarkets?.map((item) => item.id);
    // @ts-ignore
    const primaryMarketId = MarketWebPresence?.length
      ? MarketRegionCountry?.find((item) => item.id === BackupRegion?.id)
          ?.__parentId
      : sortedMarketCountries?.find((item) => item.primary)?.__parentId;

    const mainElement = document.createElement("div");
    mainElement.classList.add("ngr-markets-modal__form-content");
    let initialSelectedMarketId = primaryMarketId;

    if (showCountrySelector) {
      const selectElementMarketWrapper = document.createElement("div");
      selectElementMarketWrapper.classList.add("select");
      selectElementMarketWrapper.classList.add("country-selector");
      const selectElementMarket = document.createElement("select");
      selectElementMarket.name = "country_code";

      const regions = sortedMarketCountries;

      regions?.forEach((region) => {
        if (!availableMarketIds.includes(region.__parentId)) return;
        const optionElement = document.createElement("option");
        const currencySymbol =
          // @ts-ignore
          window?.ngr_currencies_window[region.currency.currencyCode]
            ?.symbol_native;
        const nativeCountryName =
          // @ts-ignore
          window?.ngr_countries_window[region.code]?.native || "";

        optionElement.textContent =
          nativeCountryName !== region.name
            ? region.name +
              " / " +
              nativeCountryName +
              ` (${region.currency.currencyCode} ${currencySymbol})`
            : region.name +
              ` (${region.currency.currencyCode} ${currencySymbol})`;
        optionElement.value = region.code;
        optionElement.setAttribute("data-market", region.__parentId);
        selectElementMarket.appendChild(optionElement);
        if (region.code === this?.userGeoData?.country) {
          preferedCountry = region.code;
        }
      });

      if (this.userGeoData && dropdownDefault !== "market" && preferedCountry) {
        selectElementMarket.value = preferedCountry;
      } else {
        const allOptions = selectElementMarket.options;
        // @ts-ignore
        const targetValue = window?.Shopify?.country;
        const hasValue = Array.from(allOptions).some(
          (option) => option.value === targetValue,
        );

        selectElementMarket.value = hasValue
          ? targetValue
          : allOptions.length > 0
            ? allOptions[0].value
            : 0;
      }
      initialSelectedMarketId = selectElementMarket.value;
      console.log(
        "initialSelectedMarketId",
        initialSelectedMarketId,
        selectElementMarket,
      );
      selectElementMarketWrapper.appendChild(selectElementMarket);
      mainElement.appendChild(selectElementMarketWrapper);
    }
    //// -------------------------------------------------------------
    const allWebPresences = [];

    if (MarketWebPresence?.length) {
      const selectElementMarket = mainElement.querySelector(
        ".country-selector select",
      );
      const selectedOption =
        selectElementMarket?.options[selectElementMarket?.selectedIndex];
      const selectedMarketId = selectedOption?.getAttribute("data-market");
      const findWebPresence = MarketWebPresence.find(
        (item) =>
          item.__parentId === selectedMarketId ||
          item.__parentId === primaryMarketId,
      );
      findWebPresence?.rootUrls?.forEach((rootUrl) =>
        allWebPresences.push({
          ...rootUrl,
          marketId: selectedMarketId || primaryMarketId,
        }),
      );
    } else {
      const primaryMarket = Market.find((item) => item.primary);
      primaryMarket?.webPresence?.rootUrls.forEach((rootUrl) =>
        allWebPresences.push({ ...rootUrl, marketId: primaryMarket.id }),
      );
    }

    if (showLngSelector) {
      let preferedLngs = [];
      const selectElementMarket = mainElement.querySelector(
        ".country-selector select",
      );
      const selectElementLngWrapper = document.createElement("div");
      selectElementLngWrapper.classList.add("select");
      const selectElementLng = document.createElement("select");
      selectElementLng.name = "language_code";

      allWebPresences?.forEach((item) => {
        const optionElement = this.createLngOption(item);
        if (optionElement) selectElementLng.appendChild(optionElement);
        const itemLocale = item?.locale;
        const countryPreferedLng =
          // @ts-ignore
          window?.ngr_countries_window[this?.userGeoData?.country]?.languages;
        if (
          itemLocale &&
          countryPreferedLng.includes(itemLocale) &&
          dropdownDefault !== "market"
        ) {
          preferedLngs.push(itemLocale);
        }
      });

      const isGeoDefaultLng = this.userGeoData && dropdownDefault !== "market";

      if (isGeoDefaultLng) {
        if (preferedLngs?.length) {
          selectElementLng.value = preferedLngs[0];
        } else {
          selectElementLng.selectedIndex = 0;
        }
      } else {
        // @ts-ignore
        selectElementLng.value = window?.Shopify?.locale;
      }

      if (showCountrySelector && selectElementMarket) {
        selectElementMarket.addEventListener(
          "change",
          (selectedCountryElement) => {
            const selectedOption =
              selectedCountryElement?.target?.options[
                selectedCountryElement?.target?.selectedIndex
              ];
            const selectedMarketId =
              selectedOption?.getAttribute("data-market");
            if (!selectedMarketId) return;
            selectElementLng.options.length = 0;
            const allWebPresences = [];
            if (MarketWebPresence?.length) {
              const findWebPresence = MarketWebPresence.find(
                (item) =>
                  item.__parentId === selectedMarketId ||
                  item.__parentId === primaryMarketId,
              );
              findWebPresence?.rootUrls?.forEach((rootUrl) =>
                allWebPresences.push({
                  ...rootUrl,
                  marketId: selectedMarketId,
                }),
              );
            } else {
              const primaryMarket = Market.find((item) => item.primary);
              primaryMarket?.webPresence?.rootUrls.forEach((rootUrl) =>
                allWebPresences.push({
                  ...rootUrl,
                  marketId: primaryMarket.id,
                }),
              );
            }

            if (allWebPresences?.length) {
              allWebPresences?.forEach((item) => {
                const optionElement = this.createLngOption(item);
                if (optionElement) selectElementLng.appendChild(optionElement);
                selectElementLng.selectedIndex = 0;
              });
            }
          },
        );
      }

      selectElementLngWrapper.appendChild(selectElementLng);
      mainElement.appendChild(selectElementLngWrapper);
    }

    return mainElement;
  }

  createLngOption(item, MarketWebPresence, mainElement, primaryMarketId) {
    // const selectElementMarket = mainElement.querySelector(
    //   ".country-selector select",
    // );
    // // const selectedMarketId =
    // //   selectElementMarket?.options[
    // //     selectElementMarket.selectedIndex
    // //   ]?.getAttribute("data-market");

    // // // const findWebPresence = MarketWebPresence.find(
    // // //   (item) => item.__parentId === selectedMarketId || item.__parentId === primaryMarketId,
    // // // );
    // // // const webPresenceNotNull = allItems.find(
    // // //   (opt) => opt.id === selectedMarketId,
    // // // );
    // // // console.log(item, allItems, selectedMarketId, webPresenceNotNull);
    // // // if (
    // // //   (item?.id !== selectedMarketId && webPresenceNotNull) ||
    // // //   (item?.id !== marketPrimaryId && !webPresenceNotNull)
    // // // )
    // // //   return;

    const optionElement = document.createElement("option");
    // @ts-ignore
    const lngObj = window?.ngr_languages_window[item.locale];
    const lngName =
      lngObj?.name !== lngObj?.native
        ? lngObj?.name + " / " + lngObj?.native
        : lngObj?.name;
    optionElement.textContent = lngName || item.locale;
    optionElement.value = item.locale;
    optionElement.setAttribute("data-market", item.marketId);
    return optionElement;
  }

  buildFlagElement(countryCode) {
    if (
      !countryCode ||
      countryCode === "" ||
      !this.flagSrc ||
      this.flagSrc === ""
    )
      return;
    const flagSrc = this.flagSrc.replace(
      "ac.svg",
      `${countryCode.toLowerCase()}.svg`,
    );
    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("ngr-markets-modal__flag");
    const element = document.createElement("img");
    element.loading = "lazy";
    element.alt = countryCode;
    element.width = 100;
    element.height = 50;
    element.src = flagSrc;
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  builOpenerIconElement(iconSrc) {
    if (!iconSrc || iconSrc === "") return;
    return `<img src="${iconSrc}" loading="lazy" alt="geo location icon" width="14" height="14" style="margin-right: 2px; transform: translateY(2px); "/>`;
  }

  /**
   * Helper functions
   */
  analytics() {
    try {
      // @ts-ignore
      const store_url = window?.Shopify?.shop;
      const dataEndpoint = `${this.HOST}/api/shop/markets-button?shop=${store_url}`;
      fetch(dataEndpoint);
      return;
    } catch (e) {
      console.log(e);
    }
  }

  getTranslation(text, locales) {
    if (!text) return "";
    return (locales && locales[this.userLocale]) || text || "";
  }

  openModal(modal) {
    const widgetModal = modal || this.modal;
    if (widgetModal) {
      widgetModal.setAttribute("data-open", "");
    }
  }

  closeModal(modal, showFrequency, preventModalClose) {
    const widgetModal = modal || this.modal;
    if (widgetModal) {
      if (!preventModalClose) widgetModal.removeAttribute("data-open");

      if (showFrequency && showFrequency === this.SHOW_RULES.session) {
        // @ts-ignore
        sessionStorage.setItem(this.VARS.CLOSED_KEY, 1);
      } else if (showFrequency && showFrequency === this.SHOW_RULES.cookie) {
        this.setCookie(this.VARS.CLOSED_KEY, 1, 7);
      }
    }
  }

  toggleModal(modal, showFrequency) {
    const widgetModal = modal || this.modal;
    if (widgetModal) {
      if (widgetModal.hasAttribute("data-open")) {
        this.closeModal(modal, showFrequency);
      } else {
        this.openModal(modal);
      }
    }
  }

  getUserData() {
    // @ts-ignore
    return JSON.parse(this.getCookie(this.VARS.KEY)) || window?.[this.VARS.KEY];
  }

  async getCountriesJSON() {
    const ngr_countries = localStorage.getItem("ngr_countries");
    if (ngr_countries) {
      return JSON.parse(ngr_countries);
    }
    const dataEndpoint = `${this.HOST}/api/countries.json`;

    try {
      const response = await fetch(dataEndpoint).then((resp) => resp.json());

      localStorage.setItem("ngr_countries", JSON.stringify({ ...response }));
      return response;
    } catch (e) {
      return false;
    }
  }

  displayWidget() {
    this.style.display = "initial";
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}

customElements.define("ngr-app-markets", NGRMarkets);
