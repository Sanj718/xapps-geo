"use strict";
exports.__esModule = true;
var react_1 = require("react");
var PreviewBannerNote_1 = require("../_common/PreviewBannerNote");
var polaris_1 = require("@shopify/polaris");
var earth_americas_solid_svg_1 = require("../../assets/earth-americas-solid.svg");
var ca_svg_1 = require("../../assets/ca.svg");
var sticky_logo_png_1 = require("../../assets/sticky-logo.png");
require("../../assets/index.scss");
require("../../assets/preview.scss");
var _helpers_1 = require("../_helpers");
function RedirectsPopupPreview(_a) {
    var redirects = _a.redirects, basicConfigs = _a.basicConfigs, advancedConfigs = _a.advancedConfigs, _b = _a.customCSSClass, customCSSClass = _b === void 0 ? "" : _b;
    var _c = react_1.useState(500), containerWidth = _c[0], setContainerWidth = _c[1];
    var containerRef = react_1.useRef(null);
    var outerRef = react_1.useRef(null);
    var _d = basicConfigs || {}, icon = _d.icon, title = _d.title, text = _d.text, showFlag = _d.showFlag, showLngSelector = _d.showLngSelector, showCountrySelector = _d.showCountrySelector, buttonText = _d.buttonText, buttonsBgColor = _d.buttonsBgColor, buttonsColor = _d.buttonsColor, font = _d.font, iconWidth = _d.iconWidth, modalBgColor = _d.modalBgColor, modalBorderColor = _d.modalBorderColor, modalTextColor = _d.modalTextColor, stickyHorizontalPosition = _d.stickyHorizontalPosition, stickyVerticalPosition = _d.stickyVerticalPosition, topbarSticky = _d.topbarSticky, stickyOpener = _d.stickyOpener, stickyToggleIcon = _d.stickyToggleIcon, type = _d.type, layout = _d.layout, dropdownDefault = _d.dropdownDefault, dropdownPlaceholder = _d.dropdownPlaceholder;
    var _e = advancedConfigs || {}, html_id = _e.html_id, css = _e.css, disable_basic_css = _e.disable_basic_css;
    var _f = react_1.useState(false), dropdownOpen = _f[0], setDropdownOpen = _f[1];
    var modalElement = react_1.useRef(null);
    var handleStickyClose = react_1.useCallback(function () {
        var modalEl = modalElement.current;
        if (modalEl) {
            if (modalEl.hasAttribute("data-open")) {
                modalEl.removeAttribute("data-open");
            }
            else {
                modalEl.setAttribute("data-open", "");
            }
        }
    }, [modalElement]);
    var handleDropdown = react_1.useCallback(function () {
        setDropdownOpen(!dropdownOpen);
    }, [dropdownOpen]);
    react_1.useEffect(function () {
        var updateWidth = function () {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.offsetWidth);
            }
        };
        setTimeout(function () { updateWidth(); }, 500);
        window.addEventListener("resize", updateWidth);
        return function () { return window.removeEventListener("resize", updateWidth); };
    }, []);
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(PreviewBannerNote_1["default"], null),
        !(redirects === null || redirects === void 0 ? void 0 : redirects.length) && (react_1["default"].createElement(polaris_1.Banner, { tone: "warning" },
            react_1["default"].createElement(polaris_1.Text, { as: "p" }, "Please add redirect button in Redirect buttons section above."))),
        react_1["default"].createElement("div", { ref: containerRef, className: "ngr-preview-container " + customCSSClass, style: { "--c-width": "" + containerWidth } },
            react_1["default"].createElement("div", { id: "ngr-modal-preview", ref: outerRef },
                !disable_basic_css && (react_1["default"].createElement("style", { dangerouslySetInnerHTML: {
                        __html: "\n                .ngr-modal{\n                  " + (font && font != "" && font !== "inherit"
                            ? "font-family:'" + font + "', sans-serif;"
                            : "") + "\n                }\n                .ngr-modal__content{\n                  " + (modalBgColor != ""
                            ? "background-color:" + modalBgColor + ";"
                            : "") + "\n                  " + (modalTextColor != "" ? "color:" + modalTextColor + ";" : "") + "\n                  " + (modalBorderColor != ""
                            ? "border-color:" + modalBorderColor + ";"
                            : "") + "\n                }\n                .ngr-modal__close{\n                  " + (modalBgColor != ""
                            ? "background-color:" + modalBgColor + " !important;"
                            : "") + "\n                  " + (modalTextColor != "" ? "color:" + modalTextColor + ";" : "") + "\n                }\n                .ngr-redirects__link{\n                    " + (buttonsBgColor != ""
                            ? "background-color:" + buttonsBgColor + ";"
                            : "") + "\n                    " + (buttonsColor != "" ? "border-color:" + buttonsColor + ";" : "") + "\n                    " + (buttonsColor != "" ? "color:" + buttonsColor + ";" : "") + "\n                }\n                .ngr-redirects__link:hover{\n                    " + (buttonsColor != ""
                            ? "background-color:" + buttonsColor + ";"
                            : "") + "\n                    " + (buttonsBgColor != ""
                            ? "border-color:" + buttonsBgColor + ";"
                            : "") + "\n                    " + (buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : "") + "\n                }\n                .ngr-modal__content .ngr-select{\n                  " + (buttonsBgColor != "" ? "background-color:" + buttonsBgColor + ";" : "") + " \n                }\n                .ngr-modal__content .ngr-select__label{\n                  " + (buttonsColor != "" ? "color:" + buttonsColor + ";" : "") + "\n                  " + (buttonsColor != "" ? "border-color:" + buttonsColor + ";" : "") + "\n                }\n                .ngr-select::before{\n                  " + (buttonsColor != "" ? "background-color:" + buttonsColor + ";" : "") + "\n                }\n                "
                    } })),
                css && (react_1["default"].createElement("style", { dangerouslySetInnerHTML: {
                        __html: css
                    } })),
                react_1["default"].createElement("div", { className: "ngr-modal " + (type === "topbar" ? "top-bar" : "") + " " + (type === "sticky" ? "sticky-bar transition" : ""), ref: modalElement, "data-ngr-modal": true, "data-open": true, id: html_id },
                    react_1["default"].createElement("div", { className: "ngr-modal__content " + layout },
                        react_1["default"].createElement("button", { className: "ngr-modal__close", type: "button", "aria-label": "Close", "data-ngr-close": "", onClick: (type === "sticky" && handleStickyClose) || undefined }, type === "sticky" ? (react_1["default"].createElement("img", { loading: "lazy", alt: "Geo location toggler", width: "100", height: "100", src: stickyOpener === "custom"
                                ? stickyToggleIcon === "default"
                                    ? sticky_logo_png_1["default"]
                                    : stickyToggleIcon
                                : ca_svg_1["default"] })) : ("✕")),
                        icon && (react_1["default"].createElement("div", { className: "ngr-modal__icon" },
                            react_1["default"].createElement("img", { loading: "lazy", alt: "Redirects Icon", width: iconWidth || 50, height: "100", src: icon === "default" || icon === _helpers_1.OLD_DEFAULT_ICON
                                    ? earth_americas_solid_svg_1["default"]
                                    : icon }))),
                        title && react_1["default"].createElement("h2", { className: "ngr-modal__title" }, title),
                        text && text !== "<p><br></p>" && (react_1["default"].createElement("div", { className: "ngr-modal__text" }, react_1["default"].createElement("div", { dangerouslySetInnerHTML: {
                                __html: text
                            } }))),
                        showFlag && (react_1["default"].createElement("div", { className: "ngr-modal__flag" },
                            react_1["default"].createElement("img", { loading: "lazy", alt: "CA", width: "100", height: "50", src: ca_svg_1["default"] }))),
                        (redirects === null || redirects === void 0 ? void 0 : redirects.length) ? (react_1["default"].createElement("div", { "data-ngr-redirects": true }, layout === "dropdown" ? (react_1["default"].createElement("div", { className: "ngr-select", "data-open": dropdownOpen, onClick: handleDropdown },
                            react_1["default"].createElement("div", { className: "ngr-select__label" }, dropdownPlaceholder || "Select"),
                            react_1["default"].createElement("ul", null, redirects.map(function (item) {
                                if (!(item === null || item === void 0 ? void 0 : item.status))
                                    return;
                                return (react_1["default"].createElement("li", null,
                                    react_1["default"].createElement("a", { href: "#" },
                                        (item === null || item === void 0 ? void 0 : item.flag) !== "" && (react_1["default"].createElement("img", { src: item.flag, alt: "Select", width: "50px", height: "50px", loading: "lazy" })),
                                        react_1["default"].createElement("span", null, item.label))));
                            })))) : (react_1["default"].createElement("ul", { className: "ngr-redirects ngr-redirects__single" }, redirects.map(function (item) {
                            if (!(item === null || item === void 0 ? void 0 : item.status))
                                return;
                            return (react_1["default"].createElement("li", { className: "ngr-redirects__item", key: item.id },
                                react_1["default"].createElement("a", { href: "#", className: "ngr-redirects__link" },
                                    (item === null || item === void 0 ? void 0 : item.flag) !== "" && (react_1["default"].createElement("img", { loading: "lazy", alt: "country flag", width: "50", height: "50", src: item.flag })),
                                    item.label)));
                        }))))) : ("")))))));
}
exports["default"] = RedirectsPopupPreview;
