import patientService from "../../services/patients.ts";
import diagnosisService from "../../services/diagnosis.ts";
import { useParams } from "react-router-dom";
import { Diagnosis, Entry, Patient } from "../../types.ts";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Hospital } from "./Hospital.tsx";
import { HealthCheck } from "./HealthCheck.tsx";
import { OccupationalHealthcare } from "./OccupationalHealthcare.tsx";
import { AddNewEntry } from "./FormEntry/index.tsx";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled descriminated union member ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export const PatientSinglePage = () => {
  const [patient, setPatient] = useState<Patient[]>([]);
  const [entries, setEntries] = useState<Entry[]>([]);
  const [diagnosis, setDiagnosis] = useState<Diagnosis[]>([]);
  const [Isloading, setIsloading] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [specialist, setSpecialist] = useState<string>("");
  const [healthRating, setHealthRating] = useState<string>("");
  const [diagnosisCodes, setdiagnosisCodes] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const patientFilter = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
      if (patient[0].entries) {
        setEntries(patient[0].entries);
      }
      setIsloading(true);
    };
    const diagnosis = async () => {
      const diagnosis = await diagnosisService.getAll();
      setDiagnosis(diagnosis);
    };
    void diagnosis();
    void patientFilter();
  }, [id]);

  const Gender = ({ gender }: { gender: string }) => {
    if (gender === "female") {
      return <FemaleIcon />;
    } else if (gender === "male") {
      return <MaleIcon />;
    } else if (gender === "other") {
      return <TransgenderIcon />;
    } else {
      return <></>;
    }
  };

  const submit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const dCodes: Array<Diagnosis["code"]> = [];
      const codesInserted = diagnosisCodes.split(",");
      codesInserted.map((c) => dCodes.push(c));
      let healthR;
      if(Number(healthRating) >= 4){
        setError(`Value of HealthCheckRating incorrect: ${Number(healthRating)}`)
        return null
      }else{
        healthR = Number(healthRating)
      }
      if (!id) {
        return null;
      }
      const entry = await patientService.createEntry(
        {
          date,
          description,
          specialist,
          healthCheckRating: healthR,
          diagnosisCodes: dCodes,
          type: "HealthCheck",
        },
        id
      );
      setEntries(entries.concat(entry));
      setDate("");
      setDescription("");
      setSpecialist("");
      setHealthRating("");
      setdiagnosisCodes("");
    } catch (error) {
      let errorMessage: string;
      if (error instanceof Error) {
        errorMessage = error.message;
        setError(errorMessage);
        setTimeout(() => {
          setError(null);
        }, 2500);
      }
    }
  };

  const cancel = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setDate("");
    setDescription("");
    setSpecialist("");
    setHealthRating("");
    setdiagnosisCodes("");
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
          <AddNewEntry
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
            cancel={cancel}
            error={error}
          />
          <div>
            <h3>entries</h3>
            {entries?.map((e, id) => {
              return (
                <div key={id}>
                  <EntryDetails entry={e} />
                  <ul>
                    {e.diagnosisCodes?.map((e, id) => {
                      const diagnoses = diagnosis.find((d) =>
                        d.code === e ? d : false
                      );
                      if (!diagnoses) {
                        return null;
                      }
                      return (
                        <div key={id}>
                          <li>
                            {diagnoses.code} {diagnoses.name}
                          </li>
                        </div>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
