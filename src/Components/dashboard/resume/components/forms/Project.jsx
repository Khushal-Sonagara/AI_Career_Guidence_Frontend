import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import ResumeProjectsService from '../../../../../Services/ResumeProjectsService';
import RichTextEditor from '../RichTextEditor';

function Project() {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    const [projectList, setProjectList] = useState([
        {
            projectID: null,
            title: '',
            description: '',
            technologiesUsed: '',
            projectURL: '',
            startDate: '',
            endDate: '',
        },
    ]);

    useEffect(() => {
        if (resumeInfo?.resumeProjects) {
            setProjectList(resumeInfo.resumeProjects);
        }
    }, []);

    const handleChange = (event, index) => {
        const { name, value } = event.target;
        setProjectList((prev) => {
            const newEntries = [...prev];
            newEntries[index] = { ...newEntries[index], [name]: value };
            return newEntries;
        });
    };

    const handleRichTextChange = (event, fieldName, index) => {
        const { value } = event.target;
        setProjectList((prev) => {
            const newEntries = [...prev];
            newEntries[index] = { ...newEntries[index], [fieldName]: value };
            return newEntries;
        });
    };

    const addNewProject = () => {
        setProjectList([
            ...projectList,
            {
                projectID: null,
                title: '',
                description: '',
                technologiesUsed: '',
                projectURL: '',
                startDate: '',
                endDate: '',
            },
        ]);
    };

    const removeProject = async (index) => {
        const projectToRemove = projectList[index];

        // Remove from UI immediately
        const updatedList = projectList.filter((_, i) => i !== index);
        setProjectList(updatedList);

        // Update context
        setResumeInfo((prev) => ({
            ...prev,
            resumeProjects: updatedList,
        }));

        if (projectToRemove.projectID) {
            try {
                await ResumeProjectsService.delete(projectToRemove.projectID);
                toast('Project entry removed successfully');
            } catch (error) {
                toast('Failed to remove project entry');
                console.error(error);
            }
        }
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const updatedList = projectList.map((item) => ({
                ...item,
                projectID: item.projectID || 0,
                resumeId: params.id,
            }));

            const updatePromises = updatedList.map(async (project) => {
                if (project.projectID) {
                    return ResumeProjectsService.update(project);
                } else {
                    return ResumeProjectsService.insert(project);
                }
            });

            await Promise.all(updatePromises);
            toast('Projects updated successfully!');
        } catch (error) {
            toast('Server error, please try again!');
            console.error("API error:", error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setResumeInfo((prev) => ({
            ...prev,
            resumeProjects: projectList,
        }));
    }, [projectList]);

    return (
        <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Projects</h2>
            <p>Add your project details</p>
            <div>
                {projectList.map((item, index) => (
                    <div key={index} className="row border p-3 my-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                        <div className="col-12">
                            <label className="form-label">Project Title</label>
                            <input type="text" className="form-control" name="title" onChange={(e) => handleChange(e, index)} value={item.title} />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Technologies Used</label>
                            <input type="text" className="form-control" name="technologiesUsed" onChange={(e) => handleChange(e, index)} value={item.technologiesUsed} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Project URL</label>
                            <input type="text" className="form-control" name="projectURL" onChange={(e) => handleChange(e, index)} value={item.projectURL} />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="startDate"
                                onChange={(e) => handleChange(e, index)}
                                value={item.startDate ? item.startDate.split("T")[0] : ''}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="endDate"
                                onChange={(e) => handleChange(e, index)}
                                value={item.endDate ? item.endDate.split("T")[0] : ''}
                            />
                        </div>
                        <div className="col-12">
                            <label className="form-label">Description</label>
                            <RichTextEditor
                                onRichTextEditorChange={(e) => handleRichTextChange(e, 'description', index)}
                                index={index}
                                defaultValue={item.description}
                                fieldName="description"
                                promptTemplate="Generate a detailed project summary based on {title}. Highlight key contributions, technologies used, and impact."
                                fieldData={{ title: item.title }}
                            />
                        </div>
                        <div className="col-12 d-flex justify-content-end mt-2">
                            <button className="btn btn-outline-danger" onClick={() => removeProject(index)}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-between">
                <button className="btn btn-outline-primary" onClick={addNewProject} style={{ width: '200px' }}>+ Add More Projects</button>
                <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
                    {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default Project;
