import React from 'react';

function LanguagePreview({ resumeInfo }) {
    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 className="text-center fw-bold" style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: resumeInfo?.themeColor }}>
                Languages
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.map((language, index) => (
                <div key={index} className="d-flex justify-content-between" style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <h2 className="fw-bold" style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
                        {language?.language}
                    </h2>
                    <h2 style={{ fontSize: '0.75rem' }}>{language?.proficiencyLevel}</h2>
                </div>
            ))}
        </div>
    );
}

export default LanguagePreview;
