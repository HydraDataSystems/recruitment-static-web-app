import 'little-state-machine';

export type Position = {
  position: string;
  otherPosition: string;
  location: string;
  workingPattern: string;
}

type YesNo = "YES" | "NO" | "";
type AvailabilityOption = "AM" | "PM" | "NIGHT" | "NONE";

export type Availability = {  
  mon: Array<AvailabilityOption>;
  tue: Array<AvailabilityOption>;
  wed: Array<AvailabilityOption>;
  thu: Array<AvailabilityOption>;
  fri: Array<AvailabilityOption>;
  sat: Array<AvailabilityOption>;
  sun: Array<AvailabilityOption>;
}

export type PersonalDetails = {
  firstName: string;
  lastName: string;
  maidenName: string;
  previousNames: string;
  gender: string;
  nationality: string;
  placeOfBirth: string;
  currentAddress: Address;
  phone: string;
  mobile: string;
  email: string;
  driver: YesNo;
  licenceHeld: string;
  ownTransport: YesNo;
  drivingEndorsements: string;
  uk_ec_eea_resident: YesNo;
  immigration_status: string;
  visa_number: string;
  national_insurance_number: string;
  related_to_employee: YesNo;
  disability: YesNo;
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
  endDate: string;
}

export type EmploymentHistory = {
  employmentRecords: Array<EmploymentRecord>;
  employmentGaps: Array<EmploymentGap>;
}

export type EmploymentGaps = {
  placements: Array<EmploymentGapReason>;
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
}

export type Reference = {
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

export type References = {
  currentOrMostRecentEmployer: Reference;
  previousEmployer: Reference;
  characterReference: CharaterReference;
  characterReference2: CharaterReference;
}

export type Safeguarding = {
  convictions: YesNo;
  cautions: YesNo;
  preScreening: YesNo;
}

export type EducationTraining = {
  educationRecords: Array<EducationRecord>;
  trainingRecords: Array<TrainingRecord>;
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

type Sections = {
  position: Position;
  availability: Availability;
  personalDetails: PersonalDetails;
  educationTraining: EducationTraining;
  employmentHistory: EmploymentHistory;
  employmentGaps: EmploymentGaps;
  supportingStatement: SupportingStatement;
  references: References;
  safeguarding: Safeguarding;
}

declare module 'little-state-machine' {
  interface GlobalState {
    sections: Sections;
    currentSection: keyof Sections | "previewForm";
  }
}