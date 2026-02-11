"use client"
import React, { useState, useEffect, useRef } from "react"
import { Clock, ConstructionIcon, MapPinned, Star, Asterisk } from "lucide-react"
import Image from "next/image"
import Button from "@/_components/ui/button"
import Input from "@/_components/ui/Input"
import Textarea from "@/_components/ui/Textarea"
import QuantityStepper from "@/_components/ui/QuantityStepper"
import WarrantyStepper from "@/_components/ui/WarrantyStepper"
import DashboardNavigation from "@/_components/layout/DashboardNavigation"
import validation from '@/_library/validation';
import Api from '@/_library/Api';
import AllFunctionClient from "@/_library/AllFunctionClient"
import Loader from "@/_components/ui/Loader"
import SbButton from "@/_components/ui/SbButton";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const LeadQuoteForm = ({ quote_suppliers_id, quote_id, handleFetchLeads }) => {

  const __data = {
    price: '',
    quantity: 1,
    warranty: 0,
    comments: '',
    product_code: '',
    lead_time: '',
    carriage: '',
  }
  const __errors = {
    price: '',
    quantity: '',
    product_code: '',
    lead_time: '',
    carriage: '',
    attached_file: ''
  }
  const MySwal = withReactContent(Swal)
  const formRef = useRef(null);

  const [data, set_data] = useState(__data)
  const [file, setFile] = useState("");
  const [disablebutton, set_disablebutton] = useState(false);
  const [success_message, set_success_message] = useState("")
  const [common_error, set_common_error] = useState("")
  const [errors, set_errors] = useState(__errors)

  const handleChange = (e) => {
    const field_name = e.target.name;
    const field_value = e.target.value;
    set_data({ ...data, [field_name]: field_value })
  }

  const handleQuantity = (value) => {
    set_data({
      ...data,
      quantity: value
    })
  }

  const handleWarranty = (value) => {
    set_data({
      ...data,
      warranty: value
    })
  }

  const handleFileChange = async (e) => {
    let file = e.target.files[0];
    let file_size = file.size
    let file_type = file.type
    let validateObj = validation.FileUpload()
    let maxFileSize = validateObj.maxFileSize
    let maxFileSizeInBytes = validateObj.maxFileSizeInBytes
    let allowedExtensions = validateObj.allowedExtensions
    let allowedExtensionsArr = validateObj.allowedExtensionsArr

    setFile(file);

    if (file_size > maxFileSizeInBytes || allowedExtensionsArr.indexOf(file_type) < 0) {
      let error_txt = 'Please Upload only ' + allowedExtensions + ' file of maximum ' + maxFileSize + ' MB file limit'
      set_errors({
        ...errors,
        attached_file: error_txt
      });
    }
    else {
      set_errors({
        ...errors,
        attached_file: ""
      });
    }
  }

  const validate_price = (value) => {
    let err = '';
    let price = value ?? data.price
    if (!price) {
      err = 'Price is required';
    }
    set_errors({
      ...errors,
      price: err
    });
    return err;
  }

  const validate_carriage = (value) => {
    let err = '';
    let carriage = value ?? data.carriage
    if (!carriage) {
      err = 'Carriage is required';
    }
    set_errors({
      ...errors,
      carriage: err
    });
    return err;
  }

  const validate_quantity = (value) => {
    let err = '';
    let quantity = value ?? data.quantity
    if (!quantity) {
      err = 'Quantity is required';
    }
    set_errors({
      ...errors,
      quantity: err
    });
    return err;
  }

  const validate_product_code = (value) => {
    let err = '';
    let product_code = value ?? data.product_code
    if (!product_code) {
      err = 'Product Code is required';
    }
    set_errors({
      ...errors,
      product_code: err
    });
    return err;
  }

  const validate_lead_time = (value) => {
    let err = '';
    let lead_time = value ?? data.lead_time
    if (!lead_time) {
      err = 'Lead Time is required';
    }
    set_errors({
      ...errors,
      lead_time: err
    });
    return err;
  }

  const validate_attached_file = () => {
    let err = '';
    // if(!file && !data.attached_file){ 
    //   err  = 'File Attachments is required';  
    // } 
    if (file) {
      let file_size = file.size
      let file_type = file.type
      let validateObj = validation.FileUpload()
      let maxFileSize = validateObj.maxFileSize
      let maxFileSizeInBytes = validateObj.maxFileSizeInBytes
      let allowedExtensions = validateObj.allowedExtensions
      let allowedExtensionsArr = validateObj.allowedExtensionsArr

      if (file_size > maxFileSizeInBytes || allowedExtensionsArr.indexOf(file_type) < 0) {
        err = 'Please Upload only ' + allowedExtensions + ' file of maximum ' + maxFileSize + ' MB file limit'
      }
    }
    set_errors({
      ...errors,
      attached_file: err
    });
    return err;
  }

  const lead_time_data = [
    'Within 24 hours',
    '2 days',
    '3 days',
    '4 days',
    '5 days',
    '6 days',
    '7 days',
  ]

  const validateForm = () => {

    let formErrors = {};
    let isValid = true;

    let price = validate_price()
    if (price !== '') {
      formErrors.price = price;
      isValid = false;
    }

    let carriage = validate_carriage()
    if (carriage !== '') {
      formErrors.carriage = carriage;
      isValid = false;
    }

    let quantity = validate_quantity()
    if (quantity !== '') {
      formErrors.quantity = quantity;
      isValid = false;
    }

    let product_code = validate_product_code()
    if (product_code !== '') {
      formErrors.product_code = product_code;
      isValid = false;
    }

    let lead_time = validate_lead_time()
    if (lead_time !== '') {
      formErrors.lead_time = lead_time;
      isValid = false;
    }

    let attached_file = validate_attached_file()
    if (attached_file !== '') {
      formErrors.attached_file = attached_file;
      isValid = false;
    }

    set_errors(formErrors);
    return isValid;
  }

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (validateForm()) {
      set_disablebutton(true)

      // let obj = {
      //   quote_suppliers_id:quote_suppliers_id,
      //   price:data.price,
      //   quantity:data.quantity,
      //   comments:data.comments,
      //   warranty:data.warranty,                
      // }   

      const formData = new FormData(formRef.current);
      formData.append("attached_file", file);
      formData.append("quote_suppliers_id", quote_suppliers_id);
      formData.append("quote_id", quote_id);
      let supplierId = localStorage.getItem(process.env.APP_PREFIX + "id") ?? "";
      formData.append("supplier_id", supplierId);
      formData.append("quantity", data.quantity);
      formData.append("warranty", data.warranty);

      try {
        const res = await Api.submit_lead_quotation({
          formData: formData,
        });

        if (res && (res.status === 200)) {
          const resData = res.data;
          set_data(__data)
          set_disablebutton(false)
          handleFetchLeads()

          MySwal.fire({
            //icon: 'success',
            width: '350px',
            animation: true,
            title: '',
            confirmButtonText: 'Close',
            text: "Quotation is submitted successfully!",
          })
        }
        else {
          const { status, message, error } = res.data;
          set_errors(error || __errors);
          set_common_error(message)
          set_disablebutton(false)
        }
      }
      catch (error) {
        set_common_error('Register failed:', error)
        set_disablebutton(false)
      }

    }
  }


  return (
    <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} ref={formRef}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">

        <div className="grid grid-cols-1 mb-3">
          <QuantityStepper handleQuantity={handleQuantity} />
          {errors?.quantity &&
            <div className="error-msg">{errors.quantity}</div>
          }
        </div>

        <div className="grid grid-cols-1 mb-3">
          <WarrantyStepper handleWarranty={handleWarranty} />
          {errors.warranty &&
            <div className="error-msg">{errors.warranty}</div>
          }
        </div>

        <div className="grid grid-cols-1 mb-3">
          <Input label="Quoted Price" placeholder="Enter Price"
            name="price"
            mandatory={true}
            value={data.price}
            onChange={(e) => {
              handleChange(e)
              validate_price(e.target.value)
            }}
          />
          {errors.price &&
            <div className="error-msg">{errors.price}</div>
          }
        </div>

        <div className="grid grid-cols-1 mb-3">
          <Input label="Carriage" placeholder="Carriage Price"
            name="carriage"
            mandatory={true}
            value={data.carriage}
            onChange={(e) => {
              handleChange(e)
              validate_carriage(e.target.value)
            }}
          />
          {errors.carriage &&
            <div className="error-msg">{errors.carriage}</div>
          }
        </div>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">

        <div className="grid grid-cols-1 mb-3">
          <Input label="Product Code" placeholder=""
            name="product_code"
            mandatory={true}
            value={data.product_code}
            onChange={(e) => {
              handleChange(e)
              validate_product_code(e.target.value)
            }}
          />
          {errors.product_code &&
            <div className="error-msg">{errors.product_code}</div>
          }
        </div>

        <div className="grid grid-cols-1 mb-3">
          <Input
            label="Lead Time"
            placeholder=""
            name="lead_time"
            mandatory={true}
            value={data.lead_time}
            onChange={(e) => {
              handleChange(e)
              validate_lead_time(e.target.value)
            }}
          />
          {errors.lead_time &&
            <div className="error-msg">{errors.lead_time}</div>
          }
        </div>

        <div className={`grid grid-cols-1 mb-3`}>
          <Input
            label="File Attachments"
            type="file"
            placeholder=""
            onChange={(e) => {
              handleFileChange(e)
            }}
          />
          {errors.attached_file &&
            <div className="error-msg">{errors.attached_file}</div>
          }
        </div>


      </div>

      <div className="md:grid md:grid-cols-[6fr_2fr] gap-4 items-end">
        <Textarea
          label="Comments"
          placeholder="Add any details or specifications for your Quote"
          type="address"
          rows="4"
          name="comments"
          value={data.comments}
          onChange={(e) => {
            handleChange(e)
          }}
        />
        {errors.comments &&
          <div className="error-msg">{errors.comments}</div>
        }

        <SbButton data={{
          type: "submit",
          text: "Submit",
          class: "mb-2 inline-flex items-center justify-center rounded-md font-medium transition-colors px-4 py-2 text-base bg-primary text-white hover:text-gray-800 hover:bg-primary/80 hover:text-white",
          disabled: disablebutton,
        }} />

      </div>
    </form>
  )
}
export default LeadQuoteForm
