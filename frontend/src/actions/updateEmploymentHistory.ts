import { GlobalState } from "little-state-machine";
import { EmploymentGap, EmploymentHistory } from '../global';
import { MIN_EMPLOYMENT_GAP_IN_DAYS } from '../constants';
export default function updateEmploymentHistorySection(state: GlobalState, payload: EmploymentHistory) {
  
  const gaps: Array<EmploymentGap> = [];
  const orderedRecords = [...payload.employmentRecords].sort((a, b) => {
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  orderedRecords.forEach((record, index) => {
     
    if (index > 0) {
      const startDate = new Date(orderedRecords[index - 1].endDate);
      const endDate = new Date(record.startDate);
      const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

      if(diffInDays > MIN_EMPLOYMENT_GAP_IN_DAYS) {
        gaps.push({
          nameA: orderedRecords[index - 1].name,
          nameB: record.name,
          startDate: orderedRecords[index - 1].endDate,
          endDate: record.startDate,
          gapInDays: diffInDays
        })
      }

    }
  })

  return {
    ...state,
    sections: {
      ...state.sections,
      employmentHistory: {
        employmentRecords: [...payload.employmentRecords],
        employmentGaps: [...gaps]
      }
    },
    //currentSection: SECTION_ORDER[SECTION_ORDER.indexOf(state.currentSection) + 1]
  }
}