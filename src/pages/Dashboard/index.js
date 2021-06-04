import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './styles.scss';
// import { selectUser } from '../../state/userSlice';
import useFirebaseAuth from '../../hooks/useFirebaseAuth';



const Dashboard = props => {
  const dispatch = useDispatch();
  const currentUser =  useFirebaseAuth()
  // const { currentUser, orderHistory } = useSelector(mapState);

  // useEffect(() => {
  //   dispatch(
  //     getUserOrderHistory(currentUser.id)
  //   );

  // }, []);

  return (
    <div>
      <h1>
        {currentUser && currentUser.displayName}
        Order History
      </h1>

      {/* <OrderHistory orders={orderHistory} /> */}
    </div>
  );
};

export default Dashboard;
