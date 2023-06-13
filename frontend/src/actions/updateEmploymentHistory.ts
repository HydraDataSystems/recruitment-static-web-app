import { GlobalState } from "little-state-machine";
import { EmploymentGap, EmploymentOverlap, EmploymentHistory, EmploymentRecord, SectionStatus } from '../global';
import { MIN_EMPLOYMENT_GAP_IN_DAYS } from '../constants';
export default function updateEmploymentHistorySection(state: GlobalState, payload: EmploymentHistory) {
  const currentEmployment = payload.currentEmployment;
  const employmentRecords = payload.employmentRecords;
  const sortedRecords = [currentEmployment, ...employmentRecords].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  type GroupedRecords = {
    entries: Array<EmploymentRecord>;
    startDateRef: EmploymentRecord;
    endDateRef: EmploymentRecord;
  }

  /* 
    Write a function that groups EmploymentRecord typed objects that have date ranges that are overlapping, do not modify 
    the original EmploymentRecord typed object. Return an array of GroupedRecords typed objects.
  */

  function groupOverlappingDates(records: Array<EmploymentRecord>): Array<GroupedRecords> {
    const groups: Array<GroupedRecords> = [];
    
    // Sort the date ranges by their start dates
    const sortedRanges = records.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    // Iterate through the sorted ranges and group overlapping ones
    let currentGroup: GroupedRecords = {
      entries: [sortedRanges[0]],
      startDateRef: sortedRanges[0],
      endDateRef: sortedRanges[0]
    };

    groups.push(currentGroup);

    for (let i = 1; i < sortedRanges.length; i++) {
      const currentRange = sortedRanges[i];
      const previousRange = currentGroup.endDateRef;

      if (currentRange.startDate <= previousRange.endDate) {
        // The current range overlaps with the previous range

        currentGroup.entries.push(currentRange);
        
        if (currentRange.endDate > previousRange.endDate) {
          // Extend the previous range if the current range's end is later
          currentGroup.endDateRef = currentRange;
        }
      } else {
        // The current range does not overlap with the previous range
        currentGroup = {
          entries: [currentRange],
          startDateRef: currentRange,
          endDateRef: currentRange
        };
        groups.push(currentGroup);
      }
    }

    return groups;
  }

  function getGapsFromGroupedRecords(groupedRecords: Array<GroupedRecords>): Array<EmploymentGap> {
    const gaps: Array<EmploymentGap> = [];

    for (let i = 0; i < groupedRecords.length - 1; i++) {
      const currentGroup = groupedRecords[i];
      const nextGroup = groupedRecords[i + 1];

      const gapStartDate = new Date(currentGroup.endDateRef.endDate);
      const gapEndDate = new Date(nextGroup.startDateRef.startDate);
      const gapInDays = (gapEndDate.getTime() - gapStartDate.getTime()) / (1000 * 3600 * 24);

      if (gapInDays >= MIN_EMPLOYMENT_GAP_IN_DAYS) {
        gaps.push({
          nameA: currentGroup.endDateRef.name,
          nameB: nextGroup.startDateRef.name,
          startDate: gapStartDate.toISOString().split('T')[0],
          endDate: gapEndDate.toISOString().split('T')[0],
          gapInDays: gapInDays
        });
      }
    }

    return gaps;
  }

  function getOverlapFromGroupedRecords(groupedRecords: Array<GroupedRecords>): Array<EmploymentOverlap> {
    const overlaps: Array<EmploymentOverlap> = [];

    for (let i = 0; i < groupedRecords.length - 1; i++) {
      const currentGroup = groupedRecords[i];
      const placements = currentGroup.entries.map((record) => record.name);

      overlaps.push({
        placesOfEmployment: placements,
        startDate: new Date(currentGroup.startDateRef.startDate).toLocaleDateString('en-GB'),
        endDate: new Date(currentGroup.endDateRef.endDate).toLocaleDateString('en-GB')
      });
    }

    return overlaps;
  }

  const groupedRecords = groupOverlappingDates(sortedRecords);
  const gaps = getGapsFromGroupedRecords(groupedRecords);
  const overlaps = getOverlapFromGroupedRecords(groupedRecords);

  return {
    ...state,
    sections: {
      ...state.sections,
      employmentHistory: {
        currentEmployment: { ...payload.currentEmployment }, //state.sections.employmentHistory.currentEmployment,
        employmentRecords: [...payload.employmentRecords],
        employmentGaps: [...gaps],
        employmentOverlap: [...overlaps],
        status: "COMPLETE" as SectionStatus
      }
    },
    //currentSection: SECTION_ORDER[SECTION_ORDER.indexOf(state.currentSection) + 1]
  }

}