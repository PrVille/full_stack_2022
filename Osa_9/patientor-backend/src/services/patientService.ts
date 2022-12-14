import patientData from "../../data/patients.json";
import { v1 as uuid } from 'uuid';

import { NonSensitivePatient, Patient, newPatientEntry } from "../types";

const patients: Array<Patient> = patientData as Array<Patient>;

const getNonSensitivePatients = (): Array<NonSensitivePatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: newPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  };

  patients.push(newPatientEntry);
  return newPatientEntry;
};


export default {
  getNonSensitivePatients,
  addPatient
};
