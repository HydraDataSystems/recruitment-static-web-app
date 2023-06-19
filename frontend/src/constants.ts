import { LicenseType, SectionStatus, Sections, YesNo } from "./global";

export const SECTION_ORDER: Array<keyof Sections | "previewForm"> = [
  'position',
  'availability',
  'personalDetails',
  'educationTraining',
  'employmentHistory',
  'employmentGaps',
  'supportingStatement',
  'references',
  'equalityAct',
  'safeguarding',
  'convictions',
  'saferRecruitment',
  'consent',
  'previewForm'
];

export const SECTION_ROUTES: Record<keyof Sections | "previewForm", string> = {
  position: '/',
  availability: '/availability',
  personalDetails: '/personal-details',
  educationTraining: '/education-training',
  employmentHistory: '/employment-history',
  employmentGaps: '/employment-gaps',
  supportingStatement: '/supporting-statement',
  references: '/references',
  equalityAct: '/equality-act',
  safeguarding: '/safeguarding',
  convictions: '/convictions',
  saferRecruitment: '/safer-recruitment',
  consent: '/consent',
  previewForm: '/preview'
};

export const MIN_EMPLOYMENT_GAP_IN_DAYS = 30;

export const defaultState = {
  sections: {
    position: {
      position: '',
      otherPosition: '',
      isEducation: '' as YesNo,
      location: '',
      workingPattern: '',
      hoursRequested: '',
      status: "INCOMPLETE" as SectionStatus
    },
    availability: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
      status: "INCOMPLETE" as SectionStatus
    },
    personalDetails: { 
      firstName: '',
      lastName: '',
      otherNames: '' as YesNo,
      otherNamesDetails: [],
      gender: '',
      nationality: '',
      placeOfBirth: '',
      currentAddress: {
        addressLine1: '',
        addressLine2: '',
        town: '',
        county: '',
        postcode: '',
      },
      phone: '',
      mobile: '',
      email: '',
      driver: '' as YesNo,
      licenceType: '' as LicenseType,
      licenceOther: '',
      licenceHeld: '',
      ownTransport: '' as YesNo,
      drivingEndorsements: '',
      visaRequired: '' as YesNo,
      visaType: '',
      national_insurance_number: '',
      related_to_employee: '' as YesNo,
      related_to_employee_details: '',
      status: "INCOMPLETE" as SectionStatus
    },
    educationTraining: {
      qts: '' as YesNo,
      induction: '' as YesNo,
      dfeNo: '' as YesNo,
      educationRecords: [],
      trainingRecords: [],
      status: "INCOMPLETE" as SectionStatus
    },
    employmentHistory: {
      currentEmployment: {
        name: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          town: '',
          county: '',
          postcode: ''
        },
        contact: '',
        telephone: '',
        email: '',
        position: '',
        reasonForLeaving: '',
        startDate: '',
        endDate: '',
      },
      employmentRecords: [],
      employmentGaps: [],
      employmentOverlap: [],
      status: "INCOMPLETE" as SectionStatus
    },
    employmentGaps: {
      employmentOverlap: [],
      placements: [],
      status: "INCOMPLETE" as SectionStatus
    },
    supportingStatement: {
      statement: '',
      care: '',
      achieve: '',
      safe: '',
      consistent: '',
      active: '',
      diverse: '',
      enjoy: '',
      status: "INCOMPLETE" as SectionStatus
    },
    references: {
      entries: [],
      status: "INCOMPLETE" as SectionStatus
    },
    equalityAct: {
      disability: '' as YesNo,
      adjustments: '' as YesNo,
      meetRequirements: '' as YesNo,
      status: "INCOMPLETE" as SectionStatus
    },
    safeguarding: {
      outsideUK: '' as YesNo,
      status: "INCOMPLETE" as SectionStatus
    },
    convictions: {
      declaration: '' as YesNo,
      name: '',
      surname: '',
      date: '',
      convictionDetail: '',
      status: "INCOMPLETE" as SectionStatus
    },
    saferRecruitment: {
      declaration: '' as YesNo,
      status: "INCOMPLETE" as SectionStatus
    },
    consent: {
      prescreen: '' as YesNo,
      asdan: '' as YesNo,
      social: '' as YesNo,
      status: "INCOMPLETE" as SectionStatus
    },
    previewForm: {
      status: "INCOMPLETE" as SectionStatus
    }
  },
  currentSection: 'position' as keyof Sections | "previewForm",
}