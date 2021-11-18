import React from 'react';
import avatar from 'assets/images/avatar.png';
import { useAuthState } from 'context/AuthProvider';
import './Profile.scss';

const Profile: React.FC = () => {
  const authState = useAuthState();

  return (
    <div id="profile-page">
      <div className="page-title">
        <h4>Profile & My Questions</h4>
      </div>
      <div className="user-card">
        <div className="d-flex">
          <div className="avatar">
            <div className="avatar-card">
              <div className="avatar-content">
                <img src={avatar} alt="" width="100%" />
              </div>
              <small>Name:</small>
              <br />
              <p>{authState.user.name}</p>
              <small>username:</small>
              <br />
              <p>{authState.user.email}</p>
            </div>
          </div>
          <div className="flex-grow-1 profile-details" />
        </div>
      </div>
    </div>
  );
};

export default Profile;
