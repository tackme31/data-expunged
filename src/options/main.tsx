import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { Options } from "./Options";
import { SideBar } from "./SideBar";
import "./options.css";

const App = () => {
  useEffect(() => {
    document.title = browser.i18n.getMessage("option_title");
  }, []);

  return (
    <>
      <header>
        <div className="stripe">
          <div className="content-wrapper">
            <img src="/assets/icons/128x128-title.png" id="logo" />
            <div>
              <h1 id="title">{"Data Expunged"}</h1>
              <h2 id="subtitle">{"Suppress, Censor, Prevent"}</h2>
            </div>
          </div>
        </div>
      </header>
      <div id="topbar"></div>
      <div className="content-wrapper" style={{ marginTop: "30px" }}>
        <SideBar />
        <Options />
      </div>
    </>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
