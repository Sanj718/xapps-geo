import React, { useRef, useState, useCallback, useEffect } from "react";
import { earthIcon, stickyEarth, ca_flag } from "../../assets/index.js";
import { useAppBridge } from "@shopify/app-bridge-react";
import { Redirect } from "@shopify/app-bridge/actions/index.js";
import "../../../src-public-scripts/index.scss";
import { PreviewBannerNote } from "../PreviewBannerNote.jsx";
import { Banner, Text } from "@shopify/polaris";
import { RefreshIcon } from "@shopify/polaris-icons";

const OLD_ICON_SRC =
  "https://ngr-app.herokuapp.com/public/images/earth-americas-solid.svg";

export default function RedirectsPopupPreview({
  redirects,
  basicConfigs,
  advancedConfigs,
}) {
  const app = useAppBridge();
  const redirect = Redirect.create(app);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef(null);
  const outerRef = useRef(null);
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
    layout,
    dropdownDefault,
    dropdownPlaceholder,
  } = basicConfigs;

  const { html_id, css, disable_basic_css } = advancedConfigs || {};
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const modalElement = useRef();

  const handleStickyClose = useCallback(() => {
    const modalEl = modalElement.current;
    if (modalEl) {
      if (modalEl.hasAttribute("data-open")) {
        modalEl.removeAttribute("data-open");
      } else {
        modalEl.setAttribute("data-open", "");
      }
    }
  }, [modalElement]);

  const handleDropdown = useCallback(() => {
    setDropdownOpen(!dropdownOpen);
  }, [dropdownOpen]);

  useEffect(() => {
    const scrollableElement = document.querySelector(".Polaris-Modal__Body");
    const previewElement = outerRef.current;

    const handleScroll = () => {
      if (scrollableElement && previewElement) {
        previewElement.style.top =
          scrollableElement.scrollTop > 4
            ? scrollableElement.scrollTop + "px"
            : "4px";
      }
    };

    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

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

  return (
    <>
      <PreviewBannerNote />
      {!redirects?.length && (
        <Banner tone="warning">
          <Text as="p">
            Please add redirect button in Redirect buttons section above.
          </Text>
        </Banner>
      )}
      <div
        ref={containerRef}
        className="ngr-preview-container"
        style={{ "--c-width": `${containerWidth}` }}
      >
        <div id="ngr-modal-preview" ref={outerRef} style={{ top: "4px" }}>
          {!disable_basic_css && (
            <style
              dangerouslySetInnerHTML={{
                __html: `
            .ngr-modal{
              ${
                font && font != "" && font !== "inherit"
                  ? "font-family:'" + font + "', sans-serif;"
                  : ""
              }
            }
            .ngr-modal__content{
              ${
                modalBgColor != ""
                  ? "background-color:" + modalBgColor + ";"
                  : ""
              }
              ${modalTextColor != "" ? "color:" + modalTextColor + ";" : ""}
              ${
                modalBorderColor != ""
                  ? "border-color:" + modalBorderColor + ";"
                  : ""
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
                ${
                  buttonsColor != "" ? "border-color:" + buttonsColor + ";" : ""
                }
                ${buttonsColor != "" ? "color:" + buttonsColor + ";" : ""}
            }
            .ngr-redirects__link:hover{
                ${
                  buttonsColor != ""
                    ? "background-color:" + buttonsColor + ";"
                    : ""
                }
                ${
                  buttonsBgColor != ""
                    ? "border-color:" + buttonsBgColor + ";"
                    : ""
                }
                ${buttonsBgColor != "" ? "color:" + buttonsBgColor + ";" : ""}
            }
            `,
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
            className={`ngr-modal ${type === "topbar" ? "top-bar" : ""} ${
              type === "sticky" ? "sticky-bar transition" : ""
            }`}
            ref={modalElement}
            data-ngr-modal
            data-open
            id={html_id}
          >
            <div className={`ngr-modal__content ${layout}`}>
              <button
                className="ngr-modal__close"
                type="button"
                aria-label="Close"
                data-ngr-close=""
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
              {icon && (
                <div className="ngr-modal__icon">
                  <img
                    loading="lazy"
                    alt="Redirects Icon"
                    width={iconWidth || 50}
                    height="100"
                    src={
                      icon === "default" || icon === OLD_ICON_SRC
                        ? earthIcon
                        : icon
                    }
                  />
                </div>
              )}
              {title && <h2 className="ngr-modal__title">{title}</h2>}
              {text && text !== "<p><br></p>" && (
                <div className="ngr-modal__text">
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
                <div className="ngr-modal__flag">
                  <img
                    loading="lazy"
                    alt="CA"
                    width="100"
                    height="50"
                    src={ca_flag}
                  />
                </div>
              )}
              {redirects?.length ? (
                <div data-ngr-redirects>
                  {layout === "dropdown" ? (
                    <div
                      className="ngr-select"
                      data-open={dropdownOpen}
                      onClick={handleDropdown}
                    >
                      <div className="select-placeholder">
                        {dropdownPlaceholder || "Select"}
                      </div>
                      <ul>
                        {redirects.map((item) => {
                          if (!item?.status) return;

                          return (
                            <li>
                              <a href="#">
                                {item?.flag !== "" && (
                                  <img
                                    src={item.flag}
                                    alt="Select"
                                    width="50px"
                                    height="50px"
                                    loading="lazy"
                                  />
                                )}
                                <span>{item.label}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : (
                    <ul className="ngr-redirects ngr-redirects__single">
                      {redirects.map((item) => {
                        if (!item?.status) return;

                        return (
                          <li className="ngr-redirects__item" key={item.id}>
                            <a href="#" className="ngr-redirects__link">
                              {item?.flag !== "" && (
                                <img
                                  loading="lazy"
                                  alt="country flag"
                                  width="50"
                                  height="50"
                                  src={item.flag}
                                />
                              )}
                              {item.label}
                            </a>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
