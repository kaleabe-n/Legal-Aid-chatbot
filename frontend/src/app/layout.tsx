import { Providers } from "@/store/provider";
import "./globals.css";

export const metadata = {
  title: "Amharic Legal Aid Chatbot",
  description: "Amharic Legal Aid Chatbot",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
