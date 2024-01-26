/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FiPhone } from "react-icons/fi";
import { CiLock } from "react-icons/ci";

const Page: React.FC = () => {
  return (
    <>
      <div className="hidden md:flex bg-secondary min-h-screen items-center justify-center">
        <div className="w-9/12 flex shadow-md">
          <div className="w-7/12 bg-primary flex flex-col justify-center items-center space-y-4 rounded-l-xl">
            {/* Logo section */}
            <img src="./images/login/Mask group.svg" alt="" className="" />

            {/* Title Section */}
            <h1 className="font-bold text-lg text-white">Legal Aid</h1>

            {/* Description section */}
            <p className="text-white mt-4">
              Ask about legal system with just clicks
            </p>
          </div>
          <div className="w-5/12 bg-white rounded-r-xl flex flex-col py-20 px-8">
            {/* Welcome section */}
            <h1 className="w-full text-center text-xl font-semibold">
              Welcome
            </h1>

            {/* form section */}
            <div className="flex flex-col space-y-4 px-8 mt-8">
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <FiPhone color="#505050" />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="flex-auto h-full focus:outline-none"
                />
              </div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <CiLock color="#000000" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-auto h-full focus:outline-none"
                />
              </div>
            </div>

            {/* Reset Password link */}
            <div className="text-center mt-4">
              <Link href="#" className="text-primary text-sm hover:underline">
                Reset Password?
              </Link>
            </div>
            <button className="mt-8 mx-8 bg-primary text-white rounded-md py-3 px-4 outline outline-2 outline-primary hover:bg-white hover:text-primary hover:shadow-inner transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
              Login
            </button>
            <div className="flex items-center mt-4 px-5">
              <hr className="w-full border-gray-800" />
              <p className="mx-4">OR</p>
              <hr className="w-full border-gray-800" />
            </div>
            <button className="mt-4 mx-8 rounded-md py-1 px-4 outline outline-1 outline-slate-500 text-sm bg-white hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary flex space-x-2 items-center justify-center">
              <img
                src="./images/login/googleIcon.svg"
                alt="google"
                className="w-10 h-10 object-cover"
              />
              <p>Sign in With Google</p>
            </button>
            <div className="mt-4 px-8 flex justify-between">
              <p className="text-sm text-slate-500">
                Don&apos;t Have an account?
              </p>
              <Link href="#" className="text-primary text-sm hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      <div className="md:hidden bg-white rounded-r-xl flex flex-col py-20 px-8">
          {/* Welcome section */}
          <h1 className="w-full text-center text-xl font-semibold">Legal Aid Login</h1>

          {/* form section */}
          <div className="flex flex-col space-y-4 mt-8">
            <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
              <FiPhone color="#505050" />
              <input
                type="text"
                placeholder="Phone Number"
                className="flex-auto h-full focus:outline-none"
              />
            </div>
            <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
            <CiLock color="#000000" size={18} />
              <input
                type="password"
                placeholder="Password"
                className="flex-auto h-full focus:outline-none"
              />
            </div>
          </div>

          {/* Reset Password link */}
          <div className="text-right mt-4">
            <Link href="#" className="text-primary text-sm hover:underline">
              Reset Password?
            </Link>
          </div>
          <button className="mt-8 bg-primary text-white rounded-md py-3 px-4 outline outline-2 outline-primary hover:bg-white hover:text-primary hover:shadow-inner transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-primary">
            Login
          </button>
          <div className="flex items-center mt-4">
            <hr className="w-full border-gray-800" />
            <p className="mx-4">OR</p>
            <hr className="w-full border-gray-800" />
          </div>
          <button className="mt-4 rounded-md py-1 px-4 outline outline-1 outline-slate-500 text-sm bg-white hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary flex space-x-2 items-center justify-center">
            <img
              src="./images/login/googleIcon.svg"
              alt="google"
              className="w-10 h-10 object-cover"
            />
            <p>Sign in With Google</p>
          </button>
          <div className="mt-4 px-8 flex justify-between">
            <p className="text-sm text-slate-500">
              Don&apos;t Have an account?
            </p>
            <Link href="#" className="text-primary text-sm hover:underline">
              Sign up
            </Link>
          </div>
        </div>
    </>
  );
};

export default Page;
