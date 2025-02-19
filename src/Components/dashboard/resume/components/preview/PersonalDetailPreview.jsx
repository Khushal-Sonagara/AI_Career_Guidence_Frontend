import React from 'react';

function PersonalDetailPreview({ resumeInfo }) {
  return (
    <div>
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: resumeInfo?.themeColor,
          marginBottom: '4px',
        }}
      >
        {resumeInfo?.firstName} {resumeInfo?.lastName}
      </h2>

      <h3
        style={{
          fontSize: '1rem',
          fontWeight: '500',
          color: resumeInfo?.themeColor,
          marginBottom: '10px',
        }}
      >
        {resumeInfo?.jobTitle}
      </h3>
    </div>
  );
}

export default PersonalDetailPreview;
