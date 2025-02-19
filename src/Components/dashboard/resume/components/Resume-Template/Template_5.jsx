function Template_5({ resumeInfo }) {
    if (!resumeInfo?.personalDetails) {
        return null
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Name and Job Title */}
            <div style={{ textAlign: 'center', }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 'bold' }}>
                    {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
                </h1>
                <h2 style={{ fontSize: '2rem', fontWeight: '500' }}>
                    {resumeInfo?.personalDetails.jobTitle}
                </h2>
            </div>

            {/* Contact Details */}
            {(resumeInfo?.personalDetails.phoneNumber?.length > 0 ||
                resumeInfo?.personalDetails.email?.length > 0 ||
                resumeInfo?.personalDetails.linkedIn?.length > 0) && (
                    <div style={{ textAlign: 'center' }}>
                        {/* <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>Contact</h3> */}
                        <div style={{ marginBottom: '20px' }}>
                            {resumeInfo?.personalDetails.phoneNumber?.length > 0 && (
                                <a
                                    href={`tel:${resumeInfo?.personalDetails.phoneNumber}`}
                                    style={{ fontSize: '1rem', color: '#163853', textDecoration: 'none', marginRight: '10px' }}
                                >
                                    {resumeInfo?.personalDetails.phoneNumber}
                                </a>
                            )}
                            {resumeInfo?.personalDetails.email?.length > 0 && (
                                <a
                                    href={`mailto:${resumeInfo?.personalDetails.email}`}
                                    style={{ fontSize: '1rem', color: '#163853', textDecoration: 'none', marginRight: '10px' }}
                                >
                                    {resumeInfo?.personalDetails.email}
                                </a>
                            )}
                            {resumeInfo?.personalDetails.linkedIn?.length > 0 && (
                                <a
                                    href={resumeInfo?.personalDetails.linkedIn}
                                    style={{ fontSize: '1rem', color: '#163853', textDecoration: 'none' }}
                                >
                                    {resumeInfo?.personalDetails.linkedIn}
                                </a>
                            )}
                        </div>
                        <hr />
                    </div>
                )}

            {/* Work Experience */}
            {resumeInfo?.resumeExperiences?.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Work Experience</h3>
                    {resumeInfo?.resumeExperiences.map((experience, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            {/* Left Side: Company Name, Dates */}
                            <div style={{ flex: '1' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{experience?.companyName}</h4>
                                <p style={{ fontSize: '1rem' }}>
                                    {new Date(experience?.startDate).toLocaleDateString()} -{' '}
                                    {experience?.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                                </p>
                            </div>
                            {/* Right Side: Title, Summary */}
                            <div style={{ flex: '2' }}>
                                <h4 style={{ fontSize: '1.25rem', color: 'black' }}>{experience?.title}</h4>
                                <p style={{ fontSize: '1rem' }} dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
            )}

            {/* Education */}
            {resumeInfo?.resumeEducation?.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Education</h3>
                    {resumeInfo?.resumeEducation.map((education, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            {/* Left Side: School Name, Dates */}
                            <div style={{ flex: '1' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{education.universityOrSchoolName}</h4>
                                <p style={{ fontSize: '1rem' }}>
                                    {education.startDate ? education.startDate.split('T')[0] : ''} - {' '}
                                    {education.endDate ? education.endDate.split('T')[0] : ''}
                                </p>
                            </div>
                            {/* Right Side: Degree, Major, Description */}
                            <div style={{ flex: '2' }}>
                                <h4 style={{ fontSize: '1.25rem', color: 'black' }}>
                                    {education.degree} in {education.major}
                                </h4>
                                <p style={{ fontSize: '1rem' }}>{education.description}</p>
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
            )}

            {/* Project */}
            {resumeInfo?.resumeProjects?.length > 0 && (
                <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                    <h2
                        className="fw-bold"
                        style={{
                            fontSize: '25px',
                            marginBottom: '20px',
                        }}
                    >
                        PROJECT
                    </h2>

                    {/* Loop through each project */}
                    {resumeInfo.resumeProjects.map((project, index) => (
                        <div
                            key={index}
                            style={{
                                marginBottom: '1.5rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                gap: '10px',
                                pageBreakInside: 'avoid',
                            }}
                        >
                            {/* Left Side: Project Title and Dates */}
                            <div style={{ flex: '1' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                                    {project.title}
                                </h4>
                                <p style={{ fontSize: '1rem' }}>
                                    {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'N/A'}{" "}
                                    {" - "}
                                    {project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Present'}
                                </p>
                            </div>

                            {/* Right Side: Technologies, Description, and Project URL */}
                            <div style={{ flex: '2' }}>
                                {/* Technologies Used */}
                                {project.technologiesUsed && (
                                     <h4 style={{ fontSize: '1.25rem', color: 'black' }}>
                                        <strong>Technologies: </strong> {project.technologiesUsed}
                                    </h4>
                                )}

                                {/* Project Description */}
                                {project.description && (
                                    <div
                                        style={{
                                            fontSize: '1rem',
                                            marginTop: '0.5rem',
                                            marginBottom: '0.5rem',
                                        }}
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
                        </div>
                    ))}
                    <hr />
                </div>
            )}



            {/* Skills, Language, Certificates */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {/* Skills */}
                {resumeInfo?.resumeSkills?.length > 0 && (
                    <div style={{ flex: '1', paddingRight: '20px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Skills</h3>
                        <ul style={{ fontSize: '1rem' }}>
                            {resumeInfo?.resumeSkills.map((skill, index) => (
                                <li key={index}>{skill.skillName}</li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Language */}
                {resumeInfo?.resumeLanguages?.length > 0 && (
                    <div style={{ flex: '1', paddingRight: '20px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Language</h3>
                        <ul style={{ fontSize: '1rem' }}>
                            {resumeInfo?.resumeLanguages.map((language, index) => (
                                <li key={index}>
                                    {language.language} ({language.proficiencyLevel})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Certificates */}
                {resumeInfo?.resumeCertifications?.length > 0 && (
                    <div style={{ flex: '1' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Certifications</h3>
                        <ul style={{ fontSize: '1rem' }}>
                            {resumeInfo?.resumeCertifications.map((certification, index) => (
                                <li key={index}>
                                    {certification.certificationName} ({certification.issuingOrganization})
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );

}

export default Template_5