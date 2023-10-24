import { Address, SectionStatus, YesNo } from '../../global';
import updateEmploymentHistorySection, { getGapsFromGroupedRecords } from '../updateEmploymentHistory';

const mockState = {
  "sections": {
    "position": {
      "position": "",
      "otherPosition": "",
      "isEducation": "" as YesNo,
      "location": "",
      "workingPattern": "",
      "hoursRequested": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "availability": {
      "mon": [],
      "tue": [],
      "wed": [],
      "thu": [],
      "fri": [],
      "sat": [],
      "sun": [],
      "status": "INCOMPLETE" as SectionStatus
    },
    "personalDetails": {
      "firstName": "",
      "lastName": "",
      "otherNames": "" as YesNo,
      "otherNamesDetails": [],
      "gender": "",
      "nationality": "",
      "placeOfBirth": "",
      "currentAddress": {
        "addressLine1": "",
        "addressLine2": "",
        "town": "",
        "county": "",
        "postcode": ""
      },
      "phone": "",
      "mobile": "",
      "email": "",
      "driver": "",
      "licenceType": "",
      "licenceOther": "",
      "licenceHeld": "",
      "ownTransport": "",
      "drivingEndorsements": "",
      "visaRequired": "",
      "visaExpiry": "",
      "visaType": "",
      "national_insurance_number": "",
      "related_to_employee": "",
      "related_to_employee_details": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "educationTraining": {
      "qts": "",
      "induction": "",
      "dfeNo": "",
      "educationRecords": [
        {
          "establishment": "uea",
          "qualification": "uh",
          "startDate": "2021-02",
          "endDate": "2021-05"
        }
      ],
      "trainingRecords": [],
      "status": "COMPLETE" as SectionStatus
    },
    "employmentHistory": {
      "employmentRecords": [
        {
          "name": "A",
          "address": {
            "addressLine1": "A",
            "addressLine2": "",
            "town": "A",
            "county": "A",
            "postcode": "A"
          },
          "contact": "A",
          "telephone": "A",
          "email": "alex.haines123@gmail.com",
          "position": "A",
          "reasonForLeaving": "A",
          "startDate": "2022-03-01",
          "isCurrentEmployment": false,
          "endDate": "2022-05-31"
        },
        {
          "name": "b",
          "address": {
            "addressLine1": "A",
            "addressLine2": "",
            "town": "A",
            "county": "A",
            "postcode": "A"
          },
          "contact": "A",
          "telephone": "A",
          "email": "alex.haines123@gmail.com",
          "position": "A",
          "reasonForLeaving": "A",
          "startDate": "2022-06-01",
          "isCurrentEmployment": false,
          "endDate": "2022-07-31"
        },
        {
          "name": "c",
          "address": {
            "addressLine1": "a",
            "addressLine2": "",
            "town": "a",
            "county": "",
            "postcode": "a"
          },
          "contact": "a",
          "telephone": "a",
          "email": "alex.haines123@gmail.com",
          "position": "a",
          "reasonForLeaving": "a",
          "startDate": "2023-01-12",
          "isCurrentEmployment": false,
          "endDate": "2023-03-28"
        },
        {
          "name": "d",
          "address": {
            "addressLine1": "f",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "alex.haines123@gmail.com",
          "position": "f",
          "reasonForLeaving": "f",
          "startDate": "2023-07-01",
          "isCurrentEmployment": false,
          "endDate": "2023-09-01"
        }
      ],
      "educationToEmploymentGap": null,
      "employmentGaps": [
        {
          "nameA": "b",
          "nameB": "c",
          "startDate": "2022-07-31",
          "endDate": "2023-01-12",
          "gapInDays": 165
        },
        {
          "nameA": "c",
          "nameB": "d",
          "startDate": "2023-03-28",
          "endDate": "2023-07-01",
          "gapInDays": 95
        },
        {
          "nameA": "d",
          "nameB": "This Application (Today)",
          "startDate": "2023-09-01",
          "endDate": "2023-10-23",
          "gapInDays": 53
        }
      ],
      "employmentOverlap": [],
      "status": "COMPLETE" as SectionStatus
    },
    "employmentGaps": {
      "employmentOverlap": [],
      "acknowledgedOverlap": "",
      "currentEmploymentToApplicationGap": null,
      "currentEmploymentToApplicationGapReason": "",
      "educationToEmploymentGap": null,
      "educationToEmploymentGapReason": "",
      "placements": [],
      "status": "INCOMPLETE"
    },
    "supportingStatement": {
      "statement": "",
      "care": "",
      "achieve": "",
      "safe": "",
      "consistent": "",
      "active": "",
      "diverse": "",
      "enjoy": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "references": {
      "entries": [],
      "status": "INCOMPLETE" as SectionStatus
    },
    "equalityAct": {
      "disability": "",
      "adjustments": "",
      "meetRequirements": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "safeguarding": {
      "outsideUK": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "convictions": {
      "declaration": "",
      "name": "",
      "surname": "",
      "date": "",
      "convictionDetail": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "saferRecruitment": {
      "declaration": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "consent": {
      "prescreen": "",
      "asdan": "",
      "social": "",
      "status": "INCOMPLETE" as SectionStatus
    },
    "previewForm": {
      "status": "INCOMPLETE" as SectionStatus
    }
  },
  "currentSection": "employmentHistory"
}

const mockPayload = {
  "employmentRecords": [
    {
      "name": "A",
      "address": {
        "addressLine1": "A",
        "addressLine2": "",
        "town": "A",
        "county": "A",
        "postcode": "A"
      },
      "contact": "A",
      "telephone": "A",
      "email": "alex.haines123@gmail.com",
      "position": "A",
      "reasonForLeaving": "A",
      "startDate": "2022-03-01",
      "isCurrentEmployment": false,
      "endDate": "2022-05-31"
    },
    {
      "name": "b",
      "address": {
        "addressLine1": "A",
        "addressLine2": "",
        "town": "A",
        "county": "A",
        "postcode": "A"
      },
      "contact": "A",
      "telephone": "A",
      "email": "alex.haines123@gmail.com",
      "position": "A",
      "reasonForLeaving": "A",
      "startDate": "2022-06-01",
      "isCurrentEmployment": false,
      "endDate": "2022-07-31"
    },
    {
      "name": "c",
      "address": {
        "addressLine1": "a",
        "addressLine2": "",
        "town": "a",
        "county": "",
        "postcode": "a"
      },
      "contact": "a",
      "telephone": "a",
      "email": "alex.haines123@gmail.com",
      "position": "a",
      "reasonForLeaving": "a",
      "startDate": "2023-01-12",
      "isCurrentEmployment": false,
      "endDate": "2023-03-28"
    },
    {
      "name": "d",
      "address": {
        "addressLine1": "f",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "alex.haines123@gmail.com",
      "position": "f",
      "reasonForLeaving": "f",
      "startDate": "2023-07-01",
      "isCurrentEmployment": false,
      "endDate": "2023-09-01"
    }
  ]
}

const mockLargeGapState = {
  "sections": {
    "position": {
      "position": "",
      "otherPosition": "",
      "isEducation": "",
      "location": "",
      "workingPattern": "",
      "hoursRequested": "",
      "status": "INCOMPLETE"
    },
    "availability": {
      "mon": [],
      "tue": [],
      "wed": [],
      "thu": [],
      "fri": [],
      "sat": [],
      "sun": [],
      "status": "INCOMPLETE"
    },
    "personalDetails": {
      "firstName": "",
      "lastName": "",
      "otherNames": "",
      "otherNamesDetails": [],
      "gender": "",
      "nationality": "",
      "placeOfBirth": "",
      "currentAddress": {
        "addressLine1": "",
        "addressLine2": "",
        "town": "",
        "county": "",
        "postcode": ""
      },
      "phone": "",
      "mobile": "",
      "email": "",
      "driver": "",
      "licenceType": "",
      "licenceOther": "",
      "licenceHeld": "",
      "ownTransport": "",
      "drivingEndorsements": "",
      "visaRequired": "",
      "visaExpiry": "",
      "visaType": "",
      "national_insurance_number": "",
      "related_to_employee": "",
      "related_to_employee_details": "",
      "status": "INCOMPLETE"
    },
    "educationTraining": {
      "qts": "",
      "induction": "",
      "dfeNo": "",
      "educationRecords": [
        {
          "establishment": "uea",
          "qualification": "BIS",
          "startDate": "2014-09",
          "endDate": "2017-07"
        }
      ],
      "trainingRecords": [
        {
          "subject": "AWS Certs",
          "qualification": "Pass",
          "startDate": "2020-09",
          "endDate": "2020-10"
        }
      ],
      "status": "COMPLETE"
    },
    "employmentHistory": {
      "employmentRecords": [
        {
          "name": "MW",
          "address": {
            "addressLine1": "asdf",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "s@gmaill.com",
          "position": "f",
          "reasonForLeaving": "f",
          "startDate": "2022-02-21",
          "isCurrentEmployment": false,
          "endDate": "2022-10-12"
        },
        {
          "name": "Optimise Media",
          "address": {
            "addressLine1": "d",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "ae@gmai.coilm",
          "position": "f",
          "reasonForLeaving": "f",
          "startDate": "2019-11-25",
          "isCurrentEmployment": false,
          "endDate": "2022-02-18"
        },
        {
          "name": "A",
          "address": {
            "addressLine1": "a",
            "addressLine2": "a",
            "town": "a",
            "county": "a",
            "postcode": "a"
          },
          "contact": "a",
          "telephone": "a",
          "email": "alex.haines123@gmail.com",
          "position": "a",
          "reasonForLeaving": "a",
          "startDate": "2018-11-19",
          "isCurrentEmployment": false,
          "endDate": "2019-11-19"
        },
        {
          "name": "f",
          "address": {
            "addressLine1": "f",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "alex.haines123@gmail.com",
          "position": "a",
          "reasonForLeaving": "a",
          "startDate": "2017-06-02",
          "isCurrentEmployment": false,
          "endDate": "2018-11-14"
        }
      ],
      "educationToEmploymentGap": null,
      "employmentGaps": [
        {
          "nameA": "MW",
          "nameB": "This Application (Today)",
          "startDate": "2022-10-12",
          "endDate": "2023-10-24",
          "gapInDays": 377
        }
      ],
      "employmentOverlap": [],
      "status": "COMPLETE"
    },
    "employmentGaps": {
      "employmentOverlap": [],
      "acknowledgedOverlap": "",
      "currentEmploymentToApplicationGap": null,
      "currentEmploymentToApplicationGapReason": "",
      "educationToEmploymentGap": null,
      "educationToEmploymentGapReason": "",
      "placements": [],
      "status": "INCOMPLETE"
    },
    "supportingStatement": {
      "statement": "",
      "care": "",
      "achieve": "",
      "safe": "",
      "consistent": "",
      "active": "",
      "diverse": "",
      "enjoy": "",
      "status": "INCOMPLETE"
    },
    "references": {
      "entries": [],
      "status": "INCOMPLETE"
    },
    "equalityAct": {
      "disability": "",
      "adjustments": "",
      "meetRequirements": "",
      "status": "INCOMPLETE"
    },
    "safeguarding": {
      "outsideUK": "",
      "status": "INCOMPLETE"
    },
    "convictions": {
      "declaration": "",
      "name": "",
      "surname": "",
      "date": "",
      "convictionDetail": "",
      "status": "INCOMPLETE"
    },
    "saferRecruitment": {
      "declaration": "",
      "status": "INCOMPLETE"
    },
    "consent": {
      "prescreen": "",
      "asdan": "",
      "social": "",
      "status": "INCOMPLETE"
    },
    "previewForm": {
      "status": "INCOMPLETE"
    }
  },
  "currentSection": "employmentHistory"
}
const mockLargeGapPayload = {
  "employmentRecords": [
    {
      "name": "MW",
      "address": {
        "addressLine1": "asdf",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "s@gmaill.com",
      "position": "f",
      "reasonForLeaving": "f",
      "startDate": "2022-02-21",
      "isCurrentEmployment": false,
      "endDate": "2022-10-12"
    },
    {
      "name": "Optimise Media",
      "address": {
        "addressLine1": "d",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "ae@gmai.coilm",
      "position": "f",
      "reasonForLeaving": "f",
      "startDate": "2019-11-25",
      "isCurrentEmployment": false,
      "endDate": "2022-02-18"
    },
    {
      "name": "A",
      "address": {
        "addressLine1": "a",
        "addressLine2": "a",
        "town": "a",
        "county": "a",
        "postcode": "a"
      },
      "contact": "a",
      "telephone": "a",
      "email": "alex.haines123@gmail.com",
      "position": "a",
      "reasonForLeaving": "a",
      "startDate": "2018-11-19",
      "isCurrentEmployment": false,
      "endDate": "2019-11-19"
    },
    {
      "name": "f",
      "address": {
        "addressLine1": "f",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "alex.haines123@gmail.com",
      "position": "a",
      "reasonForLeaving": "a",
      "startDate": "2017-06-02",
      "isCurrentEmployment": false,
      "endDate": "2018-11-14"
    }
  ]
}

const mockOverlappingState = {
  "sections": {
    "position": {
      "position": "",
      "otherPosition": "",
      "isEducation": "",
      "location": "",
      "workingPattern": "",
      "hoursRequested": "",
      "status": "INCOMPLETE"
    },
    "availability": {
      "mon": [],
      "tue": [],
      "wed": [],
      "thu": [],
      "fri": [],
      "sat": [],
      "sun": [],
      "status": "INCOMPLETE"
    },
    "personalDetails": {
      "firstName": "",
      "lastName": "",
      "otherNames": "",
      "otherNamesDetails": [],
      "gender": "",
      "nationality": "",
      "placeOfBirth": "",
      "currentAddress": {
        "addressLine1": "",
        "addressLine2": "",
        "town": "",
        "county": "",
        "postcode": ""
      },
      "phone": "",
      "mobile": "",
      "email": "",
      "driver": "",
      "licenceType": "",
      "licenceOther": "",
      "licenceHeld": "",
      "ownTransport": "",
      "drivingEndorsements": "",
      "visaRequired": "",
      "visaExpiry": "",
      "visaType": "",
      "national_insurance_number": "",
      "related_to_employee": "",
      "related_to_employee_details": "",
      "status": "INCOMPLETE"
    },
    "educationTraining": {
      "qts": "",
      "induction": "",
      "dfeNo": "",
      "educationRecords": [
        {
          "establishment": "Weyaldn high",
          "qualification": "Do alirght",
          "startDate": "1989-01",
          "endDate": "1994-06"
        }
      ],
      "trainingRecords": [],
      "status": "COMPLETE"
    },
    "employmentHistory": {
      "employmentRecords": [
        {
          "name": "Enomatic",
          "address": {
            "addressLine1": "f",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "alex.haines123@gmail.com",
          "position": "f",
          "reasonForLeaving": "f",
          "startDate": "2008-09-01",
          "isCurrentEmployment": false,
          "endDate": "2016-08-01"
        },
        {
          "name": "The Wallow Start",
          "address": {
            "addressLine1": "f",
            "addressLine2": "f",
            "town": "f",
            "county": "f",
            "postcode": "f"
          },
          "contact": "f",
          "telephone": "f",
          "email": "alex.haines123@gmail.com",
          "position": "f",
          "reasonForLeaving": "f",
          "startDate": "2015-06-01",
          "isCurrentEmployment": false,
          "endDate": "2018-10-31"
        }
      ],
      "educationToEmploymentGap": 5206,
      "employmentGaps": [],
      "employmentOverlap": [
        {
          "placesOfEmployment": [
            "Enomatic",
            "The Wallow Start"
          ],
          "startDate": "01/09/2008",
          "endDate": "31/10/2018"
        }
      ],
      "status": "COMPLETE"
    },
    "employmentGaps": {
      "employmentOverlap": [],
      "acknowledgedOverlap": "",
      "currentEmploymentToApplicationGap": null,
      "currentEmploymentToApplicationGapReason": "",
      "educationToEmploymentGap": null,
      "educationToEmploymentGapReason": "",
      "placements": [],
      "status": "INCOMPLETE"
    },
    "supportingStatement": {
      "statement": "",
      "care": "",
      "achieve": "",
      "safe": "",
      "consistent": "",
      "active": "",
      "diverse": "",
      "enjoy": "",
      "status": "INCOMPLETE"
    },
    "references": {
      "entries": [],
      "status": "INCOMPLETE"
    },
    "equalityAct": {
      "disability": "",
      "adjustments": "",
      "meetRequirements": "",
      "status": "INCOMPLETE"
    },
    "safeguarding": {
      "outsideUK": "",
      "status": "INCOMPLETE"
    },
    "convictions": {
      "declaration": "",
      "name": "",
      "surname": "",
      "date": "",
      "convictionDetail": "",
      "status": "INCOMPLETE"
    },
    "saferRecruitment": {
      "declaration": "",
      "status": "INCOMPLETE"
    },
    "consent": {
      "prescreen": "",
      "asdan": "",
      "social": "",
      "status": "INCOMPLETE"
    },
    "previewForm": {
      "status": "INCOMPLETE"
    }
  },
  "currentSection": "employmentHistory"
}
const mockOverlappingPayload = {
  "employmentRecords": [
    {
      "name": "Enomatic",
      "address": {
        "addressLine1": "f",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "alex.haines123@gmail.com",
      "position": "f",
      "reasonForLeaving": "f",
      "startDate": "2008-09-01",
      "isCurrentEmployment": false,
      "endDate": "2016-08-01"
    },
    {
      "name": "The Wallow Start",
      "address": {
        "addressLine1": "f",
        "addressLine2": "f",
        "town": "f",
        "county": "f",
        "postcode": "f"
      },
      "contact": "f",
      "telephone": "f",
      "email": "alex.haines123@gmail.com",
      "position": "f",
      "reasonForLeaving": "f",
      "startDate": "2015-06-01",
      "isCurrentEmployment": false,
      "endDate": "2018-10-31"
    }
  ]
}



const mockAddress: Address = {
  addressLine1: '',
  addressLine2: '',
  town: '',
  county: '',
  postcode: '',
}

const mockRecordsType = {
  name: '',
  address: mockAddress,
  contact: '',
  telephone: '',
  email: '',
  position: '',
  reasonForLeaving: '',
}

describe('getGapsFromGroupedRecords', () => {
  it('should return an correct array of employment gaps', () => {
    // @ts-ignore
    const res = updateEmploymentHistorySection(mockState, mockPayload);

    expect(res).toStrictEqual({
      "sections": {
        "position": {
          "position": "",
          "otherPosition": "",
          "isEducation": "",
          "location": "",
          "workingPattern": "",
          "hoursRequested": "",
          "status": "INCOMPLETE"
        },
        "availability": {
          "mon": [],
          "tue": [],
          "wed": [],
          "thu": [],
          "fri": [],
          "sat": [],
          "sun": [],
          "status": "INCOMPLETE"
        },
        "personalDetails": {
          "firstName": "",
          "lastName": "",
          "otherNames": "",
          "otherNamesDetails": [],
          "gender": "",
          "nationality": "",
          "placeOfBirth": "",
          "currentAddress": {
            "addressLine1": "",
            "addressLine2": "",
            "town": "",
            "county": "",
            "postcode": ""
          },
          "phone": "",
          "mobile": "",
          "email": "",
          "driver": "",
          "licenceType": "",
          "licenceOther": "",
          "licenceHeld": "",
          "ownTransport": "",
          "drivingEndorsements": "",
          "visaRequired": "",
          "visaExpiry": "",
          "visaType": "",
          "national_insurance_number": "",
          "related_to_employee": "",
          "related_to_employee_details": "",
          "status": "INCOMPLETE"
        },
        "educationTraining": {
          "qts": "",
          "induction": "",
          "dfeNo": "",
          "educationRecords": [
            {
              "establishment": "uea",
              "qualification": "uh",
              "startDate": "2021-02",
              "endDate": "2021-05"
            }
          ],
          "trainingRecords": [],
          "status": "COMPLETE"
        },
        "employmentHistory": {
          "employmentRecords": [
            {
              "name": "A",
              "address": {
                "addressLine1": "A",
                "addressLine2": "",
                "town": "A",
                "county": "A",
                "postcode": "A"
              },
              "contact": "A",
              "telephone": "A",
              "email": "alex.haines123@gmail.com",
              "position": "A",
              "reasonForLeaving": "A",
              "startDate": "2022-03-01",
              "isCurrentEmployment": false,
              "endDate": "2022-05-31"
            },
            {
              "name": "b",
              "address": {
                "addressLine1": "A",
                "addressLine2": "",
                "town": "A",
                "county": "A",
                "postcode": "A"
              },
              "contact": "A",
              "telephone": "A",
              "email": "alex.haines123@gmail.com",
              "position": "A",
              "reasonForLeaving": "A",
              "startDate": "2022-06-01",
              "isCurrentEmployment": false,
              "endDate": "2022-07-31"
            },
            {
              "name": "c",
              "address": {
                "addressLine1": "a",
                "addressLine2": "",
                "town": "a",
                "county": "",
                "postcode": "a"
              },
              "contact": "a",
              "telephone": "a",
              "email": "alex.haines123@gmail.com",
              "position": "a",
              "reasonForLeaving": "a",
              "startDate": "2023-01-12",
              "isCurrentEmployment": false,
              "endDate": "2023-03-28"
            },
            {
              "name": "d",
              "address": {
                "addressLine1": "f",
                "addressLine2": "f",
                "town": "f",
                "county": "f",
                "postcode": "f"
              },
              "contact": "f",
              "telephone": "f",
              "email": "alex.haines123@gmail.com",
              "position": "f",
              "reasonForLeaving": "f",
              "startDate": "2023-07-01",
              "isCurrentEmployment": false,
              "endDate": "2023-09-01"
            }
          ],
          "educationToEmploymentGap": 304,
          "employmentGaps": [
            {
              "nameA": "b",
              "nameB": "c",
              "startDate": "2022-07-31",
              "endDate": "2023-01-12",
              "gapInDays": 165
            },
            {
              "nameA": "c",
              "nameB": "d",
              "startDate": "2023-03-28",
              "endDate": "2023-07-01",
              "gapInDays": 95
            },
            {
              "nameA": "d",
              "nameB": "This Application (Today)",
              "startDate": "2023-09-01",
              "endDate": "2023-10-24",
              "gapInDays": 53
            }
          ],
          "employmentOverlap": [],
          "status": "COMPLETE"
        },
        "employmentGaps": {
          "employmentOverlap": [],
          "acknowledgedOverlap": "",
          "currentEmploymentToApplicationGap": null,
          "currentEmploymentToApplicationGapReason": "",
          "educationToEmploymentGap": null,
          "educationToEmploymentGapReason": "",
          "placements": [],
          "status": "INCOMPLETE"
        },
        "supportingStatement": {
          "statement": "",
          "care": "",
          "achieve": "",
          "safe": "",
          "consistent": "",
          "active": "",
          "diverse": "",
          "enjoy": "",
          "status": "INCOMPLETE"
        },
        "references": {
          "entries": [],
          "status": "INCOMPLETE"
        },
        "equalityAct": {
          "disability": "",
          "adjustments": "",
          "meetRequirements": "",
          "status": "INCOMPLETE"
        },
        "safeguarding": {
          "outsideUK": "",
          "status": "INCOMPLETE"
        },
        "convictions": {
          "declaration": "",
          "name": "",
          "surname": "",
          "date": "",
          "convictionDetail": "",
          "status": "INCOMPLETE"
        },
        "saferRecruitment": {
          "declaration": "",
          "status": "INCOMPLETE"
        },
        "consent": {
          "prescreen": "",
          "asdan": "",
          "social": "",
          "status": "INCOMPLETE"
        },
        "previewForm": {
          "status": "INCOMPLETE"
        }
      },
      "currentSection": "employmentHistory"
    })
  });
  it('should return a correct array of employment with large gaps', () => {
    // @ts-ignore
    const res = updateEmploymentHistorySection(mockLargeGapState, mockLargeGapPayload);

    expect(res).toStrictEqual(
      {
        "sections": {
          "position": {
            "position": "",
            "otherPosition": "",
            "isEducation": "",
            "location": "",
            "workingPattern": "",
            "hoursRequested": "",
            "status": "INCOMPLETE"
          },
          "availability": {
            "mon": [],
            "tue": [],
            "wed": [],
            "thu": [],
            "fri": [],
            "sat": [],
            "sun": [],
            "status": "INCOMPLETE"
          },
          "personalDetails": {
            "firstName": "",
            "lastName": "",
            "otherNames": "",
            "otherNamesDetails": [],
            "gender": "",
            "nationality": "",
            "placeOfBirth": "",
            "currentAddress": {
              "addressLine1": "",
              "addressLine2": "",
              "town": "",
              "county": "",
              "postcode": ""
            },
            "phone": "",
            "mobile": "",
            "email": "",
            "driver": "",
            "licenceType": "",
            "licenceOther": "",
            "licenceHeld": "",
            "ownTransport": "",
            "drivingEndorsements": "",
            "visaRequired": "",
            "visaExpiry": "",
            "visaType": "",
            "national_insurance_number": "",
            "related_to_employee": "",
            "related_to_employee_details": "",
            "status": "INCOMPLETE"
          },
          "educationTraining": {
            "qts": "",
            "induction": "",
            "dfeNo": "",
            "educationRecords": [
              {
                "establishment": "uea",
                "qualification": "BIS",
                "startDate": "2014-09",
                "endDate": "2017-07"
              }
            ],
            "trainingRecords": [
              {
                "subject": "AWS Certs",
                "qualification": "Pass",
                "startDate": "2020-09",
                "endDate": "2020-10"
              }
            ],
            "status": "COMPLETE"
          },
          "employmentHistory": {
            "employmentRecords": [
              {
                "name": "MW",
                "address": {
                  "addressLine1": "asdf",
                  "addressLine2": "f",
                  "town": "f",
                  "county": "f",
                  "postcode": "f"
                },
                "contact": "f",
                "telephone": "f",
                "email": "s@gmaill.com",
                "position": "f",
                "reasonForLeaving": "f",
                "startDate": "2022-02-21",
                "isCurrentEmployment": false,
                "endDate": "2022-10-12"
              },
              {
                "name": "Optimise Media",
                "address": {
                  "addressLine1": "d",
                  "addressLine2": "f",
                  "town": "f",
                  "county": "f",
                  "postcode": "f"
                },
                "contact": "f",
                "telephone": "f",
                "email": "ae@gmai.coilm",
                "position": "f",
                "reasonForLeaving": "f",
                "startDate": "2019-11-25",
                "isCurrentEmployment": false,
                "endDate": "2022-02-18"
              },
              {
                "name": "A",
                "address": {
                  "addressLine1": "a",
                  "addressLine2": "a",
                  "town": "a",
                  "county": "a",
                  "postcode": "a"
                },
                "contact": "a",
                "telephone": "a",
                "email": "alex.haines123@gmail.com",
                "position": "a",
                "reasonForLeaving": "a",
                "startDate": "2018-11-19",
                "isCurrentEmployment": false,
                "endDate": "2019-11-19"
              },
              {
                "name": "f",
                "address": {
                  "addressLine1": "f",
                  "addressLine2": "f",
                  "town": "f",
                  "county": "f",
                  "postcode": "f"
                },
                "contact": "f",
                "telephone": "f",
                "email": "alex.haines123@gmail.com",
                "position": "a",
                "reasonForLeaving": "a",
                "startDate": "2017-06-02",
                "isCurrentEmployment": false,
                "endDate": "2018-11-14"
              }
            ],
            "educationToEmploymentGap": null,
            "employmentGaps": [
              {
                "nameA": "MW",
                "nameB": "This Application (Today)",
                "startDate": "2022-10-12",
                "endDate": "2023-10-24",
                "gapInDays": 377
              }
            ],
            "employmentOverlap": [],
            "status": "COMPLETE"
          },
          "employmentGaps": {
            "employmentOverlap": [],
            "acknowledgedOverlap": "",
            "currentEmploymentToApplicationGap": null,
            "currentEmploymentToApplicationGapReason": "",
            "educationToEmploymentGap": null,
            "educationToEmploymentGapReason": "",
            "placements": [],
            "status": "INCOMPLETE"
          },
          "supportingStatement": {
            "statement": "",
            "care": "",
            "achieve": "",
            "safe": "",
            "consistent": "",
            "active": "",
            "diverse": "",
            "enjoy": "",
            "status": "INCOMPLETE"
          },
          "references": {
            "entries": [],
            "status": "INCOMPLETE"
          },
          "equalityAct": {
            "disability": "",
            "adjustments": "",
            "meetRequirements": "",
            "status": "INCOMPLETE"
          },
          "safeguarding": {
            "outsideUK": "",
            "status": "INCOMPLETE"
          },
          "convictions": {
            "declaration": "",
            "name": "",
            "surname": "",
            "date": "",
            "convictionDetail": "",
            "status": "INCOMPLETE"
          },
          "saferRecruitment": {
            "declaration": "",
            "status": "INCOMPLETE"
          },
          "consent": {
            "prescreen": "",
            "asdan": "",
            "social": "",
            "status": "INCOMPLETE"
          },
          "previewForm": {
            "status": "INCOMPLETE"
          }
        },
        "currentSection": "employmentHistory"
      }
    )
  });

  it.only('should return a correct array of employment with other large gaps', () => {
    // @ts-ignore
    const res = updateEmploymentHistorySection(mockOverlappingState, mockOverlappingPayload);

    expect(res).toStrictEqual(
      {
        "sections": {
          "position": {
            "position": "",
            "otherPosition": "",
            "isEducation": "",
            "location": "",
            "workingPattern": "",
            "hoursRequested": "",
            "status": "INCOMPLETE"
          },
          "availability": {
            "mon": [],
            "tue": [],
            "wed": [],
            "thu": [],
            "fri": [],
            "sat": [],
            "sun": [],
            "status": "INCOMPLETE"
          },
          "personalDetails": {
            "firstName": "",
            "lastName": "",
            "otherNames": "",
            "otherNamesDetails": [],
            "gender": "",
            "nationality": "",
            "placeOfBirth": "",
            "currentAddress": {
              "addressLine1": "",
              "addressLine2": "",
              "town": "",
              "county": "",
              "postcode": ""
            },
            "phone": "",
            "mobile": "",
            "email": "",
            "driver": "",
            "licenceType": "",
            "licenceOther": "",
            "licenceHeld": "",
            "ownTransport": "",
            "drivingEndorsements": "",
            "visaRequired": "",
            "visaExpiry": "",
            "visaType": "",
            "national_insurance_number": "",
            "related_to_employee": "",
            "related_to_employee_details": "",
            "status": "INCOMPLETE"
          },
          "educationTraining": {
            "qts": "",
            "induction": "",
            "dfeNo": "",
            "educationRecords": [
              {
                "establishment": "Weyaldn high",
                "qualification": "Do alirght",
                "startDate": "1989-01",
                "endDate": "1994-06"
              }
            ],
            "trainingRecords": [],
            "status": "COMPLETE"
          },
          "employmentHistory": {
            "employmentRecords": [
              {
                "name": "Enomatic",
                "address": {
                  "addressLine1": "f",
                  "addressLine2": "f",
                  "town": "f",
                  "county": "f",
                  "postcode": "f"
                },
                "contact": "f",
                "telephone": "f",
                "email": "alex.haines123@gmail.com",
                "position": "f",
                "reasonForLeaving": "f",
                "startDate": "2008-09-01",
                "isCurrentEmployment": false,
                "endDate": "2016-08-01"
              },
              {
                "name": "The Wallow Start",
                "address": {
                  "addressLine1": "f",
                  "addressLine2": "f",
                  "town": "f",
                  "county": "f",
                  "postcode": "f"
                },
                "contact": "f",
                "telephone": "f",
                "email": "alex.haines123@gmail.com",
                "position": "f",
                "reasonForLeaving": "f",
                "startDate": "2015-06-01",
                "isCurrentEmployment": false,
                "endDate": "2018-10-31"
              }
            ],
            "educationToEmploymentGap": 3712,
            "employmentGaps": [
              {
                "nameA": "The Wallow Start",
                "nameB": "This Application (Today)",
                "startDate": "2018-10-31",
                "endDate": "2023-10-24",
                "gapInDays": 1819
              }
            ],
            "employmentOverlap": [
              {
                "placesOfEmployment": [
                  "Enomatic",
                  "The Wallow Start"
                ],
                "startDate": "01/09/2008",
                "endDate": "31/10/2018"
              }
            ],
            "status": "COMPLETE"
          },
          "employmentGaps": {
            "employmentOverlap": [],
            "acknowledgedOverlap": "",
            "currentEmploymentToApplicationGap": null,
            "currentEmploymentToApplicationGapReason": "",
            "educationToEmploymentGap": null,
            "educationToEmploymentGapReason": "",
            "placements": [],
            "status": "INCOMPLETE"
          },
          "supportingStatement": {
            "statement": "",
            "care": "",
            "achieve": "",
            "safe": "",
            "consistent": "",
            "active": "",
            "diverse": "",
            "enjoy": "",
            "status": "INCOMPLETE"
          },
          "references": {
            "entries": [],
            "status": "INCOMPLETE"
          },
          "equalityAct": {
            "disability": "",
            "adjustments": "",
            "meetRequirements": "",
            "status": "INCOMPLETE"
          },
          "safeguarding": {
            "outsideUK": "",
            "status": "INCOMPLETE"
          },
          "convictions": {
            "declaration": "",
            "name": "",
            "surname": "",
            "date": "",
            "convictionDetail": "",
            "status": "INCOMPLETE"
          },
          "saferRecruitment": {
            "declaration": "",
            "status": "INCOMPLETE"
          },
          "consent": {
            "prescreen": "",
            "asdan": "",
            "social": "",
            "status": "INCOMPLETE"
          },
          "previewForm": {
            "status": "INCOMPLETE"
          }
        },
        "currentSection": "employmentHistory"
      })
  });

});
