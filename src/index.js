import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import {ToastContainer} from './components/NotificationMove'
import { ValidUserContextProvider } from "./authCheck";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <ValidUserContextProvider>
      <App />
      <ToastContainer/>
    </ValidUserContextProvider>
  </Provider>
);
