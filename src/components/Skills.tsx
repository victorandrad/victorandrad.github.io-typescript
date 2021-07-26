import React, { useEffect, useState } from "react";

interface SkillsProps {
  sharedSkills: any;
  resumeBasicInfo: any;
}

export default function Skills({ sharedSkills, resumeBasicInfo }: SkillsProps) {
  const [sectionName, setSectionName] = useState('');
  const [skills, setSkills] = useState('');

  useEffect(() => {
    if (sharedSkills && resumeBasicInfo) {
      setSectionName(resumeBasicInfo.section_name.skills);
      setSkills(sharedSkills.icons.map((skills: any, i: any) => {
        return (
          <li className="list-inline-item mx-3" key={i}>
            <span>
              <div className="text-center skills-tile">
                <i className={skills.class} style={{ fontSize: "220%" }}>
                  <p
                    className="text-center"
                    style={{ fontSize: "30%", marginTop: "4px" }}
                  >
                    {skills.name}
                  </p>
                </i>
              </div>
            </span>
          </li>
        );
      }));
    }
  }, [sharedSkills, resumeBasicInfo])

  return (
    <section id="skills">
      <div className="col-md-12">
        <div className="col-md-12">
          <h1 className="section-title">
            <span className="text-white">{sectionName}</span>
          </h1>
        </div>
        <div className="col-md-12 text-center">
          <ul className="list-inline mx-auto skill-icon">{skills}</ul>
        </div>
      </div>
    </section>
  );
}
