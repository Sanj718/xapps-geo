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
    if (!response?.data) {
      console.error("[NGR APP]: Store data not found. Contact app support.");
      return;
    }

    const geoData = await this.getGeo();
    if (!geoData?.country) {
      console.error("[NGR APP]: GEO Location not detected. Contact app support.");
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
    this.testMode = window.location.search.includes("ngr-markets-test") ||
      window.location.hash === "#ngr-markets-test" ||
      // @ts-ignore
      (this.dataset.testMode === "true" && window.Shopify.designMode);
  }

  clearLocalData() {
    if (window.location.hash === "#ngr-clear-user-data") {
      [this.VARS.KEY, this.VARS.CLOSED_KEY].forEach(key => {
        this.deleteCookie(key);
        sessionStorage.removeItem(key);
      });
    }
  }

  async getData() {
    // @ts-ignore
    const store_url = window?.Shopify?.shop;
    const dataEndpoint = `${this.HOST}/api/shop-markets?shop=${store_url}`;
    try {
      return await fetch(dataEndpoint).then((resp) => resp.json());
    } catch (e) {
      console.log("Error", e);
    }
  }

  async getGeo() {
    const savedUserData = this.getCookie(this.VARS.KEY);
    if (savedUserData && !this.testMode) {
      return JSON.parse(savedUserData);
    }
    
    const [countries, userGeo] = await Promise.all([
      this.getCountriesJSON(),
      fetch("/browsing_context_suggestions.json").then((resp) => resp.json())
    ]);

    if (!countries || !userGeo) {
      console.error("[NGR APP]: User GEO location or countries list not detected. Contact app support please.");
      return;
    }

    const userCountry = userGeo?.detected_values?.country.handle;
    const userLocation = {
      country_name: userGeo?.detected_values?.country?.name || userGeo?.detected_values?.country_name,
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

    if (plan === 2 && advancedConfigs?.html_id) {
      modal.setAttribute("id", advancedConfigs.html_id);
    }

    return this.builder(html, basicConfigs, markets, plan);
  }

  genCustomStyles(configs) {
    if (!configs) return;
    const { basicConfigs, advancedConfigs, plan } = configs;
    const custom_styles = document.createElement("style");
    let custom_css = "";

    const addCSS = (selector, properties) => {
      const cssProps = Object.entries(properties)
        .filter(([, value]) => value && value !== "" && value !== "inherit" && value !== "undefined")
        .map(([key, value]) => `${key}:${value};`)
        .join("");
      if (cssProps) custom_css += `${selector}{${cssProps}}`;
    };

    if (basicConfigs && !advancedConfigs?.disable_basic_css && plan !== 3) {
      const { modalBgColor, modalTextColor, modalBorderColor, buttonsBgColor, buttonsColor, font } = basicConfigs;
      const fontFamily = font && font !== "" && font !== "inherit" && font !== "undefined" ? `'${font}', sans-serif` : "";

      addCSS(".ngr-markets-modal", { "font-family": fontFamily });
      addCSS(".ngr-markets-modal__content", {
        "background-color": modalBgColor,
        "color": modalTextColor,
        "border-color": modalBorderColor
      });
      
      if (modalBgColor) {
        addCSS(".ngr-markets-modal__close", { "background-color": `${modalBgColor} !important` });
      }
      
      addCSS(".ngr-markets-modal__form-content .select select", { "font-family": fontFamily });
      addCSS(".ngr-markets-modal__button-main", {
        "background-color": buttonsBgColor,
        "border-color": buttonsColor,
        "color": buttonsColor,
        "font-family": font
      });
      addCSS(".ngr-markets-modal__button-main:hover", {
        "background-color": buttonsColor,
        "border-color": buttonsBgColor,
        "color": buttonsBgColor
      });
    }
    
    if (advancedConfigs?.css && plan === 2) {
      custom_css += advancedConfigs.css;
    }

    custom_styles.textContent = custom_css.replace(/\n/g, "").replace(/  +/g, "");
    return custom_styles;
  }

  customOpenerIcon() {
    const customOpener = document.querySelectorAll("[href$='#ngr-markets-open']");
    if (!this.customOpenerIconSrc || !customOpener?.length) return;
    
    const iconElement = this.builOpenerIconElement(this.customOpenerIconSrc);
    if (!iconElement) return;
    
    customOpener.forEach(element => {
      if (element?.textContent?.includes("[ngr-markets-icon]")) {
        element.innerHTML = element.innerHTML.replace(/\[ngr\-markets\-icon]/g, iconElement);
      }
    });
  }

  widgetEvents(shadowRoot, showFrequency) {
    const modalElement = shadowRoot.querySelector("[data-ngr-markets-modal]");
    if (!modalElement) return;

    const addEvent = (selector, event, handler) => {
      const element = modalElement.querySelector(selector);
      if (element) element.addEventListener(event, handler);
    };

    addEvent("[data-ngr-markets-close]", "click", () => this.closeModal(modalElement, showFrequency));
    addEvent("[data-ngr-markets-toggle]", "click", () => this.toggleModal(modalElement, showFrequency));
    
    addEvent("[data-ngr-markets-button]", "click", (e) => {
      this.analytics();
      const countryCode = modalElement.querySelector("[name='country_code']")?.value;
      const languageCode = modalElement.querySelector("[name='language_code']")?.value;
      // @ts-ignore
      const storeCountry = window?.Shopify?.country;
      // @ts-ignore
      const storeLocale = window?.Shopify?.locale;
      
      if (countryCode === storeCountry && languageCode === storeLocale) {
        e.preventDefault();
        this.closeModal(modalElement, showFrequency);
        return;
      }
      
      this.closeModal(modalElement, showFrequency, true);
      modalElement.classList.add("loading");
      setTimeout(() => modalElement.classList.remove("loading"), 5000);
    });

    document.addEventListener("click", (event) => {
      const element = event.target.closest("[data-ngr-markets-open]") || 
                     event.target.closest("[href$='#ngr-markets-open']");
      if (element) {
        event.preventDefault();
        this.openModal();
      }
    });
  }

  async widgetLogic(shadowRoot, basicConfigs, markets) {
    if (!basicConfigs || !shadowRoot) {
      console.error("[NGR APP]: Configs or shadowRoot list not found. Contact app support please.");
      return;
    }
    
    const { showRules, showFrequency } = basicConfigs;

    if (this.testMode) {
      this.openModal();
      return;
    }
    
    if (showRules === "manual") return;

    if (showRules === "autoGeo") {
      const marketCountries = markets.MarketRegionCountry.map(item => item.code);
      const userLocation = await this.getUserLocation();
      
      if (!userLocation || !marketCountries.includes(userLocation.country)) return;
      this.widgetBehaviour(showFrequency, userLocation, markets);
      return;
    }
    
    this.widgetBehaviour(showFrequency);
  }

  async getUserLocation() {
    const savedUserData = this.getCookie(this.VARS.KEY);
    if (savedUserData && !this.testMode) {
      return JSON.parse(savedUserData);
    }

    const [countries, userGeo] = await Promise.all([
      this.getCountriesJSON(),
      fetch("/browsing_context_suggestions.json").then((resp) => resp.json())
    ]);

    if (!countries || !userGeo) {
      console.error("[NGR APP]: User GEO location or countries list not detected. Contact app support please.");
      return;
    }

    const userCountry = userGeo?.detected_values?.country.handle;
    const userLocation = {
      country_name: userGeo?.detected_values?.country?.name || userGeo?.detected_values?.country_name,
      country: userCountry,
      continent: countries[userCountry]?.continent,
    };

    this.setCookie(this.VARS.KEY, JSON.stringify(userLocation), 7);
    window[this.VARS.KEY] = userLocation;
    return userLocation;
  }

  widgetBehaviour(showFrequency = this.SHOW_RULES.session, userLocation, markets) {
    if (!userLocation?.country && showFrequency === this.SHOW_RULES.load) {
      return this.openModal();
    }

    const showModal = (showFrequency) => {
      if (userLocation.country !== "CH" && window.location.host.includes("got-bag.com")) return;
      
      if (showFrequency === this.SHOW_RULES.load) {
        this.openModal();
      } else {
        const modalClosed = showFrequency === this.SHOW_RULES.cookie
          ? this.getCookie(this.VARS.CLOSED_KEY)
          : sessionStorage.getItem(this.VARS.CLOSED_KEY);
        if (!modalClosed) {
          this.openModal();
        }
      }
    };

    const userCountry = userLocation?.country;
    if (!userCountry) {
      showModal(showFrequency);
      return;
    }

    // @ts-ignore
    const storeCountry = window?.Shopify?.country;
    // @ts-ignore
    const storeLng = window?.Shopify?.locale;
    const defaultLng = userCountry && window?.ngr_countries_window[userCountry]?.languages[0];
    
    const userCountryMarketId = markets?.MarketRegionCountry?.find(item => item?.code === userCountry)?.__parentId;
    const marketWebPresence = markets?.Market?.find(item => item?.id === userCountryMarketId)?.webPresence;
    
    let availableLanguages = [];
    if (marketWebPresence) {
      const defaultL = marketWebPresence?.defaultLocale?.locale || marketWebPresence?.defaultLocale;
      availableLanguages = [
        defaultL,
        ...((marketWebPresence?.alternateLocales?.find(item => item.locale)
          ? marketWebPresence?.alternateLocales?.filter(item => item?.published).map(item => item.locale)
          : marketWebPresence?.alternateLocales) || []),
      ];
    }

    const incorrectCountry = storeCountry && userCountry && storeCountry !== userCountry;
    const incorrectLng = storeLng && defaultLng && defaultLng !== storeLng && availableLanguages?.includes(defaultLng);

    if (incorrectCountry || incorrectLng) {
      showModal(showFrequency);
    }
  }

  // Element builders
  createElement(tag, className, attributes = {}) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    Object.entries(attributes).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        element.setAttribute(key, value);
      }
    });
    return element;
  }

  builder(html, basicConfigs, markets, plan) {
    const {
      title, title_locales, text, text_locales, buttonText, buttonText_locales,
      showFlag, topbarSticky, stickyOpener, stickyVerticalPosition,
      icon, iconWidth, stickyToggleIcon, type
    } = basicConfigs;

    const savedUserData = this.getUserData();
    const userGeoCountry = savedUserData?.country_name || 
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
      localeText = localeText.replace(/\[\[country_eng\]\]/g, userGeoCountryEng);
    }

    const closeButton = html.querySelector("[data-ngr-markets-close]");
    const stickyIconElement = this.buildStickyIconElement(
      stickyToggleIcon, stickyOpener, savedUserData?.country,
      // @ts-ignore
      window?.Shopify?.country
    );
    const iconElement = this.buildIconElement(icon, iconWidth);
    const titleElement = this.buildTitleElement(localeTitle);
    const textElement = this.buildTextElement(localeText, plan);
    const marketsElement = this.buildMarketsDropdowns(markets, basicConfigs);
    const flagElement = this.buildFlagElement(savedUserData?.country);

    const submitButton = html.querySelector("[data-ngr-markets-button]");
    const appendElement = html.querySelector("[data-ngr-markets-content]");

    // Handle modal types
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
      setTimeout(() => this.modal.classList.add("transition"), 2500);
    }

    if (stickyIconElement && type === "sticky" && closeButton) {
      closeButton.removeAttribute("data-ngr-markets-close");
      closeButton.setAttribute("data-ngr-markets-toggle", "");
      closeButton.innerHTML = "";
      closeButton.appendChild(stickyIconElement);
    }

    // Append elements
    const elements = [
      { element: iconElement, condition: true },
      { element: titleElement, condition: true },
      { element: textElement, condition: true },
      { element: flagElement, condition: showFlag },
      { element: marketsElement, condition: true }
    ];

    elements.forEach(({ element, condition }) => {
      if (element && condition) {
        appendElement.appendChild(element);
      }
    });

    if (submitButton && localeButtonText) {
      submitButton.textContent = localeButtonText;
    }

    return html;
  }

  buildStickyIconElement(iconSrc, stickyOpener, geoCountryCode, marketCountryCode) {
    if (stickyOpener === "geo" && geoCountryCode) {
      // @ts-ignore
      iconSrc = this.flagSrc.replace("ac.svg", `${geoCountryCode.toLowerCase()}.svg`);
    } else if (stickyOpener === "market" && marketCountryCode) {
      // @ts-ignore
      iconSrc = this.flagSrc.replace("ac.svg", `${marketCountryCode.toLowerCase()}.svg`);
    } else {
      iconSrc = iconSrc === "default" ? this.widgetStickyIcon : iconSrc;
    }

    return this.createElement("img", "", {
      loading: "lazy",
      alt: "Geo location toggler",
      width: "100",
      height: "100",
      src: iconSrc
    });
  }

  buildIconElement(iconSrc, width = 100, alt = "Redirects Icon") {
    if (!iconSrc || iconSrc === "") return;
    
    const element = this.createElement("img", "", {
      loading: "lazy",
      alt: alt,
      width: width.toString(),
      height: "100",
      src: iconSrc === "default" ? this.widgetIcon : iconSrc
    });

    const elementWrapper = this.createElement("div", "ngr-markets-modal__icon");
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  buildTitleElement(title) {
    if (!title || title === "") return;
    const element = this.createElement("h2", "ngr-markets-modal__title");
    element.textContent = title;
    return element;
  }

  buildTextElement(text, plan) {
    if (!text || text === "" || plan === 3 || text === "<p><br></p>" || text === "<p><br/></p>") return;
    const element = this.createElement("div", "ngr-markets-modal__text");
    element.innerHTML = text;
    return element;
  }

  buildMarketsDropdowns(marketsData, basicConfigs) {
    if (!marketsData?.MarketRegionCountry?.length) return;

    const { dropdownDefault, showLngSelector, showCountrySelector } = basicConfigs;
    const { MarketRegionCountry, Market, MarketWebPresence, BackupRegion } = marketsData;

    let preferedCountry = null;
    const sortedMarketCountries = MarketRegionCountry.sort((a, b) => a.name > b.name ? 1 : -1);
    const availableMarkets = Market?.filter(item => item.enabled || item.status === "ACTIVE");
    const availableMarketIds = availableMarkets?.map(item => item.id);
    
    // @ts-ignore
    const primaryMarketId = MarketWebPresence?.length
      ? MarketRegionCountry?.find(item => item.id === BackupRegion?.id)?.__parentId
      : sortedMarketCountries?.find(item => item.primary)?.__parentId;

    const mainElement = this.createElement("div", "ngr-markets-modal__form-content");

    if (showCountrySelector) {
      const selectElementMarket = this.createCountrySelector(sortedMarketCountries, availableMarketIds, preferedCountry);
      mainElement.appendChild(selectElementMarket);
    }

    const allWebPresences = this.getWebPresences(MarketWebPresence, Market, primaryMarketId, mainElement);

    if (showLngSelector) {
      const languageSelector = this.createLanguageSelector(allWebPresences, dropdownDefault, showCountrySelector, mainElement, MarketWebPresence, Market, primaryMarketId);
      mainElement.appendChild(languageSelector);
    }

    return mainElement;
  }

  createCountrySelector(sortedMarketCountries, availableMarketIds, preferedCountry) {
    const selectElementMarketWrapper = this.createElement("div", "select country-selector");
    const selectElementMarket = this.createElement("select", "", { name: "country_code" });

    sortedMarketCountries?.forEach(region => {
      if (!availableMarketIds.includes(region.__parentId)) return;
      
      const optionElement = this.createElement("option", "", {
        value: region.code,
        "data-market": region.__parentId
      });
      
      const currencySymbol = 
        // @ts-ignore
        window?.ngr_currencies_window[region.currency.currencyCode]?.symbol_native;
      const nativeCountryName = 
        // @ts-ignore
        window?.ngr_countries_window[region.code]?.native || "";

      optionElement.textContent = nativeCountryName !== region.name
        ? `${region.name} / ${nativeCountryName} (${region.currency.currencyCode} ${currencySymbol})`
        : `${region.name} (${region.currency.currencyCode} ${currencySymbol})`;
      
      selectElementMarket.appendChild(optionElement);
      if (region.code === this?.userGeoData?.country) {
        preferedCountry = region.code;
      }
    });

    this.setSelectValue(selectElementMarket, preferedCountry);
    selectElementMarketWrapper.appendChild(selectElementMarket);
    return selectElementMarketWrapper;
  }

  setSelectValue(selectElement, preferedCountry) {
    if (this.userGeoData && dropdownDefault !== "market" && preferedCountry) {
      selectElement.value = preferedCountry;
    } else {
      const allOptions = selectElement.options;
      // @ts-ignore
      const targetValue = window?.Shopify?.country;
      const hasValue = Array.from(allOptions).some(option => option.value === targetValue);
      selectElement.value = hasValue ? targetValue : allOptions.length > 0 ? allOptions[0].value : 0;
    }
  }

  getWebPresences(MarketWebPresence, Market, primaryMarketId, mainElement) {
    const allWebPresences = [];
    
    if (MarketWebPresence?.length) {
      const selectElementMarket = mainElement.querySelector(".country-selector select");
      const selectedOption = selectElementMarket?.options[selectElementMarket?.selectedIndex];
      const selectedMarketId = selectedOption?.getAttribute("data-market");
      const findWebPresence = MarketWebPresence.find(item =>
        item.__parentId === selectedMarketId || item.__parentId === primaryMarketId
      );
      findWebPresence?.rootUrls?.forEach(rootUrl =>
        allWebPresences.push({
          ...rootUrl,
          marketId: selectedMarketId || primaryMarketId,
        })
      );
    } else {
      const primaryMarket = Market.find(item => item.primary);
      primaryMarket?.webPresence?.rootUrls.forEach(rootUrl =>
        allWebPresences.push({ ...rootUrl, marketId: primaryMarket.id })
      );
    }
    
    return allWebPresences;
  }

  createLanguageSelector(allWebPresences, dropdownDefault, showCountrySelector, mainElement, MarketWebPresence, Market, primaryMarketId) {
    let preferedLngs = [];
    const selectElementMarket = mainElement.querySelector(".country-selector select");
    const selectElementLngWrapper = this.createElement("div", "select");
    const selectElementLng = this.createElement("select", "", { name: "language_code" });

    allWebPresences?.forEach(item => {
      const optionElement = this.createLngOption(item);
      if (optionElement) selectElementLng.appendChild(optionElement);
      
      const itemLocale = item?.locale;
      const countryPreferedLng = 
        // @ts-ignore
        window?.ngr_countries_window[this?.userGeoData?.country]?.languages;
      
      if (itemLocale && countryPreferedLng.includes(itemLocale) && dropdownDefault !== "market") {
        preferedLngs.push(itemLocale);
      }
    });

    const isGeoDefaultLng = this.userGeoData && dropdownDefault !== "market";
    if (isGeoDefaultLng) {
      selectElementLng.value = preferedLngs?.length ? preferedLngs[0] : (selectElementLng.selectedIndex = 0);
    } else {
      // @ts-ignore
      selectElementLng.value = window?.Shopify?.locale;
    }

    if (showCountrySelector && selectElementMarket) {
      selectElementMarket.addEventListener("change", (selectedCountryElement) => {
        this.handleCountryChange(selectedCountryElement, selectElementLng, MarketWebPresence, Market, primaryMarketId);
      });
    }

    selectElementLngWrapper.appendChild(selectElementLng);
    return selectElementLngWrapper;
  }

  handleCountryChange(selectedCountryElement, selectElementLng, MarketWebPresence, Market, primaryMarketId) {
    const selectedOption = selectedCountryElement?.target?.options[selectedCountryElement?.target?.selectedIndex];
    const selectedMarketId = selectedOption?.getAttribute("data-market");
    if (!selectedMarketId) return;
    
    selectElementLng.options.length = 0;
    const allWebPresences = [];
    
    if (MarketWebPresence?.length) {
      const findWebPresence = MarketWebPresence.find(item =>
        item.__parentId === selectedMarketId || item.__parentId === primaryMarketId
      );
      findWebPresence?.rootUrls?.forEach(rootUrl =>
        allWebPresences.push({ ...rootUrl, marketId: selectedMarketId })
      );
    } else {
      const primaryMarket = Market.find(item => item.primary);
      primaryMarket?.webPresence?.rootUrls.forEach(rootUrl =>
        allWebPresences.push({ ...rootUrl, marketId: primaryMarket.id })
      );
    }

    if (allWebPresences?.length) {
      allWebPresences?.forEach(item => {
        const optionElement = this.createLngOption(item);
        if (optionElement) selectElementLng.appendChild(optionElement);
        selectElementLng.selectedIndex = 0;
      });
    }
  }

  createLngOption(item) {
    const optionElement = this.createElement("option", "", {
      value: item.locale,
      "data-market": item.marketId
    });
    
    // @ts-ignore
    const lngObj = window?.ngr_languages_window[item.locale];
    const lngName = lngObj?.name !== lngObj?.native
      ? `${lngObj?.name} / ${lngObj?.native}`
      : lngObj?.name;
    
    optionElement.textContent = lngName || item.locale;
    return optionElement;
  }

  buildFlagElement(countryCode) {
    if (!countryCode || countryCode === "" || !this.flagSrc || this.flagSrc === "") return;
    
    const flagSrc = this.flagSrc.replace("ac.svg", `${countryCode.toLowerCase()}.svg`);
    const elementWrapper = this.createElement("div", "ngr-markets-modal__flag");
    const element = this.createElement("img", "", {
      loading: "lazy",
      alt: countryCode,
      width: "100",
      height: "50",
      src: flagSrc
    });
    
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  builOpenerIconElement(iconSrc) {
    if (!iconSrc || iconSrc === "") return;
    return `<img src="${iconSrc}" loading="lazy" alt="geo location icon" width="14" height="14" style="margin-right: 2px; transform: translateY(2px); "/>`;
  }

  // Helper functions
  analytics() {
    try {
      // @ts-ignore
      const store_url = window?.Shopify?.shop;
      const dataEndpoint = `${this.HOST}/api/shop/markets-button?shop=${store_url}`;
      fetch(dataEndpoint);
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

      if (showFrequency === this.SHOW_RULES.session) {
        // @ts-ignore
        sessionStorage.setItem(this.VARS.CLOSED_KEY, 1);
      } else if (showFrequency === this.SHOW_RULES.cookie) {
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
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  deleteCookie(name) {
    document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}

customElements.define("ngr-app-markets", NGRMarkets); 