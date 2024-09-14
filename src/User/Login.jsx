import React, { useEffect, useState } from "react";
import { useLogin } from "../hooks/auth.hook";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const {
    mutate: loginUser,
    isLoading,
    isError,
    error,
    isSuccess,
    data: loginData,
  } = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
    };
    
    loginUser(formData);
  };

  // Handle the side effect after a successful login
  useEffect(() => {
    if (isSuccess && loginData) {
      dispatch(setUser(loginData.user)); // Assume loginData.user contains the user information
      toast.success("Login successful!");
      navigate("/");
    }
    if (isError && error) {
      toast.error(error.message || "An error occurred. Please try again.");
    }
  }, [isSuccess, loginData, isError, error, dispatch, navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="h-screen inset-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-dark rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-center gap-3 my-2">
          <img
            alt="logo"
            className=" w-16 h-14 sm:w-12 sm:h-10  object-cover  rounded-xl cursor-pointer  "
            src="../../../assests/images.png"
          />

          <h1 className="text-2xl font-bold  sm:block hidden">Show 🔥</h1>
        </div>

        <h2 className="text-center text-xl  mb-4">
          Don't have an account?
          <Link to="/user-register" className="cursor-pointer font-bold">
            
            Signup
          </Link>
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex justify-between items-center ">
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-2 mb-4 border border-gray-300 rounded "
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className="ml-2 text-gray-600"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <FaEye className="text-3xl -mx-3" />
              ) : (
                <FaEyeSlash className="text-3xl -mx-3 " />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-500 text-white rounded"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        
        {isSuccess && (
          <p className="text-green-500 font-bold mt-2">Login successful!</p>
        )}
      </div>
    </div>
  );
};

export default Login;
