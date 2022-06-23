import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { Auth0Provider } from "@auth0/auth0-react";
require("dotenv").config();

const options = {
  position: positions.BOTTOM_LEFT,
  offset: "20px",
  transition: transitions.FADE,
};

ReactDOM.render(
  <AlertProvider template={AlertTemplate} {...options}>
    <Auth0Provider
      domain={process.env.REACT_APP_Auth0Provider_domain}
      clientId={process.env.REACT_APP_Auth0Provider_clientId}
      redirectUri={process.env.REACT_APP_Auth0Provider_redirectUri}
      audience={process.env.REACT_APP_Auth0Provider_audience}
      scope={process.env.REACT_APP_Auth0Provider_scope}
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Auth0Provider>
  </AlertProvider>,

  document.getElementById("root")
);
