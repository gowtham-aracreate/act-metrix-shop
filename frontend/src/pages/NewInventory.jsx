import React, { useState, useEffect } from "react";
import Dropdown from "../components/dropdown";
import Editor from "react-simple-wysiwyg";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import Sidebar from "../layout/Sidebar";
import axios from "axios";
import calendar from "../assets/calendar.svg";
import { useLocation, useNavigate } from "react-router-dom";
 
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`, 
  },
};

export const NewInventory = () => {
  const [html, setHtml] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [dateAdded, setDateAdded] = useState(() => format(new Date(), "dd MMM yyyy"));
  const [image, setImage] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState(() => format(new Date(), "HH:mm"));
  const [submittedData, setSubmittedData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [inventory, setInventory] = useState([]);
  const [isEditing, setIsEditing] = useState(false);



  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    sellingPrice: "",
    costPrice: "",
    quantity: "",
    discount: false,
    discountValue: "",
    expiryDate: false,
    returnPolicy: false,
    shortDescription: "",
    longDescription: "",
    dateAdded: "",
    time: " ",
    status: " "
  });

  useEffect(() => {
    if (location.state?.product) {
      const product = location.state.product;
      setFormData({
        _id: product._id || "",
        productName: product.productName || "",
        productCategory: product.productCategory || "",
        sellingPrice: product.sellingPrice?.toString() || "",
        costPrice: product.costPrice?.toString() || "",
        quantity: product.quantity?.toString() || "",
        discount: product.discount || false,
        discountValue: product.discountValue?.toString() || "",
        expiryDate: product.expiryDate  || false,
        returnPolicy: product.returnPolicy || false,
        shortDescription: product.shortDescription || "",
        longDescription: product.longDescription || "",
        dateAdded: product.dateAdded || format(new Date(), "dd MMM yyyy"),
        time: product.time || format(new Date(), "HH:mm"),
        status: product.status || "Unpublish"
      });
      
      setIsEditing(true);
    } else {
      // Set default values for new product
      setFormData({
        productName: "",
        productCategory: "",
        sellingPrice: "",
        costPrice: "",
        quantity: "",
        discount: false,
        discountValue: "",
        expiryDate: false,
        returnPolicy: false,
        shortDescription: "",
        longDescription: "",
        dateAdded: format(new Date(), "dd MMM yyyy"),
        time: format(new Date(), "HH:mm"),
        status: "Unpublish"
      });
      setIsEditing(false);
    }
  }, [location.state?.product]);
  const fetchInventory = async () => {
    try {
      const response = await axios.get("http://localhost:3000/products", config);
      if (response.status === 200) {
        setInventory(response.data);
      }
    } catch (error) {
      console.error("Error fetching inventory:", error);
    }
  };

  const handleDropdownSelect = (selectedValue, type, event) => {
    event?.preventDefault();
    console.log(`Selected ${type}:`, selectedValue);

    setFormData((prevFormData) => ({
      ...prevFormData,
      [type]: selectedValue.label,

    }));
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setFormData(prev => ({
      ...prev,
      image: file  // Store the actual file object in formData
    }));
  
    // Create a preview URL for the UI
    const previewUrl = URL.createObjectURL(file);
    setImage(previewUrl);
  };
  
  

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  useEffect(() => {
  
    const product = location.state?.product;
    if (product) {  
      setFormData({
        _id: product._id || "",
        productName: product.productName || "",
        productCategory: product.productCategory || "",
        sellingPrice: product.sellingPrice?.toString() || "0",
        costPrice: product.costPrice?.toString() || "0",
        quantity: product.quantity?.toString() || "0",
        discount: product.discount || false,
        discountValue: product.discountValue?.toString() || "0",
        expiryDate: product.expiryDate|| false,
        returnPolicy: product.returnPolicy || false,
        shortDescription: product.shortDescription || "",
        longDescription: product.longDescription || "",
        dateAdded: product.dateAdded || format(new Date(), "dd MMM yyyy"),
        time: product.time || "09:00",
        status: product.status || "Unpublish",
      });
      if (product.image) {
        setImage(product.image);
      }
      setIsEditing(true);
    } else {
      console.log("No inventory found in location.state");
    }
  }, [location.state]);
  

  const handleSubmit = async (e, status) => {
    e.preventDefault();
  
    try {
      const form = new FormData();
  
      form.append("productName", formData.productName);
      form.append("productCategory", formData.productCategory);
      form.append("sellingPrice", formData.sellingPrice);
      form.append("costPrice", formData.costPrice);
      form.append("quantity", formData.quantity);
      form.append("discount", formData.discount);
      form.append("discountValue", formData.discountValue);
      form.append("expiryDate", formData.expiryDate);
      form.append("returnPolicy", formData.returnPolicy);
      form.append("shortDescription", formData.shortDescription);
      form.append("longDescription", formData.longDescription);
      form.append("dateAdded", formData.dateAdded);
      form.append("time", formData.time);
      form.append("status", status || formData.status);
  
      if (formData.image && formData.image instanceof File) {
        form.append("image", formData.image);
      }
  
      const url = formData._id
        ? `http://localhost:3000/product/${formData._id}`
        : "http://localhost:3000/product";
  
      const method = formData._id ? "put" : "post";
  
      const response = await axios({
        method,
        url,
        data: form,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
  
  
      if (response.status === 200 || response.status === 201) {
        const updatedProduct = response.data;
        setInventory((prev) =>
          formData._id
            ? prev.map((product) =>
                product._id === updatedProduct._id ? updatedProduct : product
              )
            : [...prev, updatedProduct]
        );
  
        if (!formData._id) {
          setFormData({
            productName: "",
            productCategory: "",
            sellingPrice: "",
            costPrice: "",
            quantity: "",
            discount: false,
            discountValue: "",
            expiryDate: false,
            returnPolicy: false,
            shortDescription: "",
            longDescription: "",
            dateAdded: format(new Date(), "dd MMM yyyy"),
            time: format(new Date(), "HH:mm"),
            status: "Unpublish",
            image: null,
          });
          setImage(null);
          setIsEditing(false);
        }
  
        navigate("/inventory");
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };
  

  const productCategory = [
    { label: "Gadgets" },
    { label: "Fashion" },
  ];


  return (
    <div className="">
      <Sidebar title=	"Inventory" />
      <div className="ml-64 mt-17 bg-[#5E636614] h-screen ">
        <div className="ml-6">
          <form onSubmit={(event) => handleSubmit(event, formData.status)}>
            <div className="pt-3 pb-3 flex text-[18px]">
              <h1>New Inventory Item</h1>
              <div className="ml-auto flex text-[16px]">
                <button type="button" onClick={(event) => handleSubmit(event, "Unpublish")} className="cursor-pointer bg-black text-white w-[171px] h-[36px] rounded-md mr-[24px]">
                  Save as Draft
                </button>
                <button type="button" onClick={(event) => handleSubmit(event, "Publish")} className="cursor-pointer bg-[#5570F1] text-white w-[161px] h-[36px] rounded-md">
                  Save & Publish
                </button>
                <button type="button" onClick={() => navigate("/inventory")}
                  className="bg-red-500 text-white w-[171px] h-[36px] rounded-md mx-[24px]">Cancel</button>   
                           </div>
            </div>
            <div className="flex bg-white rounded-md py-[25px]">
              <div className="flex">
                <div className="flex flex-col  gap-[20px] px-[33px] py-[25px] ">
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="pl-3 bg-[#EFF1F999] w-[300px] h-[42px] rounded-md"
                    required
                  />
                  <Dropdown
                    dropdownButtonStyle="pl-3 text-gray-900 pt-2 border-none bg-[#EFF1F999]  w-[300px] h-[42px] rounded-md"
                    dropdownMenuStyle="bg-white"
                    dropdownButtonText={formData.productCategory || "Select Product Category"}
                    dropdownOptions={productCategory}
                    onSelect={(selectedValue, event) => handleDropdownSelect(selectedValue, 'productCategory', event)}
                  />

                  <div className="flex gap-[12px]">
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      placeholder="Selling Price"
                      className="pl-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                      required
                    />
                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      placeholder="Cost Price"
                      className="pl-3 bg-[#EFF1F999] w-[144.5px] h-[42px] rounded-md"
                      required
                    />
                  </div>
                  <div className="inline-flex relative">
                    <input
                      type="number"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                      step="1"
                      placeholder="Quantity in Stock"
                      className="pl-3 bg-[#EFF1F999] w-[300px] h-[42px] rounded-md" />
                    <div className="flex flex-col absolute left-63">
                      <button type="button" onClick={() =>
                        setFormData((prevFormData) =>
                        ({
                          ...prevFormData,
                          quantity: parseInt(prevFormData.quantity, 10) + 1,
                        }))}>
                        <svg width="38" height="20" viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M0.5 4C0.5 1.79086 2.29086 0 4.5 0H36.5C38.7091 0 40.5 1.79086 40.5 4V19.5H0.5V4Z" fill="#DDE2E6" /><path d="M20.5 3.75L25.6962 12.75H15.3038L20.5 3.75Z" fill="#83898C" /></svg>
                      </button>
                      <button type="button" onClick={() =>
                        setFormData((prevFormData) =>
                        ({
                          ...prevFormData,
                          quantity: prevFormData.quantity > 0 ? parseInt(prevFormData.quantity, 10) - 1 : 0,
                        }))}>
                        <svg width="38" height="20" viewBox="0 0 41 20" fill="none" xmlns="http://www.w3.org/2000/svg" ><path d="M40.5 16C40.5 18.2091 38.7091 20 36.5 20L4.5 20C2.29086 20 0.5 18.2091 0.5 16L0.500002 0.499996L40.5 0.5L40.5 16Z" fill="#DDE2E6" /><path d="M20.5 16.25L15.3038 7.25L25.6962 7.25L20.5 16.25Z" fill="#83898C" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="inline-flex text-gray-500 pr-21">Discount</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="discount"
                        checked={formData.discount}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <span className="text-gray-900 pr-3">Add Discount</span>
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {formData.discount && (
                    <div className="flex ">
                      <input
                        type="number"
                        name="discountValue"
                        value={formData.discountValue}
                        onChange={handleChange}
                        placeholder="Discount Percentage %"
                        className="pl-3 bg-[#EFF1F999] w-[300px] h-[42px] rounded-md"
                      />
                    </div>
                  )}
                  <div>
                    <p className="inline-flex text-gray-500 pr-13">Expiry Date</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="expiryDate"
                        checked={formData.expiryDate}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <span className="text-gray-900 pr-3">Add Expiry Date</span>
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  {formData.expiryDate && (
                    <div className="bg-[#EFF1F999] w-[300px] h-[45px] inline-flex rounded-md pt-3 text-gray-400">
                      <img src={calendar} alt="calender" className='w-5 pb-2 mx-3' />
                      <DatePicker
                        className="w-[111.5px] bg-transparent outline-none"
                        selected={expiryDate}
                        onChange={(date) => {
                          setExpiryDate(date);
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            expiryDate: date ? format(date, "dd MMM yyyy") : "", // "12 Aug 2022"
                          }));
                        }}
                        dateFormat="dd MMM yyyy" // Format for expiry date
                      />
                    </div>
                  )}
                </div>
                <div className="flex-col bg-white px-[33px] py-[25px] rounded-md">
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="Short Description"
                    className="pb-28 w-[360px] mb-[14px] h-[140px] pl-3 bg-[#EFF1F999] rounded-md overflow-y-scroll"
                  />
                  <p className="text-[#5E6366] pb-1">Product Long Description</p>
                  <div className="w-[360px] bg-[#EFF1F999]">
                    <Editor
                      value={html}
                      onChange={(event) => {
                        setHtml(event.target.value);
                        setFormData((prevFormData) => ({
                          ...prevFormData,
                          longDescription: event.target.value, // Store in formData
                        }));
                      }}
                      placeholder="Your Text Goes Here"
                      className="h-[140px] w-[360px] bg-[#EFF1F999]"
                    />
                  </div>
                  <p className="text-gray-400">Add a long description for your product</p>
                  <div className="pt-[13px]">
                    <p className="inline-flex text-gray-500 pr-31">Return Policy</p>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="returnPolicy"
                        checked={formData.returnPolicy}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <span className="text-gray-900 pr-3">Add Return Policy</span>
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-blue-300 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  <p className="text-gray-900 pt-[13px]">Date Added</p>
                  <div className="flex mt-4">
                    <div className="inline-flex pt-3 bg-[#EFF1F999] w-[172.5px] h-[45px] rounded-md text-gray-400">
                      <img src={calendar} alt="calender" className='w-5 pb-2 mx-3' />
                      <DatePicker
                        className="w-[111.5px] bg-transparent outline-none"
                        selected={startDate}
                        onChange={(date) => {
                          setStartDate(date);
                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            dateAdded: format(date, "dd MMM yyyy"),
                          }));
                        }}
                        dateFormat="yyyy-MM-dd"
                      />
                    </div>
                    <div className="bg-[#EFF1F999] w-[172.5px] mr-3 ml-3 h-[45px] rounded-md rounded-lg focus:ring-blue-500 focus:border-blue-500">
                      <input
                        className="bg-transparent mx-3 h-full text-gray-700 outline-none"
                        type="time"
                        value={time}
                        onChange={(e) => {
                          const newTime = e.target.value;
                          setTime(newTime);

                          setFormData((prevFormData) => ({
                            ...prevFormData,
                            time: newTime,
                          }));
                        }}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-md px-[33px] py-[25px]">
                <div className="items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center border border-[#E1E2E9] w-[345px] h-[290px] rounded-lg cursor-pointer bg-[#F4F5FA]"
                  >
                    {image ? (
                      <img
                        src={image}
                        alt="Uploaded Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="#5570F1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="ml-4 text-[16px] text-[#5570F1] font-semibold">
                          Upload Image
                        </p>
                        <p className="text-[#8B8D97] pb-[12px]">
                          Upload a cover image for your product
                        </p>
                        <p className="text-[12px] text-gray-500">
                          File Format{" "}
                          <span className="font-semibold">jpeg, png</span> -
                          Recommended Size{" "}
                          <span className="font-semibold">600x600 (1:1)</span>
                        </p>
                      </div>
                    )}
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/png, image/jpeg"
                    />
                  </label>
                </div>
                {/* <p className="py-[12px]">Additional Images</p>
                <div className="flex ">
                  <div className="flex items-center justify-center mr-8">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-[160px] h-[150px] border border-[#E1E2E9] rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt="Uploaded Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center pb-6">
                          <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="mt-8">
                            <path opacity="0.4" d="M34.11 47.3337H13.8878C5.9795 47.3337 0.666748 41.7871 0.666748 33.5303V14.4727C0.666748 6.21592 5.9795 0.666992 13.8878 0.666992H34.1123C42.0207 0.666992 47.3334 6.21592 47.3334 14.4727V33.5303C47.3334 41.7871 42.0207 47.3337 34.11 47.3337Z" fill="#5570F1" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M22.2385 16.2421C22.2385 19.4387 19.6368 22.0404 16.4401 22.0404C13.2411 22.0404 10.6418 19.4387 10.6418 16.2421C10.6418 13.0454 13.2411 10.4414 16.4401 10.4414C19.6368 10.4414 22.2385 13.0454 22.2385 16.2421ZM41.2677 28.8715C41.8114 29.3988 42.2011 30.0008 42.4577 30.6425C43.2347 32.5838 42.8311 34.9171 42.0004 36.8398C41.0157 39.1288 39.1304 40.8578 36.7551 41.6138C35.7004 41.9521 34.5944 42.0968 33.4907 42.0968H13.9351C11.9891 42.0968 10.2671 41.6441 8.85541 40.7948C7.97108 40.2628 7.81474 39.0378 8.47041 38.2398C9.56708 36.9098 10.6497 35.5751 11.7417 34.2288C13.8231 31.6528 15.2254 30.9061 16.7841 31.5618C17.4164 31.8325 18.0511 32.2408 18.7044 32.6701C20.4451 33.8228 22.8647 35.4048 26.0521 33.6875C28.2308 32.4962 29.4954 30.4576 30.5962 28.6832L30.6184 28.6475C30.6925 28.5287 30.7659 28.41 30.8392 28.2917C31.2135 27.6869 31.5821 27.0912 31.9997 26.5428C32.5177 25.8638 34.4404 23.7405 36.9254 25.2525C38.5097 26.2045 39.8421 27.4925 41.2677 28.8715Z" fill="#5570F1" />
                          </svg>
                          <div className="inline-flex pt-2">
                            <svg className="w-[16px] h-[16px] mb-2 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
                              <path stroke="#5570F1" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 pl-2 text-[14px] text-[#5570F1]">Upload Image</p>
                          </div>
                        </div>
                      )}
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

