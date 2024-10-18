import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import FormField from "./FormField";

function FormGroup({
  groups,
  handleSubmit,
  formData,
  handleInputChange,
  errors,
}) {
  console.log("groups.fields", groups.fields);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        {groups.title}
      </Typography>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {groups.fields.map((field) => (
            <FormField
              key={field.name}
              field={field}
              value={formData[field.name]}
              onChange={handleInputChange}
              errors={errors[field.name]}
            />
          ))}
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Save {groups.title}
        </Button>
      </Box>
    </>
  );
}

export default FormGroup;
