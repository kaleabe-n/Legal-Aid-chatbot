import { Providers } from "@/store/provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ToastContainer, toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

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
    <html lang="en">
      <body className={`flex flex-col ${poppins.className}`}>
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
      </body>
    </html>
  );
}
