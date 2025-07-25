"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.MarketsPopupPreview = void 0;
var react_1 = require("react");
var earth_americas_solid_svg_1 = require("../../assets/earth-americas-solid.svg");
var ca_svg_1 = require("../../assets/ca.svg");
var sticky_logo_png_1 = require("../../assets/sticky-logo.png");
var languages_json_1 = require("../../assets/languages.json");
var currencies_json_1 = require("../../assets/currencies.json");
var countries_data_json_1 = require("../../assets/countries-data.json");
require("../../assets/index-markets.scss");
require("../../assets/preview.scss");
var PreviewBannerNote_1 = require("../_common/PreviewBannerNote");
var polaris_1 = require("@shopify/polaris");
var _helpers_js_1 = require("../_helpers.js");
function MarketsPopupPreview(_a) {
    var _b;
    var marketsData = _a.marketsData, basicConfigs = _a.basicConfigs, advancedConfigs = _a.advancedConfigs, _c = _a.customCSSClass, customCSSClass = _c === void 0 ? "" : _c;
    var _d = react_1.useState(500), containerWidth = _d[0], setContainerWidth = _d[1];
    var containerRef = react_1.useRef(null);
    var outerRef = react_1.useRef(null);
    var _e = basicConfigs || {}, icon = _e.icon, title = _e.title, text = _e.text, showFlag = _e.showFlag, showLngSelector = _e.showLngSelector, showCountrySelector = _e.showCountrySelector, buttonText = _e.buttonText, buttonsBgColor = _e.buttonsBgColor, buttonsColor = _e.buttonsColor, font = _e.font, iconWidth = _e.iconWidth, modalBgColor = _e.modalBgColor, modalBorderColor = _e.modalBorderColor, modalTextColor = _e.modalTextColor, stickyHorizontalPosition = _e.stickyHorizontalPosition, stickyVerticalPosition = _e.stickyVerticalPosition, topbarSticky = _e.topbarSticky, stickyOpener = _e.stickyOpener, stickyToggleIcon = _e.stickyToggleIcon, type = _e.type, dropdownDefault = _e.dropdownDefault;
    var _f = advancedConfigs || {}, html_id = _f.html_id, css = _f.css, disable_basic_css = _f.disable_basic_css;
    var _g = react_1.useState([]), marketCountries = _g[0], setMarketCountries = _g[1];
    var _h = react_1.useState([]), markets = _h[0], setMarkets = _h[1];
    var _j = react_1.useState([]), marketsWebPresences = _j[0], setMarketsWebPresences = _j[1];
    var _k = react_1.useState(null), backupRegion = _k[0], setBackupRegion = _k[1];
    var _l = react_1.useState([]), dropdownCountries = _l[0], setDropdownCountries = _l[1];
    var _m = react_1.useState([]), dropdownLanguages = _m[0], setDropdownLanguages = _m[1];
    var _o = react_1.useState(null), selectedCountryId = _o[0], setSelectedCountryId = _o[1];
    var _p = react_1.useState(null), selectedLanguageId = _p[0], setSelectedLanguageId = _p[1];
    var _q = react_1.useState(null), primaryMarketId = _q[0], setPrimaryMarketId = _q[1];
    var _r = react_1.useState(null), selectedMarketId = _r[0], setSelectedMarketId = _r[1];
    var countrySelect = react_1.useRef(null);
    var languageSelect = react_1.useRef(null);
    var modalElement = react_1.useRef(null);
    react_1.useEffect(function () {
        var updateWidth = function () {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return function () { return window.removeEventListener("resize", updateWidth); };
    }, []);
    react_1.useMemo(function () {
        var _a, _b, _c, _d, _e, _f, _g;
        if (marketsData) {
            var parsedMarketsData = ((_a = marketsData === null || marketsData === void 0 ? void 0 : marketsData.data) === null || _a === void 0 ? void 0 : _a.markets) && _helpers_js_1.jsonSafeParse((_b = marketsData === null || marketsData === void 0 ? void 0 : marketsData.data) === null || _b === void 0 ? void 0 : _b.markets);
            if (!parsedMarketsData)
                return;
            var MarketRegionCountry = parsedMarketsData.MarketRegionCountry, Market = parsedMarketsData.Market, MarketWebPresence = parsedMarketsData.MarketWebPresence, BackupRegion_1 = parsedMarketsData.BackupRegion;
            if (!Market || !MarketRegionCountry)
                return;
            setMarketCountries(MarketRegionCountry);
            setMarkets(Market);
            setMarketsWebPresences(MarketWebPresence);
            setBackupRegion(BackupRegion_1);
            var sortedMarketCountries = MarketRegionCountry.sort(function (a, b) { return (a.name > b.name ? 1 : -1); });
            var sortedMarkets = Market;
            var availableMarkets = sortedMarkets === null || sortedMarkets === void 0 ? void 0 : sortedMarkets.filter(function (item) { return item.enabled || item.status === "ACTIVE"; });
            var availableMarketIds_1 = availableMarkets === null || availableMarkets === void 0 ? void 0 : availableMarkets.map(function (item) { return item.id; });
            var primaryMarketId_1 = (MarketWebPresence === null || MarketWebPresence === void 0 ? void 0 : MarketWebPresence.length) ? (_c = MarketRegionCountry === null || MarketRegionCountry === void 0 ? void 0 : MarketRegionCountry.find(function (item) { return item.id === (BackupRegion_1 === null || BackupRegion_1 === void 0 ? void 0 : BackupRegion_1.id); })) === null || _c === void 0 ? void 0 : _c.__parentId : (_d = sortedMarketCountries === null || sortedMarketCountries === void 0 ? void 0 : sortedMarketCountries.find(function (item) { return item.primary; })) === null || _d === void 0 ? void 0 : _d.__parentId;
            setPrimaryMarketId(primaryMarketId_1);
            var marketCountriesList = sortedMarketCountries.map(function (item) {
                var _a, _b;
                if (!availableMarketIds_1.includes(item.__parentId))
                    return;
                var nativeCountryName = ((_a = countries_data_json_1["default"][item.code]) === null || _a === void 0 ? void 0 : _a.native) || "";
                var currencySymbol = (_b = currencies_json_1["default"][item.currency.currencyCode]) === null || _b === void 0 ? void 0 : _b.symbol_native;
                return __assign(__assign({}, item), { nativeName: nativeCountryName, currency: __assign(__assign({}, item.currency), { currencyCode: item.currency.currencyCode, symbolNative: currencySymbol }) });
            });
            setDropdownCountries(marketCountriesList);
            setSelectedCountryId((_e = sortedMarketCountries[0]) === null || _e === void 0 ? void 0 : _e.id);
            setSelectedMarketId((_f = sortedMarketCountries[0]) === null || _f === void 0 ? void 0 : _f.__parentId);
            var allLanguages = processLanguages(MarketWebPresence, Market, primaryMarketId_1);
            setDropdownLanguages(allLanguages);
            setSelectedLanguageId((_g = allLanguages[0]) === null || _g === void 0 ? void 0 : _g.locale);
        }
    }, [marketsData]);
    function handleCountryChange(selectedCountryElement) {
        var _a, _b, _c;
        var selectedOption = (_a = selectedCountryElement === null || selectedCountryElement === void 0 ? void 0 : selectedCountryElement.target) === null || _a === void 0 ? void 0 : _a.options[(_b = selectedCountryElement === null || selectedCountryElement === void 0 ? void 0 : selectedCountryElement.target) === null || _b === void 0 ? void 0 : _b.selectedIndex];
        var selectedMarketId = selectedOption === null || selectedOption === void 0 ? void 0 : selectedOption.getAttribute("data-market");
        if (!selectedMarketId)
            return;
        var allLanguages = processLanguages(marketsWebPresences, markets, selectedMarketId);
        setDropdownLanguages(allLanguages);
        setSelectedLanguageId((_c = allLanguages[0]) === null || _c === void 0 ? void 0 : _c.locale);
    }
    function processLanguages(marketsWebPresences, markets, selectedMarketId) {
        var _a, _b, _c;
        var allWebPresences = [];
        if (marketsWebPresences === null || marketsWebPresences === void 0 ? void 0 : marketsWebPresences.length) {
            var findWebPresence = marketsWebPresences.find(function (item) { return item.__parentId === selectedMarketId || item.__parentId === primaryMarketId; });
            (_a = findWebPresence === null || findWebPresence === void 0 ? void 0 : findWebPresence.rootUrls) === null || _a === void 0 ? void 0 : _a.forEach(function (rootUrl) {
                return allWebPresences.push(__assign(__assign({}, rootUrl), { marketId: selectedMarketId }));
            });
        }
        else {
            // This is old API  
            var selectedMarket_1 = markets.find(function (item) { return item.id === selectedMarketId; });
            if (selectedMarket_1 === null || selectedMarket_1 === void 0 ? void 0 : selectedMarket_1.webPresence) {
                (_b = selectedMarket_1 === null || selectedMarket_1 === void 0 ? void 0 : selectedMarket_1.webPresence) === null || _b === void 0 ? void 0 : _b.rootUrls.forEach(function (rootUrl) {
                    return allWebPresences.push(__assign(__assign({}, rootUrl), { marketId: selectedMarket_1.id }));
                });
            }
            else {
                var primaryMarket_1 = markets.find(function (item) { return item.primary; });
                (_c = primaryMarket_1 === null || primaryMarket_1 === void 0 ? void 0 : primaryMarket_1.webPresence) === null || _c === void 0 ? void 0 : _c.rootUrls.forEach(function (rootUrl) {
                    return allWebPresences.push(__assign(__assign({}, rootUrl), { marketId: primaryMarket_1.id }));
                });
            }
        }
        var allLanguages = allWebPresences.map(function (item) {
            var lngObj = languages_json_1["default"][item.locale];
            var lngName = (lngObj === null || lngObj === void 0 ? void 0 : lngObj.name) !== (lngObj === null || lngObj === void 0 ? void 0 : lngObj.native)
                ? (lngObj === null || lngObj === void 0 ? void 0 : lngObj.name) + " / " + (lngObj === null || lngObj === void 0 ? void 0 : lngObj.native)
                : lngObj === null || lngObj === void 0 ? void 0 : lngObj.name;
            return __assign(__assign({}, item), { lngName: lngName });
        });
        return allLanguages;
    }
    function handleStickyClose() {
        if (!modalElement.current)
            return;
        if (modalElement.current.hasAttribute("data-open")) {
            modalElement.current.removeAttribute("data-open");
        }
        else {
            modalElement.current.setAttribute("data-open", "");
        }
    }
    function SubmitButton() {
        return (react_1["default"].createElement("button", { className: "ngr-markets-modal__button-main", type: "submit", "data-ngr-markets-button": "" }, buttonText));
    }
    ;
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(PreviewBannerNote_1["default"], { type: "markets" }),
        !((_b = marketsData === null || marketsData === void 0 ? void 0 : marketsData.data) === null || _b === void 0 ? void 0 : _b.markets) && (react_1["default"].createElement(polaris_1.Banner, { tone: "warning" },
            react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Please sync Markets in Popup controls section above."))),
        react_1["default"].createElement("div", { ref: containerRef, className: "ngr-preview-container " + customCSSClass, style: { "--c-width": "" + containerWidth } },
            react_1["default"].createElement("div", { id: "ngr-modal-preview", ref: outerRef, style: { top: "4px" } },
                !disable_basic_css && (react_1["default"].createElement("style", { dangerouslySetInnerHTML: {
                        __html: "\n                .ngr-markets-modal{\n                  " + (font && font != "" && font !== "inherit" && font !== "undefined"
                            ? "font-family:'" + font + "', sans-serif;"
                            : "") + "\n                }\n                .ngr-markets-modal__content{\n                  " + (modalBgColor != "" ? "background-color:" + modalBgColor + ";" : "") + "\n                  " + (modalTextColor != "" ? "color:" + modalTextColor + ";" : "") + "\n                  " + (modalBorderColor != ""
                            ? "border-color:" + modalBorderColor + ";"
                            : "") + "\n                }\n                " + (modalBgColor != "" &&
                            ".ngr-markets-modal__close{ background-color:" +
                                modalBgColor +
                                " !important;}") + "\n                .ngr-markets-modal__form-content .select select{\n                  " + (font && font != "" && font !== "inherit" && font !== "undefined"
                            ? "font-family:'" + font + "', sans-serif;"
                            : "") + "\n                }\n                .ngr-markets-modal__button-main{\n                    " + (buttonsBgColor != ""
                            ? "background-color:" + buttonsBgColor + ";"
                            : "") + "\n                    " + (buttonsColor != "" ? "border-color:" + buttonsColor + ";" : "") + "\n                    " + (buttonsColor != "" ? "color:" + buttonsColor + ";" : "") + "\n                    " + (font != "" ? "font-family:'" + font + "', sans-serif;" : "") + "\n                }\n                .ngr-markets-modal__button-main:hover{\n                    " + (buttonsColor != "" ? "background-color:" + buttonsColor + ";" : "") + "\n                    " + (buttonsBgColor != "" ? "border-color:" + buttonsBgColor + ";" : "") + "\n                    " + (buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : "") + "\n                }"
                    } })),
                css && (react_1["default"].createElement("style", { dangerouslySetInnerHTML: {
                        __html: css
                    } })),
                react_1["default"].createElement("div", { className: "ngr-markets-modal " + (type === "topbar" ? "top-bar" : "") + " " + (type === "sticky" ? "sticky-bar transition" : ""), ref: modalElement, "data-ngr-markets-modal": true, "data-open": true, id: html_id },
                    react_1["default"].createElement("div", { className: "ngr-markets-modal__content" },
                        react_1["default"].createElement("button", { className: "ngr-markets-modal__close", type: "button", "aria-label": "Close", "data-ngr-markets-close": "", onClick: (type === "sticky" && handleStickyClose) || undefined }, type === "sticky" ? (react_1["default"].createElement("img", { loading: "lazy", alt: "Geo location toggler", width: "100", height: "100", src: stickyOpener === "custom"
                                ? stickyToggleIcon === "default"
                                    ? sticky_logo_png_1["default"]
                                    : stickyToggleIcon
                                : ca_svg_1["default"] })) : ("✕")),
                        react_1["default"].createElement("div", { id: "localization_form", className: "shopify-localization-form" },
                            react_1["default"].createElement("div", { "data-ngr-markets-content": "" },
                                icon && (react_1["default"].createElement("div", { className: "ngr-markets-modal__icon" },
                                    react_1["default"].createElement("img", { loading: "lazy", alt: "Redirects Icon", width: iconWidth || 50, height: "100", src: icon === "default" ? earth_americas_solid_svg_1["default"] : icon }))),
                                title && (react_1["default"].createElement("h2", { className: "ngr-markets-modal__title" }, title)),
                                text && text !== "<p><br></p>" && (react_1["default"].createElement("div", { className: "ngr-markets-modal__text" }, react_1["default"].createElement("div", { dangerouslySetInnerHTML: {
                                        __html: text
                                    } }))),
                                showFlag && (react_1["default"].createElement("div", { className: "ngr-markets-modal__flag" },
                                    react_1["default"].createElement("img", { loading: "lazy", alt: "CA", width: "100", height: "50", src: ca_svg_1["default"] }))),
                                react_1["default"].createElement("div", { className: "ngr-markets-modal__form-content" },
                                    showCountrySelector && (dropdownCountries === null || dropdownCountries === void 0 ? void 0 : dropdownCountries.length) > 0 && (react_1["default"].createElement("div", { className: "select" },
                                        react_1["default"].createElement("select", { name: "country_code", ref: countrySelect, onChange: handleCountryChange }, dropdownCountries === null || dropdownCountries === void 0 ? void 0 : dropdownCountries.map(function (item) { return (react_1["default"].createElement("option", { key: item.code, value: item.code, "data-market": item.__parentId }, (item === null || item === void 0 ? void 0 : item.nativeName) !== (item === null || item === void 0 ? void 0 : item.name)
                                            ? item.name +
                                                " / " + (item === null || item === void 0 ? void 0 : item.nativeName) +
                                                (" (" + item.currency.currencyCode + " " + item.currency.symbolNative + ")")
                                            : item.name +
                                                (" (" + item.currency.currencyCode + " " + item.currency.symbolNative + ")"))); })))),
                                    showLngSelector && (dropdownLanguages === null || dropdownLanguages === void 0 ? void 0 : dropdownLanguages.length) > 0 && (react_1["default"].createElement("div", { className: "select" },
                                        react_1["default"].createElement("select", { name: "language_code", ref: languageSelect }, dropdownLanguages === null || dropdownLanguages === void 0 ? void 0 : dropdownLanguages.map(function (item, index) { return (react_1["default"].createElement("option", { key: (item === null || item === void 0 ? void 0 : item.locale) + index, value: item === null || item === void 0 ? void 0 : item.locale, "data-market": item === null || item === void 0 ? void 0 : item.marketId }, item === null || item === void 0 ? void 0 : item.lngName)); })))),
                                    type === "topbar" && react_1["default"].createElement(SubmitButton, null))),
                            type !== "topbar" && react_1["default"].createElement(SubmitButton, null))))))));
}
exports.MarketsPopupPreview = MarketsPopupPreview;
// function generateCountries() {
//   if (!marketCountries) return;
//   const availableMarkets = markets?.filter((item: any) => item.enabled || item.status === "ACTIVE");
//   const availableMarketIds = availableMarkets?.map((item) => item.id);
//   return marketCountries.map((countryObj: any) => {
//     if (!availableMarketIds.includes(countryObj.__parentId)) return;
//     const nativeCountryName = countriesJson[countryObj.code as keyof typeof countriesJson]?.native || "";
//     const currencySymbol =
//       currenciesJson[countryObj.currency.currencyCode as keyof typeof currenciesJson]?.symbol_native;
//     return (
//       <option
//         key={countryObj.code}
//         value={countryObj.code}
//         data-market={countryObj.__parentId}
//       >
//         {getPureId(countryObj.__parentId)} - {nativeCountryName !== countryObj.name
//           ? countryObj.name +
//           " / " +
//           nativeCountryName +
//           ` (${countryObj.currency.currencyCode} ${currencySymbol})`
//           : countryObj.name +
//           ` (${countryObj.currency.currencyCode} ${currencySymbol})`}
//       </option>
//     );
//   });
// }
// function generateLanguages() {
//   if (!markets) return;
//   const allWebPresences: any[] = [];
//   //const availableMarkets = markets?.filter((item: any) => item.enabled || item.status === "ACTIVE");
//   const primaryMarketId = marketsWebPresences?.length ? marketCountries?.find((item: any) => item.id === backupRegion?.id)?.__parentId : marketCountries?.find((item: any) => item.primary)?.__parentId;;
//   const selectedMarketId = marketCountries[0]?.__parentId; // select first country by default
//   const finalMarketId = selectedMarketId || primaryMarketId;
//   // This is new API
//   if (marketsWebPresences?.length) {
//     const findWebPresence = marketsWebPresences.find((item: any) => item.__parentId === finalMarketId);
//     findWebPresence?.rootUrls?.forEach((rootUrl: any) =>
//       allWebPresences.push({ ...rootUrl, marketId: finalMarketId })
//     );
//   } else {
//     // This is old API
//     const primaryMarket = markets.find((item: any) => item.primary);
//     const findMarket = markets.find((item: any) => item.id === finalMarketId);
//     if (findMarket?.webPresence) {
//       findMarket?.webPresence?.rootUrls.forEach((rootUrl: any) =>
//         allWebPresences.push({ ...rootUrl, marketId: findMarket.id })
//       );
//     } else {
//       primaryMarket?.webPresence?.rootUrls.forEach((rootUrl: any) =>
//         allWebPresences.push({ ...rootUrl, marketId: primaryMarket.id })
//       );
//     }
//   }
//   return allWebPresences?.map((item, index) => {
//     const lngObj = languagesJson[item.locale as keyof typeof languagesJson];
//     const lngName =
//       lngObj?.name !== lngObj?.native
//         ? lngObj?.name + " / " + lngObj?.native
//         : lngObj?.name;
//     return (
//       <option
//         // style={{ display: item?.marketId !== primaryMarketId? "none" : "initial" }}
//         key={item?.locale + index}
//         value={item?.locale}
//         data-market={item?.marketId}
//         data-disabled={item?.marketId !== primaryMarketId ? "0" : "1"}
//       >
//         {getPureId(item?.marketId)} - {lngName}
//       </option>
//     );
//   });
// }
// useMemo(() => {
//   if (marketsWebPresences?.length) {
//     setDropdownCountries(marketsWebPresences);
//   } else {
//     setDropdownCountries(markets);
//   }
// }, [marketsWebPresences, markets]);
// useMemo(() => {
//   setTimeout(() => {
//     if (languageSelect?.current) {
//       const selectElementLng = languageSelect.current as HTMLSelectElement;
//       if (!selectElementLng) return;
//       const firstAvaiableOption = Array.from(selectElementLng.options).find(
//         (option) => option.getAttribute("data-disabled") === "1"
//       );
//       selectElementLng.value = firstAvaiableOption?.value || selectElementLng.options[0].value;
//     }
//   }, 500);
// }, [languageSelect]);
// function handleCountryChange() {
//   if (!countrySelect.current || !languageSelect.current) return;
//   const selectElementMarket = countrySelect.current;
//   const selectElementLng = languageSelect.current;
//   if (!selectElementLng) return;
//   const selectedOption =
//     selectElementMarket.options[selectElementMarket.selectedIndex];
//   const selectedMarketId = selectedOption.getAttribute("data-market");
//   languageSelect.current.innerHTML = '';
//   if (marketsWebPresences?.length) {
//     const primaryMarketId = marketCountries?.find((item: any) => item.id === backupRegion?.id)?.__parentId;
//     const findWebPresence = marketsWebPresences.find((item: any) => item.__parentId === selectedMarketId || item.__parentId === primaryMarketId);
//     if (languageSelect.current) {
//       findWebPresence?.rootUrls?.forEach((rootUrl: any) => {
//         const lngObj = languagesJson[rootUrl.locale as keyof typeof languagesJson];
//         const lngName = lngObj?.name !== lngObj?.native
//           ? lngObj?.name + " / " + lngObj?.native
//           : lngObj?.name;
//         const option = document.createElement('option');
//         option.value = rootUrl.locale;
//         option.setAttribute('data-market', primaryMarketId);
//         option.setAttribute('data-disabled', '1');
//         option.textContent = `!${getPureId(primaryMarketId)} - ${lngName}`;
//         languageSelect.current?.appendChild(option);
//       });
//     }
//   } else {
//     const primaryMarket = markets.find((item: any) => item.primary);
//     const findMarket = markets.find((item: any) => item.id === selectedMarketId);
//     if (findMarket?.webPresence) {
//       findMarket?.webPresence?.rootUrls.forEach((rootUrl: any) => {
//         const lngObj = languagesJson[rootUrl.locale as keyof typeof languagesJson];
//         const lngName = lngObj?.name !== lngObj?.native
//           ? lngObj?.name + " / " + lngObj?.native
//           : lngObj?.name;
//         const option = document.createElement('option');
//         option.value = rootUrl.locale;
//         option.setAttribute('data-market', selectedMarketId || "");
//         option.setAttribute('data-disabled', '1');
//         option.textContent = `!${getPureId(selectedMarketId)} - ${lngName}`;
//         languageSelect.current?.appendChild(option);
//       });
//     } else {
//       primaryMarket?.webPresence?.rootUrls.forEach((rootUrl: any) => {
//         const lngObj = languagesJson[rootUrl.locale as keyof typeof languagesJson];
//         const lngName = lngObj?.name !== lngObj?.native
//           ? lngObj?.name + " / " + lngObj?.native
//           : lngObj?.name;
//         const option = document.createElement('option');
//         option.value = rootUrl.locale;
//         option.setAttribute('data-market', selectedMarketId || "");
//         option.setAttribute('data-disabled', '1');
//         option.textContent = `!${getPureId(selectedMarketId)} - ${lngName}`;
//         languageSelect.current?.appendChild(option);
//       });
//     }
//   }
// };
