import React from "react";
import { Outlet } from "react-router";
import loginImg from "../../src/assets/authImage.png";
import ProFastLogo from "../Pages/Shared/ProFaastLogo/ProFastLogo";
const AuthLayout = () => {
  return (
    <div className=" bg-base-200 mx-auto md:w-[1000px] md:my-15 rounded-2xl shadow-2xl">
      <div className="p-8">
        <ProFastLogo></ProFastLogo>
      </div>
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="flex-1">
          <img src={loginImg} className="max-w-sm rounded-lg shadow-2xl" />
        </div>
        <div className="flex-1">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
