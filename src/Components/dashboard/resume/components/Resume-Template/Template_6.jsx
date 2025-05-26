import { MapPin, Phone, Mail, Globe } from "lucide-react";

function Template_6({ resumeInfo }) {
    if (!resumeInfo?.personalDetails) {
        return null;
    }

    return (
        <div style={{ width: "820px", position: "relative" }}>
            {/* Header */}
            <div
                style={{
                    backgroundColor: "#323B4C",
                    color: "white",
                    padding: "40px 30px",
                    position: "relative",
                    minHeight: "200px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center"
                }}
            >
                <div>
                    <h1 style={{ fontSize: "40px", marginBottom: "5px", fontWeight: "bold", whiteSpace: "nowrap" }}>
                        {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
                    </h1>
                    <h2 style={{ fontSize: "25px", fontWeight: "300", opacity: 0.9, whiteSpace: "nowrap" }}>
                        {resumeInfo?.personalDetails.jobTitle}
                    </h2>
                </div>
            </div>

            {/* Main Content */}
            <div style={{ display: "flex", position: "relative" }}>
                {/* Left Column */}
                <div
                    style={{
                        width: "35%",
                        backgroundColor: "#f5f5f5",
                        padding: "40px 20px 30px",
                        position: "relative"
                    }}
                >
                    {/* Contact */}
                    <div style={{ marginBottom: "30px" }}>
                        <h2
                            style={{
                                fontSize: "20px",
                                color: "black",
                                marginBottom: "15px",
                                borderBottom: "2px solid black",
                                paddingBottom: "8px",
                            }}
                        >
                            CONTACT
                        </h2>
                        <div style={{ fontSize: "14px", color: "#4a4a4a" }}>
                            {resumeInfo?.personalDetails.phoneNumber && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Phone size={16} style={{ marginRight: "10px", color: "black" }} />
                                    <span>{resumeInfo.personalDetails.phoneNumber}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.email && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Mail size={16} style={{ marginRight: "10px", color: "black" }} />
                                    <span>{resumeInfo.personalDetails.email}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.address && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <MapPin size={16} style={{ marginRight: "10px", color: "black" }} />
                                    <span>{resumeInfo.personalDetails.address}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.website && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Globe size={16} style={{ marginRight: "10px", color: "black" }} />
                                    <span>{resumeInfo.personalDetails.website}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Skills */}
                    {resumeInfo?.resumeSkills?.length > 0 && (
                        <div style={{ marginBottom: "30px" }}>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid black",
                                    paddingBottom: "8px",
                                }}
                            >
                                SKILLS
                            </h2>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#4a4a4a",
                                }}
                            >
                                {resumeInfo.resumeSkills.map((skill, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            marginBottom: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "4px",
                                                height: "4px",
                                                backgroundColor: "black",
                                                borderRadius: "50%",
                                                marginRight: "10px",
                                            }}
                                        ></span>
                                        {skill.skillName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Languages */}
                    {resumeInfo?.resumeLanguages?.length > 0 && (
                        <div style={{ marginBottom: "30px" }}>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid black",
                                    paddingBottom: "8px",
                                }}
                            >
                                LANGUAGES
                            </h2>
                            <ul
                                style={{
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "#4a4a4a",
                                }}
                            >
                                {resumeInfo.resumeLanguages.map((language, index) => (
                                    <li
                                        key={index}
                                        style={{
                                            marginBottom: "8px",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <span
                                            style={{
                                                display: "inline-block",
                                                width: "4px",
                                                height: "4px",
                                                backgroundColor: "black",
                                                borderRadius: "50%",
                                                marginRight: "10px",
                                            }}
                                        ></span>
                                        {language.language} ({language.proficiencyLevel})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right Column */}
                <div
                    style={{
                        width: "65%",
                        padding: "40px 30px",
                        backgroundColor: "#ffffff",
                    }}
                >
                    {/* Profile */}
                    {resumeInfo?.resumeSummary?.summaryText && (
                        <div style={{ marginBottom: "40px" }}>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid black",
                                    paddingBottom: "8px",
                                }}
                            >
                                PROFILE
                            </h2>
                            <p
                                style={{
                                    fontSize: "14px",
                                    color: "#4a4a4a",
                                    lineHeight: "1.6",
                                }}
                            >
                                {resumeInfo.resumeSummary.summaryText}
                            </p>
                        </div>
                    )}

                    {/* Work Experience */}
                    {resumeInfo?.resumeExperiences?.length > 0 && (
                        <div style={{ marginBottom: "40px" }}>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid black",
                                    paddingBottom: "8px",
                                }}
                            >
                                WORK EXPERIENCE
                            </h2>
                            {resumeInfo.resumeExperiences.map((experience, index) => (
                                <div key={index} style={{ marginBottom: "20px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "16px",
                                                color: "black",
                                                fontWeight: "bold",
                                                margin: "0",
                                            }}
                                        >
                                            {experience.title}
                                        </h3>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "#7f8c8d",
                                            }}
                                        >
                                            {new Date(experience.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -
                                            {experience.endDate ? new Date(experience.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Present"}
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "#7f8c8d",
                                            marginTop: "0",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {experience.companyName}
                                    </p>
                                    <div
                                        style={{
                                            fontSize: "14px",
                                            color: "#4a4a4a",
                                            lineHeight: "1.6",
                                        }}
                                        dangerouslySetInnerHTML={{ __html: experience.workSummary }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Education */}
                    {resumeInfo?.resumeEducation?.length > 0 && (
                        <div>
                            <h2
                                style={{
                                    fontSize: "20px",
                                    color: "black",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid black",
                                    paddingBottom: "8px",
                                }}
                            >
                                EDUCATION
                            </h2>
                            {resumeInfo.resumeEducation.map((education, index) => (
                                <div key={index} style={{ marginBottom: "20px" }}>
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "flex-start",
                                            marginBottom: "5px",
                                        }}
                                    >
                                        <h3
                                            style={{
                                                fontSize: "16px",
                                                color: "black",
                                                fontWeight: "bold",
                                                margin: "0",
                                            }}
                                        >
                                            {education.degree} in {education.major}
                                        </h3>
                                        <span
                                            style={{
                                                fontSize: "14px",
                                                color: "#7f8c8d",
                                            }}
                                        >
                                            {new Date(education.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })} -
                                            {education.endDate ? new Date(education.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : "Present"}
                                        </span>
                                    </div>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "#7f8c8d",
                                            marginTop: "0",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {education.universityOrSchoolName}
                                    </p>
                                    <p
                                        style={{
                                            fontSize: "14px",
                                            color: "#4a4a4a",
                                            margin: "0",
                                        }}
                                    >
                                        {education.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Template_6;
