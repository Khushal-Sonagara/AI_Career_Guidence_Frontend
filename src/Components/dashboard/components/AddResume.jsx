import React, { useState } from 'react';
import { PlusSquare } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import UserResumesService from '../../../Services/UserResumesService';
import { useUserContext } from '../../Auth/UserContext';
import { toast } from 'sonner'; // Import toast

function AddResume({ refreshData }) {
  const [show, setShow] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { userData } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const data = {
      UserID: userData.userID,
      resumeTitle: resumeTitle
    };

    UserResumesService.insert(data)
      .then((resp) => {
        if (resp) {
          setLoading(false);
          setShow(false);
          setResumeTitle('');
          // ✅ Show success message
          toast.success('Resume created successfully!', {
            duration: 3000, // Show for 3 seconds
          });
          refreshData(); // ✅ Refresh the resume list
        }
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div
        className='d-flex align-items-center justify-content-center border border-secondary rounded bg-light text-dark p-3 cursor-pointer'
        style={{ height: '300px', width: "300px" }}
        onClick={() => setShow(true)}
      >
        <PlusSquare />
      </div>

      <div className={`modal fade ${show ? 'show d-block' : ''}`} tabIndex='-1' style={{ display: show ? 'block' : 'none' }}>
        <div className='modal-dialog'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title'>Create New Resume</h5>
              <button type='button' className='btn-close' onClick={() => setShow(false)}></button>
            </div>
            <div className='modal-body'>
              <div className='mb-3'>
                <label className='form-label'>Resume Title</label>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Ex. Full Stack Resume'
                  value={resumeTitle}
                  onChange={(e) => setResumeTitle(e.target.value)}
                />
              </div>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' onClick={() => setShow(false)}>Cancel</button>
              <button type='button' className='btn btn-primary' onClick={handleCreate} disabled={!resumeTitle || loading}>
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className='modal-backdrop fade show' onClick={() => setShow(false)}></div>}
    </>
  );
}

export default AddResume;
