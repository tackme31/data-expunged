import React from "react";
import ReactDOM from "react-dom";
import { Options } from "./Options";
import { SideBar } from "./SideBar";
import "./options.css";

ReactDOM.render(
  <React.StrictMode>
    <>
      <header>
        <div className="stripe">
          <div className="content-wrapper">
            <img src="/assets/icons/128x128-title.png" id="logo" />
            <div>
              <h1 id="title">{"Data Expunged"}</h1>
              <h2 id="subtitle">{"Hide, Mask, Censor"}</h2>
            </div>
          </div>
        </div>
      </header>
      <div id="topbar"></div>
      <div>
        <div className="content-wrapper" style={{ marginTop: "30px" }}>
          <SideBar />
          <Options />
        </div>
      </div>
    </>
  </React.StrictMode>,
  document.getElementById("root")
);
