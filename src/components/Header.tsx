import { ReactTypical } from "@deadcoder0904/react-typical";
import React, { useEffect, useState } from "react";
import ReactSwitch from "react-switch";

interface HeaderProps {
  sharedData: any;
  checked?: any;
}

export default function Header({ sharedData }: HeaderProps) {
  const [name, setName] = useState('');
  const [titles, setTitles] = useState([]);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (sharedData) {
      setName(sharedData.name);
      setTitles(sharedData.titles.map((x: any) => [x.toUpperCase(), 1500]).flat());
    }
  }, [sharedData]);

  function onThemeSwitchChange(checked: any) {
    setChecked(checked)
    setTheme();
  }

  function setTheme() {
    let dataThemeAttribute = "data-theme";
    let body = document.body;
    let newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <ReactTypical style={{ marginTop: 0, marginBottom: 11 }} className="title-styles" steps={titles} loop={50} />
  }, (props, prevProp) => true);

  return (
    <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
      <div className="row aligner" style={{ height: '100%' }}>
        <div className="col-md-12">
          <div>
            <span className="iconify header-icon" data-icon="la:laptop-code" data-inline="false"></span>
            <br />
            <h1 className="mb-0">
              <ReactTypical steps={[name]} wrapper="p" />
            </h1>
            <div className="title-container">
              <HeaderTitleTypeAnimation />
            </div>
            <ReactSwitch
              checked={checked}
              onChange={onThemeSwitchChange}
              offColor="#baaa80"
              onColor="#353535"
              className="react-switch mx-auto"
              width={90}
              height={40}

              uncheckedIcon={
                <span
                  className="iconify"
                  data-icon="twemoji:owl"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "20px",
                    color: "#353239",
                  }}
                ></span>
              }
              checkedIcon={
                <span
                  className="iconify"
                  data-icon="noto-v1:sun-with-face"
                  data-inline="false"
                  style={{
                    display: "block",
                    height: "100%",
                    fontSize: 25,
                    textAlign: "end",
                    marginLeft: "10px",
                    color: "#353239",
                  }}
                ></span>
              }
              id="icon-switch"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
