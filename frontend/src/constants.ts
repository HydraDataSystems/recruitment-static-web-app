import { Sections } from "./global";

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
  previewForm: '/preview'
};

export const MIN_EMPLOYMENT_GAP_IN_DAYS = 30;