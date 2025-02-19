import React from 'react';

function SummeryPreview({ resumeInfo }) {
  return (
    <div>
      {/* Upper Divider */}
      <hr style={{ borderWidth: '1px', borderColor: resumeInfo?.themeColor, marginBottom: '8px' }} />

      {/* Summary Text */}
      <p style={{ fontSize: '0.75rem', marginBottom: '0' }}>
        {resumeInfo?.resumeSummary?.summaryText}
      </p>

      {/* Lower Divider */}
      <hr style={{ borderWidth: '1px', borderColor: resumeInfo?.themeColor, marginTop: '8px', marginBottom:'-15px' }} />
    </div>
  );
}

export default SummeryPreview;
