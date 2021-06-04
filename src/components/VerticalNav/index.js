import React from 'react';
import { useSelector } from 'react-redux';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';
import { selectUser } from '../../state/userSlice';

import UserProfile from './../UserProfile';
import './styles.scss';



const VerticalNav = ({ children }) => {
  const currentUser = useSelector(selectUser)
  
  const configUserProfile = {
    currentUser
  }

  return (
    <div className="verticalNav">

      <UserProfile {...configUserProfile} />

      <div className="menu">
        {children}
      </div>
    </div>
  );
}

export default VerticalNav;