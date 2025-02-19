import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import ResumeCertificationService from '../../../../../Services/ResumeCertificationsService';

function Certification() {
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();

  const [certificationList, setCertificationList] = useState([
    {
      certificationID: null,
      certificationName: '',
      issuingOrganization: '',
      issueDate: '',
      expirationDate: '',
      credentialID: '',
      credentialURL: '',
    },
  ]);

  useEffect(() => {
    if (resumeInfo?.resumeCertifications) {
      setCertificationList(resumeInfo.resumeCertifications);
    }
  }, []);

  const handleChange = (event, index) => {
    const newEntries = [...certificationList];
    const { name, value } = event.target;
    newEntries[index] = { ...newEntries[index], [name]: value };
    setCertificationList(newEntries);
  };

  const addNewCertification = () => {
    setCertificationList([
      ...certificationList,
      {
        certificationID: null,
        certificationName: '',
        issuingOrganization: '',
        issueDate: '',
        expirationDate: '',
        credentialID: '',
        credentialURL: '',
      },
    ]);
  };

  const removeCertification = async (index) => {
    const certificationToRemove = certificationList[index];

    // Remove from UI immediately
    const updatedList = certificationList.filter((_, i) => i !== index);
    setCertificationList(updatedList);

    // Update context
    setResumeInfo((prev) => ({
      ...prev,
      resumeCertifications: updatedList,
    }));

    if (certificationToRemove.certificationID) {
      try {
        await ResumeCertificationService.delete(certificationToRemove.certificationID);
        toast('Certification entry removed successfully');
      } catch (error) {
        toast('Failed to remove certification entry');
        console.error(error);
      }
    }
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedList = certificationList.map((item) => ({
        certificationID: item.certificationID || null, // Keep existing ID, but remove for new entries
        certificationName: item.certificationName?.trim(),
        issuingOrganization: item.issuingOrganization?.trim(),
        issueDate: item.issueDate || null,
        expirationDate: item.expirationDate || null,
        credentialID: item.credentialID?.trim(),
        credentialURL: item.credentialURL?.trim(),
        resumeId: params.id, // Ensure resumeId is included
      }));

      const updatePromises = updatedList.map(async (cert) => {
        if (cert.certificationID && cert.certificationID !== 0) {
          return ResumeCertificationService.update(cert);
        } else {
          const { certificationID, ...newCert } = cert; // Remove ID before inserting
          return ResumeCertificationService.insert(newCert);
        }
      });

      await Promise.all(updatePromises);
      toast('Certifications updated successfully!');
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
      resumeCertifications: certificationList,
    }));
  }, [certificationList]);

  return (
    <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Certifications</h2>
      <p>Add your professional certifications</p>
      <div>
        {certificationList.map((item, index) => (
          <div key={index} className="row border p-3 my-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
            <div className="col-12">
              <label className="form-label">Certification Name</label>
              <input type="text" className="form-control" name="certificationName" onChange={(e) => handleChange(e, index)} value={item.certificationName} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Issuing Organization</label>
              <input type="text" className="form-control" name="issuingOrganization" onChange={(e) => handleChange(e, index)} value={item.issuingOrganization} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Issue Date</label>
              <input
                type="date"
                className="form-control"
                name="issueDate"
                onChange={(e) => handleChange(e, index)}
                value={item.issueDate ? item.issueDate.split("T")[0] : ''}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Expiration Date</label>
              <input
                type="date"
                className="form-control"
                name="expirationDate"
                onChange={(e) => handleChange(e, index)}
                value={item.expirationDate ? item.expirationDate.split("T")[0] : ''}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Credential ID</label>
              <input type="text" className="form-control" name="credentialID" onChange={(e) => handleChange(e, index)} value={item.credentialID} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Credential URL</label>
              <input type="text" className="form-control" name="credentialURL" onChange={(e) => handleChange(e, index)} value={item.credentialURL} />
            </div>
            <div className="col-12 d-flex justify-content-end mt-2">
              <button className="btn btn-outline-danger" onClick={() => removeCertification(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-primary" onClick={addNewCertification} style={{ width: '250px' }}>+ Add More Certification</button>
        <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
          {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
        </button>
      </div>
    </div>
  );
}

export default Certification;
