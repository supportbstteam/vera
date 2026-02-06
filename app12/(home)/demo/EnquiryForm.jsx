"use client";
import Button from "@/_components/ui/button";
import { postEnquiry } from "@/actions";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Toast } from "react-bootstrap";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import * as Yup from "yup";

const roleOptions = ["Supplier", "Customer"];

const enquiryValidateSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  companyName: Yup.string().required("Company name is required"),
  enquiry: Yup.string().required("Message is required"),
  role: Yup.string().oneOf(roleOptions).required("Role is required"),
});

const EnquiyForm = () => {
  const [loading, setLoading] = useState(false);
  const MySwal = withReactContent(Swal);

  const handleSubmitEnquiry = async (values, { resetForm }) => {
    console.log("Submitting enquiry:", values);
    // return;
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.API_URL}/enquiry`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log("Enquiry submitted successfully:", res.data);

      if (res?.data?.success) {
        MySwal.fire({
          //icon: 'success',
          width: "350px",
          animation: true,
          title: "",
          confirmButtonText: "Close",
          text: "Enquiry submitted successfully!",
        });
      }
      resetForm();

      // return res.data;
    } catch (error) {
      if (error?.errors) {
        // Laravel validation errors
        console.error("Validation errors:", error.errors);
      } else {
        console.error("Submission failed:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        fullName: "",
        companyName: "",
        email: "",
        enquiry: "",
        role: "",
      }}
      validationSchema={enquiryValidateSchema}
      onSubmit={handleSubmitEnquiry}
    >
      {({ setFieldValue, values, handleSubmit }) => (
        <Form className="w-full max-w-5xl text-white space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Field
                name="fullName"
                placeholder="Full name..."
                className="w-full bg-transparent border border-white px-5 py-4 outline-none placeholder:text-white/60"
              />
              <ErrorMessage
                name="fullName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <Field
                name="companyName"
                placeholder="Company name..."
                className="w-full bg-transparent border border-white px-5 py-4 outline-none placeholder:text-white/60"
              />
              <ErrorMessage
                name="companyName"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Field
              name="email"
              placeholder="Email address..."
              className="w-full bg-transparent border border-white px-5 py-4 outline-none placeholder:text-white/60"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Enquiry */}
          <div>
            <Field
              as="textarea"
              name="enquiry"
              placeholder="Enquiry..."
              rows={4}
              className="w-full bg-transparent border border-white px-5 py-4 outline-none resize-none placeholder:text-white/60"
            />
            <ErrorMessage
              name="enquiry"
              component="p"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          {/* Role + Submit */}
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <p className="mb-3 text-white">I am a...</p>
              <div className="flex items-center gap-8">
                {roleOptions.map((item) => (
                  <label
                    key={item}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={values.role === item}
                      onChange={() => setFieldValue("role", item)}
                      className="w-5 h-5 border border-white bg-transparent accent-white"
                    />
                    <span>{item}</span>
                  </label>
                ))}
              </div>
              <ErrorMessage
                name="role"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="bg-primary  hover:bg-purple-700 transition px-10 py-3 font-semibold rounded-sm"
            >
              Submit
            </button>
            {/* <Button
              // onClick={handleSubmit}
              type="submit"
              className="px-10 py-3 font-semibold"
            >
              Submit
            </Button> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EnquiyForm;

