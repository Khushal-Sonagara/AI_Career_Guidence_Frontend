import { Loader2, MoreVertical } from 'lucide-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, MenuItem, IconButton } from '@mui/material';
import ResumeDataService from '../../../Services/ResumeDataService';
import { toast } from 'sonner';


function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const onDelete = () => {
    setLoading(true);
    ResumeDataService.deleteByResumeId(resume.resumeID)
      .then(() => {
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="card shadow-lg border-light rounded overflow-hidden">
      <Link to={`/Resume/${resume.resumeID}/edit`}>
        <div className="text-center p-3" style={{ borderColor: resume?.themeColor || 'white' }}>
          <img src="/cv.png" alt="Resume" className="img-fluid" style={{ maxHeight: '200px' }} />
        </div>
      </Link>

      {/* Card Footer with Title and MoreVertical */}
      <div
        className="card-body d-flex align-items-center bg-dark text-white"
        style={{ background: resume?.themeColor || '#343a40' }}
      >
        {/* Title should truncate properly */}
        <h5
          className="mb-0 text-white"
          style={{
            flexGrow: 1, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            whiteSpace: 'nowrap', 
          }}
        >
          {resume.resumeTitle}
        </h5>

        {/* MoreVertical Icon Always Visible */}
        <IconButton onClick={handleMenuOpen} className="text-white" style={{width:'50px'}}>
          <MoreVertical />
        </IconButton>

        {/* MUI Menu */}
        <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
          <MenuItem onClick={() => { handleMenuClose(); navigation(`/resume/${resume.resumeID}/edit`); }}>Edit</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigation(`/my-resume/${resume.resumeID}/view`); }}>View</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); navigation(`/my-resume/${resume.resumeID}/download`); }}>Download</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); setOpenAlert(true); }} style={{ color: 'red' }}>Delete</MenuItem>
        </Menu>
      </div>

      {/* Bootstrap Modal for Deletion Confirmation */}
      {openAlert && (
        <div className="modal fade show d-block" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button type="button" className="btn-close" onClick={() => setOpenAlert(false)}></button>
              </div>
              <div className="modal-body">
                This action cannot be undone. Your resume will be permanently deleted.
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenAlert(false)}>Cancel</button>
                <button type="button" className="btn btn-danger" onClick={onDelete} disabled={loading}>
                  {loading ? <Loader2 className="animate-spin" /> : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {openAlert && <div className="modal-backdrop fade show" onClick={() => setOpenAlert(false)}></div>}
    </div>
  );
}

export default ResumeCardItem;
