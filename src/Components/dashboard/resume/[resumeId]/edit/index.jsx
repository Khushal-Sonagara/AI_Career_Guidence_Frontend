import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import ResumeDataService from '../../../../../Services/ResumeDataService';

function EditResume() {
    const { id } = useParams();
    const [resumeInfo, setResumeInfo] = useState();

    useEffect(() => {
        GetResumeInfo();
    }, []);

    const GetResumeInfo = () => {
        ResumeDataService.getByResumeId(id)
            .then(resp => {
                console.log(resp);
                setResumeInfo(resp);
            });
    };

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo, }}>
            <div>
                <div className="row p-4">
                    {/* Form Section */}
                    <div className="col-md-6">
                        <FormSection />
                    </div>
                    {/* Preview Section */}
                    <div className="col-md-6">
                        <ResumePreview />
                    </div>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default EditResume;
