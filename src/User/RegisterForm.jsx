import React, { useState } from "react";
import { useRegisterUser } from "../hooks/auth.hook";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Assuming you're using toast notifications

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    avatar: null,
    coverPhoto: null,
  });

  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();
  const registerMutation = useRegisterUser();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.avatar) {
      toast.error("Avatar is required");
      return;
    }

    setLoading(true); // Set loading to true on submit
  

    registerMutation.mutate(formData, {
      onSuccess: () => {
        setLoading(false);
           toast.success("Registration successful");
        navigate("/login");
      },
      onError: (error) => {
        setLoading(false);
          toast.error(error.message || "Registration failed"); 
  
      },
    });
  };

  return (
    <>
      <div className="max-w-md my-8 mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="avatar"
              className="block text-sm font-medium text-gray-700"
            >
              Avatar
            </label>
            <input
              type="file"
              name="avatar"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverPhoto"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Image (Optional)
            </label>
            <input
              type="file"
              name="coverPhoto"
              accept="image/*"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-500"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            disabled={loading} // Disable button during loading
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
      <div className="flex justify-center items-center">
        <h1>
          Have an account?{" "}
          <Link to="/login" className="cursor-pointer font-bold">
            Login
          </Link>
        </h1>
      </div>
    </>
  );
};

export default RegisterForm;
