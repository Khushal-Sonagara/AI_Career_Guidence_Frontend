import React from 'react';

function CertificationPreview({ resumeInfo }) {
    return (
        <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 className="text-center fw-bold" style={{ fontSize: '0.875rem', marginBottom: '0.5rem', color: resumeInfo?.themeColor }}>
                Certifications
            </h2>
            <hr style={{ borderColor: resumeInfo?.themeColor }} />
            {resumeInfo?.map((certification, index) => (
                <div key={index} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                    <h2 className="fw-bold" style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
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
    );
}

export default CertificationPreview;
