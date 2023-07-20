import 'little-state-machine';

export type Position = {
  position: string;
  otherPosition: string;
  isEducation: YesNo;
  location: string;
  workingPattern: string;
  hoursRequested: string;
  status: SectionStatus;
}

type YesNo = "YES" | "NO" | "";
type AvailabilityOption = "AM" | "PM" | "NIGHT" | "NONE";
type SectionStatus = "COMPLETE" | "CURRENT" | "INCOMPLETE"
type LicenseType = "FULL" | "PROVISIONAL" | "OTHER" | "";

export type Availability = {  
  mon: Array<AvailabilityOption>;
  tue: Array<AvailabilityOption>;
  wed: Array<AvailabilityOption>;
  thu: Array<AvailabilityOption>;
  fri: Array<AvailabilityOption>;
  sat: Array<AvailabilityOption>;
  sun: Array<AvailabilityOption>;
  status: SectionStatus;
}

export type PreviousNameRecord = {
  firstName: string;
  lastName: string;
}

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  otherNames: YesNo;
  otherNamesDetails: Array<PreviousNameRecord>;
  gender: string;
  nationality: string;
  placeOfBirth: string;
  currentAddress: Address;
  phone: string;
  mobile: string;
  email: string;
  driver: YesNo;
  licenceType: LicenseType;
  licenceHeld: string;
  licenceOther: string;
  ownTransport: YesNo;
  drivingEndorsements: string;
  visaRequired: YesNo;
  visaType: string;
  national_insurance_number: string;
  related_to_employee: YesNo;
  related_to_employee_details: string;
  status: SectionStatus;
}

export type Address = {
  addressLine1: string;
  addressLine2: string?;
  town: string;
  county: string;
  postcode: string;
}

export type EmploymentRecord = {
  name: string;
  address: Address;
  contact: string;
  telephone: string;
  email: string;
  position: string;
  reasonForLeaving: string;
  startDate: string;
  endDate: string | null;
  isCurrentEmployment: boolean;
}

export type EmploymentHistory = {
  employmentRecords: Array<EmploymentRecord>;
  employmentGaps: Array<EmploymentGap>;
  employmentOverlap: Array<EmploymentOverlap>;
  educationToEmploymentGap: number | null;
  status: SectionStatus;
}

export type EmploymentGaps = {
  employmentOverlap: Array<EmploymentOverlap>;
  educationToEmploymentGapReason: string | null;
  acknowledgedOverlap: YesNo;
  placements: Array<EmploymentGapReason>;
  status: SectionStatus;
}

export type EmploymentOverlap = {
  placesOfEmployment: Array<string>;
  startDate: string;
  endDate: string;
}

export type EmploymentGap = {
  nameA: string;
  nameB: string;
  startDate: string;
  endDate: string;
  gapInDays: number;
}

export type EmploymentGapReason = {
  leaving: string;
  arriving: string;
  duration: number;
  reason: string;
}

export type SupportingStatement = {
  statement: string;
  care: string;
  achieve: string;
  safe: string;
  consistent: string;
  active: string;
  diverse: string;
  enjoy: string;
  status: SectionStatus;
}

export type EmployerReference = {
  company: string;
  jobTitle: string;
  name: string;
  capacity: string;
  address: Address;
  email: string;
  phone: string;
}

export type CharaterReference = {
  name: string;
  relationship: string;
  address: Address;
  email: string;
  phone: string;
}

export type Reference<T extends ReferenceType = ReferenceType> = {
  referenceType: T;
  reference: T extends "PROFESSIONAL" ? EmployerReference : CharacterReference;
}

export type ReferenceType = "CHARACTER" | "PROFESSIONAL";

export type References = {
  entries: Array<Reference>;
  status: SectionStatus;
}

export type EqualityAct = {
  disability: YesNo;
  adjustments: YesNo;
  meetRequirements: YesNo;
  status: SectionStatus;
}

export type Safeguarding = {
  outsideUK: YesNo;
  status: SectionStatus;
}

export type EducationTraining = {
  qts: YesNo;
  induction: YesNo;
  dfeNo: string;
  educationRecords: Array<EducationRecord>;
  trainingRecords: Array<TrainingRecord>;
  status: SectionStatus;
}

export type EducationRecord = {
  establishment: string;
  startDate: string;
  endDate: string;
  qualification: string;
}

export type TrainingRecord = {
  subject: string;
  startDate: string;
  endDate: string;
  qualification: string;
}

export type Conviction = {
  declaration: YesNo;
  name: string;
  surname: string;
  date: string;
  convictionDetail: string;
  status: SectionStatus;
}

export type SaferRecruitment = {
  declaration: YesNo;
  status: SectionStatus;
}

export type Consent = {
  prescreen: YesNo;
  asdan: YesNo;
  social: YesNo;
  status: SectionStatus;
}

export type PreviewForm = {
  status: SectionStatus;
}

type Sections = {
  position: Position;
  availability: Availability;
  personalDetails: PersonalDetails;
  educationTraining: EducationTraining;
  employmentHistory: EmploymentHistory;
  employmentGaps: EmploymentGaps;
  supportingStatement: SupportingStatement;
  references: References;
  equalityAct: EqualityAct;
  safeguarding: Safeguarding;
  convictions: Conviction;
  saferRecruitment: SaferRecruitment;
  consent: Consent;
  previewForm: PreviewForm;
}

declare module 'little-state-machine' {
  interface GlobalState {
    sections: Sections;
    currentSection: keyof Sections;
  }
}