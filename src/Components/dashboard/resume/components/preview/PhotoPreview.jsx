import React from 'react';
// import ph from '../../../../../assets/passportphoto.jpg';

function PhotoPreview({ resumeInfo }) {
  return (
      <img
        src={resumeInfo?.photoUrl ? resumeInfo.photoUrl : ph}
        alt="Profile"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
  );
}

export default PhotoPreview;
