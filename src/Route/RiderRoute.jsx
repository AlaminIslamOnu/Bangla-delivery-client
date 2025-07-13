import React from 'react';
import UseAuth from '../Hooks/useAuth';
import useUserRole from '../Hooks/useUserRole';
import Loading from '../Pages/Shared/Loading/Loading';

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