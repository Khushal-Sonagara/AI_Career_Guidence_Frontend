import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link, Navigate, useParams } from 'react-router-dom';

import PersonalDetail from './forms/PersonalDetail';
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import ResumeCertification from './forms/Certification';
import ResumeLanguage from './forms/Language';
import ResumeProject from './forms/Project';
import ResumeImageSelection from './forms/ResumeImageSelection';

function FormSection() {
    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(true);
    const { id } = useParams();  // Resume ID

    return (
        <div>
            {/* Navigation Buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/Resume">
                        <button className="btn btn-primary">
                            <Home />
                        </button>
                    </Link>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {activeFormIndex > 1 && (
                        <button 
                            className="btn btn-secondary btn-sm" 
                            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
                        >
                            <ArrowLeft />
                        </button>
                    )}
                    <button
                        className="btn btn-success btn-sm"
                        disabled={!enableNext}
                        onClick={() => setActiveFormIndex(activeFormIndex + 1)}
                        style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                    >
                        Next <ArrowRight />
                    </button>
                </div>
            </div>

            {/* Form Sections */}
            {activeFormIndex === 1 ? <PersonalDetail enabledNext={setEnableNext} />
                : activeFormIndex === 2 ? <Summery enabledNext={setEnableNext} />
                    : activeFormIndex === 3 ? <Experience enabledNext={setEnableNext} />
                        : activeFormIndex === 4 ? <Education enabledNext={setEnableNext} />
                            : activeFormIndex === 5 ? <Skills enabledNext={setEnableNext} />
                                : activeFormIndex === 6 ? <ResumeCertification enabledNext={setEnableNext} />
                                    : activeFormIndex === 7 ? <ResumeLanguage enabledNext={setEnableNext} />
                                        : activeFormIndex === 8 ? <ResumeProject enabledNext={setEnableNext} />
                                            : activeFormIndex === 9 ? <ResumeImageSelection enableNext={setEnableNext} />
                                                : activeFormIndex === 10 ? <Navigate to={`/my-resume/${id}/view`} />
                                                    : null}
        </div>
    );
}

export default FormSection;
