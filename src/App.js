import React, { useState } from "react";
import * as yup from "yup";
import data from "./form.json";
import { Box, Typography } from "@mui/material";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";

const { form } = data;
// console.log("data", form);
console.log("FOMNR", form);

const createGroupValidation = (group) => {
  const fieldName = {};
  group.fields.forEach((field) => {
    if (field.required) {
      fieldName[field.name] = yup
        .string()
        .required(`${field.label} is required`);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateGroup = async (group) => {
    const validationSchema = createGroupValidation(group);
    try {
      const groupData = group.fields.reduce((acc, field) => {
        acc[field.name] = formData[field.name] || "";
        return acc;
      }, {});
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
    if (isValid) {
      localStorage.setItem("formData", JSON.stringify(formData));
      alert(`Data for ${group.title} saved successfully`);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar groups={form.groups} setActiveGroupIndex={setActiveGroupIndex} />

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          {form.title}
        </Typography>
        <FormGroup
          groups={form.groups[activeGroupIndex]}
          formData={formData}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          errors={errors}
        />
      </Box>
    </Box>
  );
};

export default App;
