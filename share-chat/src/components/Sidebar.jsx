import React from 'react';
import "./Sidebar.css";
import SidebarOption from './Sidebaroption';
import SmsFailedIcon from '@mui/icons-material/SmsFailed';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';


function Sidebar({ username }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/');
  };

  return (
    <div className="sidebar">
      <h1 className="logotext">ShareChat</h1>
      <h2>Welcome {username}</h2>
      <SidebarOption Icon={HomeIcon} text="Home" />
      <SidebarOption Icon={LogoutIcon} text="Log Out" onClick={handleSignOut} />
    </div>
  );
}

export default Sidebar;
