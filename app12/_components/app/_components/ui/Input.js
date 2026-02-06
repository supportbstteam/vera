import React, { useState, useEffect } from 'react';
import clsx from "clsx"
import { Asterisk, EyeOff, Eye  } from "lucide-react"
import $ from 'jquery';

const Input = ({ label, error, className, mandatory, view_password, ...props }) => {

  const [Type, setType] = useState(null);

  const toggle_password = (passId)=>{

    var input = $("#"+passId);
    if(input.attr("type") === "text"){      
      input.attr("type", "password");
      $("#eye-"+passId).hide()
      $("#eyeoff-"+passId).show()  
      setType('password')
    } 
    else{      
      input.attr("type", "text");
      $("#eye-"+passId).show()
      $("#eyeoff-"+passId).hide()
      setType('text')
    }
  }

  return (
    <div className="space-y-1 w-full">
      <div className="flex">
        {label && (
          <label className="block text-sm font-medium text-[#181818]">
            {label}
          </label>
        )}
        {mandatory ? <Asterisk size={12} color="#E33629" /> : ""}
      </div>
      <div className="flex relative">
      <input
        className={clsx(
          "w-full px-4 py-2 border rounded-[8px] focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-sm",
          error ? "border-red-500" : "border-gray-300",
          className
        )}
        {...props} 
        type={ Type ?  Type :  props.type}   
      />
      {
        view_password === true &&
        <span className="flex absolute top-0 right-0 cursor-pointer border-0" style={{paddingRight:"15px", paddingTop:"10px"}}>         
            <Eye id={`eye-${props.id}`} size={18} color="#bbb" className="z-11" onClick={()=>toggle_password(props.id)} style={{display:"none"}} />            
            <EyeOff id={`eyeoff-${props.id}`} size={18} color="#bbb" className="z-11" onClick={()=>toggle_password(props.id)}  />         
        </span> 
      }      
      </div>
    </div>
  )
}
export default Input
