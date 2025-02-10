export interface OutletContext {
    shopInfo: { shop: { name: string, email: string, currencyCode: string, ianaTimezone: string, timezoneAbbreviation: string, plan: { displayName: string, partnerDevelopment: boolean, shopifyPlus: boolean } }, shopLocales: [{ locale: string, primary: boolean, published: boolean }] };
    shopdb: any;
    activePlan: any;
    devPlan: boolean;
    veteranPlan: boolean;
    appId: string | undefined;
    appData: any;
}

export interface LoadingStates {
    [key: string]: boolean;
}

export interface ActionReturn {
    _action: string;
    status: boolean;
    data: any;
}

export interface RedirectItem {
    id?: number;
    shopId: number;
    flag: string;
    label: string;
    url: string;
    order: number;
    conditional: boolean;
    conditionalLocation: [string] | [];
    domainRedirection: boolean;
    locales: object;
    status?: boolean;
}

export interface EditRedirectItem extends RedirectItem {
    id: number;
}