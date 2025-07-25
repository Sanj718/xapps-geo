import stripJsonComments from "strip-json-comments";
import { format } from "date-fns";
import type { SubmitOptions } from "@remix-run/react";
import { Navigation, Fetcher } from "@remix-run/react";
import { useCallback, useEffect, useRef } from "react";
export function resp(status: boolean, data: any, errors: string | null) {
  const errorsToString = errors && JSON.stringify(errors);
  return {
    status,
    data,
    errors,
    // errors: errors && errorsToString !== "{}" && errorsToString,
  };
}

export const requestHeaders: SubmitOptions = {
  replace: true,
  method: "post" as const,
  encType: "application/json"
} as const;

export const default_markets_basic_configs = {
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
  showFlag: false,
};

export const default_basic_configs = {
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
  stickyToggleIcon: "default",
};

export const default_advanced_configs = {
  disable_basic_css: false,
  css: "",
  html_id: "",
};

export const default_allowed_configs = {
  allowed_pages: ["all"],
  hide_on_allowed_pages: false,
};

export function hexToRGB(h: string) {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (h.length == 4) {
    r = "0x" + h[1] + h[1];
    g = "0x" + h[2] + h[2];
    b = "0x" + h[3] + h[3];

    // 6 digits
  } else if (h.length == 7) {
    r = "0x" + h[1] + h[2];
    g = "0x" + h[3] + h[4];
    b = "0x" + h[5] + h[6];
  }
  return {
    red: r,
    blue: b,
    green: g,
  };
  // return "rgb(" + +r + "," + +g + "," + +b + ")";
}

interface Country {
  emoji: string;
  code: string;
  image: string;
  name: string;
}

export function parseCountries(data: Country[]) {
  return data.map((country) => ({
    label: country.emoji + " " + country.code,
    value: country.image,
    country_name: country.name,
  }));
}

export function parseLocations(data: string[], countriesList: Country[]) {
  if (!data) return;
  const parsedJson = data;
  let locations = "";
  for (let index = 0; index < parsedJson.length; index++) {
    const item = parsedJson[index];

    if (item.includes("C:")) {
      const getContinentLabel = continents_auto.find(
        (cnt) => cnt.value === item
      );
      if (getContinentLabel) {
        locations += getContinentLabel.label + ", ";
      }
    } else {
      const getCountryLabel = countriesList?.find((cnt) => cnt.code === item);
      if (getCountryLabel) {
        locations += getCountryLabel.name + ", ";
      }
    }
  }
  return locations.replace(/,\s*$/, "");
}

interface CountryCode {
  name: string;
  code: string;
}

export function parseCountryCodesWithFullNames(data: CountryCode[]) {
  return data.map((country) => ({
    label: country.name,
    value: country.code,
  }));
}

