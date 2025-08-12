function isJsonParsable(input) {
  try {
    JSON.parse(input);
    return true;
  } catch (e) {
    return false;
  }
}
class NGRAPP extends HTMLElement {
  // @ts-ignore
  HOST = __HOST__;
  MAIN_CSS = "native-geo-redirects.min.css";
  SHOW_RULES = {
    load: "everyload",
    cookie: "cookie",
    session: "session",
  };
  VARS = {
    KEY: "ngr-session",
    CLOSED_KEY: "ngr-closed",
    REDIRECTED_KEY: "ngr-popup-redirected",
    DOMAIN_REDIRECT_KEY: "ngr-domain-redirect",
  };
  OLD_ICON_PATH =
    "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";
  OLD_STICKY_PATH =
    "https://ngr-app.herokuapp.com/public/images/sticky-logo.png";

  constructor() {
    super();
    this.userGeoData;
    this.modal = null;
    this.testMode = false;
    this.marketCountries = null;
    this.domainRedirection = false;
    this.flagSrc = this.dataset.flagSrc;
    this.hasMarkets = this.dataset.markets;
    this.widgetIcon = this.dataset.widgetIcon;
    this.shopifyTemplate = this.dataset.shopifyTemplate;
    // @ts-ignore
    this.lng = this.dataset.lng || window.Shopify.locale;
    this.widgetStickyIcon = this.dataset.widgetStickyIcon;
    this.shopifytemplateDir = this.dataset.shopifyTemplateDir;
    // @ts-ignore
    this.userLocale = this.dataset.lng || window.Shopify.locale;
    this.customOpenerIconSrc = this.dataset.customOpenerIconSrc;
    this.template = this.querySelector("#NGR-Redirects-Template");
    this.stylesheet = document.querySelector(`[href*='${this.MAIN_CSS}']`);
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

    const { redirects, configs } = response.data;
    if (!configs || !redirects?.length) {
      console.warn(
        "[NGR APP]: Store data issue or plan not picked yet or no widget redirects configured.",
      );
      return;
    }

    if (this.validatePageShow(configs)) return;
    if (this.topBarMoveTop(configs?.basicConfigs?.type)) return;

    const widget = this.widget(redirects, configs);
    if (!widget) {
      console.warn("[NGR APP]: Widget not found. Contact app support.");
      return;
    }

    const customStyles = this.genCustomStyles(configs);
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(this.stylesheet);
    if (customStyles) shadowRoot.appendChild(customStyles);
    shadowRoot.appendChild(widget);
    this.customOpenerIcon();
    this.widgetEvents(
      shadowRoot,
      configs?.basicConfigs?.show,
      configs?.basicConfigs?.plan,
    );
    const widgetCustomCode = this.querySelector("[data-ngr-widget-code]");
    if (widgetCustomCode) {
      try {
        const hasBeenClosed =
          configs?.basic_configs?.show === this.SHOW_RULES.cookie
            ? this.getCookie(this.VARS.CLOSED_KEY)
            : sessionStorage.getItem(this.VARS.CLOSED_KEY);
        // @ts-ignore
        showWidgetCustomCode(geoData, this.openModal.bind(this), hasBeenClosed);
      } catch (e) {
        console.error("[NGR APP]: Widget editor custom code error ", e);
      }
    } else {
      await this.widgetLogic(shadowRoot, configs?.basicConfigs);
    }

    this.displayWidget();
  }

