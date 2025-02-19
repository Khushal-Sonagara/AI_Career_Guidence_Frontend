import React from 'react';

function ExperiencePreview({ resumeInfo }) {

  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <h2 
        className="text-center fw-bold"
        style={{
          fontSize: '0.875rem', // Equivalent to Tailwind's text-sm
          marginBottom: '0.5rem',
          color: resumeInfo?.themeColor
        }}
      >
        Professional Experience
      </h2>
      
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.map((experience, index) => (
        <div key={index} style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
          <h2 
            className="fw-bold"
            style={{
              fontSize: '0.875rem', // Equivalent to Tailwind's text-sm
              color: resumeInfo?.themeColor
            }}
          >
            {experience?.title}
          </h2>
          
          <h2 
            className="d-flex justify-content-between"
            style={{ fontSize: '0.75rem' }} // Equivalent to Tailwind's text-xs
          >
            {experience?.companyName}, {experience?.city}, {experience?.state}
            <span>
              {new Date(experience?.startDate).toLocaleDateString()} To 
              {experience?.endDate ? new Date(experience.endDate).toLocaleDateString() : "Present"}
            </span>
          </h2>
          {/* Work Summary */}
          <div 
            style={{ fontSize: '0.75rem', marginTop: '0.5rem', marginBottom: '0.5rem' }} 
            dangerouslySetInnerHTML={{ __html: experience?.workSummary }} 
          />
        </div>
      ))}
    </div>
  );
}

export default ExperiencePreview;
