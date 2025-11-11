"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiGoogle, SiFacebook, SiX } from "react-icons/si";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { VALID_USERS } from "../data/users";

/**
 * Password validation rules
 */
const validatePassword = (password: string) => {
  if (password.length < 8 || password.length > 16) {
    return "Password must be 8-16 characters long";
  }
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }
  if (!/[0-9]/.test(password)) {
    return "Password must contain at least one number";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one symbol";
  }
  return null;
};

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");

    // Validate email not empty
    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Invalid email address");
      return;
    }

    // Check if email exists in valid users list
    const userExists = VALID_USERS.find((user) => user.email === email);
    if (!userExists) {
      setEmailError("Account does not exist");
      return;
    }

    // Validate password format
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    // Check if password matches for the email
    if (userExists.password !== password) {
      setPasswordError("Incorrect password");
      return;
    }

    // Successful login
    setLoggedInEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
    setLoggedInEmail("");
  };

  // Welcome screen after successful login
  if (isLoggedIn) {
    return (
      <div className="bg-zinc-950 min-h-screen flex items-center justify-center text-zinc-200 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 text-center space-y-8 p-8 max-w-2xl mx-auto"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto"
          >
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          {/* Welcome Message */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            >
              Welcome Back!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-300"
            >
              {loggedInEmail}
            </motion.p>
          </div>

          {/* Success Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-zinc-400 text-lg">
              You have successfully logged in to your account.
            </p>
            <p className="text-zinc-500 text-sm">
              Your session is now active and secure.
            </p>
          </motion.div>

          {/* Logout Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SplashButton onClick={handleLogout} className="px-10 py-3">
              Logout
            </SplashButton>
          </motion.div>

          {/* Logo at bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="pt-8"
          >
            <Image
              src="/logo.svg"
              alt="Logo"
              width={150}
              height={40}
              className="h-8 w-auto mx-auto opacity-50"
            />
          </motion.div>
        </motion.div>
        <CornerGrid />
      </div>
    );
  }

  // Login form
  return (
    <div className="bg-zinc-950 min-h-screen flex items-center justify-center text-zinc-200 selection:bg-zinc-600 p-4">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-xl"
      >
        <Heading />
        <SocialOptions />
        <Or />
        <LoginForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          emailError={emailError}
          passwordError={passwordError}
          onSubmit={handleLogin}
        />
        <Terms />
      </motion.div>

      <CornerGrid />
    </div>
  );
}

const Heading = () => (
  <div>
    <NavLogo />
    <div className="mb-9 mt-6 space-y-1.5">
      <h1 className="text-2xl font-semibold">Sign in to your account</h1>
      <p className="text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link href="/sign-up" className="text-blue-400 hover:underline">
          Create one.
        </Link>
      </p>
    </div>
  </div>
);

const SocialOptions = () => (
  <div className="flex flex-col sm:flex-row gap-3">
    <BubbleButton className="flex w-full justify-center py-3">
      <SiGoogle />
    </BubbleButton>
    <BubbleButton className="flex w-full justify-center py-3">
      <SiFacebook />
    </BubbleButton>
    <BubbleButton className="flex w-full justify-center py-3">
      <SiX />
    </BubbleButton>
    <BubbleButton className="flex w-full justify-center py-3">
      <SiGithub />
    </BubbleButton>
  </div>
);

const Or = () => {
  return (
    <div className="my-6 flex items-center gap-3">
      <div className="h-[1px] w-full bg-zinc-700" />
      <span className="text-zinc-400">OR</span>
      <div className="h-[1px] w-full bg-zinc-700" />
    </div>
  );
};

interface LoginFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  emailError: string;
  passwordError: string;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  emailError,
  passwordError,
  onSubmit,
}: LoginFormProps) => {
  return (
    <form onSubmit={onSubmit}>
      {/* Email Input */}
      <div className="mb-3">
        <label htmlFor="email-input" className="mb-1.5 block text-zinc-400">
          Email
        </label>
        <input
          id="email-input"
          type="text"
          placeholder="your.email@provider.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={twMerge(
            "w-full rounded-md border bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0",
            emailError
              ? "border-red-500 focus:ring-red-700"
              : "border-zinc-700 focus:ring-blue-700"
          )}
        />
        {emailError && (
          <p className="mt-1.5 text-sm text-red-400">{emailError}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-6">
        <div className="mb-1.5 flex items-end justify-between">
          <label htmlFor="password-input" className="block text-zinc-400">
            Password
          </label>
          <a href="#" className="text-sm text-blue-400">
            Forgot?
          </a>
        </div>
        <input
          id="password-input"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={twMerge(
            "w-full rounded-md border bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0",
            passwordError
              ? "border-red-500 focus:ring-red-700"
              : "border-zinc-700 focus:ring-blue-700"
          )}
        />
        {passwordError && (
          <p className="mt-1.5 text-sm text-red-400">{passwordError}</p>
        )}
      </div>

      {/* Submit Button */}
      <SplashButton type="submit" className="w-full">
        Sign in
      </SplashButton>
    </form>
  );
};

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By signing in, you agree to our{" "}
    <a href="#" className="text-blue-400">
      Terms & Conditions
    </a>{" "}
    and{" "}
    <a href="#" className="text-blue-400">
      Privacy Policy.
    </a>
  </p>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const SplashButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        "rounded-md bg-gradient-to-br from-blue-400 to-blue-700 px-4 py-2 text-lg text-zinc-50 ring-2 ring-blue-500/50 ring-offset-2 ring-offset-zinc-950 transition-all hover:scale-[1.02] hover:ring-transparent active:scale-[0.98] active:ring-blue-500/70",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const BubbleButton = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={twMerge(
        `
        relative z-0 flex items-center gap-2 overflow-hidden whitespace-nowrap rounded-md
        border border-zinc-700 bg-gradient-to-br from-zinc-800 to-zinc-950
        px-3 py-1.5
        text-zinc-50 transition-all duration-300

        before:absolute before:inset-0
        before:-z-10 before:translate-y-[200%]
        before:scale-[2.5]
        before:rounded-[100%] before:bg-zinc-100
        before:transition-transform before:duration-500
        before:content-[""]

        hover:scale-105 hover:text-zinc-900
        hover:before:translate-y-[0%]
        active:scale-100`,
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

const CornerGrid = () => {
  return (
    <div
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
      }}
      className="absolute right-0 top-0 z-0 size-[50vw]"
    >
      <div
        style={{
          backgroundImage:
            "radial-gradient(100% 100% at 100% 0%, rgba(9,9,11,0), rgba(9,9,11,1))",
        }}
        className="absolute inset-0"
      />
    </div>
  );
};

const NavLogo = () => {
  return (
    <Link href="/" className="inline-block">
      <Image src="/logo.svg" alt="Logo" width={200} height={54} className="h-12 w-auto" />
    </Link>
  );
};
