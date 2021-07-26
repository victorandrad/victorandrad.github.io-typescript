import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./App.scss";
import About from './components/About';
import Experience from './components/Experience';
import Footer from './components/Footer';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';

export default function App() {
  const [language, setLanguage] = useState('res_primaryLanguage.json');
  const [languageTag, setLanguageTag] = useState('pt');
  const primaryLanguage = 'pt';
  const secondaryLanguage = 'en';
  const primaryLanguageIconId = 'primary-lang-icon';
  const secondaryLanguageIconId = 'secondary-lang-icon';
  const [resumeData, setResumeData] = useState<any>({});
  const [sharedData, setSharedData] = useState<any>({});
  
  // Loading shared data
  useEffect(() => {
    axios({
      url: `portfolio_shared_data.json`,
    }).then(data => {
      setSharedData(data.data);
    }).catch(err => {
      alert(err);
    });
  }, []);

  // Set current language
  useEffect(() => {
    if (languageTag === primaryLanguage) {
      setLanguage('res_primaryLanguage.json');

      document
      .getElementById(primaryLanguageIconId)
      ?.setAttribute("filter", "brightness(40%)");

      document
      .getElementById(secondaryLanguageIconId)
      ?.setAttribute("filter", "brightness(100%)");
    } else if (languageTag === secondaryLanguage) {
      setLanguage('res_secondaryLanguage.json');

      document
      .getElementById(secondaryLanguageIconId)
      ?.setAttribute("filter", "brightness(40%)");

      document
      .getElementById(primaryLanguageIconId)
      ?.setAttribute("filter", "brightness(100%)");
    }
  }, [languageTag]);

  // Load data from current language
  useEffect(() => {
    axios({
      url: language,
    }).then(data => {
      setResumeData(data.data);
      // applyPickedLanguage(
      //   primaryLanguage,
      //   secondaryLanguageIconId
      // );
    }).catch(err => {
      alert(err);
    });
  }, [language]);
  
  return (
    <div>
      <Header sharedData={sharedData.basic_info} />
      <div className="col-md-12 mx-auto text-center language">
        <div
          onClick={() =>
            setLanguageTag('pt')
          }
          style={{ display: "inline" }}
        >
          <span
            className="iconify language-icon mr-5"
            data-icon="twemoji-flag-for-flag-brazil"
            data-inline="false"
            id={primaryLanguageIconId}
          ></span>
        </div>
        <div
          onClick={() =>
            setLanguageTag('en')
          }
          style={{ display: "inline" }}
        >
          <span
            className="iconify language-icon"
            data-icon="twemoji-flag-for-united-states"
            data-inline="false"
            id={secondaryLanguageIconId}
          ></span>
        </div>
      </div>
      <About
        resumeBasicInfo={resumeData.basic_info}
        sharedBasicInfo={sharedData.basic_info}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Skills
        sharedSkills={sharedData.skills}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Experience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Footer sharedBasicInfo={sharedData.basic_info} />
    </div>
  );
}
