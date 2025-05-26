// src/components/SkillPrediction.jsx
import React, { useState } from 'react';
import { getJobRolePrediction } from '../../Services/JobRolePredictService';
import { Autocomplete, TextField, Chip, CircularProgress } from '@mui/material';

const skillsList = [
    "Web Development", "Mobile App Development", "Artificial Intelligence (AI) and Machine Learning",
    "Cybersecurity", "Database Development", "Data Analysis and Visualization", "Data Engineering",
    "Deep Learning", "Machine Learning", "Research on Artificial Intelligence and Machine Learning",
    "Cloud Computing", "Game Development", "Big Data Technologies", "Software Quality Testing",
    "UI/UX Knowledge", "Research on Cybersecurity", "Data Structure", "Blockchain", "Network Security",
    "TCP/Datagram Protocol", "Software Development", "Feature Engineering", "Dataset Generation",
    "Software Testing", "Website Building", "System Programming", "Software Quality Assurance",
    "Coding Bootcamps and Workshops", "Data Analytics", "Statistical Analysis Software", "Data Testing",
    "Web Application Development", "Programming Languages", "Computer Vision", "Operating Systems and Networking",
    "Cloud Technology", "Big Data Techniques", "Security Issues Related Work", "Application Security",
    "Dashboard Development", "Data Strategy", "Online Datasets", "Artificial Intelligence and Mathematics",
    "Data Architecture", "Cyber Security Conferences", "Coding Bootcamps & Workshops", "Cloud Services",
    "Algorithm Training", "Infrastructure Development", "Failure Analysis", "Email Cybersecurity",
    "Responsive UI and UX", "UX / Graphic Design", "Software Installation", "Software Selection",
    "Programming Languages and Tools", "Graphical User Interface (GUI) and Video Editing",
    "Digital Security", "Data Storytelling", "Neural Networks", "Data Visualization", "Computer Security",
    "Mobile App Development", "Software Testing Related Work", "Software Architectures", "Team Building",
    "Backend Development", "Frontend Development", "Web Games Development", "Data Analysis and Writing",
    "Database Testing", "Database Management", "Data Science", "Engineering Communication", "UI/UX Design",
    "UI/UX Related Jobs", "Website Build and Publish", "Data Scientist", "Artificial Intelligence and Technology",
    "Artificial Intelligence (AI) and Machine Learning for Research", "Software QA", "Cybersecurity Practice",
    "Cloud Compute", "Linux System Administration", "Linux Privacy", "Security Affairs",
    "Software Quality Assurance Register", "Application Development", "Data Engineering Blog Follow",
    "Machine Learning Journals Watch", "Software Distribution", "Data Policy", "Research on Blockchain",
    "Research on AI and ML", "Generative Adversarial Training", "AI & ML Knowledge",
    "Discussion on Data Science", "Algorithm Development", "Research on Mobile App Development",
    "Database Developer", "Block Chain Technology", "Structured Data Technologies",
    "Programming Languages Learning", "Web-Based Project Development", "Game Programming",
    "Browser-Based Games Development", "UX Psychology Knowledge", "Software Testing Course Completion",
    "Data Science Cognition", "Research on Cybersecurity and AI", "Object-Oriented Programming",
    "Email Security", "Big Data Technologies", "Linux System Design",
];

const getConfidenceColor = (confidence) => {
    switch (confidence) {
        case "High confidence": return "#28a745"; // Green
        case "Low confidence": return "#ffc107"; // Yellow
        default: return "#dc3545"; // Red
    }
};

const JobRolePrediction = () => {
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [predictions, setPredictions] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePredict = async () => {
        setLoading(true);
        const formattedSkills = selectedSkills.join(",");
        const data = await getJobRolePrediction(formattedSkills);
        setPredictions(data?.predictedRoles || null);
        setLoading(false);
    };

    return (
        <div className="container">
            <h2>Skill Prediction</h2>
            <Autocomplete
                multiple
                options={skillsList}
                value={selectedSkills}
                onChange={(event, newValue) => setSelectedSkills(newValue)}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip variant="outlined" label={option} {...getTagProps({ index })} key={index} />
                    ))
                }
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select Skills" placeholder="Skills" />
                )}
            />
            <button onClick={handlePredict} className="btn btn-primary mt-2" disabled={loading}>
                {loading ? <><CircularProgress size={20} color="inherit" /> Predicting...</> : "Predict"}
            </button>

            {predictions && (
                <div className="mt-4">
                    <h4>Predicted Job Roles</h4>
                    <div className="d-flex flex-column">
                        {Object.entries(predictions).flatMap(([confidence, roles]) =>
                            roles.map((role, index) => (
                                <div key={index} className="card p-3 mb-3" style={{ borderColor: getConfidenceColor(confidence), borderWidth: '2px' }}>
                                    <h5 style={{ fontSize: '20px', fontWeight: 'bold' }}>{role.jobRole} - {role.probability * 100}%</h5>
                                    <div className="progress mt-2">
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${role.probability * 100}%`, backgroundColor: getConfidenceColor(confidence) }}
                                        ></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default JobRolePrediction;