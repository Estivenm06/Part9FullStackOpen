import {
  FormControl,
  Button,
  TextField,
  Box,
  Grid,
  Alert,
} from "@mui/material";
import React from "react";

interface NewEntryProp {
  date: string;
  description: string;
  specialist: string;
  healthRating: string;
  diagnosisCodes: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  setSpecialist: React.Dispatch<React.SetStateAction<string>>;
  setHealthRating: React.Dispatch<React.SetStateAction<string>>;
  setdiagnosisCodes: React.Dispatch<React.SetStateAction<string>>;
  submit: (event: React.SyntheticEvent) => void;
  cancel: (event: React.SyntheticEvent) => void;
  error: string | null;
}

export const AddNewEntry = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  healthRating,
  setHealthRating,
  diagnosisCodes,
  setdiagnosisCodes,
  submit,
  cancel,
  error,
}: NewEntryProp) => {
  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <form onSubmit={submit}>
          <FormControl fullWidth>
            <h2>New HealthCheck entry</h2>
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Date"
              variant="standard"
              fullWidth
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />
            <TextField
              id="standard-basic"
              label="Specialist"
              variant="standard"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <TextField
              id="standard-basic"
              label="Healthcheck Rating"
              variant="standard"
              value={healthRating}
              onChange={({ target }) => setHealthRating(target.value)}
              fullWidth
            />
            <TextField
              id="standard-basic"
              label="Diagnosis codes"
              variant="standard"
              value={diagnosisCodes}
              onChange={({ target }) => setdiagnosisCodes(target.value)}
              fullWidth
            />
            <Grid
              container
              direction="row"
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Button variant="contained" color="error" onClick={cancel}>
                Cancel
              </Button>
              <Button variant="contained" type="submit">
                Add
              </Button>
            </Grid>
          </FormControl>
        </form>
      </Box>
    </>
  );
};
