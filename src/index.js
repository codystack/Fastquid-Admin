
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

import { Provider } from "react-redux";
import store from "./redux";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

import { SWRConfig } from "swr";
import APIService from "./service";


const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <BrowserRouter>
    <Provider store={store}>
      <SoftUIControllerProvider  >
        <SWRConfig
          value={{
            // refreshInterval: 3000,
            fetcher: (url) => APIService.fetcher(url),
          }}
        >
          <App />
        </SWRConfig>
      </SoftUIControllerProvider>
    </Provider>
  </BrowserRouter>
);
