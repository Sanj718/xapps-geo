export interface OutletContext {
  shopInfo: { shop: { name: string, email: string, currencyCode: string, ianaTimezone: string, timezoneAbbreviation: string, plan: { displayName: string, partnerDevelopment: boolean, shopifyPlus: boolean } }, shopLocales: [{ locale: string, primary: boolean, published: boolean }] };
  shopdb: any;
  activePlan: any;
  devPlan: boolean;
  veteranPlan: boolean;
  appId: string | undefined;
  appData: any;
}
// ============================================================================
// SHARED TYPES FOR NGR APP
// ============================================================================

// ============================================================================
// BASE INTERFACES
// ============================================================================

export interface Shop {
  shop: string;
}

export interface DBResponse {
  status: boolean;
  data?: any;
  error?: string;
}

// ============================================================================
// CONFIGURATION INTERFACES
// ============================================================================

export interface BasicConfigs {
  icon: string;
  title: string;
  text: string;
  showFlag: boolean;
  showLngSelector: boolean;
  showCountrySelector: boolean;
  buttonText: string;
  buttonsBgColor: string;
  buttonsColor: string;
  font: string;
  iconWidth: number;
  modalBgColor: string;
  modalBorderColor: string;
  modalTextColor: string;
  stickyHorizontalPosition: string;
  stickyVerticalPosition: string;
  topbarSticky: boolean;
  stickyOpener: string;
  stickyToggleIcon: string;
  type: string;
  dropdownDefault: string;
  layout?: string;
  dropdownPlaceholder?: string;
}

export interface AdvancedConfigs {
  html_id: string;
  css: string;
  disable_basic_css: boolean;
}

export interface MarketsBasicConfigs {
  showRules: string;
  showFrequency: string;
  modalBgColor: string;
  modalTextColor: string;
  modalBorderColor: string;
  buttonsBgColor: string;
  buttonsColor: string;
  icon: string;
  iconWidth: string;
  title: string;
  title_locales?: any;
  text: string;
  text_locales?: any;
  buttonText: string;
  buttonText_locales?: any;
  type: string;
  topbarSticky: boolean;
  stickyOpener: string;
  stickyToggleIcon: string;
  stickyVerticalPosition: number;
  stickyHorizontalPosition?: string;
  showLngSelector: boolean;
  showCountrySelector: boolean;
  dropdownDefault: string;
  showFlag: boolean;
  font?: string;
}

export interface MarketsAdvancedConfigs {
  disable_basic_css: boolean;
  css: string;
  html_id: string;
}

// ============================================================================
// DATABASE INTERFACES
// ============================================================================

export interface InitialConfigs extends Shop {
  basicConfigs: any;
  advancedConfigs?: any;
}

export interface MarketsConfigs extends Shop {
  basicConfigs: any;
  advancedConfigs?: any;
}

export interface AllRedirects extends Shop {
  localesAllowed?: boolean;
}

export interface DeleteRedirect extends Shop {
  id: number;
}

export interface ReorderRedirects extends Shop {
  ids: number[];
}

export interface AllowedPagesProps extends Shop {
  allowedPages: any;
  hideOnAllowedPages?: boolean;
}

export interface MarketSyncStatus extends Shop {
  syncStatus: string;
}

export interface MarketsData extends Shop {
  markets: any;
  backupRegion: any;
}

export interface MarketsDataResponse {
  status: boolean;
  data?: {
    markets?: string;
    backupRegion?: any;
    lastSyncTimestamp?: Date;
  };
  error?: string;
}

export interface MarketsWidgetProps extends Shop {
  widget: boolean;
}

export interface MarketsRedirectProps extends Shop {
  autoRedirect: boolean;
}

export interface ChangePlanProps extends Shop {
  plan: number;
  shopifyPlanId: string;
}

export interface CancelPlanProps extends Shop {
  cancelShopifyPlanId: string;
}

// ============================================================================
// REDIRECT INTERFACES
// ============================================================================
export interface RedirectItem {
  id?: number;
  shopId: number;
  flag: string;
  label: string;
  url: string;
  order: number;
  conditional: boolean;
  conditionalLocation: string | null;
  domainRedirection: boolean;
  locales: { [key: string]: string } | null;
  status?: boolean;
}

export interface AutoRedirectItemValue {
  id: string;
  key: string;
  block: boolean;
  domain_redirection: boolean;
  except_r: boolean;
  location: string[] | string;
  status: boolean | number;
  url: string;
  order_r: number;
}

export interface AutoRedirectItem {
  id: string;
  key: string;
  name: string;
  jsonValue: AutoRedirectItemValue;
}

export interface AutoRedirectNodeItem {
  node: AutoRedirectItem;
}

export interface EditRedirectItem extends RedirectItem {
  id: number;
}

// ============================================================================
// COMPONENT PROP INTERFACES
// ============================================================================

