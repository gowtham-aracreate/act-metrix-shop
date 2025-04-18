import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../layout/Sidebar";
import profile from "../assets/profile.svg";
import axios from "axios";
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
  });

  const [countries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
          });
          // Set selected country and load states if country exists
          if (data.user.country) {
            const states = State.getStatesOfCountry(data.user.country);
            setStates(states);
          }
          
          // Handle profile image
          if (data.user.profileImage) {
            // Check if the URL is valid
            const img = new Image();
            img.onload = () => {
              setPreviewImage(data.user.profileImage);
            };
            img.onerror = () => {
              console.error("Failed to load image from URL:", data.user.profileImage);
            };
            img.src = data.user.profileImage;
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
    setIsLoading(true);

    try {
      // Combine firstName and lastName to create the full name
      const fullName = `${user.firstName} ${user.lastName}`.trim();

      const formData = new FormData();
      formData.append("name", fullName);
      formData.append("phone", user.phone);
      formData.append("address", user.address);
      formData.append("city", user.city);
      formData.append("country", user.country);
      formData.append("state", user.state);

      // Only append profileImage if a new one was selected
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const response = await fetch("http://localhost:3000/update-profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Update the profileImage state with the file
    setProfileImage(file);
    const fileUrl = URL.createObjectURL(file);
  setPreviewImage(fileUrl);
  };

  const handleUploadImage = async () => {
    if (!profileImage) {
      setMessage({ type: "error", text: "Please select an image first" });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", profileImage);

      const response = await axios.post("http://localhost:3000/upload-profile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log("Upload response:", response.data);

      if (response.data && response.data.imageUrl) {
      // Test the URL by creating an image object
      const testImg = new Image();
      testImg.onload = () => {
        console.log("Image URL valid:", response.data.imageUrl);
        setPreviewImage(response.data.imageUrl);
        setMessage({ type: "success", text: "Profile image uploaded successfully!" });
      };
      testImg.onerror = () => {
        console.error("Image URL invalid:", response.data.imageUrl);
        setMessage({ type: "warning", text: "Image uploaded but cannot be displayed. Please try again." });
      };
      testImg.src = response.data.imageUrl;
    } else {
      setMessage({ type: "error", text: "Upload succeeded but no image URL returned" });
    }
        // const updateResponse = await fetch("http://localhost:3000/update-profile", {
        //   method: "PUT",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({ profileImage: response.data.imageUrl }),
        // });

        // if (updateResponse.ok) {
        //   setMessage({ type: "success", text: "Profile image uploaded successfully!" });
        // }
      
    } catch (err) {
      console.error("Error uploading image:", err);
      setMessage({ type: "error", text: "Failed to upload image" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:3000/remove-profile-image", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setPreviewImage(null);
        setProfileImage(null);
        setMessage({ type: "success", text: "Profile image removed!" });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to remove image" });
      }
    } catch (error) {
      console.error("Remove error:", error);
      setMessage({ type: "error", text: "Error removing image." });
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
      <Sidebar title={"Settings"} />
      <div className="ml-64 mt-15 bg-[#5E636614] min-h-screen">
        <div className="ml-4 pb-8">
          <form className="pt-3" onSubmit={handleSubmit}>
            <div className="bg-white p-4 mt-4 rounded-lg mr-[22px]">
              <div className="flex justify-between items-center">
                <h1 className="text-[20px] font-semibold pb-5">Account Settings</h1>
                <button
                  type="submit"
                  className="bg-[#5570F1] text-white w-[150px] h-[40px] rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Updating..." : "Update"}
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

                <div className="py-4 ml-8">
                  <p className="pl-4 font-medium text-gray-700">Profile Image</p>
                  <div className="flex flex-col items-center space-y-4 pt-4 pl-4">
                    {/* Image preview */}
                    {previewImage ? (
                      <>
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="w-32 h-32 rounded-full object-cover border shadow-lg"
                        onError={(e) => {
                          console.error("Image failed to load:", previewImage);
                          e.target.onerror = null;
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23f0f0f0'/%3E%3Ctext x='50%25' y='50%25' font-size='18' text-anchor='middle' dy='.3em' fill='%23999'%3ENo Image%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      </>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                        <label
                          htmlFor="profileUpload"
                          className="cursor-pointer text-sm text-gray-500 hover:text-blue-500 transition"
                        >
                          Choose image
                        </label>
                      </div>
                    )}

                    {/* Hidden file input */}
                    <input
                      id="profileUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />

                    {/* Image action buttons */}
                    <div className="flex gap-2">
                      {profileImage && !previewImage && (
                        <button
                          type="button"
                          onClick={handleUploadImage}
                          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                          disabled={isLoading}
                        >
                          {isLoading ? "Uploading..." : "Upload"}
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => document.getElementById("profileUpload").click()}
                        className="px-3 py-1 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                      >
                        {previewImage ? "Change" : "Select Image"}
                      </button>

                      {previewImage && (
                        <button
                          type="button"
                          onClick={handleRemove}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                          disabled={isLoading}
                        >
                          {isLoading ? "Removing..." : "Remove"}
                        </button>
                      )}
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