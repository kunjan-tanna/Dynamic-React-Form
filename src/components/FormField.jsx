import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function FormField({
  field,
  value,
  onChange,
  errors,
  handleSliderChange,
  sliderValue,
}) {
  switch (field.type) {
    case "text":
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            onChange={onChange}
            value={value || ""}
            placeholder={field.placeholder}
            error={!!errors}
            helperText={errors}
          />
        </Grid>
      );
    case "number":
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextField
            fullWidth
            type={field.type}
            label={field.label}
            name={field.name}
            onChange={onChange}
            value={value || ""}
            placeholder={field.placeholder}
            error={!!errors}
            helperText={errors}
          />
        </Grid>
      );
    case "textarea":
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <TextareaAutosize
            name={field.name}
            onChange={onChange}
            value={value || ""}
            placeholder={field.placeholder}
            minRows={3}
            style={{
              width: "90%",
              padding: "14px",
              borderRadius: "4px",
              borderColor: !!errors ? "red" : "rgba(0, 0, 0, 0.23)",
              fontSize: "16px",
              fontFamily: "Roboto, sans-serif",
            }}
            aria-label={field.label}
          />
          {!!errors && (
            <Typography variant="caption" color="error">
              {errors}
            </Typography>
          )}
        </Grid>
      );
    case "dropdown":
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <FormControl fullWidth>
            <Select
              label={field.label}
              name={field.name}
              onChange={onChange}
              value={value || ""}
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
    case "checkbox":
      return handleRadioCheckbox(field.type, field, value, onChange, errors);
    case "slider":
      return (
        <Grid item xs={12} sm={6} key={field.name}>
          <Typography variant="body1">{field.label}</Typography>
          <Slider
            min={field.min}
            max={field.max}
            step={field.step}
            name={field.name}
            value={value}
            onChange={handleSliderChange}
            marks={[
              { value: field.min, label: field.min.toString() },
              {
                value: (field.max - field.min) / 2,
                label: ((field.max - field.min) / 2).toString(),
              },
              { value: field.max, label: field.max.toString() },
            ]}
          />
        </Grid>
      );

    default:
      return null;
  }
}

const handleRadioCheckbox = (type, field, value, onChange, errors) => {
  return (
    <Grid item xs={12} sm={6} key={field.name}>
      <Typography variant="body1">{field.label}</Typography>
      <FormControl component="fieldset">
        {type === "radio" ? (
          <RadioGroup
            row
            name={field.name}
            value={value || ""}
            onChange={onChange}
          >
            {field.options.map((option) => (
              <FormControlLabel
                key={option.value}
                value={option.value}
                control={<Radio />}
                label={option.label}
                required={field.required}
              />
            ))}
          </RadioGroup>
        ) : (
          <FormGroup>
            {field.options.map((option) => (
              <FormControlLabel
                key={option.value}
                name={field.name}
                control={
                  <Checkbox
                    checked={value ? value.includes(option.value) : false} // Check if the value array includes the option value
                    onChange={onChange}
                    value={option.value}
                  />
                }
                label={option.label}
              />
            ))}
          </FormGroup>
        )}
      </FormControl>
      {!!errors && (
        <Typography variant="caption" color="error">
          {errors}
        </Typography>
      )}
    </Grid>
  );
};

export default FormField;
