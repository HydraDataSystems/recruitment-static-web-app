import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useStateMachine } from "little-state-machine";
import { updateSection, updateEmploymentHistorySection, onMountSection, clearForm } from "../actions";
import { SECTION_ROUTES, SECTION_ORDER } from "../constants";

function useFormState() {

  const location = useLocation();
  
  const navigate = useNavigate();

  const { actions, state } = useStateMachine({ 
    clearForm,
    updateSection, 
    updateEmploymentHistorySection, 
    onMountSection 
  });

  useEffect(() => {
    const isCorrectSection = location.pathname === SECTION_ROUTES[state.currentSection];
    if(isCorrectSection) return;
    
    const keys = Object.keys as <T>(o: T) => Extract<keyof T, string>[];
    const sectionForRoute = keys(SECTION_ROUTES).find(section => location.pathname === SECTION_ROUTES[section]);

    if (sectionForRoute) {
      actions.onMountSection(sectionForRoute);
      window.scrollTo(0, 0);
    }

  }, [location, actions, state.currentSection]);

  const nextSection = () => {
    const { currentSection, sections } = state;
    let currentIndex = SECTION_ORDER.indexOf(currentSection);
    let nextSection = currentIndex < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIndex + 1] : "previewForm";

    if(nextSection === "employmentGaps" 
      && sections.employmentHistory.employmentGaps.length < 1
      && sections.employmentHistory.educationToEmploymentGap === null
      && sections.employmentHistory.currentEmploymentToApplicationGap === null) {
      currentIndex = SECTION_ORDER.indexOf(nextSection);
      nextSection = currentIndex < SECTION_ORDER.length - 1 ? SECTION_ORDER[currentIndex + 1] : "previewForm";
    }

    navigate(SECTION_ROUTES[nextSection]);
  }

  return {
    clearForm: actions.clearForm,
    updateSection: actions.updateSection,
    updateEmploymentHistorySection: actions.updateEmploymentHistorySection,
    onMountSection: actions.onMountSection,
    nextSection,
    state
  }
}

export default useFormState;