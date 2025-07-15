import React from 'react';

import useUserRole from '../Hooks/useUserRole';
import Loading from '../Pages/Shared/Loading/Loading';
import UseAuth from '../Hooks/UseAuth';

const RiderRoute = ({children}) => {
    const { user, loading } = UseAuth();
    const { role, roleLoading } = useUserRole();
  
    if (loading || roleLoading) {
      return <Loading> </Loading>;
    }
    if (!user || role !== "rider") {
      return (
        <Navigate
          state={{ from: location.pathname }}
          to={"/forbidden"}
        ></Navigate>
      );
    }
    return children;
};

export default RiderRoute;