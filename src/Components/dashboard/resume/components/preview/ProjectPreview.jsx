import React from 'react';

function ProjectPreview({ resumeInfo }) {
    if (!Array.isArray(resumeInfo) || resumeInfo.length === 0) {
        return null; // Prevent rendering if no projects exist
    }

    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h2
                className="text-center fw-bold"
                style={{
                    fontSize: '0.875rem',
                    marginBottom: '0.5rem',
                    color: resumeInfo?.[0]?.themeColor // Use first project's theme color
                }}
            >
                Projects
            </h2>

            <hr style={{ borderColor: resumeInfo?.[0]?.themeColor }} />

            {/* Flex container for two-column layout */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '10px',
                    pageBreakInside: 'avoid', // Prevents project split across pages when printing
                }}
            >
                {resumeInfo.map((project, index) => (
                    <div
                        key={index}
                        style={{
                            width: '48%', // Ensures two projects fit per row, considering margins
                            padding: '5px',
                            pageBreakInside: 'avoid', // Prevents breaking a single project across pages when printing
                        }}
                    >
                        {/* Project Title */}
                        <h2
                            className="fw-bold"
                            style={{
                                fontSize: '0.875rem',
                                color: project.themeColor
                            }}
                        >
                            {project.title}
                        </h2>

                        {/* Start & End Date */}
                        <h2 style={{ fontSize: '0.75rem' }}>
                            {project.startDate ? new Date(project.startDate).toLocaleDateString() : "N/A"} 
                            {" - "} 
                            {project.endDate ? new Date(project.endDate).toLocaleDateString() : "Present"}
                        </h2>

                        {/* Technologies Used */}
                        {project.technologiesUsed && (
                            <p style={{ fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                <strong>Technologies: </strong> {project.technologiesUsed}
                            </p>
                        )}

                        {/* Project Description (HTML rendering for bullet points) */}
                        {project.description && (
                            <div
                                style={{ fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}
                                dangerouslySetInnerHTML={{ __html: project.description }}
                            />
                        )}

                        {/* Project URL */}
                        {project.projectURL && (
                            <p style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                                <a href={project.projectURL} target="_blank" rel="noopener noreferrer">
                                    {project.projectURL}
                                </a>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectPreview;
