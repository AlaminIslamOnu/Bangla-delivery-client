import React from "react";
import { Link, Outlet } from "react-router";
import ProFastLogo from "../Pages/Shared/ProFaastLogo/ProFastLogo";
import {
  FaHome,
  FaBoxOpen,
  FaMoneyCheckAlt,
  FaShippingFast,
  FaUserEdit,
  FaUsers,
  FaUserClock,
} from "react-icons/fa";

const DashboardLayout = () => {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Page content here */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-2"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          <div className="mx-2 lg:hidden flex-1 px-2">Dashboard</div>
        </div>
        <Outlet></Outlet>
      </div>

      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
          {/* Sidebar content here */}
          <ProFastLogo></ProFastLogo>
          <Link to={"/"} className="flex items-center gap-2">
            <FaHome />
            <p>Home</p>
          </Link>

          <Link to={"/dashboard/myparcels"} className="flex items-center gap-2">
            <FaBoxOpen />
            <p>My Parcel</p>
          </Link>

          <Link
            to={"/dashboard/paymenthistory"}
            className="flex items-center gap-2"
          >
            <FaMoneyCheckAlt />
            <p>Payment</p>
          </Link>

          <Link to={"/dashboard/track"} className="flex items-center gap-2">
            <FaShippingFast />
            <p>Track a package</p>
          </Link>

          <Link to={"/dashboard/profile"} className="flex items-center gap-2">
            <FaUserEdit />
            <p>Update Profile</p>
          </Link>
          {/* Riders links  */}
          <Link
            to={"/dashboard/activeriders"}
            className="flex items-center gap-2"
          >
            <FaUsers />
            <p>Active Riders</p>
          </Link>

          <Link
            to={"/dashboard/pendingriders"}
            className="flex items-center gap-2"
          >
            <FaUserClock />
            <p>Pending Riders</p>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
