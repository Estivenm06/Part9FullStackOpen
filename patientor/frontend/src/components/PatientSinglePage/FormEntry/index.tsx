import {
  FormControl,
  Alert,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { HealthForm } from "./HealthCheckForm";
import { NewEntryProp } from "../../../types";
import { Hospital } from "./HospitalForm";
import { OccupationalFrom } from "./OccupationalHealthCareForm";

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
  error,
  entryType,
  setEntryType,
  dischargeDate,
  setDischargeDate,
  dischargeCriteria,
  setDischargeCriteria,
  sickStart,
  sickEnd,
  setSickStart,
  setSickEnd,
  employerName,
  setEmployerName,
  diagnosesCode,
  handleChange
}: NewEntryProp) => {
  return (
    <>
      {error ? <Alert severity="error">{error}</Alert> : null}
      <FormControl fullWidth>
        <InputLabel>New Entry</InputLabel>
        <Select
          value={entryType}
          label="Entry"
          onChange={({ target }) => setEntryType(target.value)}
        >
          <MenuItem value={"HealthCheck"}>Health Check</MenuItem>
          <MenuItem value={"Hospital"}>Hospital</MenuItem>
          <MenuItem value={"OccupationalHealthCare"}>
            Occupational Health Care
          </MenuItem>
        </Select>
      </FormControl>
      {entryType === "Hospital" ? (
        <>
          <Hospital
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            setdiagnosisCodes={setdiagnosisCodes}
            submit={submit}
            setDischargeCriteria={setDischargeCriteria}
            setDischargeDate={setDischargeDate}
            dischargeDate={dischargeDate}
            dischargeCriteria={dischargeCriteria}
            diagnosesCode={diagnosesCode}
            handleChange={handleChange}
          />
        </>
      ) : (
        <></>
      )}
      {entryType === "HealthCheck" ? (
        <>
          <HealthForm
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            healthRating={healthRating}
            setHealthRating={setHealthRating}
            diagnosisCodes={diagnosisCodes}
            setdiagnosisCodes={setdiagnosisCodes}
            submit={submit}
            diagnosesCode={diagnosesCode}
            handleChange={handleChange}
          />
        </>
      ) : (
        <></>
      )}
      {entryType === "OccupationalHealthCare" ? (
        <>
          <OccupationalFrom
            description={description}
            setDescription={setDescription}
            date={date}
            setDate={setDate}
            specialist={specialist}
            setSpecialist={setSpecialist}
            diagnosisCodes={diagnosisCodes}
            setdiagnosisCodes={setdiagnosisCodes}
            setSickStart={setSickStart}
            setSickEnd={setSickEnd}
            sickStart={sickStart}
            sickEnd={sickEnd}
            submit={submit}
            employerName={employerName}
            setEmployerName={setEmployerName}
            diagnosesCode={diagnosesCode}
            handleChange={handleChange}
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};
