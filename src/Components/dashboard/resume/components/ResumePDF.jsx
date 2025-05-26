import React from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import Template_1 from './Resume-Template/Template_1';
import Template_2 from './Resume-Template/Template_2';
import Template_3 from './Resume-Template/Template_3';
import Template_4 from './Resume-Template/Template_4';
import Template_5 from './Resume-Template/Template_5';

// Function to select the right template dynamically
const getTemplateComponent = (resumeInfo) => {
    const resumeImageID = resumeInfo?.resume?.resumeImageID;
    
    switch (resumeImageID) {
        case 1: return <Template_1 resumeInfo={resumeInfo} />;
        case 2: return <Template_2 resumeInfo={resumeInfo} />;
        case 3: return <Template_3 resumeInfo={resumeInfo} />;
        case 4: return <Template_4 resumeInfo={resumeInfo} />;
        case 5: return <Template_5 resumeInfo={resumeInfo} />;
        default: return <Template_1 resumeInfo={resumeInfo} />; // Default Template
    }
};

const ResumePDF = ({ resumeInfo }) => (
    <Document>
        <Page size="A4">
            <View>
                {getTemplateComponent(resumeInfo)}
            </View>
        </Page>
    </Document>
);

export default ResumePDF;
