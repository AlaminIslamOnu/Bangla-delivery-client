import { Link } from "react-router";
import { FaBan } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 text-center p-4">
      <div className="max-w-md bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <div className="text-red-600 text-6xl">
          <FaBan className="mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-error">403 Forbidden</h1>
        <p className="text-gray-600">Sorry, you don't have permission to access this page.</p>
        <Link to="/" className="btn btn-primary text-black">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
