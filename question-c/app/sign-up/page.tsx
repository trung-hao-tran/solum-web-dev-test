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

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

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

    // Check if email already exists
    const emailExists = VALID_USERS.find((user) => user.email === email);
    if (emailExists) {
      setEmailError("Email already registered");
      return;
    }

    // Validate password format
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    // Successful registration - add user to the shared list
    VALID_USERS.push({ email, password });
    setRegisteredEmail(email);
    setIsRegistered(true);
  };

  const handleBackToSignUp = () => {
    setIsRegistered(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setRegisteredEmail("");
  };

  // Success screen after registration
  if (isRegistered) {
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

          {/* Success Message */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent"
            >
              Account Created!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-zinc-300"
            >
              {registeredEmail}
            </motion.p>
          </div>

          {/* Registration Success Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-zinc-400 text-lg">
              Your account has been successfully created.
            </p>
            <p className="text-zinc-500 text-sm">
              You can now sign in with your credentials.
            </p>
          </motion.div>

          {/* Go to Sign In Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Link href="/sign-in">
              <SplashButton className="px-10 py-3">
                Go to Sign In
              </SplashButton>
            </Link>
            <SplashButton
              onClick={handleBackToSignUp}
              className="px-10 py-3 bg-gradient-to-br from-zinc-700 to-zinc-800"
            >
              Create Another
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

  // Sign up form
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
        <SignUpForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          emailError={emailError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          onSubmit={handleSignUp}
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
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="text-zinc-400">
        Already have an account?{" "}
        <Link href="/sign-in" className="text-blue-400 hover:underline">
          Sign in.
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

interface SignUpFormProps {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
  onSubmit: (e: React.FormEvent) => void;
}

const SignUpForm = ({
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  emailError,
  passwordError,
  confirmPasswordError,
  onSubmit,
}: SignUpFormProps) => {
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
      <div className="mb-3">
        <label htmlFor="password-input" className="mb-1.5 block text-zinc-400">
          Password
        </label>
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
        <div className="mt-2 text-xs text-zinc-500 space-y-1">
          <p className="font-medium text-zinc-400">Password must contain:</p>
          <ul className="list-disc list-inside space-y-0.5 ml-1">
            <li>8-16 characters</li>
            <li>At least one uppercase letter</li>
            <li>At least one lowercase letter</li>
            <li>At least one number</li>
            <li>At least one symbol (!@#$%^&*...)</li>
          </ul>
        </div>
      </div>

      {/* Confirm Password Input */}
      <div className="mb-6">
        <label
          htmlFor="confirm-password-input"
          className="mb-1.5 block text-zinc-400"
        >
          Confirm Password
        </label>
        <input
          id="confirm-password-input"
          type="password"
          placeholder="••••••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className={twMerge(
            "w-full rounded-md border bg-zinc-900 px-3 py-2 placeholder-zinc-500 ring-1 ring-transparent transition-shadow focus:outline-0",
            confirmPasswordError
              ? "border-red-500 focus:ring-red-700"
              : "border-zinc-700 focus:ring-blue-700"
          )}
        />
        {confirmPasswordError && (
          <p className="mt-1.5 text-sm text-red-400">{confirmPasswordError}</p>
        )}
      </div>

      {/* Submit Button */}
      <SplashButton type="submit" className="w-full">
        Create Account
      </SplashButton>
    </form>
  );
};

const Terms = () => (
  <p className="mt-9 text-xs text-zinc-400">
    By creating an account, you agree to our{" "}
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
