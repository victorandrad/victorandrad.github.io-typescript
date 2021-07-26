import React, { useEffect, useState } from "react";
import Badge from "react-bootstrap/Badge";
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

interface ExperienceProps {
  resumeBasicInfo: any;
  resumeExperience: any;
}

export default function Experience({ resumeBasicInfo, resumeExperience }: ExperienceProps) {
  const [sectionName, setSectionName] = useState('');
  const [work, setWork] = useState('');

  useEffect(() => {
    if (resumeExperience && resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.experience);
  
      setWork(resumeExperience.map((work: any, i: any) => {
        const technologies = work.technologies;
        const mainTechnologies = work.mainTech;
  
        let mainTech = mainTechnologies.map((technology: any, i: any) => {
          return (
            <Badge pill className="main-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
  
        let tech = technologies.map((technology: any, i: any) => {
          return (
            <Badge pill className="experience-badge mr-2 mb-2" key={i}>
              {technology}
            </Badge>
          );
        });
  
        return (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            date={work.years}
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={<i className={`fab experience-icon . ${work.class}`}></i>}
            key={i}
          >
            <div style={{ textAlign: "left", marginBottom: "4px" }}>
              {mainTech}
            </div>
  
            <h3
              className="vertical-timeline-element-title"
              style={{ textAlign: "left" }}
            >
              {work.title}
            </h3>
            <h4
              className="vertical-timeline-element-subtitle"
              style={{ textAlign: "left" }}
            >
              {work.company}
            </h4>
            <div style={{ textAlign: "left", marginTop: "15px" }}>{tech}</div>
          </VerticalTimelineElement>
        );
      }));
    }
  }, [resumeBasicInfo, resumeExperience])

  return (
    <section id="resume" className="pb-5">
      <div className="col-md-12 mx-auto">
        <div className="col-md-12">
          <h1 className="section-title" style={{ color: "black" }}>
            <span className="text-black" style={{ textAlign: "center" }}>
              {sectionName}
            </span>
          </h1>
        </div>
      </div>
      <div className="col-md-8 mx-auto">
        <VerticalTimeline>
          {work}
          <VerticalTimelineElement
            iconStyle={{
              background: "#AE944F",
              color: "#fff",
              textAlign: "center",
            }}
            icon={
              <i className="fas fa-hourglass-start mx-auto experience-icon"></i>
            }
          />
        </VerticalTimeline>
      </div>
    </section>
  );
}
