import axios from "axios";
import { Entry, newEntry, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const getOne = async (id: string | undefined) => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const createEntry = async (object: newEntry, id: string) => {
    const { data } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      object
    );

    return data;
};

export default {
  getAll,
  create,
  getOne,
  createEntry,
};
