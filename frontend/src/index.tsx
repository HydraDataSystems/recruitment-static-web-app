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
import EqualityAct from './sections/EqualityAct';
import Safeguarding from './sections/Safeguarding';
import Convictions from './sections/Convictions';
import SaferRecruitment from './sections/SaferRecruitment';
import Consent from './sections/Consent';
import PreviewForm from './sections/PreviewForm';
import { SECTION_ROUTES } from './constants';
import reportWebVitals from './reportWebVitals';
import { defaultState } from './constants';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

createStore(defaultState);

root.render(
  <React.StrictMode>
    <StateMachineProvider>
      <div className='bg-gray-50'>
      <div className="container mx-auto sm:px-6 lg:px-8">
        <div className="p-2">
          <h1 className={`mt-2 mb-2 font-semibold leading-7 text-gray-900 text-2xl text-center md:text-3xl`}>Cascade Application Form</h1>
        </div>
        <div className="overflow-hidden bg-white shadow sm:rounded-lg mb-6">
          <div className="px-4 py-5 sm:p-6">
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
              <Route path={SECTION_ROUTES.equalityAct} element={<EqualityAct />} />
              <Route path={SECTION_ROUTES.safeguarding} element={<Safeguarding />} />
              <Route path={SECTION_ROUTES.convictions} element={<Convictions />} />
              <Route path={SECTION_ROUTES.saferRecruitment} element={<SaferRecruitment />} />
              <Route path={SECTION_ROUTES.consent} element={<Consent />} />
              <Route path={SECTION_ROUTES.previewForm} element={<PreviewForm />} />
            </Routes>
          </Router>
          </div>
        </div>
      </div>  
      </div>
    </StateMachineProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
