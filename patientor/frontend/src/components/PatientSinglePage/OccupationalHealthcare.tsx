import { OccupationalHealthcareEntry } from "../../types";
import MasksIcon from '@mui/icons-material/Masks';

export const OccupationalHealthcare = (entry: {entry: OccupationalHealthcareEntry}) => {
  let ocuppational = entry.entry
  return (
    <>
    <h3>{ocuppational.date}<MasksIcon/> {ocuppational.employerName}</h3>
    <p>{ocuppational.description}</p>
    <p>diagnose by {ocuppational.specialist}</p>
    </>
  );
};
