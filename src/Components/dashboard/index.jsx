import React, { useEffect, useState } from 'react';
import AddResume from './components/AddResume';
import { useUser } from '@clerk/clerk-react';
import UserResumesService from '../../Services/UserResumesService';
import ResumeCardItem from './components/ResumeCardItem';
import { useUserContext } from '../Auth/UserContext';

function Dashboard() {
  const { userData } = useUserContext();
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user, userData]);

  const GetResumesList = () => {
    if (userData) {
      UserResumesService.getByUserId(userData.userID)
        .then((resp) => {
          setResumeList(resp);
        })
        .catch((error) => {
          console.error('Error fetching resumes', error);
        });
    }
  };

  return (
    <div className='container py-4'>
      <h2 className='fw-bold fs-3'>My Resume</h2>
      <p>Start Creating AI resume for your next Job role</p>
      <div className='row g-3 mt-3'>
      <AddResume refreshData={GetResumesList} />
        {resumeList.length > 0
          ? resumeList.map((resume) => (
              <div className='col-6 col-sm-4 col-md-3 col-lg-4' key={resume.resumeID}>
                <ResumeCardItem resume={resume} refreshData={GetResumesList} />
              </div>
            ))
          : Array(5).fill(0).map((_, index) => (
              <div className='col-6 col-sm-4 col-md-3 col-lg-2' key={index}>
                <div className='rounded bg-secondary' style={{ height: '200px' }}></div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Dashboard;
  