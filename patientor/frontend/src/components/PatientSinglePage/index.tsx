import patientService from "../../services/patients.ts";
import diagnosisService from "../../services/diagnosis.ts";
import { useParams } from "react-router-dom";
import {
  Diagnosis,
  Discharge,
  Entry,
  Patient,
} from "../../types.ts";
import { useEffect, useState } from "react";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import TransgenderIcon from "@mui/icons-material/Transgender";
import { Hospital } from "./Hospital.tsx";
import { HealthCheck } from "./HealthCheck.tsx";
import { OccupationalHealthcare } from "./OccupationalHealthcare.tsx";
import { AddNewEntry } from "./FormEntry/index.tsx";
import { Dayjs } from "dayjs";
import { SelectChangeEvent } from "@mui/material";

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
  const [date, setDate] = useState<Dayjs | null>(null);
  const [specialist, setSpecialist] = useState<string>("");
  const [healthRating, setHealthRating] = useState<string>("");
  const [diagnosisCodes, setdiagnosisCodes] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [entryType, setEntryType] = useState<string>("");
  const [dischargeDate, setDischargeDate] = useState<Discharge["date"]>("");
  const [dischargeCriteria, setDischargeCriteria] =
    useState<Discharge["criteria"]>("");
  const [employerName, setEmployerName] = useState<string>("");
  const [sickStart, setSickStart] = useState<Dayjs | null>(null);
  const [sickEnd, setSickEnd] = useState<Dayjs | null>(null);
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
    const d: string = String(date);
    try {
      if (!id) {
        return null;
      }
      if (entryType === "HealthCheck") {
        let healthR;
        if (Number(healthRating) >= 4) {
          setError(
            `Value of HealthCheckRating incorrect: ${Number(healthRating)}`
          );
          return null;
        } else {
          healthR = Number(healthRating);
        }
        const entry = await patientService.createEntry(
          {
            date: d,
            description,
            specialist,
            healthCheckRating: healthR,
            diagnosisCodes,
            type: "HealthCheck",
          },
          id
        );
        setEntries(entries.concat(entry));
        setDate(null);
        setDescription("");
        setSpecialist("");
        setHealthRating("");
        setdiagnosisCodes([]);
      } else if (entryType === "Hospital") {
        const discharge = {
          date: dischargeDate,
          criteria: dischargeCriteria,
        };
        const entry = await patientService.createEntry(
          {
            date: d,
            description,
            specialist,
            discharge,
            diagnosisCodes,
            type: "Hospital",
          },
          id
        );
        setEntries(entries.concat(entry));
        setDate(null);
        setDescription("");
        setSpecialist("");
        setDischargeDate("");
        setDischargeCriteria("");
        setdiagnosisCodes([]);
      } else if (entryType === "OccupationalHealthCare") {
        const sickLeave = {
          startDate: String(sickStart),
          endDate: String(sickEnd),
        };
        const entry = await patientService.createEntry(
          {
            date: d,
            description,
            specialist,
            sickLeave,
            employerName,
            diagnosisCodes,
            type: "OccupationalHealthcare",
          },
          id
        );
        setEntries(entries.concat(entry));
        setDate(null);
        setDescription("");
        setSpecialist("");
        setEmployerName("");
        setSickStart(null);
        setSickEnd(null);
        setdiagnosisCodes([]);
      }
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

  const handleChange = (event: SelectChangeEvent<typeof diagnosisCodes>) => {
    const {
      target: { value },
    } = event;
    setdiagnosisCodes(typeof value === "string" ? value.split(",") : value);
  };

  const diagnosesCode: Array<Diagnosis["code"]> = [
    "M24.2",
    "M51.2",
    "S03.5",
    "J10.1",
    "J06.9",
    "Z57.1",
    "N30.0",
    "H54.7",
    "J03.0",
    "Z74.3",
    "L20",
    "F43.2",
    "S62.5",
    "H35.29",
  ];

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
            error={error}
            entryType={entryType}
            setEntryType={setEntryType}
            dischargeDate={dischargeDate}
            setDischargeDate={setDischargeDate}
            dischargeCriteria={dischargeCriteria}
            setDischargeCriteria={setDischargeCriteria}
            employerName={employerName}
            setEmployerName={setEmployerName}
            setSickStart={setSickStart}
            setSickEnd={setSickEnd}
            sickStart={sickStart}
            sickEnd={sickEnd}
            diagnosesCode={diagnosesCode}
            handleChange={handleChange}
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
