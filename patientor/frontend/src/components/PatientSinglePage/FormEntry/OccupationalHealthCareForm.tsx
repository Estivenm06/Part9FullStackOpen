import { OccupationalForm } from "../../../types";
import {
  Box,
  FormControl,
  TextField,
  Grid,
  Button,
  Select,
  MenuItem,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
export const OccupationalFrom = ({
  date,
  setDate,
  description,
  setDescription,
  specialist,
  setSpecialist,
  diagnosisCodes,
  setdiagnosisCodes,
  submit,
  sickStart,
  sickEnd,
  setSickStart,
  setSickEnd,
  employerName,
  setEmployerName,
  diagnosesCode,
  handleChange,
}: OccupationalForm) => {
  const cancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setDate(null);
    setDescription("");
    setSpecialist("");
    setSickEnd(null);
    setSickStart(null);
    setdiagnosisCodes([]);
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  return (
    <>
      <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
        <form onSubmit={submit}>
          <FormControl fullWidth>
            <h2>New Occupational Health Care entry</h2>
            <TextField
              id="standard-basic"
              label="Description"
              variant="standard"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              fullWidth
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Date"
                  value={date}
                  onChange={(target) => {
                    if (!target) {
                      return null;
                    }
                    setDate(target);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="standard-basic"
              label="Specialist"
              variant="standard"
              fullWidth
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Sick Date Start"
                  value={sickStart}
                  onChange={(target) => {
                    if (!target) {
                      return null;
                    }
                    setSickStart(target);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField
                  label="Sick Date End"
                  value={sickEnd}
                  onChange={(target) => {
                    if (!target) {
                      return null;
                    }
                    setSickEnd(target);
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <TextField
              id="standard-basic"
              label="Employer Name"
              variant="standard"
              value={employerName}
              onChange={({ target }) => setEmployerName(target.value)}
              fullWidth
            />
            <FormControl sx={{ m: 1, width: 300 }}>
              <InputLabel id="demo-multiple-name-label">
                Diagnosis Codes
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={diagnosisCodes}
                onChange={handleChange}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
              >
                {diagnosesCode.map((diagnosis) => (
                  <MenuItem key={diagnosis} value={diagnosis}>
                    {diagnosis}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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