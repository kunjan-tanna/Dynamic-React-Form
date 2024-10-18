import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React from "react";

function FormField({ field, value, onChange, errors }) {
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
      return (
        <Grid item xs={12} key={field.name}>
          <FormControl component="fieldset">
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              row
              name={field.name}
              onChange={onChange}
              value={value || ""}
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
}

export default FormField;
