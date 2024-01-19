import { j as jsxRuntimeExports, r as reactExports, a as addHmrIntoView, c as createRoot } from "../../../assets/js/_virtual_reload-on-update-in-view.js";
import { w as withErrorBoundary, a as withSuspense, u as useStorage } from "../../../assets/js/withErrorBoundary.js";
import { e as exampleThemeStorage } from "../../../assets/js/exampleThemeStorage.js";
const Popup = () => {
  const [loginInfo, setLoginInfo] = reactExports.useState({ name: "", email: "" });
  const logo = "https://d32rooxyos7z7x.cloudfront.net/asset/hyper_full_logo.png";
  reactExports.useEffect(() => {
    const messageListener = (message, sender, sendResponse) => {
      if (message.type === "auth-store") {
        const authStoreData = JSON.parse(message.data);
        chrome.storage.local.set({ "auth-store": {
          name: authStoreData.state.memberInfo.name,
          email: authStoreData.state.memberInfo.email
        } }, () => {
          console.log("auth-store data saved in extension storage");
        });
      }
    };
    chrome.runtime.onMessage.addListener(messageListener);
    return () => {
      chrome.runtime.onMessage.removeListener(messageListener);
    };
  }, []);
  reactExports.useEffect(() => {
    chrome.storage.local.get(["auth-store"], (result) => {
      if (result["auth-store"] && result["auth-store"].state && result["auth-store"].state.memberInfo) {
        setLoginInfo({
          name: result["auth-store"].state.memberInfo.name,
          email: result["auth-store"].state.memberInfo.email
        });
        console.log("auth-store data retrieved from extension storage");
      }
    });
  }, []);
  useStorage(exampleThemeStorage);
  const handleLogin = () => {
    chrome.tabs.create({ url: "https://app.hypersales.ai/login" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "App", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "App-header", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { width: 200, margin: "auto" }, className: "text-red-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, className: "App-logo", alt: "logo" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleLogin, children: "Login to HyperSales" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      "Name: ",
      loginInfo.name,
      "Email: ",
      loginInfo.email
    ] })
  ] });
};
const Popup$1 = withErrorBoundary(withSuspense(Popup, /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Loading ... " })), /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: " Error Occur " }));
addHmrIntoView("pages/popup");
function init() {
  const appContainer = document.querySelector("#app-container");
  if (!appContainer) {
    throw new Error("Can not find #app-container");
  }
  const root = createRoot(appContainer);
  root.render(/* @__PURE__ */ jsxRuntimeExports.jsx(Popup$1, {}));
}
init();
