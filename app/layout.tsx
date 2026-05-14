import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import SyncUser from "@/components/auth/SyncUser";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <ClerkProvider>
    <html lang="en">
      <body>
        <SyncUser />
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}