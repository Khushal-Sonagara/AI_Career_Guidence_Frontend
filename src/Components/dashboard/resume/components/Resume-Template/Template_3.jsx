
import PhotoPreview from '../preview/PhotoPreview';
import { Phone, Mail, Linkedin } from 'lucide-react';

function Template_3({ resumeInfo }) {
  if (!resumeInfo?.personalDetails) {
    return null
  }

  return (
    <table id="resume-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '40%' }} />
        <col style={{ width: '60%' }} />
      </colgroup>
      <tbody>
        <tr>
          {/* Left Side - Peacock Blue */}
          <td style={{
            verticalAlign: 'top',
            padding: '15px',
            backgroundColor: '#163853',
            color: 'white',
            borderRadius: '8px 0 0 8px'
          }}>

            {/* Photo */}
            {resumeInfo?.resumePhoto && (
              <div style={{ textAlign: 'center', margin: '50px', display: 'flex', justifyContent: 'center' }}>
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    display: 'inline-block',
                    border: '3px solid white',
                  }}
                >
                  <PhotoPreview resumeInfo={resumeInfo.resumePhoto} />
                </div>
              </div>
            )}

            {/* Contact */}
            {(resumeInfo?.personalDetails.phoneNumber?.length > 0 ||
              resumeInfo?.personalDetails.email?.length > 0 ||
              resumeInfo?.personalDetails.linkedIn?.length > 0) && (
                <div>
                  <h2 className="fw-bold" style={{ fontSize: '25px', marginBottom: '8px' }}>
                    CONTACT
                  </h2>
                  <hr />
                  <div style={{ marginTop: '10px' }}>
                    {resumeInfo?.personalDetails.phoneNumber?.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Phone size={16} style={{ marginRight: '8px' }} />
                        <a
                          href={`tel:${resumeInfo?.personalDetails.phoneNumber}`}
                          style={{ fontSize: '1rem', color: 'white', textDecoration: 'none' }}
                        >
                          {resumeInfo?.personalDetails.phoneNumber}
                        </a>
                      </div>
                    )}

                    {resumeInfo?.personalDetails.email?.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Mail size={16} style={{ marginRight: '8px' }} />
                        <a
                          href={`mailto:${resumeInfo?.personalDetails.email}`}
                          style={{ fontSize: '1rem', color: 'white', textDecoration: 'none' }}
                        >
                          {resumeInfo?.personalDetails.email}
                        </a>
                      </div>
                    )}

                    {resumeInfo?.personalDetails.linkedIn?.length > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                        <Linkedin size={16} style={{ marginRight: '8px' }} />
                        <a href={resumeInfo?.personalDetails.linkedIn} style={{ fontSize: '1rem', color: 'white', textDecoration: 'none' }}>
                          {resumeInfo?.personalDetails.linkedIn}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

            {/* Education */}
            {resumeInfo?.resumeEducation?.length > 0 && (
              <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                <h2 className="fw-bold" style={{ fontSize: '25px', marginBottom: '8px' }}>
                  EDUCATION
                </h2>
                <hr />
                {resumeInfo?.resumeEducation.map((education, index) => (
                  <div key={index} style={{ marginTop: '20px', marginBottom: '20px' }}>
                    <h2 className="fw-bold" style={{ fontSize: '1rem' }}>
                      {education.universityOrSchoolName}
                    </h2>
                    <div className="d-flex justify-content-between" style={{ fontSize: '0.75rem' }}>
                      <span>
                        {education.degree} in {education.major}
                      </span>
                      <span>
                        {education.startDate ? education.startDate.split('T')[0] : ''} -
                        {education.endDate ? education.endDate.split('T')[0] : ''}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.75rem', marginTop: '8px', marginBottom: '8px' }}>{education.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {resumeInfo?.resumeSkills?.length > 0 && (
              <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                <h2 className="fw-bold" style={{ fontSize: '25px', marginBottom: '8px' }}>
                  SKILLS
                </h2>
                <hr />
                <div className="g-3" style={{ marginTop: '16px', marginBottom: '16px' }}>
                  {resumeInfo?.resumeSkills.map((skill, index) => (
                    <div key={index} className="col-6" style={{ marginTop: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1rem', fontWeight: '500' }}>{skill.skillName}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language */}
            {resumeInfo?.resumeLanguages?.length > 0 && (
              <div style={{ marginTop: '2.5rem' }}>
                <h2 className="fw-bold" style={{ fontSize: '25px', marginBottom: '8px' }}>
                  LANGUAGE
                </h2>
                <hr />
                {resumeInfo?.resumeLanguages.map((language, index) => (
                  <div key={index} className="d-flex justify-content-between" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <h2 className="fw-bold" style={{ fontSize: '1rem' }}>
                      {language?.language} (<span style={{ fontSize: '0.75rem' }}>{language?.proficiencyLevel}</span>)
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </td>

          {/* Right Side - White Background */}
          <td style={{ verticalAlign: 'top', padding: '15px' }}>

            {/* Personal Detail */}
            <div style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '15px' }}>
              <div style={{ padding: '100px' }}>
                <h2
                  style={{
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    marginBottom: '4px',
                  }}
                >
                  {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
                </h2>

                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: '500',
                    marginBottom: '10px',
                  }}
                >
                  <u>{resumeInfo?.personalDetails.jobTitle}</u>
                </h3>
              </div>
            </div>

            {/* Summary Text */}
            {resumeInfo?.resumeSummary?.summaryText?.length > 0 && (
              <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                <h2 className="fw-bold" style={{ fontSize: '25px', marginBottom: '8px' }}>
                  SUMMARY
                </h2>
                <hr />
                <p style={{ fontSize: '0.875rem', marginBottom: '0' }}>{resumeInfo?.resumeSummary?.summaryText}</p>
              </div>
            )}


            {/* Experience */}
            {resumeInfo?.resumeExperiences?.length > 0 && (
              <div style={{ marginTop: '2.5rem', marginBottom: '1.5rem' }}>
                <h2
                  className="fw-bold "
                  style={{
                    fontSize: '25px', // Equivalent to Tailwind's text-sm
                    marginBottom: '8px',
                  }}
                >
                  WORK EXPERIENCE
                </h2>
                <hr />
                {resumeInfo?.resumeExperiences.map((experience, index) => (
                  <div key={index} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <h2
                      className="fw-bold"
                      style={{
                        fontSize: '1.25rem', // Equivalent to Tailwind's text-sm

                      }}
                    >
                      {experience?.title}
                    </h2>

                    <h2
                      className="d-flex justify-content-between"
                      style={{ fontSize: '0.875rem' }} // Equivalent to Tailwind's text-xs
                    >
                      {experience?.companyName}, {experience?.city}, {experience?.state}
                      <span>
                        {new Date(experience?.startDate).toLocaleDateString()} To
                        {experience?.endDate ? new Date(experience.endDate).toLocaleDateString() : "Present"}
                      </span>
                    </h2>
                    {/* Work Summary */}
                    <div
                      style={{ fontSize: '0.8rem', marginTop: '0.5rem', marginBottom: '0.5rem' }}
                      dangerouslySetInnerHTML={{ __html: experience?.workSummary }}
                    />
                  </div>
                ))}
              </div>
            )}


            {/* Project */}
            {resumeInfo?.resumeProjects?.length > 0 && (
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '25px',
                    marginBottom: '8px',
                  }}
                >
                  PROJECT
                </h2>
                <hr />

                {/* Flex container for two-column layout */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    gap: '10px',
                    pageBreakInside: 'avoid',
                  }}
                >
                  {resumeInfo.resumeProjects.map((project, index) => (
                    <div
                      key={index}
                      style={{
                        width: '48%',
                        padding: '5px',
                        pageBreakInside: 'avoid',
                      }}
                    >
                      {/* Project Title */}
                      <h2
                        className="fw-bold"
                        style={{
                          fontSize: '0.875rem',
                          color: project.themeColor,
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

                      {/* Project Description */}
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
            )}

            {/* Certificate */}
            {resumeInfo?.resumeCertifications?.length > 0 && (
              <div style={{ marginTop: '1.5rem' }}>
                <h2
                  className="fw-bold"
                  style={{
                    fontSize: '25px',
                    marginBottom: '8px',
                  }}
                >
                  CERTIFICATE
                </h2>
                <hr />
                {resumeInfo.resumeCertifications.map((certification, index) => (
                  <div key={index} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <h2 className="fw-bold" style={{ fontSize: '0.875rem' }}>
                      {certification?.certificationName}
                    </h2>
                    <h2 style={{ fontSize: '0.75rem' }}>
                      {certification?.issuingOrganization} | {new Date(certification?.issueDate).toLocaleDateString()} -
                      {certification?.expirationDate ? new Date(certification.expirationDate).toLocaleDateString() : "Present"}
                    </h2>
                    {certification?.credentialURL && (
                      <p style={{ fontSize: '0.75rem', wordBreak: 'break-word' }}>
                        {certification?.credentialURL}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Template_3;
