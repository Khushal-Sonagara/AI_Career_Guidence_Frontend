import { Button } from '../../../../ui/button';
import { Input } from '../../../../ui/input';
import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import ResumeLanguageService from '../../../../../Services/ResumeLanguagesService';

const formField = {
    language: '',
    proficiencyLevel: '',
};

const proficiencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Fluent', 'Native'];

function Language() {
    const [languageList, setLanguageList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.resumeLanguages?.length > 0) {
            setLanguageList(resumeInfo.resumeLanguages);
        }
    }, [resumeInfo]);

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            resumeLanguages: languageList,
        }));
    }, [languageList]);

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newEntries = [...languageList];
        newEntries[index] = { ...newEntries[index], [name]: value };
        setLanguageList(newEntries);
    };

    const addNewLanguage = () => {
        setLanguageList([...languageList, { ...formField }]);
    };

    const removeLanguage = async (index) => {
        const languageToRemove = languageList[index];
    
        if (languageToRemove.languageID) {
            try {
                await ResumeLanguageService.delete(languageToRemove.languageID);
                toast('Language removed successfully');
            } catch (error) {
                console.error("API Delete Error:", error.response?.data || error.message);
                toast('Failed to remove language');
                return;
            }
        }
    
        setLanguageList((prev) => prev.filter((_, i) => i !== index));
    };
    

    const onSave = async () => {
        setLoading(true);
    
        try {
            await Promise.all(
                languageList.map(async (language) => {
                    const requestData = {
                        language: language.language?.trim(),
                        proficiencyLevel: language.proficiencyLevel || '',
                        resumeId: params?.id, // Ensure resumeId is always included
                    };
    
                    if (language.languageID && language.languageID !== 0) {
                        await ResumeLanguageService.update({ ...requestData, languageID: language.languageID });
                    } else {
                        await ResumeLanguageService.insert(requestData); // Don't send languageID for insert
                    }
                })
            );
    
            toast('Languages updated successfully!');
        } catch (error) {
            toast('Failed to update languages');
            console.error("API error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div>
            <div className="p-4 shadow-sm rounded border-top border-primary mt-4">
                <h2 style={{ fontWeight: 'bold' }}>Languages</h2>
                <p>Add languages you are proficient in</p>
                <div>
                    {languageList.map((item, index) => (
                        <div key={index} className="row border p-3 my-3 rounded">
                            <div className="col-md-6">
                                <label className="text-muted">Language</label>
                                <Input name="language" onChange={(event) => handleChange(index, event)} value={item?.language || ''} />
                            </div>
                            <div className="col-md-6">
                                <label className="text-muted">Proficiency Level</label>
                                <select 
                                    className="form-control"
                                    name="proficiencyLevel"
                                    onChange={(event) => handleChange(index, event)}
                                    value={item?.proficiencyLevel || ''}
                                >
                                    <option value="">Select Proficiency Level</option>
                                    {proficiencyLevels.map((level) => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-12 mt-2 d-flex justify-content-end">
                                <button className="btn btn-outline-danger" onClick={() => removeLanguage(index)}>
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-outline-primary" onClick={addNewLanguage} style={{ width: '200px' }}>+ Add More Language</button>
                    <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
                        {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Language;
