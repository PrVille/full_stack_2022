export interface Diagnose {
  code: string
  name: string
  latin?: string
}

export enum Gender {
  Male = "male",
  Female = "female",
}

export interface Patient {
  id: string
  name: string
  dateOfBirth: string
  ssn: string
  gender: Gender
  occupation: string
}

export type newPatientEntry = Omit<Patient, "id">;

export type NonSensitivePatient = Omit<Patient, "ssn">;
