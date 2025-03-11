import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export const AuthForm = ({
  mode,
  title,
  subtitle,
  fields,
  buttonText,
  question,
  linkText,
  linkPath,
  recover,
  password,
}) => {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  const Passwordvisible = () => {
    setShowPassword(!showPassword);
  };

  const handleCustomer = async (event) => {
    event.preventDefault();
    const userDetail = {
      name: formValues.name,
      email: formValues.email,
      password: formValues.password,
    };
    try {
      let res;
      if (mode === "register") {
        res = await axios.post("http://localhost:3000/create", userDetail);
      } else if (mode === "login") {
        res = await axios.post("http://localhost:3000/login", {
          email: formValues.email,
          password: formValues.password,
        });
        if (res.data.redirectUrl) {
          navigate(res.data.redirectUrl);
        }
      }
      setFormValues({ name: "", email: "", password: "" });
      console.log(res);
    } catch (error) {
      console.error(`Error ${mode} user`, error);
      setError(error.response?.data || `Error ${mode} user`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-[20px] bg-gray-100 h-screen">
      <div className="bg-white p-8 rounded-lg w-auto h-auto">
        <img src={logo} className="mx-auto" alt="logo" />
        <div className="text-center pt-[25px] mb-[10px]">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <p className="text-gray-400">{subtitle}</p>
        </div>
        <form onSubmit={handleCustomer}>
          {fields.map((field, index) => (
            <div className="pt-[25px]" key={index}>
              <div className="relative">
                <img
                  src={field.icon}
                  alt={field.alt}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  type={
                    field.type === "password" && showPassword
                      ? "text"
                      : field.type
                  }
                  className="bg-gray-100 border border-gray-100 text-black text-sm rounded-lg py-[15px] pr-[150px] pl-[50px]"
                  placeholder={field.placeholder}
                  required={field.required}
                  name={field.name}
                  value={formValues[field.name]}
                  onChange={handleChange}
                />
                {field.type === "password" && (
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={Passwordvisible}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </div>
                )}
              </div>
            </div>
          ))}
          {error && <div className="text-red-500 text-center mt-4">{error}</div>}
          <div className="pt-3 pl-[229px]">
            <a className="text-blue-600 right-0 cursor-pointer" onClick={() =>navigate(password)}>
            {recover}
          </a>
      </div>
      <div className="pt-[20px] text-center">
        <p className="pb-[20px]">
          {question}
          <a className="text-blue-600 cursor-pointer" onClick= {() =>navigate(linkPath)}>
            {linkText}
          </a>
        </p>
        <button
          type="submit"
          className="cursor-pointer bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          {buttonText}
        </button>
      </div>
    </form>
      </div >
    </div >
  );
};

export default AuthForm;