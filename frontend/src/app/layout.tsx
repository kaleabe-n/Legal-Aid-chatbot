import { Providers } from "@/store/provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "react-toastify/dist/ReactToastify.css";
import SessionWrapper from "../../components/Auth/SessionWrapper";
import { UserProvider } from "../../components/Auth/UserContext";

export const metadata = {
  title: "Amharic Legal Aid Chatbot",
  description: "Amharic Legal Aid Chatbot",
  icons: {
    icon: "favico.ico",
  },
};

const poppins = Poppins({
  weight: "300",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={`flex flex-col ${poppins.className}`}>
          <UserProvider>
            <Providers>
              {children}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Providers>
          </UserProvider>
        </body>
      </html>
    </SessionWrapper>
  );
}
