import React, {
  useMemo,
  useRef,
  useState,
  useCallback,
  useEffect,
} from "react";
import earthIcon from "../../assets/earth-americas-solid.svg";
import ca_flag from "../../assets/ca.svg";
import stickyEarth from "../../assets/sticky-logo.png";
import languagesJson from "../../assets/languages.json";
import currenciesJson from "../../assets/currencies.json";
import countriesJson from "../../assets/countries-data.json";
import "../../assets/index-markets.scss";
import "../../assets/preview.scss";
import PreviewBannerNote from "../_common/PreviewBannerNote";
import { Banner, Text } from "@shopify/polaris";
import { getPureId, jsonSafeParse } from "../_helpers.js";
import { MarketsPopupPreviewProps, BasicConfigs, AdvancedConfigs } from "../_types";

export function MarketsPopupPreview({
  marketsData,
  basicConfigs,
  advancedConfigs,
  customCSSClass = "",
}: MarketsPopupPreviewProps) {
  const [containerWidth, setContainerWidth] = useState(500);
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const {
    icon,
    title,
    text,
    showFlag,
    showLngSelector,
    showCountrySelector,
    buttonText,
    buttonsBgColor,
    buttonsColor,
    font,
    iconWidth,
    modalBgColor,
    modalBorderColor,
    modalTextColor,
    stickyHorizontalPosition,
    stickyVerticalPosition,
    topbarSticky,
    stickyOpener,
    stickyToggleIcon,
    type,
    dropdownDefault,
  } = basicConfigs || {};

  const { html_id, css, disable_basic_css } = advancedConfigs || {};
  const [marketCountries, setMarketCountries] = useState<any[]>([]);
  const [markets, setMarkets] = useState<any[]>([]);
  const [marketsWebPresences, setMarketsWebPresences] = useState<any[]>([]);
  const [backupRegion, setBackupRegion] = useState<any>(null);

  const [dropdownCountries, setDropdownCountries] = useState<any[]>([]);
  const [dropdownLanguages, setDropdownLanguages] = useState<any[]>([]);

  const [selectedCountryId, setSelectedCountryId] = useState<any>(null);
  const [selectedLanguageId, setSelectedLanguageId] = useState<any>(null);
  const [primaryMarketId, setPrimaryMarketId] = useState<any>(null);
  const [selectedMarketId, setSelectedMarketId] = useState<any>(null);

  const countrySelect = useRef<HTMLSelectElement>(null);
  const languageSelect = useRef<HTMLSelectElement>(null);
  const modalElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  useMemo(() => {
    if (marketsData) {
      const parsedMarketsData = marketsData?.data?.markets && jsonSafeParse(marketsData?.data?.markets);
      if (!parsedMarketsData) return;

      const { MarketRegionCountry, Market, MarketWebPresence, BackupRegion } = parsedMarketsData;
      if (!Market || !MarketRegionCountry) return;
      setMarketCountries(MarketRegionCountry);
      setMarkets(Market);
      setMarketsWebPresences(MarketWebPresence);
      setBackupRegion(BackupRegion);

      const sortedMarketCountries = MarketRegionCountry.sort((a: any, b: any) => (a.name > b.name ? 1 : -1));
      const sortedMarkets = Market

      const availableMarkets = sortedMarkets?.filter((item: any) => item.enabled || item.status === "ACTIVE");
      const availableMarketIds = availableMarkets?.map((item: any) => item.id);
      const primaryMarketId = MarketWebPresence?.length ? MarketRegionCountry?.find((item: any) => item.id === BackupRegion?.id)?.__parentId : sortedMarketCountries?.find((item: any) => item.primary)?.__parentId;
      setPrimaryMarketId(primaryMarketId);

      const marketCountriesList = sortedMarketCountries.map((item: any) => {
        if (!availableMarketIds.includes(item.__parentId)) return;
        const nativeCountryName = countriesJson[item.code as keyof typeof countriesJson]?.native || "";
        const currencySymbol =
          currenciesJson[item.currency.currencyCode as keyof typeof currenciesJson]?.symbol_native;
        return {
          ...item,
          nativeName: nativeCountryName,
          currency: {
            ...item.currency,
            currencyCode: item.currency.currencyCode,
            symbolNative: currencySymbol
          }
        }
      });
      setDropdownCountries(marketCountriesList);
      setSelectedCountryId(sortedMarketCountries[0]?.id);
      setSelectedMarketId(sortedMarketCountries[0]?.__parentId);

      const allLanguages = processLanguages(MarketWebPresence, Market, primaryMarketId);

      setDropdownLanguages(allLanguages);
      setSelectedLanguageId(allLanguages[0]?.locale);
    }
  }, [marketsData]);

  function handleCountryChange(selectedCountryElement: any) {
    const selectedOption =
      selectedCountryElement?.target?.options[selectedCountryElement?.target?.selectedIndex];
    const selectedMarketId = selectedOption?.getAttribute("data-market");

    if (!selectedMarketId) return;
    const allLanguages = processLanguages(marketsWebPresences, markets, selectedMarketId);
    setDropdownLanguages(allLanguages);
    setSelectedLanguageId(allLanguages[0]?.locale);
  }

  function processLanguages(marketsWebPresences: any[], markets: any[], selectedMarketId: string) {
    const allWebPresences: any[] = [];
    if (marketsWebPresences?.length) {
      const findWebPresence = marketsWebPresences.find((item: any) => item.__parentId === selectedMarketId || item.__parentId === primaryMarketId);
      findWebPresence?.rootUrls?.forEach((rootUrl: any) =>
        allWebPresences.push({ ...rootUrl, marketId: selectedMarketId })
      );
    } else {
      // This is old API  
      const selectedMarket = markets.find((item: any) => item.id === selectedMarketId);
      if (selectedMarket?.webPresence) {
        selectedMarket?.webPresence?.rootUrls.forEach((rootUrl: any) =>
          allWebPresences.push({ ...rootUrl, marketId: selectedMarket.id })
        );
      } else {
        const primaryMarket = markets.find((item: any) => item.primary);
        primaryMarket?.webPresence?.rootUrls.forEach((rootUrl: any) =>
          allWebPresences.push({ ...rootUrl, marketId: primaryMarket.id })
        );
      }
    }
    const allLanguages = allWebPresences.map((item: any) => {
      const lngObj = languagesJson[item.locale as keyof typeof languagesJson];
      const lngName =
        lngObj?.name !== lngObj?.native
          ? lngObj?.name + " / " + lngObj?.native
          : lngObj?.name;
      return { ...item, lngName };
    });
    return allLanguages;
  }

  function handleStickyClose() {
    if (!modalElement.current) return;
    if (modalElement.current.hasAttribute("data-open")) {
      modalElement.current.removeAttribute("data-open");
    } else {
      modalElement.current.setAttribute("data-open", "");
    }
  }

  function SubmitButton() {
    return (
      <button
        className="ngr-markets-modal__button-main"
        type="submit"
        data-ngr-markets-button=""
      >
        {buttonText}
      </button>
    );
  };

  return (
    <>
      <PreviewBannerNote type="markets" />
      {!marketsData?.data?.markets && (
        <Banner tone="warning">
          <Text as="p">
            Please sync Markets in Popup controls section above.
          </Text>
        </Banner>
      )}
      <div
        ref={containerRef}
        className={`ngr-preview-container ${customCSSClass}`}
        style={{ "--c-width": `${containerWidth}` } as React.CSSProperties}
      >
        <div id="ngr-modal-preview" ref={outerRef} style={{ top: "4px" }}>
          {!disable_basic_css && (
            <style
              dangerouslySetInnerHTML={{
                __html: `
                .ngr-markets-modal{
                  ${font && font != "" && font !== "inherit" && font !== "undefined"
                    ? "font-family:'" + font + "', sans-serif;"
                    : ""
                  }
                }
                .ngr-markets-modal__content{
                  ${modalBgColor != "" ? "background-color:" + modalBgColor + ";" : ""}
                  ${modalTextColor != "" ? "color:" + modalTextColor + ";" : ""}
                  ${modalBorderColor != ""
                    ? "border-color:" + modalBorderColor + ";"
                    : ""
                  }
                }
                ${modalBgColor != "" &&
                  ".ngr-markets-modal__close{ background-color:" +
                  modalBgColor +
                  " !important;}"
                  }
                .ngr-markets-modal__form-content .select select{
                  ${font && font != "" && font !== "inherit" && font !== "undefined"
                    ? "font-family:'" + font + "', sans-serif;"
                    : ""
                  }
                }
                .ngr-markets-modal__button-main{
                    ${buttonsBgColor != ""
                    ? "background-color:" + buttonsBgColor + ";"
                    : ""
                  }
                    ${buttonsColor != "" ? "border-color:" + buttonsColor + ";" : ""}
                    ${buttonsColor != "" ? "color:" + buttonsColor + ";" : ""}
                    ${font != "" ? "font-family:'" + font + "', sans-serif;" : ""}
                }
                .ngr-markets-modal__button-main:hover{
                    ${buttonsColor != "" ? "background-color:" + buttonsColor + ";" : ""
                  }
                    ${buttonsBgColor != "" ? "border-color:" + buttonsBgColor + ";" : ""
                  }
                    ${buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : ""}
                }`,
              }}
            />
          )}
          {css && (
            <style
              dangerouslySetInnerHTML={{
                __html: css,
              }}
            />
          )}
          <div
            className={`ngr-markets-modal ${type === "topbar" ? "top-bar" : ""
              } ${type === "sticky" ? "sticky-bar transition" : ""}`}
            ref={modalElement}
            data-ngr-markets-modal
            data-open
            id={html_id}
          >
            <div className="ngr-markets-modal__content">
              <button
                className="ngr-markets-modal__close"
                type="button"
                aria-label="Close"
                data-ngr-markets-close=""
                onClick={(type === "sticky" && handleStickyClose) || undefined}
              >
                {type === "sticky" ? (
                  <img
                    loading="lazy"
                    alt="Geo location toggler"
                    width="100"
                    height="100"
                    src={
                      stickyOpener === "custom"
                        ? stickyToggleIcon === "default"
                          ? stickyEarth
                          : stickyToggleIcon
                        : ca_flag
                    }
                  />
                ) : (
                  "✕"
                )}
              </button>
              <div id="localization_form" className="shopify-localization-form">
                <div data-ngr-markets-content="">
                  {icon && (
                    <div className="ngr-markets-modal__icon">
                      <img
                        loading="lazy"
                        alt="Redirects Icon"
                        width={iconWidth || 50}
                        height="100"
                        src={icon === "default" ? earthIcon : icon}
                      />
                    </div>
                  )}
                  {title && (
                    <h2 className="ngr-markets-modal__title">{title}</h2>
                  )}
                  {text && text !== "<p><br></p>" && (
                    <div className="ngr-markets-modal__text">
                      {
                        <div
                          dangerouslySetInnerHTML={{
                            __html: text,
                          }}
                        />
                      }
                    </div>
                  )}
                  {showFlag && (
                    <div className="ngr-markets-modal__flag">
                      <img
                        loading="lazy"
                        alt="CA"
                        width="100"
                        height="50"
                        src={ca_flag}
                      />
                    </div>
                  )}
                  <div className="ngr-markets-modal__form-content">
                    {showCountrySelector && dropdownCountries?.length > 0 && (
                      <div className="select">
                        <select
                          name="country_code"
                          ref={countrySelect}
                          onChange={handleCountryChange}
                        >
                          {dropdownCountries?.map((item: any) => (
                            <option
                              key={item.code}
                              value={item.code}
                              data-market={item.__parentId}
                            >
                              {item?.nativeName !== item?.name
                                ? item.name +
                                " / " +
                                item?.nativeName +
                                ` (${item.currency.currencyCode} ${item.currency.symbolNative})`
                                : item.name +
                                ` (${item.currency.currencyCode} ${item.currency.symbolNative})`}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                    {showLngSelector && dropdownLanguages?.length > 0 && (
                      <div className="select">
                        <select name="language_code" ref={languageSelect}>
                          {dropdownLanguages?.map((item: any, index: number) => (
                            <option
                              key={item?.locale + index}
                              value={item?.locale}
                              data-market={item?.marketId}
                            >
                              {item?.lngName}
                            </option>
                          ))}
                          {/* {generateLanguages()} */}
                        </select>
                      </div>
                    )}
                    {type === "topbar" && <SubmitButton />}
                  </div>
                </div>
                {type !== "topbar" && <SubmitButton />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
