"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { CiLock } from "react-icons/ci";
import { LoginFormProps } from "../../../types/LoginForm";
import { RiMailLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/store/login/loginApi";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { signIn, useSession } from "next-auth/react";

const Page: React.FC = () => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.push("/");
    }
  }, [sessionStatus, router]);

  const [login, { data, isError, isLoading, isSuccess, error, status }] =
    useLoginMutation();

  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm<LoginFormProps>();

  const onSubmit = async (data: any) => {
    setLoading(true);
    console.log(data);
    const response: any = await login(data);

    if (response?.data?.access) {
      signIn("credentials", data);
      toast.success("Logged in successfully");
    } else {
      toast.error(
        "Unable to login, please check your email and password and try again"
      );
    }

    setLoading(false);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-3xl">
        Loading...
      </div>
    );

  return (
    <div className="md:bg-secondary md:min-h-screen flex items-center justify-center">
      <div className="w-10/12 md:w-11/12 lg:w-9/12 flex md:shadow-md">
        <div className="hidden md:flex w-7/12 bg-primary flex-col justify-center items-center space-y-4 rounded-l-xl">
          {/* Logo section */}
          <img src="./images/login/Mask group.svg" alt="logo" className="" />

          {/* Title Section */}
          <h1 className="font-bold text-lg text-white">Legal Aid</h1>

          {/* Description section */}
          <p className="text-white mt-4">
            Ask about legal system with just clicks
          </p>
        </div>
        <div className="w-full md:w-5/12 bg-white rounded-r-xl flex flex-col py-20 md:px-8">
          {/* Welcome section */}
          <h1 className="w-full text-center text-xl font-semibold">Welcome</h1>

          {/* form section */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 mt-8 md:px-8"
          >
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <RiMailLine color="#505050" size={16} />
                <input
                  type="email"
                  placeholder="Email"
                  className="flex-auto h-full focus:outline-none"
                  {...register("username", {
                    required: "Email is Required!!!",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("username");
                  }}
                />
              </div>
              {errors.username && (
                <small className="text-red-500 text-xs">
                  {errors.username.message}
                </small>
              )}
            </div>
            <div>
              <div className="border border-gray-300 rounded-md py-2 px-4 has-[:focus]:outline-none has-[:focus]:ring-2 has-[:focus]:ring-primary flex items-center space-x-3">
                <CiLock color="#000000" size={18} />
                <input
                  type="password"
                  placeholder="Password"
                  className="flex-auto h-full focus:outline-none"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  onKeyUp={() => {
                    trigger("password");
                  }}
                />
              </div>
              {errors.password && (
                <small className="text-red-500 text-xs">
                  {errors.password.message}
                </small>
              )}
            </div>
            {/* Reset Password link */}
            <div className="text-end md:text-center mt-4">
              <Link href="#" className="text-primary text-sm hover:underline">
                Reset Password?
              </Link>
            </div>
            <button
              disabled={!isValid}
              className="mt-8 bg-primary text-white rounded-md py-3 px-4 outline outline-2 outline-primary hover:bg-white hover:text-primary hover:shadow-inner transition ease-in duration-200 focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-white"
            >
              Login
            </button>
          </form>

          <div className="flex items-center mt-4 md:px-5">
            <hr className="w-full border-gray-800" />
            <p className="mx-4">OR</p>
            <hr className="w-full border-gray-800" />
          </div>
          <button
            type="button"
            disabled={isLoading}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              signIn("google");
            }}
            className="mt-4 md:mx-8 rounded-md py-1 px-4 outline outline-1 outline-slate-500 text-sm bg-white hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-primary flex space-x-2 items-center justify-center"
          >
            <img
              src="./images/login/googleIcon.svg"
              alt="google"
              className="w-10 h-10 object-cover"
            />
            <p>Sign in With Google</p>
          </button>
          <div className="mt-4 md:px-8 flex justify-between">
            <p className="text-sm text-slate-500">
              Don&apos;t Have an account?
            </p>
            <Link
              href="/signup"
              className="text-primary text-sm hover:underline"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
