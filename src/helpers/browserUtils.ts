import { Platform } from "src/constants/applicationConstants";
import { BROWSER_NAME } from "src/constants/deviceConstants";


export const isChromeBrowser = () => (getBrowserName() === BROWSER_NAME.chrome);

export const getBrowserNameHeaderValue = () => {
  const browserName = getBrowserName();
  return browserName === BROWSER_NAME.other ? Platform.web : browserName;
};

export const getBrowserName = () => {
  try {
    // Opera 8.0+
    const isOpera =
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'opr' does not exist on type 'Window & ty... Remove this comment to see the full error message
      (!!window.opr && !!opr.addons) ||
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'opera' does not exist on type 'Window & ... Remove this comment to see the full error message
      !!window.opera ||
      navigator.userAgent.indexOf(" OPR/") >= 0;

    // Firefox 1.0+
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'InstallTrigger'.
    const isFirefox = typeof InstallTrigger !== "undefined";

    // Safari 3.0+ "[object HTMLElementConstructor]"
    const isSafari =
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ new (): HTMLElement; prototype... Remove this comment to see the full error message
      /constructor/i.test(window.HTMLElement) ||
      ((p: any) => p.toString() === "[object SafariRemoteNotification]")(
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'safari' does not exist on type 'Window &... Remove this comment to see the full error message
        !window.safari ||
          // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'safari'. Did you mean 'isSafari'... Remove this comment to see the full error message
          (typeof safari !== "undefined" && safari.pushNotification)
      );

    // Internet Explorer 6-11
    // @ts-expect-error ts-migrate(2551) FIXME: Property 'documentMode' does not exist on type 'Do... Remove this comment to see the full error message
    const isIE = /* @cc_on!@ */ false || !!document.documentMode;

    // Edge 20+
    // @ts-expect-error
    const isEdge = !isIE && !!window.StyleMedia;

    // Chrome 1 - 79
    const isChrome =
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'chrome' does not exist on type 'Window &... Remove this comment to see the full error message
      !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

    // Edge (based on chromium) detection
    const isEdgeChromium =
      isChrome && navigator.userAgent.indexOf("Edg") !== -1;

    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS;

    if (isOpera) {
      return BROWSER_NAME.opera;
    }
    if (isFirefox) {
      return BROWSER_NAME.firefox;
    }
    if (isSafari) {
      return BROWSER_NAME.safari;
    }
    if (isIE) {
      return BROWSER_NAME.internetExplorer;
    }
    if (isEdge) {
      return BROWSER_NAME.edge;
    }
    if (isEdgeChromium) {
      return BROWSER_NAME.edgeChromium;
    }
    if (isChrome) {
      return BROWSER_NAME.chrome;
    }
    if (isBlink) {
      return BROWSER_NAME.blink;
    }

    return BROWSER_NAME.other;
  } catch (err:any) {
    return BROWSER_NAME.other;
  }
};
