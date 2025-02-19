import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import ResumeEducationService from '../../../../../Services/ResumeEducationService';

function Education() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [educationalList, setEducationalList] = useState([
    {
      educationID: null,
      universityOrSchoolName: '',
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: '',
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.resumeEducation) {
      setEducationalList(resumeInfo.resumeEducation);
    }
  }, []);

  const handleChange = (event, index) => {
    const newEntries = [...educationalList];
    const { name, value } = event.target;
    newEntries[index] = { ...newEntries[index], [name]: value };
    setEducationalList(newEntries);
  };

  const AddNewEducation = () => {
    setEducationalList([
      ...educationalList,
      {
        educationID: null,
        universityOrSchoolName: '',
        degree: '',
        major: '',
        startDate: '',
        endDate: '',
        description: '',
      },
    ]);
  };

  const RemoveEducation = async (index) => {
    const educationToRemove = educationalList[index];
  
    // Remove from UI immediately
    const updatedList = educationalList.filter((_, i) => i !== index);
    setEducationalList(updatedList);
  
    // Update context
    setResumeInfo((prev) => ({
      ...prev,
      resumeEducation: updatedList,
    }));
  
    if (educationToRemove.educationID) {
      try {
        await ResumeEducationService.delete(educationToRemove.educationID);
        toast('Education entry removed successfully');
      } catch (error) {
        toast('Failed to remove education entry');
        console.error(error);
      }
    }
  };
  
  const onSave = async () => {
    setLoading(true);
    try {
      const updatedList = educationalList.map((item) => ({
        ...item,
        educationID: item.educationID || 0, // Ensure it's an integer
        resumeId: params.id,
      }));

      const updatePromises = updatedList.map(async (edu) => {
        if (edu.educationID) {
          return ResumeEducationService.update(edu); // Update existing entry
        } else {
          return ResumeEducationService.insert(edu); // Insert new entry
        }
      });

      await Promise.all(updatePromises); // Wait for all API calls to complete
      toast('Education details updated successfully!');
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
      resumeEducation: educationalList,
    }));
  }, [educationalList]);

  return (
    <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Education</h2>
      <p>Add your educational details</p>
      <div>
        {educationalList.map((item, index) => (
          <div key={index} className="row border p-3 my-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="col-12">
              <label className="form-label">University/School Name</label>
              <input type="text" className="form-control" name="universityOrSchoolName" onChange={(e) => handleChange(e, index)} value={item.universityOrSchoolName} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Degree</label>
              <input type="text" className="form-control" name="degree" onChange={(e) => handleChange(e, index)} value={item.degree} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Major</label>
              <input type="text" className="form-control" name="major" onChange={(e) => handleChange(e, index)} value={item.major} />
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
              <textarea className="form-control" name="description" onChange={(e) => handleChange(e, index)} value={item.description}></textarea>
            </div>
            <div className="col-12 d-flex justify-content-end mt-2">
              <button className="btn btn-outline-danger" onClick={() => RemoveEducation(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={AddNewEducation} style={{ width: '200px' }}>+ Add More Education</button>
        <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
          {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Education;
