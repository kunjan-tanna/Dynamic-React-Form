import React, { useState } from "react";
import * as yup from "yup";
import data from "./form.json";
import {
  Box,
  Grid,
  TextField,
  Button,
  Select,
  MenuItem,
  Typography,
  FormControl,
  RadioGroup,
  FormLabel,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Sidebar from "./components/Sidebar";
import FormGroup from "./components/FormGroup";

const { form } = data;
// console.log("data", form);
console.log("FOMNR", form);

// Function to create validation schema for a specific group
const createGroupValidationSchema = (group) => {
  const schemaFields = {};
  group.fields.forEach((field) => {
    if (field.required) {
      schemaFields[field.name] = yup
        .string()
        .required(`${field.label} is required`);
    }
  });
  return yup.object().shape(schemaFields);
};

const DynamicFormWithSidebar = () => {
  const [formData, setFormData] = useState(
    () => JSON.parse(localStorage.getItem("formData")) || {}
  );
  const [errors, setErrors] = useState({});
  const [activeGroupIndex, setActiveGroupIndex] = useState(0); // For sidebar navigation

  // Update form data when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Validate only the fields in the currently active group
  const validateGroup = async (group) => {
    const validationSchema = createGroupValidationSchema(group);
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

  // Handle submit for the currently active group
  const handleSubmit = async (e) => {
    e.preventDefault();
    const group = form.groups[activeGroupIndex];
    const isValid = await validateGroup(group);
    if (isValid) {
      // Store form data in localStorage
      localStorage.setItem("formData", JSON.stringify(formData));
      alert(`Data for ${group.title} saved successfully`);
    }
  };

  // Render individual fields based on their type
  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <Grid item xs={12} sm={6} key={field.name}>
            <TextField
              fullWidth
              label={field.label}
              name={field.name}
              onChange={handleInputChange}
              value={formData[field.name] || ""}
              placeholder={field.placeholder}
              error={!!errors[field.name]}
              helperText={errors[field.name]}
            />
          </Grid>
        );
      case "dropdown":
        return (
          <Grid item xs={12} sm={6} key={field.name}>
            <FormControl fullWidth>
              <Select
                label={field.label}
                name={field.name}
                onChange={handleInputChange}
                value={formData[field.name] || ""}
                displayEmpty
              >
                <MenuItem value="">
                  <em>Select {field.label}</em>
                </MenuItem>
                {field.options.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        );
      case "radio":
        return (
          <Grid item xs={12} key={field.name}>
            <FormControl component="fieldset">
              <FormLabel component="legend">{field.label}</FormLabel>
              <RadioGroup
                row
                name={field.name}
                onChange={handleInputChange}
                value={formData[field.name] || ""}
              >
                {field.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>
        );
      default:
        return null;
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
        />
      </Box>
    </Box>
  );
};

export default DynamicFormWithSidebar;
