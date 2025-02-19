import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import React, { useContext } from 'react';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import ContactDetailPreview from './preview/ContactDetailPreview';
import PhotoPreview from './preview/PhotoPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
import ResumeCertificationPreview from './preview/CertificationPreview';
import ResumeLanguagePreview from './preview/LanguagePreview';
import ResumeProjectPreview from './preview/ProjectPreview';
import Template_3 from './Resume-Template/Template_3';
import Template_2 from './Resume-Template/Template_2';
import Template_5 from './Resume-Template/Template_5';
import Template_4 from './Resume-Template/Template_4';

function ResumePreview() {
  const { resumeInfo } = useContext(ResumeInfoContext);
  const resumeImageID = resumeInfo?.resume?.resumeImageID; // Get the selected resume image ID

  if (!resumeInfo || !resumeInfo.personalDetails) {
    return <p>Loading or no resume data available.</p>;
  }

  // Render different styles based on resumeImageID
  if (resumeImageID === 2) {
    return (
      <div>
        <Template_2 resumeInfo={resumeInfo} />
      </div>
    );
  } else if (resumeImageID === 3) {
    return (
      <div>
        <Template_3 resumeInfo={resumeInfo} />
      </div>
    );
  }
  else if (resumeImageID === 4) {
    return (
      <div>
        <Template_4 resumeInfo={resumeInfo} />
      </div>
    );
  }
  else if (resumeImageID === 5) {
    return (
      <div>
        <Template_5 resumeInfo={resumeInfo} />
      </div>
    );
  } else {
    // Default resume preview if no style is selected
    return (
      <div
        className="shadow-lg p-4"
        style={{
          height: '100%',
          borderColor: resumeInfo?.themeColor,
          border: '1px solid',
          fontFamily: 'Arial, sans-serif',
          userSelect: 'text',
        }}
      >
        {/* Default resume structure */}
        <DefaultResumeStructure resumeInfo={resumeInfo} />
      </div>
    );
  }
}

// Extracted Default Resume Structure
const DefaultResumeStructure = ({ resumeInfo }) => {
  return (
    <table id="resume-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
      <colgroup>
        <col style={{ width: '62%' }} />
        <col style={{ width: '38%' }} />
      </colgroup>
      <thead>
        <tr>
          <th colSpan={2}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <PersonalDetailPreview resumeInfo={resumeInfo.personalDetails} />
                <ContactDetailPreview resumeInfo={resumeInfo.personalDetails} />
              </div>
              <div style={{ height: '130px', width: '130px' }}>
                <PhotoPreview resumeInfo={resumeInfo.resumePhoto} />
              </div>

            </div>
            {resumeInfo?.resumeSummary?.summaryText && <SummeryPreview resumeInfo={resumeInfo} />}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ verticalAlign: 'top' }}>
            {resumeInfo?.resumeExperiences?.length > 0 && (
              <ExperiencePreview resumeInfo={resumeInfo.resumeExperiences} />
            )}
            {resumeInfo?.resumeEducation?.length > 0 && (
              <EducationalPreview resumeInfo={resumeInfo.resumeEducation} />
            )}
            {resumeInfo?.resumeProjects?.length > 0 && (
              <ResumeProjectPreview resumeInfo={resumeInfo.resumeProjects} />
            )}
          </td>
          <td style={{ verticalAlign: 'top' }}>
            {resumeInfo?.resumeSkills?.length > 0 && (
              <SkillsPreview resumeInfo={resumeInfo.resumeSkills} />
            )}
            {resumeInfo?.resumeCertifications?.length > 0 && (
              <ResumeCertificationPreview resumeInfo={resumeInfo.resumeCertifications} />
            )}
            {resumeInfo?.resumeLanguages?.length > 0 && (
              <ResumeLanguagePreview resumeInfo={resumeInfo.resumeLanguages} />
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default ResumePreview;
