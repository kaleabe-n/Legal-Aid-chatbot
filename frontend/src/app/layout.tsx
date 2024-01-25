import { Providers } from "@/store/provider";
import "./globals.css";
import { Poppins } from "next/font/google";

export const metadata = {
  title: "Amharic Legal Aid Chatbot",
  description: "Amharic Legal Aid Chatbot",
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
