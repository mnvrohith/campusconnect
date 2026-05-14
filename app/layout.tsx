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
      <body className="bg-slate-950 text-slate-100 antialiased">
        <SyncUser />
        <Navbar />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}