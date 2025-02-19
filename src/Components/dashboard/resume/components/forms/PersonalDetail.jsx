import React, { useContext, useEffect, useState } from 'react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import PersonalDetailsService from '../../../../../Services/PersonalDetailsService';
import PhotoUploadService from '../../../../../Services/PhotoUploadService';

function PersonalDetail() {
    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();

    const [personalDetails, setPersonalDetails] = useState({
        personalDetailID: null,
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        phoneNumber: '',
        email: '',
        linkedIn: '',
    });

    const [photo, setPhoto] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (resumeInfo?.personalDetails) {
            setPersonalDetails(resumeInfo.personalDetails);
        }
        if (resumeInfo?.resumePhoto?.photoUrl) {
            setPreview(resumeInfo.resumePhoto.photoUrl);
        }
    }, [resumeInfo]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPersonalDetails((prev) => ({
            ...prev,
            [name]: value,
        }));

        setResumeInfo((prev) => ({
            ...prev,
            personalDetails: {
                ...prev.personalDetails,
                [name]: value,
            },
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setPhoto(file);
            return () => URL.revokeObjectURL(url); // Cleanup to avoid memory leaks
        }
    };

    const onSave = async () => {
        setLoading(true);
        try {
            const data = { ...personalDetails, resumeId: params.id };

            if (personalDetails.personalDetailID) {
                await PersonalDetailsService.update(data);
            } else {
                await PersonalDetailsService.insert(data);
            }

            if (photo) {
                const response = await PhotoUploadService.uploadPhoto(resumeInfo.resume.userID, photo);

                setResumeInfo((prev) => ({
                    ...prev,
                    resumePhoto: { photoUrl: response.photoUrl },
                }));
                toast('Photo uploaded successfully!');
            }

            toast('Personal details saved successfully!');
        } catch (error) {
            toast('Server error, please try again!');
            console.error('API error:', error.response?.data || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', borderTop: '4px solid #007bff', marginTop: '20px', borderRadius: '8px' }}>
            <h2 style={{ fontWeight: 'bold', fontSize: '18px' }}>Personal Details</h2>
            <p>Fill in your personal information</p>

            {/* Form Fields */}
            <div className="row border p-3 my-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input type="text" className="form-control" name="firstName" onChange={handleChange} value={personalDetails.firstName} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input type="text" className="form-control" name="lastName" onChange={handleChange} value={personalDetails.lastName} />
                </div>
                <div className="col-12">
                    <label className="form-label">Job Title</label>
                    <input type="text" className="form-control" name="jobTitle" onChange={handleChange} value={personalDetails.jobTitle} />
                </div>
                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" onChange={handleChange} value={personalDetails.address} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Phone Number</label>
                    <input type="text" className="form-control" name="phoneNumber" onChange={handleChange} value={personalDetails.phoneNumber} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" onChange={handleChange} value={personalDetails.email} />
                </div>
                <div className="col-12">
                    <label className="form-label">LinkedIn</label>
                    <input type="text" className="form-control" name="linkedIn" onChange={handleChange} value={personalDetails.linkedIn} />
                </div>

                {/* Add Image Option Moved Here */}
                <div className="col-12 mt-3">
                    <label className="form-label">Upload Profile Picture</label>
                    {/* Profile Image - Square and Left Aligned */}
                    <div className="d-flex align-items-start mb-3">
                        <div style={{ marginRight: '20px' }}>
                            {preview ? (
                                <img src={preview} alt="Profile" width="150" height="150" className="rounded" style={{ objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100px', height: '100px', backgroundColor: '#e9ecef', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px' }}>
                                    No Image
                                </div>
                            )}
                        </div>
                        <div>
                            <h6 className="mt-2">Profile Picture</h6>
                            <p className="text-muted">Upload a square image for best results.</p>
                        </div>
                    </div>
                    <input type="file" className="form-control" onChange={handleFileChange} accept="image/*" />
                </div>
            </div>

            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" disabled={loading} onClick={onSave} style={{ width: '100px' }}>
                    {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : 'Save'}
                </button>
            </div>
        </div>
    );
}

export default PersonalDetail;
