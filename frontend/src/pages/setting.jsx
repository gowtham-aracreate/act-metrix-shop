import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import profile from "../assets/profile.svg";
import Message from "../assets/message.svg";
import location from "../assets/location.svg";
import { Country, State } from "country-state-city";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export const Setting = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    state: "",
    // profileImage: null, // Commented out as requested
  });

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          navigate("/login");
          return;
        }
  
        const response = await fetch("http://localhost:3000/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        const data = await response.json();
        console.log("Fetched User Data:", data);
  
        if (data.success && data.user) {
          const nameParts = data.user.name ? data.user.name.split(" ") : ["", ""];
          
          setUser({
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
            address: data.user.address || "",
            city: data.user.city || "",
            country: data.user.country || "",
            state: data.user.state || "",
            // profileImage: data.user.profileImage || null,
          });
          
          // Set selected country and load states if country exists
          if (data.user.country) {
            const states = State.getStatesOfCountry(data.user.country);
            setStates(states);
          }
        } else {
          setMessage({ type: "error", text: "Failed to load user data" });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setMessage({ type: "error", text: "Error loading profile data" });
      } 
    };
  
    if (token) fetchUser();
  }, [navigate]);
  
  // Update states when country changes
  useEffect(() => {
    if (user.country) {
      const countryStates = State.getStatesOfCountry(user.country);
      setStates(countryStates);
    } else {
      setStates([]);
    }
  }, [user.country]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
  
    try {
      // Combine firstName and lastName to create the full name
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      
      const updatedData = {
        name: fullName,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        state: user.state,
      };
      
      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });
  
      const data = await response.json();
      if (response.ok) {
        setUser({
          ...user,
        });
        setMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        setMessage({ type: "error", text: data.error || "Error updating profile" });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCountryChange = (e) => {
    const countryCode = e.target.value;
    setUser({ ...user, country: countryCode, state: "" });
  };

  return (
    <div>
      <Sidebar
      title={"Settings"} />
      <div className="ml-64 mt-15 bg-[#5E636614] min-h-screen">
        <div className="ml-4 pb-8">
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="bg-white p-4 mt-4 rounded-lg mr-[22px]">
              <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-semibold pb-5">Account Settings</h1>
                <button
                  type="submit"
                  className="bg-[#5570F1] text-white w-[150px] h-[40px] rounded-md"
                >
                   Update
                </button>
              </div>
              
              {message.text && (
                <div className={`p-3 mb-4 rounded-md ${message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {message.text}
                </div>
              )}
              
              <div className="flex flex-row">
                <div className="flex flex-col ">
                  <p className="py-2">First Name</p>
                  <div className="relative">
                    <img src={profile} alt="First Name" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      className="bg-[#EFF1F999] text-black text-sm rounded-lg py-[15px] w-full max-w-md pl-[50px] relative"
                      placeholder="First Name"
                      value={user.firstName}
                      onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                    />
                  </div>
                  <p className="py-2">Last Name</p>
                  <div className="relative">
                    <img src={profile} alt="Last Name" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      className="bg-[#EFF1F999] text-black text-sm rounded-lg py-[15px] w-full max-w-md pl-[50px] relative"
                      placeholder="Last Name"
                      value={user.lastName}
                      onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                    />
                  </div>
                  <p className="py-2">Email</p>
                  <div className="relative">
                    <img src={Message} alt="Email" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      className="bg-[#EFF1F999] text-black text-sm rounded-lg py-[15px] w-full max-w-md pl-[50px] relative"
                      placeholder="Email"
                      value={user.email}
                      disabled
                    />
                  </div>
                  <p className="py-2">Phone Number</p>
                  <PhoneInput
                    country={"in"}
                    value={user.phone}
                    onChange={(phone) => setUser({ ...user, phone })}
                    enableSearch
                    containerClass="max-w-md"
                  />
                  <p className="py-2">Address</p>
                  <div className="relative">
                    <img src={location} alt="Address" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      className="bg-[#EFF1F999] text-black text-sm rounded-lg py-[15px] w-full max-w-md pl-[50px] relative"
                      placeholder="Address"
                      value={user.address}
                      onChange={(e) => setUser({ ...user, address: e.target.value })}
                    />
                  </div>
                  <p className="py-2">City</p>
                  <div className="relative">
                    <img src={location} alt="City" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                      className="bg-[#EFF1F999] text-black text-sm rounded-lg py-[15px] w-full max-w-md pl-[50px] relative"
                      placeholder="City"
                      value={user.city}
                      onChange={(e) => setUser({ ...user, city: e.target.value })}
                    />
                  </div>
                  <div className="flex flex-col md:flex-row py-2 gap-3">
                    <div>
                      <p>Country</p>
                      <select
                        value={user.country}
                        onChange={handleCountryChange}
                        className="p-2 bg-[#EFF1F999] rounded-md w-full md:w-[176px] mt-2"
                      >
                        <option value="">Select Country</option>
                        {countries.map((c) => (
                          <option key={c.isoCode} value={c.isoCode}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <p>State</p>
                      <select
                        value={user.state}
                        onChange={(e) => setUser({ ...user, state: e.target.value })}
                        className="p-2 bg-[#EFF1F999] rounded-md w-full md:w-[176px] mt-2"
                        disabled={!user.country}
                      >
                        <option value="">Select State</option>
                        {states.map((s) => (
                          <option key={s.isoCode} value={s.isoCode}>
                            {s.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              
                <div className="py-2 ">
                  <p className="pl-4 ">Profile Image</p>
                  <div className="flex items-center space-x-4 pt-4 pl-4 ">
                    <img
                      src={profile} // Using the default profile icon
                      alt="Profile"
                      className="w-16 h-16 rounded-full border"
                    />
                    <div>
                      <p className="text-gray-500 text-sm mb-2">Profile image upload is currently disabled</p>
                      <button 
                        type="button"
                        disabled={true}
                        className="p-2 bg-gray-200 text-gray-500 rounded-md cursor-not-allowed"
                      >
                        Upload Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};