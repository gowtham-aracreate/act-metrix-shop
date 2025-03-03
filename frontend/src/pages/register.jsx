import React from "react";
import Auth from "../layout/auth";
import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.svg";
import Message from "../assets/message.svg";
import lock from "../assets/lock.svg";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const fields = [
    {
      icon: profile,
      alt: "Username",
      type: "text",
      placeholder: "Your Full Name",
      required: true,
      name: "name",
    },
    {
      icon: Message,
      alt: "Email",
      type: "email",
      placeholder: "Email Address",
      required: true,
      name: "email",
    },
    {
      icon: lock,
      alt: "Password",
      type: "password",
      placeholder: "Password",
      required: true,
      name: "password",
    },
  ];

  return (
    <Auth>
      <AuthForm
        mode="register"
        title="Get Started with Metrix"
        subtitle="Create Your free account"
        fields={fields}
        buttonText="Register"
        question="Already have an account?"
        linkText="Login"
        linkPath="/login"
      />
    </Auth>
  );
};

export default RegisterPage;
