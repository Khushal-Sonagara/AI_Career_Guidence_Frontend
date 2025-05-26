// import { ResumeInfoContext } from '../../context/ResumeInfoContext';
// import React, { useContext } from 'react';
// import Template_3 from './Resume-Template/Template_3';
// import Template_2 from './Resume-Template/Template_2';
// import Template_5 from './Resume-Template/Template_5';
// import Template_4 from './Resume-Template/Template_4';
// import Template_1 from './Resume-Template/Template_1';

// function ResumePreview() {
//   const { resumeInfo } = useContext(ResumeInfoContext);
//   const resumeImageID = resumeInfo?.resume?.resumeImageID; // Get the selected resume image ID

//   if (!resumeInfo || !resumeInfo.personalDetails) {
//     return <p>Loading or no resume data available.</p>;
//   }

//   // Render different styles based on resumeImageID
//   if (resumeImageID === 1) {
//     return (
//         <Template_1 resumeInfo={resumeInfo} />
//     );
//   }
//   else if (resumeImageID === 2) {
//     return (
//         <Template_2 resumeInfo={resumeInfo} />
//     );
//   } else if (resumeImageID === 3) {
//     return (
//         <Template_3 resumeInfo={resumeInfo} />
//     );
//   }
//   else if (resumeImageID === 4) {
//     return (
//         <Template_4 resumeInfo={resumeInfo} />
//     );
//   }
//   else if (resumeImageID === 5) {
//     return (
//         <Template_5 resumeInfo={resumeInfo} />
//     );
//   } else {
//     // Default resume preview if no style is selected
//     return (
//       <div
//         className="shadow-lg p-4"
//         style={{
//           height: '100%',
//           borderColor: resumeInfo?.themeColor,
//           border: '1px solid',
//           fontFamily: 'Arial, sans-serif',
//           userSelect: 'text',
//         }}
//       >
//         {/* Default resume structure */}
//         <Template_1 resumeInfo={resumeInfo} />
//       </div>
//     );
//   }
// }

// export default ResumePreview;


import React, { useContext } from 'react';
import { ResumeInfoContext } from '../../context/ResumeInfoContext';
import Template_1 from './Resume-Template/Template_1';
import Template_2 from './Resume-Template/Template_2';
import Template_3 from './Resume-Template/Template_3';
import Template_4 from './Resume-Template/Template_4';
import Template_5 from './Resume-Template/Template_5';
import Template_6 from './Resume-Template/Template_6';

function ResumePreview({ resumeInfo }) {
    // If resumeInfo is not passed as a prop, get it from context
    const context = useContext(ResumeInfoContext);
    resumeInfo = resumeInfo || context.resumeInfo;

    const resumeImageID = resumeInfo?.resume?.resumeImageID;

    if (!resumeInfo || !resumeInfo.personalDetails) {
        return <p>Loading or no resume data available.</p>;
    }

    // Render the appropriate resume template
    switch (resumeImageID) {
        case 1: return <Template_1 resumeInfo={resumeInfo} />;
        case 2: return <Template_2 resumeInfo={resumeInfo} />;
        case 3: return <Template_3 resumeInfo={resumeInfo} />;
        case 4: return <Template_4 resumeInfo={resumeInfo} />;
        case 5: return <Template_5 resumeInfo={resumeInfo} />;
        default:
            return <Template_6 resumeInfo={resumeInfo} />;
    }
}

export default ResumePreview;
