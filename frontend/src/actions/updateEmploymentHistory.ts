import { GlobalState } from "little-state-machine";
import { EmploymentGap, EmploymentOverlap, EmploymentHistory, EmploymentRecord, SectionStatus } from '../global';
import { MIN_EMPLOYMENT_GAP_IN_DAYS } from '../constants';
export default function updateEmploymentHistorySection(state: GlobalState, payload: EmploymentHistory) {
  
  const employmentRecords = payload.employmentRecords;
  const sortedRecords = [...employmentRecords].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

  function isEmploymentOverlap(a: EmploymentRecord, b: EmploymentRecord): boolean {
    let range1 = {
      startDate: new Date(a.startDate),
      endDate: a.endDate !== '' ? new Date(a.endDate ?? '') : null
    };

    let range2 = {
      startDate: new Date(b.startDate),
      endDate: b.endDate !== '' ? new Date(b.endDate ?? '') : null
    };

    return (
        range1.startDate.getTime() <= (range2.endDate?.getTime() || Infinity) &&
        (range1.endDate?.getTime() || Infinity) >= range2.startDate.getTime()
    );
  };

  function groupOverlappingEmployment(records: EmploymentRecord[]): EmploymentRecord[][] {
    const groupedEmployments: EmploymentRecord[][] = [];

    for (const record of records) {
      let isGrouped = false;

      for (const group of groupedEmployments) {
        if (group.some((emp) => isEmploymentOverlap(record, emp))) {
          group.push(record);
          isGrouped = true;
          break;
        }
      }

      if (!isGrouped) {
        groupedEmployments.push([record]);
      }

    }

    return groupedEmployments;
  }

  function getGapsFromGroupedRecords(groupedRecords: EmploymentRecord[][]): Array<EmploymentGap> {
    const gaps: Array<EmploymentGap> = [];

    for (let i = 0; i < groupedRecords.length - 1; i++) {
      const currentGroup = groupedRecords[i];
      const nextGroup = groupedRecords[i + 1];

      const startGroup = currentGroup.reduce(function (pre, cur) {
        return Date.parse(pre.endDate ?? '') < Date.parse(cur.endDate ?? '') ? cur : pre;
      });

      const endGroup = nextGroup.reduce(function (pre, cur) {
        return Date.parse(pre.startDate) > Date.parse(cur.startDate) ? cur : pre;
      });

      const gapStartDate = new Date(startGroup.endDate ?? '');
      const gapEndDate = new Date(endGroup.startDate);
      
      const gapInDays = (gapEndDate.getTime() - gapStartDate.getTime()) / (1000 * 3600 * 24);

      if (gapInDays >= MIN_EMPLOYMENT_GAP_IN_DAYS) {
        gaps.push({
          nameA: startGroup.name,
          nameB: endGroup.name,
          startDate: gapStartDate.toISOString().split('T')[0],
          endDate: gapEndDate.toISOString().split('T')[0],
          gapInDays: gapInDays
        });
      }
    }

    // iterate over grouped records again with for loop to find the latest end date in all the records, then add another gap between that date and today
    for (let i = 0; i < groupedRecords.length; i++) {
      const currentGroup = groupedRecords[i];
      const lastRecord = currentGroup.reduce(function (pre, cur) {
        return Date.parse(pre.endDate ?? '') < Date.parse(cur.endDate ?? '') ? cur : pre;
      });
      const lastEmploymentEndDate = new Date(lastRecord.endDate ?? '');
      const today = new Date();
      const gapInDays = Math.round((today.getTime() - lastEmploymentEndDate.getTime()) / (1000 * 3600 * 24));
      
      if (gapInDays >= MIN_EMPLOYMENT_GAP_IN_DAYS) {
        gaps.push({
          nameA: lastRecord.name,
          nameB: 'This Application (Today)',
          startDate: lastEmploymentEndDate.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
          gapInDays: gapInDays
        });
      }
    }
    return gaps;
  }

  function getOverlapFromGroupedRecords(groupedRecords: EmploymentRecord[][]): Array<EmploymentOverlap> {
    const overlaps: Array<EmploymentOverlap> = [];

    for (let i = 0; i < groupedRecords.length; i++) {
      const currentGroup = groupedRecords[i];
      const startRecord = currentGroup.reduce(function (pre, cur) {
        return Date.parse(pre.startDate) < Date.parse(cur.startDate) ? pre : cur;
      });
      const endRecord = currentGroup.reduce(function (pre, cur) {
        return Date.parse(pre.endDate ?? '') > Date.parse(cur.endDate ?? '') ? pre : cur;
      });

      const placements = currentGroup.map((record) => record.name);

      if(placements.length > 1) {
        overlaps.push({
          placesOfEmployment: placements,
          startDate: new Date(startRecord.startDate).toLocaleDateString('en-GB'),
          endDate: new Date(endRecord.endDate ?? '').toLocaleDateString('en-GB')
        });
      }
    }

    return overlaps;
  }

  function getEducationToEmploymentGap(state: GlobalState) {
    let latestEducationDate: number = 0;
    let firstEmploymentDate: number = (new Date()).getTime();

    state.sections.educationTraining.educationRecords.forEach((record) => {
      if(record.endDate !== '') {
        const endDate = new Date(record.endDate).getTime();
        if(endDate > latestEducationDate) {
          latestEducationDate = endDate;
        }
      }
    });

    state.sections.employmentHistory.employmentRecords.forEach((record) => {
      if(record.startDate !== '') {
        const startDate = new Date(record.startDate).getTime();
        if(startDate < firstEmploymentDate) {
          firstEmploymentDate = startDate;
        }
      }
    });

    if(latestEducationDate > 0 && firstEmploymentDate > 0) {
      const gapInDays = Math.round((firstEmploymentDate - latestEducationDate) / (1000 * 3600 * 24));
      return gapInDays >= MIN_EMPLOYMENT_GAP_IN_DAYS ? gapInDays : null;
    } else {
      return null;
    }
  }



  const groupedRecords = groupOverlappingEmployment(sortedRecords);
  const gaps = getGapsFromGroupedRecords(groupedRecords);
  const overlaps = getOverlapFromGroupedRecords(groupedRecords);
  const educationToEmploymentGap = getEducationToEmploymentGap(state);

  return {
    ...state,
    sections: {
      ...state.sections,
      employmentHistory: {
        employmentRecords: [...payload.employmentRecords],
        educationToEmploymentGap: educationToEmploymentGap,
        employmentGaps: [...gaps],
        employmentOverlap: [...overlaps],
        status: "COMPLETE" as SectionStatus
      }
    },
    //currentSection: SECTION_ORDER[SECTION_ORDER.indexOf(state.currentSection) + 1]
  }

}