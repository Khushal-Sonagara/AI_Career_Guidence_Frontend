import PhotoPreview from '../preview/PhotoPreview';
import { Phone, Mail, Linkedin } from 'lucide-react';

function Template_3({ resumeInfo }) {
  if (!resumeInfo?.personalDetails) {
    return null;
  }

  return (
    <table id="resume-table" style={{ width: '820px', borderCollapse: 'collapse', margin: 'auto' }}>
      <colgroup>
        <col style={{ width: '35%' }} />
        <col style={{ width: '65%' }} />
      </colgroup>
      <tbody>
        <tr>
          {/* Left Side - Dark Background */}
          <td
            style={{
              verticalAlign: 'top',
              padding: '20px',
              backgroundColor: '#163853',
              color: 'white',
              borderRadius: '8px 0 0 8px',
              width: '35%',
            }}
          >
            {/* Photo */}
            {resumeInfo?.resumePhoto && (
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div
                  style={{
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid white',
                    display: 'inline-block',
                  }}
                >
                  <PhotoPreview resumeInfo={resumeInfo.resumePhoto} />
                </div>
              </div>
            )}

            {/* Contact Section */}
            {(resumeInfo?.personalDetails.phoneNumber || resumeInfo?.personalDetails.email || resumeInfo?.personalDetails.linkedIn) && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>CONTACT</h2>
                <hr />
                <div>
                  {resumeInfo?.personalDetails.phoneNumber && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <img src="/icons/phone.png" alt="Phone" width="16px" style={{ marginRight: '8px' }} />
                      <a href={`tel:${resumeInfo?.personalDetails.phoneNumber}`} style={{ color: 'white', textDecoration: 'none' }}>
                        {resumeInfo?.personalDetails.phoneNumber}
                      </a>
                    </div>
                  )}
                  {resumeInfo?.personalDetails.email && (
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
                      <img src="/icons/email.png" alt="Email" width="16px" style={{ marginRight: '8px' }} />
                      <a href={`mailto:${resumeInfo?.personalDetails.email}`} style={{ color: 'white', textDecoration: 'none' }}>
                        {resumeInfo?.personalDetails.email}
                      </a>
                    </div>
                  )}
                  {resumeInfo?.personalDetails.linkedIn && (
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <img src="/icons/linkedin.png" alt="LinkedIn" width="16px" style={{ marginRight: '8px' }} />
                      <a href={resumeInfo?.personalDetails.linkedIn} style={{ color: 'white', textDecoration: 'none' }}>
                        {resumeInfo?.personalDetails.linkedIn}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Skills */}
            {resumeInfo?.resumeSkills?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>SKILLS</h2>
                <hr />
                <ul style={{ padding: '0', listStyle: 'none', fontSize: '14px' }}>
                  {resumeInfo.resumeSkills.map((skill, index) => (
                    <li key={index} style={{ marginBottom: '6px' }}>
                      {skill.skillName}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Languages */}
            {resumeInfo?.resumeLanguages?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', marginBottom: '10px', fontWeight: 'bold' }}>LANGUAGES</h2>
                <hr />
                <ul style={{ padding: '0', listStyle: 'none', fontSize: '14px' }}>
                  {resumeInfo.resumeLanguages.map((language, index) => (
                    <li key={index} style={{ marginBottom: '6px' }}>
                      {language.language} ({language.proficiencyLevel})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </td>

          {/* Right Side - White Background */}
          <td style={{ verticalAlign: 'top', padding: '20px', width: '65%' }}>
            {/* Personal Detail */}
            <div style={{ textAlign: 'left', marginBottom: '20px' }}>
              <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '5px' }}>
                {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
              </h1>
              <h2 style={{ fontSize: '18px', fontWeight: '500', marginBottom: '10px' }}>
                <u>{resumeInfo?.personalDetails.jobTitle}</u>
              </h2>
            </div>

            {/* Summary */}
            {resumeInfo?.resumeSummary?.summaryText && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>SUMMARY</h2>
                <hr />
                <p style={{ fontSize: '14px', marginBottom: '0' }}>{resumeInfo?.resumeSummary?.summaryText}</p>
              </div>
            )}

            {/* Work Experience */}
            {resumeInfo?.resumeExperiences?.length > 0 && (
              <div style={{ marginBottom: '30px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>WORK EXPERIENCE</h2>
                <hr />
                {resumeInfo.resumeExperiences.map((experience, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{experience.title}</h3>
                    <p style={{ fontSize: '14px', margin: '5px 0' }}>
                      {experience.companyName} | {new Date(experience.startDate).toLocaleDateString()} -{' '}
                      {experience.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                    </p>
                    <p style={{ fontSize: '14px', margin: '0' }} dangerouslySetInnerHTML={{ __html: experience.workSummary }} />
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {resumeInfo?.resumeEducation?.length > 0 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>EDUCATION</h2>
                <hr />
                {resumeInfo.resumeEducation.map((education, index) => (
                  <div key={index} style={{ marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{education.universityOrSchoolName}</h3>
                    <p style={{ fontSize: '14px', margin: '5px 0' }}>
                      {education.degree} in {education.major} | {education.startDate} - {education.endDate || 'Present'}
                    </p>
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
