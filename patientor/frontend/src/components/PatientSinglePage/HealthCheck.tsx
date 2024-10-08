import { HealthCheckEntry } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import HealthRatingBar from "../HealthRatingBar";

export const HealthCheck = (entry: { entry: HealthCheckEntry }) => {
  let healthcheck = entry.entry;
  return (
    <>
      <h3>
        {healthcheck.date} {<LocalHospitalIcon />}
      </h3>
      <p>{healthcheck.description}</p>
      <HealthRatingBar
        rating={healthcheck.healthCheckRating}
        showText={false}
      />
      <p>diagnose by {healthcheck.specialist}</p>
    </>
  );
};
