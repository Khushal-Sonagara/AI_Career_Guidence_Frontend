import { Phone, Mail, Linkedin } from 'lucide-react';
import PersonalDetailPreview from "../preview/PersonalDetailPreview"
import ContactDetailPreview from "../preview/ContactDetailPreview"
import PhotoPreview from "../preview/PhotoPreview"
import ResumeCertificationPreview from "../preview/CertificationPreview"
import EducationalPreview from "../preview/EducationalPreview"
import ExperiencePreview from "../preview/ExperiencePreview"
import ResumeLanguagePreview from "../preview/LanguagePreview"
import SkillsPreview from "../preview/SkillsPreview"
import ResumeProjectPreview from "../preview/ProjectPreview"
import SummeryPreview from "../preview/SummeryPreview"



function Template_1({ resumeInfo }) {
    if (!resumeInfo?.personalDetails) {
        return null;
    }
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
}

export default Template_1;