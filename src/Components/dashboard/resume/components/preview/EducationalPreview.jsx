import React from 'react';

function EducationalPreview({ resumeInfo }) {
  return (
    <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
      <h2 
        className="text-center fw-bold"
        style={{
          fontSize: '14px', // Equivalent to Tailwind's text-sm
          marginBottom: '8px',
          color: resumeInfo?.themeColor
        }}
      >
        Education
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.map((education, index) => (
        <div key={index} style={{ marginTop: '20px', marginBottom: '20px' }}>
          <h2 
            className="fw-bold"
            style={{
              fontSize: '14px', // Equivalent to Tailwind's text-sm
              color: resumeInfo?.themeColor
            }}
          >
            {education.universityOrSchoolName}
          </h2>

          <div 
            className="d-flex justify-content-between"
            style={{ fontSize: '12px' }} // Equivalent to Tailwind's text-xs
          >
            <span>{education.degree} in {education.major}</span>
            <span>
              {education.startDate ? education.startDate.split('T')[0] : ''} - 
              {education.endDate ? education.endDate.split('T')[0] : ''}
            </span>
          </div>

          <p 
            style={{
              fontSize: '12px',
              marginTop: '8px',
              marginBottom: '8px'
            }}
          >
            {education.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default EducationalPreview;
