import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import ResumeSkillsService from '../../../../../Services/ResumeSkillsService';
import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

function Skills() {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const { id } = useParams();
    const [skillsList, setSkillsList] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (resumeInfo?.resumeSkills) {
            setSkillsList([...resumeInfo.resumeSkills]);
        }
    }, [resumeInfo]);

    const handleChange = (index, name, value) => {
        setSkillsList((prevSkills) => {
            const updatedSkills = [...prevSkills];
            updatedSkills[index] = { ...updatedSkills[index], [name]: value };
            return updatedSkills;
        });
    };

    const addNewSkill = () => {
        setSkillsList((prevSkills) => [
            ...prevSkills,
            { skillName: '', rating: 0, resumeId: id },
        ]);
    };

    const removeSkill = async (index) => {
        const skillToRemove = skillsList[index];
        setSkillsList((prevSkills) => prevSkills.filter((_, i) => i !== index));

        if (skillToRemove.resumeSkillID) {
            try {
                await ResumeSkillsService.delete(skillToRemove.resumeSkillID);
                toast.success('Skill removed successfully');
            } catch (error) {
                toast.error('Error removing skill, try again');
            }
        }

        setResumeInfo((prev) => ({
            ...prev,
            resumeSkills: prev.resumeSkills.filter((_, i) => i !== index),
        }));
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const savePromises = skillsList.map(async (skill) => {
                if (skill.resumeSkillID) {
                    return ResumeSkillsService.update(skill);
                } else {
                    return ResumeSkillsService.insert(skill);
                }
            });

            await Promise.all(savePromises);
            toast.success('Skills updated successfully!');
        } catch (error) {
            toast.error('Error updating skills, try again');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Skills</h2>
            <p>Add your top professional key skills</p>

            <div>
                {skillsList.length > 0 ? (
                    skillsList.map((item, index) => (
                        <div
                            key={index}
                            className="d-flex justify-content-between align-items-center mb-2 border rounded p-3"
                            style={{ backgroundColor: '#f8f9fa' }}
                        >
                            <div style={{ width: '60%' }}>
                                <label style={{ fontSize: '12px' }}>Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={item.skillName}
                                    onChange={(e) => handleChange(index, 'skillName', e.target.value)}
                                />
                            </div>
                            <Rating
                                style={{ maxWidth: 120 }}
                                value={item.rating}
                                onChange={(value) => handleChange(index, 'rating', value)}
                            />
                            <button className="btn btn-outline-danger"  style={{ width: '150px' }}onClick={() => removeSkill(index)}>
                                Remove
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No skills added yet. Click "Add Skill" to start.</p>
                )}
            </div>

            <div className="d-flex justify-content-start mt-3">
                <button className="btn btn-outline-primary btn-sm" style={{ width: '200px' }} onClick={addNewSkill}>
                    + Add Skill
                </button>
                <button className="btn btn-primary ms-auto" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
                    {loading ? <span className="spinner-border spinner-border-sm"></span> : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default Skills;
