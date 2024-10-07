import patientService from "../../services/patients.ts";
import { useParams } from "react-router-dom";
import { Patient } from "../../types.ts";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";

export const PatientSinglePage = () => {
  const [patient, setPatient] = useState<Patient[]>([]);
  const [Isloading, setIsloading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    const patientFilter = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
      setIsloading(true);
    };
    void patientFilter();
  }, [patient]);

  const Gender = ({ gender }: { gender: string }) => {
    if (gender === "female") {
      return (
        <>
          <FemaleIcon />
        </>
      );
    } else if (gender === "male") {
      return (
        <>
          <MaleIcon />
        </>
      );
    } else if (gender === "other") {
      return (
        <>
          <TransgenderIcon />
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      {Isloading ? (
        <>
          <h2>
            {patient[0].name} {<Gender gender={patient[0].gender} />}
          </h2>
          <p>{patient[0].ssn}</p>
          <p>occupation: {patient[0].occupation}</p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