export const regeUrl =
  /(http(s)?:\/\/.)(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

export const continents_auto = [
  { value: "C:AF", label: "Africa" },
  { value: "C:AN", label: "Antarctica" },
  { value: "C:AS", label: "Asia" },
  { value: "C:EU", label: "Europe" },
  { value: "C:NA", label: "North america" },
  { value: "C:OC", label: "Oceania" },
  { value: "C:SA", label: "South america" },
];

export const continents_markets = [
  { value: "AF", label: "Africa" },
  { value: "AN", label: "Antarctica" },
  { value: "AS", label: "Asia" },
  { value: "EU", label: "Europe" },
  { value: "NA", label: "North america" },
  { value: "OC", label: "Oceania" },
  { value: "SA", label: "South america" },
];

export function charLimit(input: string | undefined, limit: number) {
  if (!input || input === "") return;

  if (input.length > limit) {
    return input.slice(0, limit) + "...";
  }

  return input;
}

export function getKeyByValue(object: Record<string, string[]>, value: string) {
  return Object.keys(object).find((key) => object[key].includes(value));
}

export function isJson(item: unknown): boolean {
  const itemStr = typeof item !== "string" ? JSON.stringify(item) : item;

  try {
    const parsed = JSON.parse(itemStr);
    return typeof parsed === "object" && parsed !== null;
  } catch (e) {
    return false;
  }
}

export function getPureId(data: string | null): string | null {
  if (!data) return null;
  return data.replace(/[^0-9\.]+/g, "");
}

interface Plan {
  name: string;
}

export function planParser(activePlan: Plan | undefined) {
  const isProPlan = activePlan && activePlan?.name === "Pro plan";
  const isBasicPlan = activePlan && activePlan?.name === "Basic plan";
  const isFreePlan = !isProPlan && !isBasicPlan;

  return {
    isProPlan,
    isBasicPlan,
    isFreePlan,
  };
}

export function getTotals(rawData: string | undefined | null) {
  if (!rawData) return;
  const getAsString = rawData.includes(",") ? rawData : "";

  const stringDatesToDateArray = getAsString
    ?.split(",")
    ?.map((item) => {
      const date = new Date(Number(item));
      if (item && item !== "") {
        return format(date, "MMM dd (yyyy)");
      }
    })
    .filter((item) => item);

  return stringDatesToDateArray?.length === 1 ? [] : stringDatesToDateArray;
}

export function getEmbedConst(prodId: string, devId: string, handle: string) {
  const EMBED_APP_ID = process.env.NODE_ENV === "production" ? prodId : devId;
  const EMBED_APP_HANDLE = handle;

  return {
    EMBED_APP_ID,
    EMBED_APP_HANDLE,
  };
}

interface ThemesData {
  nodes: [{
    files: {
      nodes: [{
        body: {
          content: string;
        }
      }]
    }
  }]
}

export function ff(themesData: ThemesData) {
  const themeSettings = JSON.parse(
    stripJsonComments(themesData.nodes[0].files.nodes[0].body.content),
  );
  const isAppEmbedEnabled =
    themeSettings.current.blocks &&
    Object.values(themeSettings.current.blocks).some(
      (b) =>
        b.type.includes(`${process.env.APP_HANDLE}/blocks/redirects`) &&
        !b.disabled,
    );
}

export const checkDifference = (a: any[], b: any[]): boolean => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

export function getPostgresTimestamp() {
  const now = new Date();
  const isoString = now.toISOString();
  return isoString.substring(0, 19) + isoString.substring(23, 26);
}

export const defaultState = {
  error: false,
  msg: "",
};

export function isDateToday(dateString: string): boolean {
  const inputDate = new Date(dateString);
  const today = new Date();

  // Compare year, month, and day
  return (
    inputDate.getUTCFullYear() === today.getUTCFullYear() &&
    inputDate.getUTCMonth() === today.getUTCMonth() &&
    inputDate.getUTCDate() === today.getUTCDate()
  );
}


export function formatDate(rawData: (string | undefined)[] | undefined): string {
  if (!rawData || rawData.length === 0) return "";
  const date1 = rawData[0];
  const date2 = rawData[rawData?.length - 1] || date1;

  return date1 && date2 ? `${date1} - ${date2}` : date1 || date2 || "";
}

export function getDate(rawData: (string | undefined)[] | undefined, logic = ">") {
  if (!rawData || rawData.length === 0) return "";

  const date1 = rawData[0];
  const date2 = rawData[rawData.length - 1] || date1;

  const data1Date = date1 ? new Date(date1.replace(/\(|\)/g, "")) : null;
  const data2Date = date2 ? new Date(date2.replace(/\(|\)/g, "")) : null;

  let resultDate = date1;

  if (data1Date && data2Date) {
    if (logic === ">" && data1Date > data2Date) {
      resultDate = date2;
    } else if (logic === "<" && data1Date < data2Date) {
      resultDate = date2;
    }
  }

  return resultDate;
}

export function loadingStates(nav: Navigation | Fetcher, actions: string[] = []) {
  const loadingState = ["loading", "submitting"].includes(nav?.state);

  let result = {};
  for (const action of actions) {
    result = {
      ...result,
      [`${action}Loading`]:
        (loadingState && (nav.json as { _action?: string })?._action === action) || false,
    };
  }

  return result;
}

export function jsonSafeParse(data: string | null) {
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch (e) {
    console.error("Failed to parse JSON:", e);
    return null
  }
}

export const OLD_DEFAULT_ICON =
  "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";
export const OLD_STICKY_ICON =
  "https://ngr-app.herokuapp.com/public/images/sticky-logo.png";
export const NEW_DEFAULT_ICON = "default";

export const defaultWidgetCode = `
function run(geolocation, openModal, hasBeenClosed) {
  if(geolocation.country === "CA" && hasBeenClosed !== "1"){
    //openModal()
  }
}
`;

export const defaultButtonCode = `
function run(geolocation, redirectButton) {
  if(geolocation.country === "CA" && redirectButton.label === "Canada"){
    return false;
  }
  return true;
}`;

export const defaultAutoRedirectsCode = `
function pattern(redirectUrl, currentUrl, geolocation, forceRedirect) {
  let newUrl = "";
  // your logic
  // force redirection logic: 
  // if(gelocation.country === "CA"){
  //   return forceRedirect("https://your-url.com")
  // }
  return newUrl;
}
`;

export function useIsMounted() {
  const isMounted = useRef(false)
  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
    }
  }, [])

  return useCallback(() => isMounted.current, [])
}

// Add deep comparison function
export function areObjectsEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) return false;

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  return keys1.every(key => {
    if (!(key in obj2)) return false;
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      return areObjectsEqual(obj1[key], obj2[key]);
    }
    return obj1[key] === obj2[key];
  });
}

function timingSafeEqual(bufA: Uint8Array, bufB: Uint8Array) {
  const viewA = new Uint8Array(bufA);
  const viewB = new Uint8Array(bufB);
  let out = 0;
  for (let i = 0; i < viewA.length; i++) {
    out |= viewA[i] ^ viewB[i];
  }
  return out === 0;
}

export const safeCompare = (strA: string, strB: string) => {
  if (typeof strA === typeof strB) {
    const enc = new TextEncoder();
    const buffA = enc.encode(JSON.stringify(strA));
    const buffB = enc.encode(JSON.stringify(strB));
    if (buffA.length === buffB.length) {
      return timingSafeEqual(buffA, buffB);
    }
  }
  return false;
};

export async function verifyWebhookRequest(request: Request) {
  const secretKey = process.env.SHOPIFY_API_SECRET;
  const hmac = request.headers.get("X-Shopify-Hmac-SHA256");
  const requestStore = request.headers.get("x-shopify-shop-domain");
  if (!secretKey || !hmac || !requestStore) return false;

  const body = await request.text();

  const crypto = await import('node:crypto');
  const generatedHash = crypto
    .createHmac("sha256", secretKey)
    .update(body)
    .digest("base64");

  return safeCompare(generatedHash, hmac);
}

export function handleSideNavClick() {
  const mainScreen = document.getElementById('main-screen');
  if (mainScreen) mainScreen.innerHTML = `<div class="spinner"></div>`;
}
