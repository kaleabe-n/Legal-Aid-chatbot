"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useVerifyEmailMutation } from "../../src/store/signup/signup-api";
import { useUserContext } from "./UserContext";

const VerifyEmailComponent: React.FC = () => {
  const { userEmail } = useUserContext();
  const [code, setCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  const router = useRouter();

  const handleVerifyEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await verifyEmail({ email: userEmail, code });
      if (response.hasOwnProperty("error")) {
        if ("error" in response) {
          if ("message" in response.error) {
            setErrorMessage(
              response.error.message || "Email verification failed."
            );
          } else {
            setErrorMessage("Email verification failed.");
          }
        }
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.error("Error verifying email:", error);
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="md:bg-secondary md:min-h-screen flex items-center justify-center">
      <div
        className="w-full md:w-5/12 bg-white rounded-r-xl flex flex-col p-3 justify-center items-center"
        style={{ padding: "20px" }}
      >
        {/* Welcome section */}
        <h1
          className="w-full text-center text-3xl font-semibold"
          style={{ marginBottom: "10px" }}
        >
          Verify Email
        </h1>
        {/* form section */}
        <form
          className="flex flex-col space-y-4 md:px-8"
          onSubmit={handleVerifyEmail}
        >
          <div>
            <input
              type="text"
              placeholder="Verification Code"
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <button
            className="bg-primary text-white rounded-md py-3 px-4 outline-none hover:bg-white hover:text-primary transition ease-in duration-200"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmailComponent;
