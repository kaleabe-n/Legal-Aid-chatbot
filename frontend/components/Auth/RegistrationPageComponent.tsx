"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RiMailLine } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import { useRegisterUserMutation } from "../../src/store/signup/signup-api";
import { useUserContext } from "./UserContext";

const RegistrationComponent = () => {
  const { setUserEmail } = useUserContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await registerUser({ name, email, password }); // Used email instead of userEmail
      if ("error" in response) {
        if ("message" in response.error) {
          setErrorMessage(response.error.message as string);
        } else {
          setErrorMessage("Registration failed.");
        }
      } else {
        setUserEmail(email);
        router.push("/verify-email");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="md:bg-secondary md:min-h-screen flex items-center justify-center">
      <div className="w-10/12 md:w-11/12 lg:w-9/12 flex md:shadow-md">
        <div className="hidden md:flex w-7/12 bg-primary flex-col justify-center items-center space-y-4 rounded-l-xl">
          {/* Logo section */}
          <img
            src="legal-aid-logo.svg"
            alt=""
            width={100}
            height={100}
            style={{ width: "100%" }}
          />
          {/* Title Section */}
          <h1 className="font-bold text-lg text-white">Legal Aid</h1>
          {/* Description section */}
          <p className="text-white mt-4">
            Ask about the legal system with just clicks
          </p>
        </div>
        <div className="w-full md:w-5/12 bg-white rounded-r-xl flex flex-col py-20 md:px-8">
          {/* Welcome section */}
          <h1 className="w-full text-center text-xl font-semibold">Welcome</h1>
          {/* form section */}
          <form
            className="flex flex-col space-y-4 mt-8 md:px-8"
            onSubmit={handleRegister}
          >
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <RiMailLine color="#505050" size={16} />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-auto h-full focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <FaRegUser color="#000000" size={18} />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="flex-auto h-full focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <CiLock color="#000000" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-auto h-full focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <CiLock color="#000000" size={18} />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="flex-auto h-full focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <button
              className="mt-8 bg-primary text-white rounded-md py-3 px-4 outline outline-2 outline-primary hover:bg-white hover:text-primary hover:shadow-inner transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
          <div className="flex items-center mt-4 md:px-5">
            <hr className="w-full border-gray-800" />
            <p className="mx-4">OR</p>
            <hr className="w-full border-gray-800" />
          </div>
          <button className="mt-4 md:mx-8 rounded-md py-1 px-4 outline outline-1 outline-slate-500 text-sm bg-white hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary flex space-x-2 items-center justify-center">
            <img
              src="./images/registration/googleIcon.svg"
              alt="google"
              className="w-10 h-10 object-cover"
            />
            <p>Sign in With Google</p>
          </button>
          <div className="mt-4 md:px-8 flex justify-between">
            <p className="text-sm text-slate-500">Already have an account?</p>
            <Link
              href="/login"
              className="text-primary text-sm hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationComponent;