export interface MarketsPopupPreviewProps {
  marketsData: any;
  basicConfigs: BasicConfigs;
  advancedConfigs: AdvancedConfigs;
  customCSSClass?: string;
}

export interface RedirectsPopupPreviewProps {
  redirects: any[];
  basicConfigs: BasicConfigs;
  advancedConfigs: AdvancedConfigs;
  customCSSClass?: string;
}

export interface CustomizeMarketsPopupProps {
  marketsData: MarketsDataResponse | null;
  configs: Partial<MarketsBasicConfigs>;
  setConfigs: (configs: Partial<MarketsBasicConfigs> | ((current: Partial<MarketsBasicConfigs>) => Partial<MarketsBasicConfigs>)) => void;
  advancedConfigs: Partial<MarketsAdvancedConfigs>;
  setAdvancedConfigs: (advancedConfigs: Partial<MarketsAdvancedConfigs> | ((current: Partial<MarketsAdvancedConfigs>) => Partial<MarketsAdvancedConfigs>)) => void;
}

// ============================================================================
// UTILITY INTERFACES
// ============================================================================

export interface LoadingStates {
  [key: string]: boolean;
}

export interface ActionReturn {
  _action: string;
  status: boolean;
  data: any;
  error?: string;
}

export interface Asset {
  url: string;
}

export interface Country {
  emoji: string;
  code: string;
  image: string;
}

export interface ThemesData {
  // Add properties as needed
}

export interface ThemeData {
  // Add properties as needed
}

export interface AnalyticsData {
  // Add properties as needed
}

export interface FetcherData {
  // Add properties as needed
}

// ============================================================================
// EVENT HANDLER INTERFACES
// ============================================================================

export interface FormEvent {
  target: HTMLInputElement;
}

export interface ChangeEvent {
  target: HTMLInputElement;
}

// ============================================================================
// ADMIN API CONTEXT INTERFACES
// ============================================================================

export interface AdminApiContextBasic {
  graphql: (query: string, variables?: any) => Promise<any>;
}

export interface AdminApiContextWithRest extends AdminApiContextBasic {
  rest: any;
}

export interface AdminApiContextWithoutRest extends AdminApiContextBasic {
  // Only GraphQL access, no REST API
}

// ============================================================================
// ACTION DATA INTERFACES
// ============================================================================

export interface ActionDataWithError extends ActionReturn {
  error?: string;
  confirmationUrl?: string;
  appSubscription?: {
    status: string;
    returnUrl?: string;
  };
}

export interface ActionDataWithData extends ActionReturn {
  // data is already defined in ActionReturn
}

// ============================================================================
// FORM VALIDATION INTERFACES
// ============================================================================

export interface FieldValidation {
  url: boolean;
  location: boolean;
  flag?: boolean;
}

export interface ValidationState {
  [key: string]: boolean;
}

// ============================================================================
// COMPONENT STATE INTERFACES
// ============================================================================

export interface ModalState {
  addModalStatus: boolean;
  editModalStatus: boolean;
  assetsModalStatus: boolean;
}

export interface FormState {
  addButtonStatus: boolean;
  fieldValidation: FieldValidation;
}

// ============================================================================
// DATA STRUCTURE INTERFACES
// ============================================================================

export interface ThemeEmbedData {
  themeCode?: string;
  themeEmbedData?: any;
}

export interface MarketsSyncData {
  status: boolean;
  restart?: boolean;
  reAuth?: boolean;
}

export interface BulkOperationData {
  url?: string;
  status?: string;
  errorCode?: string;
}

// ============================================================================
// FUNCTION PARAMETER INTERFACES
// ============================================================================

export interface AdminParams {
  admin: AdminApiContextBasic;
}

export interface ShopParams {
  shop: string;
}

export interface AppIdParams {
  appId: string;
}

export interface SessionParams {
  session: any;
}

export interface BulkIdParams {
  bulkId: string;
}

// ============================================================================
// RESPONSE PATTERN INTERFACES
// ============================================================================

export interface GraphQLResponse {
  data?: any;
  errors?: any[];
}

export interface MetafieldResponse {
  metafields?: any[];
  userErrors?: any[];
}

export interface AssetResponse {
  files?: {
    pageInfo?: any;
    edges?: any[];
  };
}

// ============================================================================
// SPECIFIC FUNCTION PARAMETER INTERFACES
// ============================================================================

export interface AdminAppIdParams extends AdminParams {
  appId: string;
}

export interface AdminAppIdValueParams extends AdminAppIdParams {
  value: any;
}

export interface AdminAppIdKeyValueParams extends AdminAppIdValueParams {
  key: string;
}

export interface AdminBulkIdParams extends AdminParams {
  bulkId: string;
}

export interface AdminWebhookIdParams extends AdminParams {
  webhookId: string;
}

export interface AdminSubscriptionParams extends AdminParams {
  id?: string;
  shop?: string;
}
