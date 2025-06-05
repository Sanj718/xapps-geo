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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.verifyWebhookRequest = exports.safeCompare = exports.areObjectsEqual = exports.useIsMounted = exports.defaultAutoRedirectsCode = exports.defaultButtonCode = exports.defaultWidgetCode = exports.NEW_DEFAULT_ICON = exports.OLD_STICKY_ICON = exports.OLD_DEFAULT_ICON = exports.jsonSafeParse = exports.loadingStates = exports.getDate = exports.formatDate = exports.isDateToday = exports.defaultState = exports.getPostgresTimestamp = exports.checkDifference = exports.ff = exports.getEmbedConst = exports.getTotals = exports.planParser = exports.getPureId = exports.isJson = exports.getKeyByValue = exports.charLimit = exports.continents_markets = exports.continents_auto = exports.regeUrl = exports.parseCountryCodesWithFullNames = exports.parseLocations = exports.parseCountries = exports.hexToRGB = exports.default_allowed_configs = exports.default_advanced_configs = exports.default_basic_configs = exports.default_markets_basic_configs = exports.requestHeaders = exports.resp = void 0;
var strip_json_comments_1 = require("strip-json-comments");
var date_fns_1 = require("date-fns");
var react_1 = require("react");
function resp(status, data, errors) {
    var errorsToString = errors && JSON.stringify(errors);
    return {
        status: status,
        data: data,
        errors: errors
    };
}
exports.resp = resp;
exports.requestHeaders = {
    replace: true,
    method: "post",
    encType: "application/json"
};
exports.default_markets_basic_configs = {
    showRules: "autoGeo",
    showFrequency: "session",
    modalBgColor: "#fff",
    modalTextColor: "#000",
    modalBorderColor: "#fff",
    buttonsBgColor: "#000",
    buttonsColor: "#fff",
    icon: "default",
    iconWidth: "50",
    title: "Choose Your Destination",
    title_locales: undefined,
    text: "",
    text_locales: undefined,
    buttonText: "Shop now",
    buttonText_locales: undefined,
    type: "popup",
    topbarSticky: false,
    // stickyHorizontalPosition: "left",
    stickyOpener: "custom",
    stickyToggleIcon: "default",
    stickyVerticalPosition: 50,
    showLngSelector: true,
    showCountrySelector: true,
    dropdownDefault: "geo",
    showFlag: false
};
exports.default_basic_configs = {
    automaticShow: true,
    location: "continent",
    continents: ["NA"],
    countries: [],
    geo: true,
    showFlag: false,
    reverseGeo: false,
    domain_redirection: false,
    show: "session",
    modalBgColor: "#fff",
    modalTextColor: "#000",
    modalBorderColor: "#fff",
    buttonsBgColor: "#fff",
    buttonsColor: "#000",
    layout: "grid",
    icon: "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg",
    iconWidth: "50",
    title: "Choose Your Destination",
    title_locales: undefined,
    text: "",
    text_locales: undefined,
    type: "popup",
    topbarLayout: "grid",
    topbarSticky: false,
    stickyVerticalPosition: 50,
    stickyToggleIcon: "default"
};
exports.default_advanced_configs = {
    disable_basic_css: false,
    css: "",
    html_id: ""
};
exports.default_allowed_configs = {
    allowed_pages: ["all"],
    hide_on_allowed_pages: false
};
function hexToRGB(h) {
    var r = 0, g = 0, b = 0;
    // 3 digits
    if (h.length == 4) {
        r = "0x" + h[1] + h[1];
        g = "0x" + h[2] + h[2];
        b = "0x" + h[3] + h[3];
        // 6 digits
    }
    else if (h.length == 7) {
        r = "0x" + h[1] + h[2];
        g = "0x" + h[3] + h[4];
        b = "0x" + h[5] + h[6];
    }
    return {
        red: r,
        blue: b,
        green: g
    };
    // return "rgb(" + +r + "," + +g + "," + +b + ")";
}
exports.hexToRGB = hexToRGB;
function parseCountries(data) {
    return data.map(function (country) { return ({
        label: country.emoji + " " + country.code,
        value: country.image,
        country_name: country.name
    }); });
}
exports.parseCountries = parseCountries;
function parseLocations(data, countriesList) {
    if (!data)
        return;
    var parsedJson = data;
    var locations = "";
    var _loop_1 = function (index) {
        var item = parsedJson[index];
        if (item.includes("C:")) {
            var getContinentLabel = exports.continents_auto.find(function (cnt) { return cnt.value === item; });
            if (getContinentLabel) {
                locations += getContinentLabel.label + ", ";
            }
        }
        else {
            var getCountryLabel = countriesList === null || countriesList === void 0 ? void 0 : countriesList.find(function (cnt) { return cnt.code === item; });
            if (getCountryLabel) {
                locations += getCountryLabel.name + ", ";
            }
        }
    };
    for (var index = 0; index < parsedJson.length; index++) {
        _loop_1(index);
    }
    return locations.replace(/,\s*$/, "");
}
exports.parseLocations = parseLocations;
function parseCountryCodesWithFullNames(data) {
    return data.map(function (country) { return ({
        label: country.name,
        value: country.code
    }); });
}
exports.parseCountryCodesWithFullNames = parseCountryCodesWithFullNames;
exports.regeUrl = /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
exports.continents_auto = [
    { value: "C:AF", label: "Africa" },
    { value: "C:AN", label: "Antarctica" },
    { value: "C:AS", label: "Asia" },
    { value: "C:EU", label: "Europe" },
    { value: "C:NA", label: "North america" },
    { value: "C:OC", label: "Oceania" },
    { value: "C:SA", label: "South america" },
];
exports.continents_markets = [
    { value: "AF", label: "Africa" },
    { value: "AN", label: "Antarctica" },
    { value: "AS", label: "Asia" },
    { value: "EU", label: "Europe" },
    { value: "NA", label: "North america" },
    { value: "OC", label: "Oceania" },
    { value: "SA", label: "South america" },
];
function charLimit(input, limit) {
    if (!input || input === "")
        return;
    if (input.length > limit) {
        return input.slice(0, limit) + "...";
    }
    return input;
}
exports.charLimit = charLimit;
function getKeyByValue(object, value) {
    return Object.keys(object).find(function (key) { return object[key].includes(value); });
}
exports.getKeyByValue = getKeyByValue;
function isJson(item) {
    var itemStr = typeof item !== "string" ? JSON.stringify(item) : item;
    try {
        var parsed = JSON.parse(itemStr);
        return typeof parsed === "object" && parsed !== null;
    }
    catch (e) {
        return false;
    }
}
exports.isJson = isJson;
function getPureId(data) {
    if (!data)
        return null;
    return data.replace(/[^0-9\.]+/g, "");
}
exports.getPureId = getPureId;
function planParser(activePlan) {
    var isProPlan = activePlan && (activePlan === null || activePlan === void 0 ? void 0 : activePlan.name) === "Pro plan";
    var isBasicPlan = activePlan && (activePlan === null || activePlan === void 0 ? void 0 : activePlan.name) === "Basic plan";
    var isFreePlan = !isProPlan && !isBasicPlan;
    return {
        isProPlan: isProPlan,
        isBasicPlan: isBasicPlan,
        isFreePlan: isFreePlan
    };
}
exports.planParser = planParser;
function getTotals(rawData) {
    var _a;
    if (!rawData)
        return;
    var getAsString = rawData.includes(",") ? rawData : "";
    var stringDatesToDateArray = (_a = getAsString === null || getAsString === void 0 ? void 0 : getAsString.split(",")) === null || _a === void 0 ? void 0 : _a.map(function (item) {
        var date = new Date(Number(item));
        if (item && item !== "") {
            return date_fns_1.format(date, "MMM dd (yyyy)");
        }
    }).filter(function (item) { return item; });
    return (stringDatesToDateArray === null || stringDatesToDateArray === void 0 ? void 0 : stringDatesToDateArray.length) === 1 ? [] : stringDatesToDateArray;
}
exports.getTotals = getTotals;
function getEmbedConst(prodId, devId, handle) {
    var EMBED_APP_ID = process.env.NODE_ENV === "production" ? prodId : devId;
    var EMBED_APP_HANDLE = handle;
    return {
        EMBED_APP_ID: EMBED_APP_ID,
        EMBED_APP_HANDLE: EMBED_APP_HANDLE
    };
}
exports.getEmbedConst = getEmbedConst;
function ff(themesData) {
    var themeSettings = JSON.parse(strip_json_comments_1["default"](themesData.nodes[0].files.nodes[0].body.content));
    var isAppEmbedEnabled = themeSettings.current.blocks &&
        Object.values(themeSettings.current.blocks).some(function (b) {
            return b.type.includes(process.env.APP_HANDLE + "/blocks/redirects") &&
                !b.disabled;
        });
}
exports.ff = ff;
exports.checkDifference = function (a, b) {
    if (a.length !== b.length)
        return false;
    var uniqueValues = new Set(__spreadArrays(a, b));
    var _loop_2 = function (v) {
        var aCount = a.filter(function (e) { return e === v; }).length;
        var bCount = b.filter(function (e) { return e === v; }).length;
        if (aCount !== bCount)
            return { value: false };
    };
    for (var _i = 0, uniqueValues_1 = uniqueValues; _i < uniqueValues_1.length; _i++) {
        var v = uniqueValues_1[_i];
        var state_1 = _loop_2(v);
        if (typeof state_1 === "object")
            return state_1.value;
    }
    return true;
};
function getPostgresTimestamp() {
    var now = new Date();
    var isoString = now.toISOString();
    return isoString.substring(0, 19) + isoString.substring(23, 26);
}
exports.getPostgresTimestamp = getPostgresTimestamp;
exports.defaultState = {
    error: false,
    msg: ""
};
function isDateToday(dateString) {
    var inputDate = new Date(dateString);
    var today = new Date();
    // Compare year, month, and day
    return (inputDate.getUTCFullYear() === today.getUTCFullYear() &&
        inputDate.getUTCMonth() === today.getUTCMonth() &&
        inputDate.getUTCDate() === today.getUTCDate());
}
exports.isDateToday = isDateToday;
function formatDate(rawData) {
    if (!rawData || rawData.length === 0)
        return "";
    var date1 = rawData[0];
    var date2 = rawData[(rawData === null || rawData === void 0 ? void 0 : rawData.length) - 1] || date1;
    return date1 && date2 ? date1 + " - " + date2 : date1 || date2 || "";
}
exports.formatDate = formatDate;
function getDate(rawData, logic) {
    if (logic === void 0) { logic = ">"; }
    if (!rawData || rawData.length === 0)
        return "";
    var date1 = rawData[0];
    var date2 = rawData[rawData.length - 1] || date1;
    var data1Date = date1 ? new Date(date1.replace(/\(|\)/g, "")) : null;
    var data2Date = date2 ? new Date(date2.replace(/\(|\)/g, "")) : null;
    var resultDate = date1;
    if (data1Date && data2Date) {
        if (logic === ">" && data1Date > data2Date) {
            resultDate = date2;
        }
        else if (logic === "<" && data1Date < data2Date) {
            resultDate = date2;
        }
    }
    return resultDate;
}
exports.getDate = getDate;
function loadingStates(nav, actions) {
    var _a;
    var _b;
    if (actions === void 0) { actions = []; }
    var loadingState = ["loading", "submitting"].includes(nav === null || nav === void 0 ? void 0 : nav.state);
    var result = {};
    for (var _i = 0, actions_1 = actions; _i < actions_1.length; _i++) {
        var action = actions_1[_i];
        result = __assign(__assign({}, result), (_a = {}, _a[action + "Loading"] = (loadingState && ((_b = nav.json) === null || _b === void 0 ? void 0 : _b._action) === action) || false, _a));
    }
    return result;
}
exports.loadingStates = loadingStates;
function jsonSafeParse(data) {
    if (!data)
        return null;
    try {
        return JSON.parse(data);
    }
    catch (e) {
        console.error("Failed to parse JSON:", e);
        return null;
    }
}
exports.jsonSafeParse = jsonSafeParse;
exports.OLD_DEFAULT_ICON = "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";
exports.OLD_STICKY_ICON = "https://ngr-app.herokuapp.com/public/images/sticky-logo.png";
exports.NEW_DEFAULT_ICON = "default";
exports.defaultWidgetCode = "\nfunction run(geolocation, openModal, hasBeenClosed) {\n  if(geolocation.country === \"CA\" && hasBeenClosed !== \"1\"){\n    //openModal()\n  }\n}\n";
exports.defaultButtonCode = "\nfunction run(geolocation, redirectButton) {\n  if(geolocation.country === \"CA\" && redirectButton.label === \"Canada\"){\n    return false;\n  }\n  return true;\n}";
exports.defaultAutoRedirectsCode = "\nfunction pattern(redirectUrl, currentUrl, geolocation, forceRedirect) {\n  let newUrl = \"\";\n  // your logic\n  // force redirection logic: \n  // if(gelocation.country === \"CA\"){\n  //   return forceRedirect(\"https://your-url.com\")\n  // }\n  return newUrl;\n}\n";
function useIsMounted() {
    var isMounted = react_1.useRef(false);
    react_1.useEffect(function () {
        isMounted.current = true;
        return function () {
            isMounted.current = false;
        };
    }, []);
    return react_1.useCallback(function () { return isMounted.current; }, []);
}
exports.useIsMounted = useIsMounted;
// Add deep comparison function
function areObjectsEqual(obj1, obj2) {
    if (obj1 === obj2)
        return true;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null)
        return false;
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
    if (keys1.length !== keys2.length)
        return false;
    return keys1.every(function (key) {
        if (!(key in obj2))
            return false;
        if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            return areObjectsEqual(obj1[key], obj2[key]);
        }
        return obj1[key] === obj2[key];
    });
}
exports.areObjectsEqual = areObjectsEqual;
function timingSafeEqual(bufA, bufB) {
    var viewA = new Uint8Array(bufA);
    var viewB = new Uint8Array(bufB);
    var out = 0;
    for (var i = 0; i < viewA.length; i++) {
        out |= viewA[i] ^ viewB[i];
    }
    return out === 0;
}
exports.safeCompare = function (strA, strB) {
    if (typeof strA === typeof strB) {
        var enc = new TextEncoder();
        var buffA = enc.encode(JSON.stringify(strA));
        var buffB = enc.encode(JSON.stringify(strB));
        if (buffA.length === buffB.length) {
            return timingSafeEqual(buffA, buffB);
        }
    }
    return false;
};
function verifyWebhookRequest(request) {
    return __awaiter(this, void 0, void 0, function () {
        var secretKey, hmac, requestStore, body, crypto, generatedHash;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    secretKey = process.env.SHOPIFY_API_SECRET;
                    hmac = request.headers.get("X-Shopify-Hmac-SHA256");
                    requestStore = request.headers.get("x-shopify-shop-domain");
                    if (!secretKey || !hmac || !requestStore)
                        return [2 /*return*/, false];
                    return [4 /*yield*/, request.text()];
                case 1:
                    body = _a.sent();
                    return [4 /*yield*/, Promise.resolve().then(function () { return require('node:crypto'); })];
                case 2:
                    crypto = _a.sent();
                    generatedHash = crypto
                        .createHmac("sha256", secretKey)
                        .update(body)
                        .digest("base64");
                    return [2 /*return*/, exports.safeCompare(generatedHash, hmac)];
            }
        });
    });
}
exports.verifyWebhookRequest = verifyWebhookRequest;
