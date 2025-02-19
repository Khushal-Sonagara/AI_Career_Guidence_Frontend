import PhotoPreview from "../preview/PhotoPreview";
import { MapPin, Phone, Mail, Globe } from "lucide-react";

function Template_4({ resumeInfo }) {
    if (!resumeInfo?.personalDetails) {
        return null;
    }

    return (
        <div style={{ width: "820px", position: "relative", margin: "auto" }}>
            {/* Header */}
            <div
                style={{
                    backgroundColor: "#323B4C",
                    color: "white",
                    padding: "40px 30px",
                    position: "relative",
                    minHeight: "200px",
                    textAlign: "center"
                }}
            >
                <h1 style={{ fontSize: "28px", marginBottom: "5px", fontWeight: "bold" }}>
                    {resumeInfo?.personalDetails.firstName} {resumeInfo?.personalDetails.lastName}
                </h1>
                <h2 style={{ fontSize: "18px", fontWeight: "normal", opacity: 0.9 }}>
                    {resumeInfo?.personalDetails.jobTitle}
                </h2>
            </div>

            {/* Main Content */}
            <div style={{ display: "flex", position: "relative" }}>
                {/* Left Column */}
                <div
                    style={{
                        width: "35%",
                        backgroundColor: "#f5f5f5",
                        padding: "120px 20px 30px",
                        position: "relative"
                    }}
                >
                    {resumeInfo?.resumePhoto && (
                        <div
                            style={{
                                position: "absolute",
                                left: "50%",
                                transform: "translateX(-50%)",
                                top: "-80px",
                                width: "150px",
                                height: "150px",
                                borderRadius: "50%",
                                overflow: "hidden",
                                border: "4px solid white",
                                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                            }}
                        >
                            <PhotoPreview resumeInfo={resumeInfo.resumePhoto} />
                        </div>
                    )}

                    {/* Contact */}
                    <div style={{ marginBottom: "30px" }}>
                        <h2
                            style={{
                                fontSize: "20px",
                                color: "#323B4C",
                                marginBottom: "15px",
                                borderBottom: "2px solid #323B4C",
                                paddingBottom: "8px",
                            }}
                        >
                            CONTACT
                        </h2>
                        <div style={{ fontSize: "14px", color: "#4a4a4a" }}>
                            {resumeInfo?.personalDetails.phoneNumber && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Phone size={16} style={{ marginRight: "10px", color: "#323B4C" }} />
                                    <span>{resumeInfo.personalDetails.phoneNumber}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.email && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Mail size={16} style={{ marginRight: "10px", color: "#323B4C" }} />
                                    <span>{resumeInfo.personalDetails.email}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.address && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <MapPin size={16} style={{ marginRight: "10px", color: "#323B4C" }} />
                                    <span>{resumeInfo.personalDetails.address}</span>
                                </div>
                            )}
                            {resumeInfo?.personalDetails.website && (
                                <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                    <Globe size={16} style={{ marginRight: "10px", color: "#323B4C" }} />
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
                                    color: "#323B4C",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid #323B4C",
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
                                                backgroundColor: "#323B4C",
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
                                    color: "#323B4C",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid #323B4C",
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
                                                backgroundColor: "#323B4C",
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
                                    color: "#323B4C",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid #323B4C",
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
                                    color: "#323B4C",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid #323B4C",
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
                                                color: "#323B4C",
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
                                            {new Date(experience.startDate).getFullYear()} -{" "}
                                            {experience.endDate ? new Date(experience.endDate).getFullYear() : "PRESENT"}
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
                                    color: "#323B4C",
                                    marginBottom: "15px",
                                    borderBottom: "2px solid #323B4C",
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
                                                color: "#323B4C",
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
                                            {new Date(education.startDate).getFullYear()} -{" "}
                                            {education.endDate ? new Date(education.endDate).getFullYear() : "PRESENT"}
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
    )
}

export default Template_4;
