"use client";

import { useState } from "react";
import { loginUser } from "@/app/libs/apis/server";

// Client component for client side rendering
export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    if (!email) {
      setEmailError("Email is required!");
      return false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required!");
      return false;
    } else {
      setPasswordError("");
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      // Login Form Data Submission
      // console.log("Form Data:", { Email: email, Password: password });
      const login = await loginUser({ email: email, password: password });
      console.log("LOGIN RESPONSE ", login);
    }
  };
  return (
    <div className="w-[380px] mx-auto bg-green-200">
      <div
        className="bg-white shadow-md border border-gray-500 rounded-lg p-4"
        style={{ backgroundColor: "#fabb7d" }}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* <form action="#" onSubmit={handleSubmit} className="space-y-6"> */}
          {/* Title */}
          <h3 className="text-center text-xl font-semibold text-gray-900">
            {props.title}
          </h3>
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Your email
            </label>

            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-300 border border-gray-500 rounded-lg text-gray-900 focus:ring-1 focus:ring-offset-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus-visible:border-blue-600"
              // className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Yourname@gmail.com"
            />

            {emailError && (
              <div className="text-red-600 text-sm mt-2 ml-2">{emailError}</div>
            )}
          </div>
          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-900 block mb-2"
            >
              Your password
            </label>

            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-300 border border-gray-500 rounded-lg text-gray-900 focus:ring-1 focus:ring-offset-2 focus:ring-orange-500 focus:border-blue-500 block w-full p-2.5"
              // className= "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="**********"
            />

            {passwordError && (
              <div className="text-red-600 text-sm mt-2 ml-2">
                {passwordError}
              </div>
            )}
          </div>
          {/* Remember me */}
          <div className="flex justify-between">
            {/* <div className="flex items-start"> */}
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id="remember"
                  className="bg-gray-50 border border-gray-300 focus:ring-3 focus:ring-blue-300 h-4 w-4 rounded"
                />
              </div>
              <div className="text-sm ml-3">
                <label htmlFor="remember" className="font-medium text-gray-900">
                  Remember me
                </label>
              </div>
            </div>

            {/* Margin left - ml-auto */}
            {/* <a href="/forget-password" className="text-sm text-blue-700 hover:underline ml-auto">Forget Password</a> */}
            <a
              href="/forget-password"
              className="text-sm text-blue-700 font-medium hover:underline"
            >
              Lost Password?
            </a>
          </div>
          {/* Submit button */}
          <button
            type="submit"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Sign in
          </button>
          <div className="flex justify-center text-sm font-medium text-gray-500 space-x-1">
            <span>Not registered?</span>
            <a href="/register" className="text-blue-700  hover:underline">
              Create an account
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
