import { Phone, Mail, Linkedin } from 'lucide-react';

function Template_2({ resumeInfo }) {
    if (!resumeInfo?.personalDetails) {
        return null;
    }

    return (
        <div style={{ fontFamily: 'Arial, sans-serif' }}>
            {/* Name and Job Title */}
            <div style={{ textAlign: 'left' }}>
                <h1 style={{ fontSize: '4rem', fontWeight: 'bold', color: 'black' }}>
                    {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
                </h1>
                <h2 style={{ fontSize: '2rem', fontWeight: '500', color: 'black' }}>
                    {resumeInfo?.personalDetails.jobTitle}
                </h2>
            </div>

            {/* Contact Details */}
            {(resumeInfo?.personalDetails.phoneNumber?.length > 0 ||
                resumeInfo?.personalDetails.email?.length > 0 ||
                resumeInfo?.personalDetails.linkedIn?.length > 0) && (
                    <div style={{ textAlign: 'left', marginBottom: '20px' }}>
                        <div style={{ fontSize: '1rem', color: 'gray' }}>
                            {resumeInfo?.personalDetails.phoneNumber?.length > 0 && (
                                <a
                                    href={`tel:${resumeInfo?.personalDetails.phoneNumber}`}
                                    style={{
                                        color: '#163853',
                                        textDecoration: 'none',
                                        marginRight: '10px',
                                    }}
                                >
                                    {resumeInfo?.personalDetails.phoneNumber}
                                </a>
                            )}
                            {resumeInfo?.personalDetails.email?.length > 0 && (
                                <>
                                    {resumeInfo?.personalDetails.phoneNumber?.length > 0 && (
                                        <span style={{ margin: '0 10px' }}>•</span>
                                    )}
                                    <a
                                        href={`mailto:${resumeInfo?.personalDetails.email}`}
                                        style={{
                                            color: '#163853',
                                            textDecoration: 'none',
                                            marginRight: '10px',
                                        }}
                                    >
                                        {resumeInfo?.personalDetails.email}
                                    </a>
                                </>
                            )}
                            {resumeInfo?.personalDetails.linkedIn?.length > 0 && (
                                <>
                                    {(resumeInfo?.personalDetails.phoneNumber?.length > 0 ||
                                        resumeInfo?.personalDetails.email?.length > 0) && (
                                            <span style={{ margin: '0 10px' }}>•</span>
                                        )}
                                    <a
                                        href={resumeInfo?.personalDetails.linkedIn}
                                        style={{
                                            color: '#163853',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        {resumeInfo?.personalDetails.linkedIn}
                                    </a>
                                </>
                            )}
                        </div>
                        <hr />
                    </div>
                )}

            {/* Work Experience */}
            {resumeInfo?.resumeExperiences?.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>
                        Work Experience
                    </h3>
                    {resumeInfo?.resumeExperiences.map((experience, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            {/* Left Side: Company Name, Dates */}
                            <div style={{ flex: '1' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'gray' }}>
                                    {experience?.companyName}
                                </h4>
                                <p style={{ fontSize: '1rem', color: 'gray' }}>
                                    {new Date(experience?.startDate).toLocaleDateString()} -{' '}
                                    {experience?.endDate ? new Date(experience.endDate).toLocaleDateString() : 'Present'}
                                </p>
                            </div>
                            {/* Right Side: Title, Summary */}
                            <div style={{ flex: '2' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>
                                    {experience?.title}
                                </h4>
                                <p style={{ fontSize: '1rem', color: 'gray' }} dangerouslySetInnerHTML={{ __html: experience?.workSummary }} />
                            </div>
                        </div>
                    ))}
                    <hr />
                </div>
            )}

            {/* Education */}
            {resumeInfo?.resumeEducation?.length > 0 && (
                <div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'black', marginBottom: '20px' }}>
                        Education
                    </h3>
                    {resumeInfo?.resumeEducation.map((education, index) => (
                        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                            {/* Left Side: School Name, Dates */}
                            <div style={{ flex: '1' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'gray' }}>
                                    {education.universityOrSchoolName}
                                </h4>
                                <p style={{ fontSize: '1rem', color: 'gray' }}>
                                    {education.startDate ? education.startDate.split('T')[0] : ''} -{' '}
                                    {education.endDate ? education.endDate.split('T')[0] : ''}
                                </p>
                            </div>
                            {/* Right Side: Degree, Major, Description */}
                            <div style={{ flex: '2' }}>
                                <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>
                                    {education.degree} in {education.major}
                                </h4>
                                <p style={{ fontSize: '1rem', color: 'gray' }}>{education.description}</p>
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
                    <div style={{ flex: '1', paddingRight: '20px', borderRight: '2px solid gray', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>Skills</h3>
                        <div style={{ fontSize: '1rem', color: 'gray' }}>
                            {resumeInfo?.resumeSkills.map((skill, index) => (
                                <p key={index}>{skill.skillName}</p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Language */}
                {resumeInfo?.resumeLanguages?.length > 0 && (
                    <div style={{ flex: '1', paddingRight: '20px', borderRight: '2px solid gray', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>Language</h3>
                        <div style={{ fontSize: '1rem', color: 'gray' }}>
                            {resumeInfo?.resumeLanguages.map((language, index) => (
                                <p key={index}>
                                    {language.language} ({language.proficiencyLevel})
                                </p>
                            ))}
                        </div>
                    </div>
                )}

                {/* Certifications */}
                {resumeInfo?.resumeCertifications?.length > 0 && (
                    <div style={{ flex: '1', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'black' }}>Certifications</h3>
                        <div style={{ fontSize: '1rem', color: 'gray' }}>
                            {resumeInfo?.resumeCertifications.map((certification, index) => (
                                <p key={index}>
                                    {certification.certificationName} ({certification.issuingOrganization})
                                </p>
                            ))}
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}

export default Template_2;
