import React, { useState } from "react";
import * as yup from "yup";
import data from "./form.json";
import { Box, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";
import "alertifyjs/build/css/alertify.css";
import alertify from "alertifyjs";

const { form } = data;
// console.log("data", form);
console.log("FOMNR", form);

const createGroupValidation = (group) => {
  const fieldName = {};
  group.fields.forEach((field) => {
    if (field.required) {
      if (field.type == "number") {
        if (field.min && field.max) {
          fieldName[field.name] = yup
            .number()
            .typeError(`${field.label} must be a number`)
            .required(`${field.label} is required`)
            .min(field.min, `${field.label} cannot be less than ${field.min}`)
            .max(field.max, `${field.label} cannot be more than ${field.max}`);
        }
      } else {
        fieldName[field.name] = yup
          .string()
          .required(`${field.label} is required`);
      }
    }
  });
  return yup.object().shape(fieldName);
};

const App = () => {
  const [formData, setFormData] = useState(
    () => JSON.parse(localStorage.getItem("formData")) || {}
  );
  const [errors, setErrors] = useState({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("type", type);
    console.log("checked", checked);
    if (type === "checkbox") {
      setFormData((prevData) => {
        const currentValues = prevData[name] || [];
        if (checked) {
          return { ...prevData, [name]: [...currentValues, value] };
        } else {
          return {
            ...prevData,
            [name]: currentValues.filter((v) => v !== value),
          };
        }
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };
  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    console.log("val", value);
    setSliderValue(value);
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const validateGroup = async (group) => {
    const validationSchema = createGroupValidation(group);
    try {
      const groupData = group.fields.reduce((acc, field) => {
        acc[field.name] = formData[field.name] || "";
        return acc;
      }, {});
      console.log("groupData", groupData);
      await validationSchema.validate(groupData, { abortEarly: false });
      setErrors({});
      return true;
    } catch (validationErrors) {
      const newErrors = {};
      validationErrors.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const group = form.groups[activeGroupIndex];
    const isValid = await validateGroup(group);
    console.log("formData", formData);
    if (isValid) {
      const existingData = JSON.parse(localStorage.getItem("formData")) || {};
      const groupData = group.fields.reduce((acc, field) => {
        acc[field.name] = formData[field.name] || "";
        return acc;
      }, {});
      existingData[group.title] = groupData;
      localStorage.setItem("formData", JSON.stringify(existingData));
      alertify.success(`Data for ${group.title} saved`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar groups={form.groups} setActiveGroupIndex={setActiveGroupIndex} />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ textAlign: "center", pb: 5 }}>
          {form.title}
        </Typography>
        <FormGroup
          groups={form.groups[activeGroupIndex]}
          formData={formData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleSliderChange={handleSliderChange}
          sliderValue={sliderValue}
          errors={errors}
        />
      </Box>
    </Box>
  );
};

export default App;
