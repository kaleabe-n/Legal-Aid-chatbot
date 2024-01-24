/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const RegistrationPageComponent: React.FC = () => {
  return (
    <div className="bg-secondary min-h-screen flex items-center justify-center">
      <div className="w-9/12 flex shadow-md">
        <div className="w-7/12 bg-primary flex flex-col justify-center items-center rounded-l-xl">
          {/* Logo section */}
          <img src="./images/registration/Mask group.svg" alt="" className="" />

          {/* Title Section */}
          <h1 className="font-bold text-lg text-white">Legal Aid</h1>

          {/* Description section */}
          <p className="text-white mt-4">
            Ask about legal system with just clicks
          </p>
        </div>
        <div className="w-5/12 bg-white rounded-r-xl flex flex-col py-20 px-8">
          {/* Welcome section */}
          <h1 className="w-full text-center text-xl font-semibold">Welcome</h1>

          {/* form section */}
          <div className="flex flex-col space-y-4 px-8 mt-8">
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              type="text"
              placeholder="Phone Number"
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              placeholder="Password"
            />
            <input
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
              type="password"
              placeholder="Confirm Password"
            />
          </div>

          <button className="mt-8 mx-8 bg-primary text-white rounded-md py-3 px-4 outline outline-2 outline-primary hover:bg-white hover:text-primary hover:shadow-inner transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
            SignUp
          </button>
          <div className="flex items-center mt-4 px-5">
            <hr className="w-full border-gray-800" />
            <p className="mx-4">OR</p>
            <hr className="w-full border-gray-800" />
          </div>
          <button className="mt-4 mx-8 rounded-md py-1 px-4 outline outline-1 outline-slate-500 text-sm bg-white hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary flex space-x-2 items-center justify-center">
            <img
              src="./images/registration/googleIcon.svg"
              alt="google"
              className="w-10 h-10 object-cover"
            />
            <p>Sign in With Google</p>
          </button>
          <div className="mt-4 px-8 flex justify-between">
            <p className="text-sm text-slate-500">Do you Have an account?</p>
            <Link href="#" className="text-primary text-sm hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPageComponent;
