import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import ResumeExperiencesService from '../../../../../Services/ResumeExperiencesService';
import RichTextEditor from '../RichTextEditor';  // Import Rich Text Editor

function Experience() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [experienceList, setExperienceList] = useState([
    {
      experienceID: null,
      title: '',
      companyName: '',
      city: '',
      state: '',
      startDate: '',
      endDate: '',
      workSummary: '',
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.resumeExperiences) {
      setExperienceList(resumeInfo.resumeExperiences);
    }
  }, []);

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    setExperienceList((prev) => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [name]: value };
      return newEntries;
    });
  };

  const handleRichTextChange = (event, fieldName, index) => {
    const { value } = event.target;
    setExperienceList((prev) => {
      const newEntries = [...prev];
      newEntries[index] = { ...newEntries[index], [fieldName]: value };
      return newEntries;
    });
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        experienceID: null,
        title: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        workSummary: '',
      },
    ]);
  };

  const RemoveExperience = async (index) => {
    const experienceToRemove = experienceList[index];

    // Remove from UI immediately
    const updatedList = experienceList.filter((_, i) => i !== index);
    setExperienceList(updatedList);

    // Update context
    setResumeInfo((prev) => ({
      ...prev,
      resumeExperiences: updatedList,
    }));

    if (experienceToRemove.experienceID) {
      try {
        await ResumeExperiencesService.delete(experienceToRemove.experienceID);
        toast('Experience entry removed successfully');
      } catch (error) {
        toast('Failed to remove experience entry');
        console.error(error);
      }
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedList = experienceList.map((item) => ({
        ...item,
        experienceID: item.experienceID || 0,
        resumeId: params.id,
      }));

      const updatePromises = updatedList.map(async (exp) => {
        if (exp.experienceID) {
          return ResumeExperiencesService.update(exp);
        } else {
          return ResumeExperiencesService.insert(exp);
        }
      });

      await Promise.all(updatePromises);
      toast('Experience details updated successfully!');
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
      resumeExperiences: experienceList,
    }));
  }, [experienceList]);

  return (
    <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Professional Experience</h2>
      <p>Add your previous job experience</p>
      <div>
        {experienceList.map((item, index) => (
          <div key={index} className="row border p-3 my-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="col-12">
              <label className="form-label">Position Title</label>
              <input type="text" className="form-control" name="title" onChange={(e) => handleChange(e, index)} value={item.title} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Company Name</label>
              <input type="text" className="form-control" name="companyName" onChange={(e) => handleChange(e, index)} value={item.companyName} />
            </div>
            <div className="col-md-6">
              <label className="form-label">City</label>
              <input type="text" className="form-control" name="city" onChange={(e) => handleChange(e, index)} value={item.city} />
            </div>
            <div className="col-md-6">
              <label className="form-label">State</label>
              <input type="text" className="form-control" name="state" onChange={(e) => handleChange(e, index)} value={item.state} />
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
              <label className="form-label">Work Summary</label>
              <RichTextEditor
                onRichTextEditorChange={handleRichTextChange}
                index={index}
                defaultValue={item.workSummary}
                fieldName="workSummary"
                promptTemplate="Generate a professional job description based on {title} at {companyName}"
                fieldData={{
                  title: item.title,
                  companyName: item.companyName,
                }}
              />
            </div>
            <div className="col-12 d-flex justify-content-end mt-2">
              <button className="btn btn-outline-danger" onClick={() => RemoveExperience(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={AddNewExperience} style={{ width: '200px' }}>+ Add More Experience</button>
        <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
          {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Experience;
