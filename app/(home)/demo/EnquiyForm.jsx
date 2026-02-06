"use client";

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const roleOptions = ["Supplier", "Customer"];

const EnquiryForm = () => {
  const MySwal = withReactContent(Swal);

  const initialData = {
    fullName: "",
    companyName: "",
    email: "",
    enquiry: "",
    role: "",
  };

  const initialErrors = {
    fullName: "",
    companyName: "",
    email: "",
    enquiry: "",
    role: "",
  };

  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);

  /* ---------------- helpers ---------------- */

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!data.fullName) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!data.companyName) {
      newErrors.companyName = "Company name is required";
      isValid = false;
    }

    if (!data.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!validateEmail(data.email)) {
      newErrors.email = "Invalid email";
      isValid = false;
    }

    if (!data.enquiry) {
      newErrors.enquiry = "Message is required";
      isValid = false;
    }

    if (!data.role) {
      newErrors.role = "Please select a role";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  /* ---------------- submit ---------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      const res = await axios.post(
        `${process.env.API_URL}/enquiry`,
        data,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (res?.data?.success) {
        MySwal.fire({
          width: "340px",
          confirmButtonText: "Close",
          text: "Enquiry submitted successfully!",
        });

        setData(initialData);
        setErrors(initialErrors);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-5xl mx-auto text-white space-y-6"
    >
      {/* Name + Company */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          name="fullName"
          placeholder="Full name..."
          value={data.fullName}
          onChange={handleChange}
          error={errors.fullName}
        />

        <Input
          name="companyName"
          placeholder="Company name..."
          value={data.companyName}
          onChange={handleChange}
          error={errors.companyName}
        />
      </div>

      {/* Email */}
      <Input
        name="email"
        placeholder="Email address..."
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />

      {/* Enquiry */}
      <div>
        <textarea
          name="enquiry"
          rows={4}
          placeholder="Enquiry..."
          value={data.enquiry}
          onChange={handleChange}
          className="w-full bg-transparent border border-white px-5 py-4 outline-none resize-none placeholder:text-white/60"
        />
        {errors.enquiry && (
          <p className="text-red-500 text-sm mt-1">{errors.enquiry}</p>
        )}
      </div>

      {/* Role + Submit */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-8">
        <div>
          <p className="mb-3 text-white">I am a...</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            {roleOptions.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={data.role === item}
                  onChange={() => setData({ ...data, role: item })}
                  className="w-5 h-5 accent-white"
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
          {errors.role && (
            <p className="text-red-500 text-sm mt-1">{errors.role}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto bg-primary hover:bg-purple-700 transition px-10 py-3 font-semibold rounded-sm disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

/* ---------- Small reusable input ---------- */

const Input = ({ name, placeholder, value, onChange, error }) => (
  <div>
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full bg-transparent border border-white px-5 py-4 outline-none placeholder:text-white/60"
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default EnquiryForm;
