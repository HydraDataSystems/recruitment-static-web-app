import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StateMachineProvider, createStore } from 'little-state-machine';
import NavIndicator from './component/NavIndicator';
import Position from './sections/Position';
import PersonalDetails from './sections/PersonalDetails';
import EducationTraining from './sections/EducationTraining';
import EmploymentHistory from './sections/EmploymentHistory';
import EmploymentGaps from './sections/EmploymentGaps';
import Availability from './sections/Availability';
import SupportingStatement from './sections/SupportingStatement';
import References from './sections/References';
import Safeguarding from './sections/Safeguarding';
import PreviewForm from './sections/PreviewForm';
import { SECTION_ROUTES } from './constants';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

createStore({
  sections: {
    position: {
      position: '',
      otherPosition: '',
      location: '',
      workingPattern: '',
      hoursRequested: '',
      status: "INCOMPLETE"
    },
    availability: {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
      status: "INCOMPLETE"
    },
    personalDetails: { 
      firstName: '',
      lastName: '',
      additionalNames: '',
      maidenName: '',
      previousNames: '',
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
      driver: '',
      licenceHeld: '',
      ownTransport: '',
      drivingEndorsements: '',
      uk_ec_eea_resident: '',
      immigration_status: '',
      visa_number: '',
      national_insurance_number: '',
      related_to_employee: '',
      disability: '',
      status: "INCOMPLETE"
    },
    educationTraining: {
      educationRecords: [],
      trainingRecords: [],
      status: "INCOMPLETE"
    },
    employmentHistory: {
      employmentRecords: [],
      employmentGaps: [],
      status: "INCOMPLETE"
    },
    employmentGaps: {
      placements: [],
      status: "INCOMPLETE"
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
      status: "INCOMPLETE"
    },
    references: {
      currentOrMostRecentEmployer: {
        company: '',
        jobTitle: '',
        name: '',
        capacity: '',
        phone: '',
        email: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          town: '',
          county: '',
          postcode: '',
        },
      },
      previousEmployer: {
        company: '',
        jobTitle: '',
        name: '',
        capacity: '',
        phone: '',
        email: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          town: '',
          county: '',
          postcode: '',
        },
      },
      characterReference: {
        relationship: '',
        name: '',
        phone: '',
        email: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          town: '',
          county: '',
          postcode: '',
        },
      },
      characterReference2: {
        relationship: '',
        name: '',
        phone: '',
        email: '',
        address: {
          addressLine1: '',
          addressLine2: '',
          town: '',
          county: '',
          postcode: '',
        },
      },
      status: "INCOMPLETE"
    },
    safeguarding: {
      convictions: '',
      cautions: '',
      preScreening: '',
      status: "INCOMPLETE"
    },
    previewForm: {
      status: "INCOMPLETE"
    }
  },
  currentSection: 'position',
});

root.render(
  <React.StrictMode>
    <StateMachineProvider>
      <div>
        <div className="p-2">
          <h1 className="text-md text-center">Cascade Application Form</h1>
        </div>
        <div className="px-2 max-w-sm mx-auto">
        <Router>
        <NavIndicator />
          <Routes>
            <Route path={SECTION_ROUTES.position} element={<Position />} />
            <Route path={SECTION_ROUTES.personalDetails} element={<PersonalDetails />} />
            <Route path={SECTION_ROUTES.educationTraining} element={<EducationTraining />} />
            <Route path={SECTION_ROUTES.availability} element={<Availability />} />
            <Route path={SECTION_ROUTES.employmentHistory} element={<EmploymentHistory />} />
            <Route path={SECTION_ROUTES.employmentGaps} element={<EmploymentGaps />} />
            <Route path={SECTION_ROUTES.supportingStatement} element={<SupportingStatement />} />
            <Route path={SECTION_ROUTES.references} element={<References />} />
            <Route path={SECTION_ROUTES.safeguarding} element={<Safeguarding />} />
            <Route path={SECTION_ROUTES.previewForm} element={<PreviewForm />} />
          </Routes>
        </Router>
        </div>
      </div>  
    </StateMachineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
