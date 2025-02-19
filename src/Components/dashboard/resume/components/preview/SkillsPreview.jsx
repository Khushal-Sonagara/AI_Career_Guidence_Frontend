import React from 'react';

function SkillsPreview({ resumeInfo }) {
  return (
    <div style={{ marginTop: '24px', marginBottom: '24px' }}>
      <h2
        className="text-center fw-bold"
        style={{
          fontSize: '14px',
          marginBottom: '8px',
          color: resumeInfo?.themeColor
        }}
      >
        Skills
      </h2>

      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      <div className="row g-3" style={{ marginTop: '16px', marginBottom: '16px' }}>
        {resumeInfo?.map((skill, index) => (
          <div
            key={index}
            className="col-6"
            style={{
              display: 'flex',
              flexDirection: 'column', // ✅ Stacks name & progress bar vertically
              alignItems: 'flex-start', // ✅ Aligns text and bar to the left
              gap: '4px', // ✅ Adds spacing
              textAlign: 'left', // ✅ Ensures text aligns left
            }}
          >
            {/* Skill Name */}
            <span style={{ fontSize: '12px', fontWeight: '500' }}>
              {skill.skillName}
            </span>

            {/* Progress Bar */}
            <div
              className="progress-container"
              style={{
                width: '100%', // ✅ Uses full width of column
                maxWidth: '120px', // ✅ Restricts bar width
              }}
            >
              <div
                style={{
                  height: '8px',
                  width: '100%',
                  border: '1px solid black',
                  borderRadius: '4px',
                  background: `linear-gradient(to right, black ${skill?.rating * 20}%, #e5e5e5 ${skill?.rating * 20}%)`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPreview;
