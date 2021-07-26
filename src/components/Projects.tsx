import React, { useEffect, useState } from "react";
import ProjectDetailsModal from "./ProjectDetailsModal";

interface ProjectsProps {
  resumeProjects: any;
  resumeBasicInfo: any;
}

export default function Projects({ resumeProjects, resumeBasicInfo }: ProjectsProps) {
  const [sectionName, setSectionName] = useState('');
  const [projects, setProjects] = useState('');
  const [deps, setDeps] = useState({});
  const [detailsModalShowState, setDetailsModalShowState] = useState(false);

  useEffect(() => {
    setSectionName(resumeBasicInfo?.section_name.projects);
    setProjects(resumeProjects?.map((projects: any) => {
      return (
        <div
          className="col-sm-12 col-md-6 col-lg-4"
          key={projects.title}
          style={{ cursor: "pointer" }}
        >
          <span className="portfolio-item d-block">
            <div className="foto" onClick={() => detailsModalShow(projects)}>
              <div>
                <img
                  src={projects.images[0]}
                  alt="projectImages"
                  height="230"
                  style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
                />
                <span className="project-date">{projects.startDate}</span>
                <br />
                <p className="project-title-settings mt-3">
                  {projects.title}
                </p>
              </div>
            </div>
          </span>
        </div>
      );
    }));
  }, [resumeBasicInfo, resumeProjects]);

  function detailsModalShow(data: any) {
    setDeps(data);
    setDetailsModalShowState(true);
  };

  const detailsModalClose = () => {
    setDetailsModalShowState(false)
  }

  return (
    <section id="portfolio">
      <div className="col-md-12">
        <h1 className="section-title" style={{ color: "black" }}>
          <span>{sectionName}</span>
        </h1>
        <div className="col-md-12 mx-auto">
          <div className="row mx-auto">{projects}</div>
        </div>
        <ProjectDetailsModal
          show={detailsModalShowState}
          onHide={detailsModalClose}
          data={deps}
        />
      </div>
    </section>
  );
}
