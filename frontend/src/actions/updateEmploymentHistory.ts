import { GlobalState } from "little-state-machine";
import { EmploymentGap, EmploymentHistory, EmploymentRecord, SectionStatus } from '../global';
import { MIN_EMPLOYMENT_GAP_IN_DAYS } from '../constants';
export default function updateEmploymentHistorySection(state: GlobalState, payload: EmploymentHistory) {

  const gaps: Array<EmploymentGap> = [];

  function groupOverlappingDates(dateRanges: Array<EmploymentRecord>) {
    const groups = [];
    
    // Sort the date ranges by their start dates
    const sortedRanges = dateRanges.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    // Iterate through the sorted ranges and group overlapping ones
    let currentGroup = [sortedRanges[0]];
    groups.push(currentGroup);
    
    for (let i = 1; i < sortedRanges.length; i++) {
      const currentRange = sortedRanges[i];
      const previousRange = currentGroup[currentGroup.length - 1];
      
      if (currentRange.startDate <= previousRange.endDate) {
        // The current range overlaps with the previous range
        if (currentRange.endDate > previousRange.endDate) {
          // Extend the previous range if the current range's end is later
          previousRange.endDate = currentRange.endDate;
        }
      } else {
        // The current range does not overlap with the previous range
        currentGroup = [currentRange];
        groups.push(currentGroup);
      }
    }
    
    return groups;
  }
  
  const groupedRecords = groupOverlappingDates([payload.currentEmployment, ...payload.employmentRecords]);

  /* Get the earliest start date and the latest end date from each group */

  const orderedRecords = groupedRecords.map((group) => {
    const startDate = new Date(group[0].startDate);
    const endDate = new Date(group[group.length - 1].endDate);

    return {
      name: group[0].name,
      startDate: startDate,
      endDate: endDate
    }
  })

  /* Get the gaps between each group */

  for (let i = 1; i < orderedRecords.length; i++) {
    const startDate = new Date(orderedRecords[i - 1].endDate);
    const endDate = new Date(orderedRecords[i].startDate);

    const diffInDays = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));

    if(diffInDays > MIN_EMPLOYMENT_GAP_IN_DAYS) {
      gaps.push({
        nameA: orderedRecords[i - 1].name,
        nameB: orderedRecords[i].name,
        startDate: orderedRecords[i - 1].endDate.toISOString(),
        endDate: orderedRecords[i].startDate.toISOString(),
        gapInDays: diffInDays
      })
    }
  }

  return {
    ...state,
    sections: {
      ...state.sections,
      employmentHistory: {
        currentEmployment: { ...payload.currentEmployment }, //state.sections.employmentHistory.currentEmployment,
        employmentRecords: [...payload.employmentRecords],
        employmentGaps: [...gaps],
        status: "COMPLETE" as SectionStatus
      }
    },
    //currentSection: SECTION_ORDER[SECTION_ORDER.indexOf(state.currentSection) + 1]
  }
}