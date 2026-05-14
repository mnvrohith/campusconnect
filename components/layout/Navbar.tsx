"use client";

import Link from "next/link";

import {
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";

export default function Navbar() {

  const { isSignedIn } = useUser();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">

      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-indigo-400"
        >
          CampusConnect
        </Link>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300">

          <Link
            href="/events"
            className="hover:text-white transition"
          >
            Events
          </Link>

          <Link
            href="/clubs"
            className="hover:text-white transition"
          >
            Clubs
          </Link>

          {isSignedIn && (
            <Link
              href="/dashboard"
              className="hover:text-white transition"
            >
              Dashboard
            </Link>
          )}

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {!isSignedIn ? (
            <>
              <SignInButton mode="modal">
                <button className="px-4 py-2 text-sm rounded-lg border border-slate-700 hover:border-slate-500 transition">
                  Login
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="px-4 py-2 text-sm rounded-lg bg-indigo-500 hover:bg-indigo-600 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}

        </div>

      </nav>

    </header>
  );
}