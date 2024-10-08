import { HospitalEntry } from "../../types";
import HealingIcon from "@mui/icons-material/Healing";

export const Hospital = (entry: { entry: HospitalEntry }) => {
  let hospital = entry.entry;
  return (
    <>
      <h3>
        {hospital.date}
        <HealingIcon />
      </h3>
      <p>{hospital.description}</p>
      <p>Date: {hospital.discharge.date}</p>
      <p>Criteria: {hospital.discharge.criteria}</p>
      <p>diagnose by {hospital.specialist}</p>
    </>
  );
};