  checkTestMode() {
    if (
      window.location.search.includes("ngr-test") ||
      window.location.hash === "#ngr-test" ||
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
    const dataEndpoint = `${this.HOST}/api/shop?shop=${store_url}`;
    const response = await fetch(dataEndpoint).then((resp) => resp.json());
    return response;
  }

  async getGeo() {
    const savedUserData = this.getCookie(this.VARS.KEY);
    if (savedUserData && isJsonParsable(savedUserData) && !this.testMode) {
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

  validatePageShow({ allowedPages, hideOnAllowedPages }) {
    if (allowedPages && allowedPages !== "null" && allowedPages.length) {
      const customUrls = allowedPages.filter((item) => item.includes("http"));
      const currentPage = window.location.origin + window.location.pathname;
      const isWidgetAllowed =
        allowedPages.includes("all") ||
        allowedPages.includes(this.shopifyTemplate) ||
        customUrls.includes(currentPage) ||
        (this.shopifytemplateDir === "customers" &&
          allowedPages.join(",").includes("account pages"));

      if (
        (hideOnAllowedPages && isWidgetAllowed) ||
        (!hideOnAllowedPages && !isWidgetAllowed)
      ) {
        console.info(
          "[NGR-APP]: Widget is not allowed on this page. Check app configs.",
        );
        return true;
      }
    }
  }

  topBarMoveTop(type) {
    if (type === "topbar" && !this.hasAttribute("data-moved")) {
      this.setAttribute("data-moved", "");
      document.body.insertBefore(this, document.body.firstChild);
      return true;
    }
    return false;
  }

  widget(redirects, configs) {
    if (!redirects || !redirects.length || !configs) return;
    const { basicConfigs, advancedConfigs, plan } = configs;
    this.domainRedirection = basicConfigs?.domain_redirection || false;
    // @ts-ignore
    const html = this.template?.content?.cloneNode(true);
    const modal = html.querySelector("[data-ngr-modal]");
    this.modal = modal;

    if (plan === 2 && advancedConfigs && advancedConfigs?.html_id !== "") {
      modal.setAttribute("id", advancedConfigs?.html_id);
    }
    return this.builder(html, basicConfigs, redirects, plan);
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
      .ngr-modal{
        ${
          font && font != "" && font !== "inherit" && font !== "undefined"
            ? "font-family:'" + font + "', sans-serif;"
            : ""
        }
      }
      .ngr-modal__content{
        ${modalBgColor != "" ? "background-color:" + modalBgColor + ";" : ""}
        ${modalTextColor != "" ? "color:" + modalTextColor + ";" : ""}
        ${
          modalBorderColor != "" ? "border-color:" + modalBorderColor + ";" : ""
        }
      }
      .ngr-modal__close{
        ${
          modalBgColor != ""
            ? "background-color:" + modalBgColor + " !important;"
            : ""
        }
        ${modalTextColor != "" ? "color:" + modalTextColor + ";" : ""}
      }
      .ngr-redirects__link{
          ${
            buttonsBgColor != ""
              ? "background-color:" + buttonsBgColor + ";"
              : ""
          }
          ${buttonsColor != "" ? "border-color:" + buttonsColor + ";" : ""}
          ${buttonsColor != "" ? "color:" + buttonsColor + ";" : ""}
      }
      .ngr-redirects__link:hover{
          ${buttonsColor != "" ? "background-color:" + buttonsColor + ";" : ""}
          ${buttonsBgColor != "" ? "border-color:" + buttonsBgColor + ";" : ""}
          ${buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : ""}
      }
       .ngr-modal__content .ngr-select{
        ${buttonsBgColor != "" ? "background-color:" + buttonsBgColor + ";" : ""}
      }
      .ngr-modal__content .ngr-select__label{
        ${buttonsColor != "" ? "color:" + buttonsColor + ";" : ""}
        ${buttonsColor != "" ? "border-color:" + buttonsColor + ";" : ""}
      }
      .ngr-select::before{
        ${buttonsColor != "" ? "background-color:" + buttonsColor + ";" : ""}
      }
      `;
    }
    if (advancedConfigs && advancedConfigs?.css !== "" && plan === 2) {
      custom_css += advancedConfigs?.css;
    }

    custom_styles.textContent = custom_css
      .replace(/\n/g, "")
      .replace(/  +/g, "");
    return custom_styles;
  }

  customOpenerIcon() {
    const customOpener = document.querySelectorAll("[href$='#ngr-open']");
    if (
      this.customOpenerIconSrc &&
      this.customOpenerIconSrc !== "" &&
      customOpener?.length
    ) {
      const iconElement = this.builOpenerIconElement(this.customOpenerIconSrc);
      if (!iconElement) return;
      for (let index = 0; index < customOpener.length; index++) {
        const element = customOpener[index];
        if (element.textContent?.includes("[ngr-icon]")) {
          element.innerHTML = element.innerHTML.replace(
            /\[ngr\-icon]/g,
            iconElement,
          );
        }
      }
    }
  }

  widgetEvents(shadowRoot, showRule, plan) {
    const _self = this;
    const modalElement = shadowRoot.querySelector("[data-ngr-modal]");
    if (!modalElement) return;

    const closeButton = modalElement.querySelector("[data-ngr-close]");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        _self.closeModal(modalElement, showRule);
      });
    }

    function trackClicks(event) {
      if (plan === 3) return;
      const element = event.target.closest("[data-ngr-button]");
      if (element) {
        _self.buttonAnalytics();
      }
    }

    function internalRedirectLogic(event) {
      const element = event.target.closest("[data-ngr-button]");
      if (!element) return;

      const hostname = window?.location?.hostname?.replace("www.", "");
      const purePath = element.href
        .replace(/(^\w+:|^)\/\//, "")
        .replace(/\/$/, "")
        .replace("www.", "");
      if (purePath.includes(hostname)) {
        _self.setClosedCookieOrSession(showRule);
      }
    }

    function toggleAction(event) {
      const element = event.target.closest("[data-ngr-toggle]");
      if (element) {
        event.preventDefault();
        _self.toggleModal(modalElement, showRule);
      }
    }

    shadowRoot.addEventListener("click", (event) => {
      if (event) {
        toggleAction(event);
        trackClicks(event);
        internalRedirectLogic(event);
      }
    });

    document.addEventListener("click", (event) => {
      if (event) {
        const element =
          // @ts-ignore
          event.target?.closest("[data-ngr-open]") ||
          // @ts-ignore
          event.target?.closest("[href$='#ngr-open']");
        if (element) {
          event.preventDefault();
          _self.openModal();
        }
      }
    });
  }

  async widgetLogic(shadowRoot, basic_configs) {
    if (!basic_configs || !shadowRoot)
      return console.error(
        "[NGR APP]: Configs or shadowRoot list not found. Contact app support please.",
      );
    const { automaticShow, geo, show } = basic_configs;

    if (this.testMode) {
      this.openModal();
      return;
    }

    if (!automaticShow) return;

    if (window.location.href.includes(this.VARS.REDIRECTED_KEY)) {
      this.setClosedCookieOrSession(show);
      return;
    }

    if (geo) {
      const savedUserData = this.getCookie(this.VARS.KEY);
      if (savedUserData && isJsonParsable(savedUserData)) {
        const userLocation = JSON.parse(savedUserData);
        this.widgetBehaviour(basic_configs, userLocation);
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
      this.widgetBehaviour(basic_configs, userLocation);
      return;
    }
    this.widgetBehaviour(basic_configs);
  }

  widgetBehaviour(configs, userLocation) {
    const showFrequency = configs?.show;

    if (showFrequency === this.SHOW_RULES.load && !userLocation) {
      return this.openModal();
    }

    const { location, countries, continents, reverseGeo, geo, automaticShow } =
      configs;
    const { country, continent } = userLocation || {};
    const showModal = (showFrequency) => {
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

    if (!geo && automaticShow) {
      showModal(showFrequency);
    } else {
      // [TODO] remove reverse geo if geo is disabled, just show
      if (location === "country") {
        if (reverseGeo) {
          if (countries?.includes(country)) {
            showModal(showFrequency);
          }
        } else {
          if (!countries?.includes(country)) {
            showModal(showFrequency);
          }
        }
      } else {
        if (reverseGeo) {
          if (continents?.includes(continent)) {
            showModal(showFrequency);
          }
        } else {
          if (!continents?.includes(continent)) {
            showModal(showFrequency);
          }
        }
      }
    }
  }

  /**
   * Element builders
   */
  builder(html, configs, redirects, plan) {
    if (!html) return;

    const {
      title,
      title_locales,
      text,
      text_locales,
      topbarSticky,
      stickyOpener,
      stickyVerticalPosition,
      icon,
      iconWidth,
      stickyToggleIcon,
      type,
      showFlag,
      layout,
      dropdownPlaceholder,
      dropdownPlaceholder_locales,
      custom_rell_attr,
      forward_url_params,
    } = configs;

    const modalContent = html.querySelector("[data-ngr-modal-content]");
    if (modalContent) modalContent.classList.add(layout);

    const savedUserData = this.getUserData();
    const userGeoCountry =
      savedUserData?.country_name ||
      // @ts-ignore
      window?.ngr_countries_window[savedUserData?.country]?.name;

    const userGeoCountryEng =
      // @ts-ignore
      window?.ngr_countries_window[savedUserData?.country]?.name;

    let localeTitle = title;
    let localeText = text;
    let localeDpPlaceholder = dropdownPlaceholder;
    if (plan === 2) {
      localeTitle = this.getTranslation(title, title_locales);
      localeText = this.getTranslation(text, text_locales);
      localeDpPlaceholder = this.getTranslation(
        dropdownPlaceholder,
        dropdownPlaceholder_locales,
      );
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
    const closeButton = html.querySelector("[data-ngr-close]");
    const stickyIconElement = this.buildStickyIconElement(
      stickyToggleIcon,
      stickyOpener,
      savedUserData?.country,
    );
    const iconElement = this.buildIconElement(icon, iconWidth);
    const titleElement = this.buildTitleElement(localeTitle);
    const textElement = this.buildTextElement(localeText, plan);
    const redirectsElement = this.buildRedirectsElement(
      redirects,
      savedUserData,
      layout,
      localeDpPlaceholder,
      custom_rell_attr,
      forward_url_params,
    );
    // const marketsElement = this.buildMarketsElement(title, title_locales);
    const flagElement = this.buildFlagElement(showFlag, savedUserData?.country);
    const appendElement = html.querySelector("[data-ngr-redirects]");

    if (!appendElement) return;

    if (type === "topbar") {
      this.modal.classList.add("top-bar");
      if (topbarSticky) {
        this.style.top = "0";
        this.style.position = "sticky";
        this.style.zIndex = "999999999999";
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
      closeButton.removeAttribute("data-ngr-close");
      closeButton.setAttribute("data-ngr-toggle", "");
      closeButton.innerHTML = "";
      closeButton.appendChild(stickyIconElement);
    }

    if (redirectsElement) {
      appendElement.appendChild(redirectsElement);
    }

    // if (marketsElement && this.hasMarkets === "true") {
    //   appendElement.appendChild(marketsElement);
    // }

    if (iconElement) {
      appendElement.insertAdjacentElement("beforebegin", iconElement);
    }

    if (titleElement) {
      appendElement.insertAdjacentElement("beforebegin", titleElement);
    }

    if (textElement) {
      appendElement.insertAdjacentElement("beforebegin", textElement);
    }

    if (flagElement) {
      appendElement.insertAdjacentElement("beforebegin", flagElement);
    }

    return html;
  }

  buttonAnalytics() {
    // @ts-ignore
    const store_url = window?.Shopify?.shop;
    const dataEndpoint = `${this.HOST}/api/shop/buttons/?shop=${store_url}`;
    fetch(dataEndpoint);
    return;
  }

  builOpenerIconElement(iconSrc) {
    if (!iconSrc || iconSrc === "") return;
    return `<img src="${iconSrc}" loading="lazy" alt="geo location icon" width="14" height="14" style="margin-right: 2px; transform: translateY(2px); "/>`;
  }

  buildStickyIconElement(iconSrc, stickyOpener, geoCountryCode) {
    if (stickyOpener === "geo" && geoCountryCode) {
      iconSrc = this.flagSrc?.replace(
        /\b([a-z]+)\.svg/,
        `${geoCountryCode.toLowerCase()}.svg`,
      );
    } else {
      iconSrc =
        iconSrc === "default" || iconSrc === this.OLD_STICKY_PATH
          ? this.widgetStickyIcon
          : iconSrc;
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
    // @ts-ignore
    element.width = width === "auto" ? 100 : width;
    element.height = 100;
    element.src =
      iconSrc === "default" || iconSrc === this.OLD_ICON_PATH
        ? this.widgetIcon
        : iconSrc;
    // @ts-ignore
    if (width === "auto") {
      element.classList.add("ngr-modal__icon-img-auto");
    }

    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("ngr-modal__icon");
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  buildTitleElement(title) {
    if (!title || title === "") return;
    const element = document.createElement("h2");
    element.classList.add("ngr-modal__title");
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
    element.classList.add("ngr-modal__text");
    element.innerHTML = text;
    return element;
  }

  buildRedirectsElement(
    redirects,
    userData,
    layout,
    placeholder,
    rel,
    forward_url_params,
  ) {
    if (!redirects || !redirects?.length) return;

    const ROUTES = [
      "/products",
      "/collections",
      "/search",
      "/cart",
      "/checkout",
      "/account",
      "/blogs",
      "/pages",
    ];

    function stripPrefix(url) {
      for (let route of ROUTES) {
        let index = url.indexOf(route);
        if (index !== -1) {
          return url.substring(index);
        }
      }
      return url;
    }

    function hasLanguageMarketsSuffix(url) {
      const path = new URL(url).pathname;
      const languageCodePattern = /^\/[a-z]{2,3}(-[a-z]{2,3})?\/?$/i;
      const testPath = languageCodePattern.test(path);
      const isHomepage =
        // @ts-ignore
        window?.location.pathname + "/" === window?.Shopify?.routes?.root;
      return testPath && !isHomepage;
    }

    function stripPrefix(url) {
      for (let route of ROUTES) {
        let index = url.indexOf(route);
        if (index !== -1) {
          return url.substring(index);
        }
      }
      return url;
    }

    function getPurePath(data) {
      return data
        .replace(/(^\w+:|^)\/\//, "") // Remove protocol (http://, https://)
        .replace(/^www\./, "") // Remove leading www.
        .replace(/[?#].*$/, "") // Remove query params and hash
        .replace(/\/$/, ""); // Remove trailing slash
    }

    function genUrl(url, path, keepParams) {
      const urlObj = new URL(url);
      if (path) {
        if (hasLanguageMarketsSuffix(url)) {
          urlObj.pathname += stripPrefix(path);
        } else {
          urlObj.pathname = path;
        }
      }
      if (keepParams) {
        function removePreviewThemeId(search) {
          return search.replace(
            /([?&])preview_theme_id=\d+(&?)/,
            // @ts-ignore
            (match, p1, p2) => {
              return p1 === "?" && p2 ? "?" : p1;
            },
          );
        }
        const currentParams = removePreviewThemeId(window.location.search);
        urlObj.search = currentParams;
      }
      return urlObj;
    }

    function genRedirectFlag(src, alt) {
      if (!src || src === "-") return;
      const element = document.createElement("img");
      element.loading = "lazy";
      element.alt = alt;
      element.width = 50;
      element.height = 50;
      element.src = src;
      return element;
    }

    function genRedirectItem(
      layout,
      flagIcon,
      flagImg,
      label,
      url,
      isClose,
      rel,
    ) {
      if (!label || !url) return;

      if (layout === "dropdown") {
        const element = document.createElement("option");
        element.value = url;
        element.text = label;
        element.setAttribute("data-ngr-button", "");
        element.setAttribute("data-icon", flagIcon);
        if (isClose) element.setAttribute("data-isClose", "");
        return element;
      } else {
        const nodeLabel = document.createTextNode(label);
        const elementWrapper = document.createElement("li");
        elementWrapper.classList.add("ngr-redirects__item");
        const element = document.createElement("a");
        element.href = url;
        element.classList.add("ngr-redirects__link");
        element.setAttribute("data-ngr-button", "");
        if (flagImg) {
          element.appendChild(flagImg);
        }
        element.appendChild(nodeLabel);
        if (isClose) {
          element.setAttribute(isClose, "");
        }
        if (rel && rel !== "") {
          element.setAttribute("rel", rel);
        }
        elementWrapper.appendChild(element);
        return elementWrapper;
      }
    }

    function genRedirectWrapper(
      layout,
      placeholder,
      redirectButtons,
      redirectsSize,
    ) {
      if (layout === "dropdown") {
        const elementWrap = document.createElement("ngr-select");
        elementWrap.classList.add("ngr-select");
        elementWrap.setAttribute("data-placeholder", placeholder || "Select");

        const elementSelect = document.createElement("select");
        elementSelect.classList.add("ngr-redirects-select");

        if (placeholder && placeholder !== "") {
          const elementEmptyOption = document.createElement("option");
          elementEmptyOption.disabled = true;
          elementEmptyOption.hidden = true;
          elementEmptyOption.value = "reset";
          // elementEmptyOption.selected = true;
          elementEmptyOption.text = placeholder;
          elementSelect.appendChild(elementEmptyOption);
        }
        elementSelect.appendChild(redirectButtons);
        elementWrap.appendChild(elementSelect);
        return elementWrap;
      } else {
        const element = document.createElement("ul");
        element.classList.add("ngr-redirects");
        if (redirectsSize > 1) element.classList.add("ngr-redirects__single");
        element.appendChild(redirectButtons);
        return element;
      }
    }

    const redirectButtons = document.createDocumentFragment();

    for (let index = 0; index < redirects.length; index++) {
      const redirectItem = redirects[index];
      const hostname = window?.location?.hostname?.replace("www.", "");
      const pathname =
        window?.location?.pathname !== "/" ? window?.location?.pathname : "";

      const buttonsCustomCode = this.querySelector("[data-ngr-buttons-code]");
      if (buttonsCustomCode) {
        try {
          const redirectButton = {
            flag: redirectItem?.flag,
            label: redirectItem?.label,
            order_r: redirectItem?.order_r,
            url: redirectItem?.url,
          };
          // @ts-ignore
          const customCodeResult = showButtonsCustomCode(
            this.userGeoData,
            redirectButton,
          );
          if (!customCodeResult) continue;
        } catch (e) {
          console.warn("[NGR APP]: Buttons editor custom code error ", e);
        }
      } else {
        if (
          redirectItem &&
          redirectItem.conditional &&
          redirectItem.conditionalLocation !== "" &&
          redirectItem.conditionalLocation !== "null" &&
          redirectItem.conditionalLocation !== "false" &&
          userData
        ) {
          const parsedConditionalLocation = JSON.parse(
            redirectItem.conditionalLocation,
          );
          const locationIncludes =
            parsedConditionalLocation?.includes(userData.country) ||
            parsedConditionalLocation?.includes("C:" + userData.continent);
          if (!locationIncludes) continue;
        }
      }
      const pureUrl = getPurePath(redirectItem.url);
      const isClose = hostname === pureUrl ? "data-ngr-toggle" : "";
      const pagePath =
        this.domainRedirection || redirectItem?.domainRedirection
          ? pathname
          : false;
      const label = this.getLabel(redirectItem);
      const redirectItemImg = genRedirectFlag(redirectItem?.flag, label);
      const generatedButton = genRedirectItem(
        layout,
        redirectItem?.flag,
        redirectItemImg,
        label,
        genUrl(redirectItem?.url, pagePath, forward_url_params),
        isClose,
        rel,
      );

      if (generatedButton) redirectButtons.appendChild(generatedButton);
    }

    return genRedirectWrapper(
      layout,
      placeholder,
      redirectButtons,
      redirects.length,
    );
  }

  // buildMarketsElement(title, title_locales) {
  //   const marketsTemplate = document.getElementById("ngr-markets-template");
  //   if (!marketsTemplate) return null;
  //   const currentTitle = this.getTranslation(title, title_locales);
  //   const templateClone = marketsTemplate.content.cloneNode(true);
  //   templateClone.querySelector(".ngr-markets-submit").innerHTML =
  //     currentTitle || "Change your market";
  //   return templateClone;
  // }

  buildFlagElement(showFlag, countryCode) {
    if (
      !showFlag ||
      !countryCode ||
      countryCode === "" ||
      !this.flagSrc ||
      this.flagSrc === ""
    )
      return;
    const flagSrc = this.flagSrc.replace(
      /\b([a-z]+)\.svg/,
      `${countryCode.toLowerCase()}.svg`,
    );
    console.log("flagSrc", flagSrc);
    const elementWrapper = document.createElement("div");
    elementWrapper.classList.add("ngr-modal__flag");
    const element = document.createElement("img");
    element.loading = "lazy";
    element.alt = countryCode;
    element.width = 100;
    element.height = 50;
    element.src = flagSrc;
    elementWrapper.appendChild(element);
    return elementWrapper;
  }

  /**
   * Helper functions
   */
  async getCountriesJSON() {
    const ngrCountries = localStorage.getItem("ngr_countries");
    if (ngrCountries) {
      return JSON.parse(ngrCountries);
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

  getLabel(data) {
    if (!data) return "";
    return (data.locales && data.locales[this.lng]) || data.label;
  }

  getTranslation(text, locales) {
    if (!text) return "";
    return (locales && locales[this.lng]) || text || "";
  }

  displayWidget() {
    this.style.display = "initial";
  }

  openModal(modal) {
    const widgetModal = modal || this.modal;
    if (widgetModal) {
      widgetModal.setAttribute("data-open", "");
    }
  }

  closeModal(modal, showFrequency) {
    const widgetModal = modal || this.modal;
    if (widgetModal) {
      widgetModal.removeAttribute("data-open");
      this.setClosedCookieOrSession(showFrequency);
    }
  }

  setClosedCookieOrSession(showFrequency) {
    if (showFrequency && showFrequency === this.SHOW_RULES.session) {
      // @ts-ignore
      sessionStorage.setItem(this.VARS.CLOSED_KEY, 1);
    } else if (showFrequency && showFrequency === this.SHOW_RULES.cookie) {
      this.setCookie(this.VARS.CLOSED_KEY, 1, 7);
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

  stickyPosition(element, position = 50) {
    element.style.top = position + "%";
  }

  setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie =
      name + "=" + (encodeURIComponent(value) || "") + expires + "; path=/";
  }
  getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(
          cookie.substring(nameEQ.length, cookie.length),
        );
      }
    }
    return null;
  }
  deleteCookie(name) {
    document.cookie =
      name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  }
}

customElements.define("ngr-app", NGRAPP);

class NGRSelect extends HTMLElement {
  constructor() {
    super();
    this.currentOption = null;
    this.$selectedOption = null;
  }

  connectedCallback() {
    this.placeholder = this.getAttribute("data-placeholder");
    this.select = this.querySelector("select");
    // @ts-ignore
    this.options = Array.from(this.select.querySelectorAll("option"));
    this.selectedOption = this.options.find((option) => option.selected);
    this.setAttribute("tabindex", "0");
    this.renderSelect();
    this.addEventListener("click", this.onClick);
  }

  renderSelect() {
    // @ts-ignore
    this.select.setAttribute("hidden", true);
    const custom_select = document.createElement("ul");
    this.currentOption = document.createElement("div");
    this.currentOption.classList.add("ngr-select__label");

    // @ts-ignore
    this.currentOption.textContent = this.placeholder;
    // @ts-ignore
    this.options.forEach((option, i) => {
      const custom_select_option = document.createElement("li");
      const custom_select_option_link = document.createElement("a");
      const custom_select_option_link_text = document.createElement("span");
      const custom_select_flag = option?.getAttribute("data-icon");

      let custom_select_option_icon = null;
      if (custom_select_flag && custom_select_flag !== "") {
        custom_select_option_icon = document.createElement("img");
        custom_select_option_icon.setAttribute(
          "src",
          // @ts-ignore
          option.getAttribute("data-icon"),
        );
        // @ts-ignore
        custom_select_option_icon.setAttribute("alt", option.textContent);
        custom_select_option_icon.setAttribute("width", "50px");
        custom_select_option_icon.setAttribute("height", "50px");
        custom_select_option_icon.setAttribute("loading", "lazy");
      }

      custom_select_option_link_text.textContent = option.textContent;
      custom_select_option_link.setAttribute("href", option.value);
      custom_select_option_link.setAttribute("data-ngr-button", "");
      const pure_url = option.value
        .replace(/(^\w+:|^)\/\//, "")
        .replace(/[?#].*$/, "")
        .replace(/\/$/, "");

      if (window?.location?.hostname === pure_url) {
        custom_select_option_link.setAttribute("data-ngr-toggle", "");
      }
      // @ts-ignore
      custom_select_option.setAttribute("data-index", i);
      custom_select_option.setAttribute("tabindex", "0");
      if (custom_select_option_icon) {
        custom_select_option_link.appendChild(custom_select_option_icon);
      }
      custom_select_option_link.appendChild(custom_select_option_link_text);

      custom_select_option.appendChild(custom_select_option_link);
      // @ts-ignore
      if (option.disabled) custom_select_option.setAttribute("disabled", true);
      // @ts-ignore
      if (option.hidden) custom_select_option.setAttribute("hidden", true);

      if (option.selected) {
        this.$selectedOption = custom_select_option;
      }

      custom_select.appendChild(custom_select_option);
    });

    // @ts-ignore
    this.select.parentElement.append(this.currentOption, custom_select);
    this.toggleAttribute(
      "data-custom-select-selected",
      // @ts-ignore
      !this.select.value.includes("reset"),
    );
  }

  onClick(event) {
    this.toggleAttribute("open");
    const target = event.target;
    if (!target.hasAttribute("data-href")) return;
    this.$selectedOption = target;
    // @ts-ignore
    this.currentOption.innerHTML =
      this.$selectedOption.querySelector("a").innerHTML;

    // @ts-ignore
    this.select.selectedIndex = this.$selectedOption.getAttribute("data-index");
    // @ts-ignore
    this.select.dispatchEvent(new Event("change", { bubbles: true }));

    this.toggleAttribute(
      "data-custom-select-selected",
      // @ts-ignore
      !this.select.value.includes("reset"),
    );

    this.$selectedOption.querySelector("a").click();
  }
}
customElements.define("ngr-select", NGRSelect);
