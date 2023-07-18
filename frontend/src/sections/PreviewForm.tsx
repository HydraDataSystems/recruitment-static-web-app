import { Fragment, useState, ChangeEvent } from 'react';
import { PDFViewer, PDFDownloadLink, pdf, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import useFormState from "../hooks/useFormState";
import { Section, SectionRow } from '../PreviewPDF';
import { Address } from '../global';
import { createEntry } from '../service';
import { Btn, LblClass, Title, Para } from '../helpers';

const PreviewForm = () => {
  const { state, clearForm } = useFormState();

  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#FFFFFF',
    },
    pageTitleSection: {
      display: 'flex',
      flexDirection: 'row',
      marginBottom: 10,
      marginTop: 10,
    },
    pageTitle: {
      fontSize: 22,
      fontWeight: 'ultrabold',
      marginLeft: "auto",
      marginRight: "auto",
      color: '#5da2da',
      textAlign: 'center',
    },
    textBlock: {
      fontSize: 14,
      fontWeight: 'normal',
      marginLeft: "auto",
      marginRight: "auto",
      color: '#444444',
      textAlign: 'left',
      marginBottom: 5,
      marginTop: 5,
      padding: "5 10",
    },
    sectionBreak: {
      display: 'flex',
      flexDirection: 'row',
      borderBottom: '5px solid #5da2da',
    },
    singleBlock: {
      display: 'flex',
      width: '100%',
      backgroundColor: '#ffffff',
      padding: "5 10",
      borderLeft: '1px solid #5da2da',
      borderRight: '1px solid #5da2da',
      borderBottom: '1px solid #5da2da',
      whiteSpace: 'nowrap',
    }
  });

  const [cv, setCv] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmittingError, setIsSubmittingError] = useState<boolean>(false);
  const [isSubmittingSuccess, setIsSubmittingSuccess] = useState<boolean>(false);
  const [viewingPage, setViewingPage] = useState<number>(0);

  const getAddress = (address: Address) =>
    `${address.addressLine1}, ${address.addressLine2}, ${address.town}, ${address.county}, ${address.postcode}`;

  const PDFPage1 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Position">
        <SectionRow title="Position applied for">{state.sections.position.position}</SectionRow>
        <SectionRow title="Location">{state.sections.position.location}</SectionRow>
        <SectionRow title="Preferred employment type">{state.sections.position.workingPattern}</SectionRow>
        <SectionRow title="Hours requested">{state.sections.position.hoursRequested}</SectionRow>
      </Section>
      <Section title="Availability">
        <SectionRow title="Monday">{state.sections.availability.mon.join(', ')}</SectionRow>
        <SectionRow title="Tuesday">{state.sections.availability.tue.join(', ')}</SectionRow>
        <SectionRow title="Wednesday">{state.sections.availability.wed.join(', ')}</SectionRow>
        <SectionRow title="Thursday">{state.sections.availability.thu.join(', ')}</SectionRow>
        <SectionRow title="Friday">{state.sections.availability.fri.join(', ')}</SectionRow>
        <SectionRow title="Saturday">{state.sections.availability.sat.join(', ')}</SectionRow>
        <SectionRow title="Sunday">{state.sections.availability.sun.join(', ')}</SectionRow>
      </Section>
    </Page>

  const PDFPage2 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Personal Details">
        <SectionRow title="Name">{state.sections.personalDetails.firstName}</SectionRow>
        <SectionRow title="Surname">{state.sections.personalDetails.lastName}</SectionRow>
        {state.sections.personalDetails.otherNamesDetails.length > 0 && (
          <SectionRow title="Other Names">
            {state.sections.personalDetails.otherNamesDetails.map((otherName, index) => (
              <Fragment key={`other-name-${index}`}>
                <Text>{otherName.firstName} {otherName.lastName}</Text>
              </Fragment>
            ))}
          </SectionRow>
        )}
        <SectionRow title="Gender">{state.sections.personalDetails.gender}</SectionRow>
        <SectionRow title="Place of Birth">{state.sections.personalDetails.placeOfBirth}</SectionRow>
        <SectionRow title="Nationality">{state.sections.personalDetails.nationality}</SectionRow>
        <SectionRow title="Current Address">{getAddress(state.sections.personalDetails.currentAddress)}</SectionRow>
        <SectionRow title="Telephone Number">{state.sections.personalDetails.phone}</SectionRow>
        <SectionRow title="Email Address">{state.sections.personalDetails.email}</SectionRow>
        <SectionRow title="Are you a driver?">{state.sections.personalDetails.driver}</SectionRow>
        <SectionRow title="License duration">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.licenceHeld : "Not Applicable"}</SectionRow>
        <SectionRow title="License Type">{state.sections.personalDetails.licenceType ? state.sections.personalDetails.licenceType : 'Not Applicable'}</SectionRow>
        <SectionRow title="License Other">{state.sections.personalDetails.licenceOther ? state.sections.personalDetails.licenceOther : 'Not Applicable'}</SectionRow>
        <SectionRow title="Own Transport">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.ownTransport : "Not Applicable"}</SectionRow>
        <SectionRow title="Driving Endorsements">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.drivingEndorsements : "Not Applicable"}</SectionRow>
        <SectionRow title="Do you require a visa to work in the UK?">{state.sections.personalDetails.visaRequired === "YES" ? state.sections.personalDetails.visaRequired : "Not Applicable"}</SectionRow>
        <SectionRow title="What type of visa do you have?">{state.sections.personalDetails.visaType ? state.sections.personalDetails.visaType : "Not Applicable"}</SectionRow>
        <SectionRow title="National Insurance Number">{state.sections.personalDetails.national_insurance_number ? state.sections.personalDetails.national_insurance_number : "Not Applicable"}</SectionRow>
        <SectionRow title="Are you related to a Cascade employee?">{state.sections.personalDetails.related_to_employee === "YES" ? state.sections.personalDetails.related_to_employee : "Not Applicable"}</SectionRow>
        <SectionRow title="Name of related employee or service user">{state.sections.personalDetails.related_to_employee_details ? state.sections.personalDetails.related_to_employee_details : "Not Applicable"}</SectionRow>
      </Section>
    </Page>

  const PDFPage3 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      {state.sections.position.isEducation &&
      <Section title="Teaching Qualifications">
        <SectionRow title={`Do you have Qualified Teacher Status (QTS)?`}>{state.sections.educationTraining.qts}</SectionRow>
        {state.sections.educationTraining.qts === "YES" &&
          <>
          <SectionRow title={`Dfe Number`}>{state.sections.educationTraining.dfeNo}</SectionRow>
          <SectionRow title={`Have you completed your induction year?`}>{state.sections.educationTraining.induction}</SectionRow>
          </>
        }
      </Section>
      }
      <Section title="Education">
        {state.sections.educationTraining.educationRecords.length ? state.sections.educationTraining.educationRecords.map((education, index) => (
          <Fragment key={`education-${index}`}>
            <SectionRow title={`School / College / University`}>{education.establishment}</SectionRow>
            <SectionRow title={`Start Date`}>{(new Date(education.startDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`End Date`}>{(new Date(education.endDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`Qualification`}>{education.qualification}</SectionRow>
            <View style={styles.sectionBreak} />
          </Fragment>
        )) : <SectionRow title={`No education records`}>No Education Records</SectionRow>}
      </Section>

      <Section title="Training Courses Attended or Completed">
        {state.sections.educationTraining.trainingRecords.length ? state.sections.educationTraining.trainingRecords.map((training, index) => (
          <Fragment key={`training-${index}`}>
            <SectionRow title={`Subject`}>{training.subject}</SectionRow>
            <SectionRow title={`Start Date`}>{(new Date(training.startDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`End Date`}>{(new Date(training.endDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`Qualification`}>{training.qualification}</SectionRow>
            <View style={styles.sectionBreak} />
          </Fragment>
        )) : <SectionRow title={`No training records`}>No Training Records</SectionRow>}
      </Section>
    </Page>

  const PDFPage4 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Current or most recent employment">
        <SectionRow title={`Employer`}>{state.sections.employmentHistory.currentEmployment.name}</SectionRow>
        <SectionRow title={`Address`}>{getAddress(state.sections.employmentHistory.currentEmployment.address)}</SectionRow>
        <SectionRow title={`Contact Name`}>{state.sections.employmentHistory.currentEmployment.contact}</SectionRow>
        <SectionRow title={`Phone`}>{state.sections.employmentHistory.currentEmployment.telephone}</SectionRow>
        <SectionRow title={`Email`}>{state.sections.employmentHistory.currentEmployment.email}</SectionRow>
        <SectionRow title={`Start Date`}>{(new Date(state.sections.employmentHistory.currentEmployment.startDate)).toLocaleDateString()}</SectionRow>
        <SectionRow title={`End Date`}>{state.sections.employmentHistory.currentEmployment.endDate ? (new Date(state.sections.employmentHistory.currentEmployment.endDate)).toLocaleDateString() : "Not Ended"}</SectionRow>
        <SectionRow title={`Position Held`}>{state.sections.employmentHistory.currentEmployment.position}</SectionRow>
        <SectionRow title={`Reason for Leaving`}>{state.sections.employmentHistory.currentEmployment.reasonForLeaving}</SectionRow>
      </Section>
      <Section title="Employment History">
        {state.sections.employmentHistory.employmentRecords.length ? state.sections.employmentHistory.employmentRecords.map((employment, index) => (
          <Fragment key={`employment-${index}`}>
            <SectionRow title={`Employer`}>{employment.name}</SectionRow>
            <SectionRow title={`Address`}>{getAddress(employment.address)}</SectionRow>
            <SectionRow title={`Contact Name`}>{employment.contact}</SectionRow>
            <SectionRow title={`Phone`}>{employment.telephone}</SectionRow>
            <SectionRow title={`Email`}>{employment.email}</SectionRow>
            <SectionRow title={`Start Date`}>{(new Date(employment.startDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`End Date`}>{(new Date(employment.endDate)).toLocaleDateString()}</SectionRow>
            <SectionRow title={`Position Held`}>{employment.position}</SectionRow>
            <SectionRow title={`Reason for Leaving`}>{employment.reasonForLeaving}</SectionRow>
            <View style={styles.sectionBreak} />
          </Fragment>
        )) : <SectionRow title={`No employment records`}>No Employment Records</SectionRow>}
      </Section>
    </Page>

  const PDFPage5 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>

      <Section title="Employment Overlap">
        <>
          {state.sections.employmentGaps.employmentOverlap.length ? state.sections.employmentGaps.employmentOverlap.map((overlap, index) => (
            <Fragment key={`overlap-${index}`}>
              <SectionRow title={`From ${overlap.startDate} to ${overlap.endDate} there was overlap in your employment at these locations.`}>{overlap.placesOfEmployment.join(", ")}</SectionRow>
            </Fragment>
          )) : <SectionRow title={`No employment overlap`}>No Employment Overlap</SectionRow>}
          {state.sections.employmentGaps.employmentOverlap && (
            <SectionRow title={`I acknowledge that I have indicated that I have overlapping employment.`}>{state.sections.employmentGaps.acknowledgedOverlap}</SectionRow>
          )}
        </>
      </Section>

      <Section title="Employment Gaps">
        {state.sections.employmentGaps.placements.length ? state.sections.employmentGaps.placements.map((placement, index) => (
          <Fragment key={`placement-${index}`}>
            <SectionRow title={`Between leaving ${placement.leaving} and starting at ${placement.arriving} there was a gap of ${placement.duration} days. Please explain why?`}>{placement.reason}</SectionRow>
          </Fragment>
        )) : <SectionRow title={`No employment gaps`}>No Employment Gaps</SectionRow>}
      </Section>
      
      <Section title="Current Employment to Application Gap">
        {state.sections.employmentGaps.currentEmploymentToApplicationGap && state.sections.employmentGaps.currentEmploymentToApplicationGap > 0 && (
          <SectionRow title={`Between leaving your current employment and applying for this job there is a gap of ${state.sections.employmentGaps.currentEmploymentToApplicationGap} days. Please explain why?`}>{state.sections.employmentGaps.currentEmploymentToApplicationGapReason}</SectionRow>
        )}
      </Section>
    </Page>

  const PDFPage6 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Supporting Statement">
        <Text style={styles.singleBlock}>{state.sections.supportingStatement.statement}</Text>
      </Section>

      <Section title="Supporting Cascade Values">
        <SectionRow title={`Care for & respect yourself, your peers & the environment.`}>{state.sections.supportingStatement.care}</SectionRow>
        <SectionRow title={`Achieve beyond previous expectations & compete for equality.`}>{state.sections.supportingStatement.achieve}</SectionRow>
        <SectionRow title={`Safe. Keep everyone safe, take positive & appropriate risks.`}>{state.sections.supportingStatement.safe}</SectionRow>
        <SectionRow title={`Consistent. Establish clear channels of communication to enable consistency.`}>{state.sections.supportingStatement.consistent}</SectionRow>
        <SectionRow title={`Active. Be active & have a healthy approach to everything we do.`}>{state.sections.supportingStatement.active}</SectionRow>
        <SectionRow title={`Diverse. Embrace uniqueness & engage in the diversity of British values.`}>{state.sections.supportingStatement.diverse}</SectionRow>
        <SectionRow title={`Enjoy living, learning & challenging ourselves.`}>{state.sections.supportingStatement.enjoy}</SectionRow>
      </Section>
    </Page>

  const PDFPage7 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="References">
        {state.sections.references.entries.map((entry, index) => (
          <Fragment key={`reference-${index}`}>
            {entry.referenceType === "CHARACTER" && (
              <Section title="Character Reference">
                <SectionRow title={`Name`}>{entry.reference.name}</SectionRow>
                <SectionRow title={`Relationship`}>{entry.reference.relationship}</SectionRow>
                <SectionRow title={`Address`}>{getAddress(entry.reference.address)}</SectionRow>
                <SectionRow title={`Contact Number`}>{entry.reference.phone}</SectionRow>
                <SectionRow title={`Email`}>{entry.reference.email}</SectionRow>
              </Section>
            )}
            {entry.referenceType === "PROFESSIONAL" && (
              <Section title="Professional Reference">
                <SectionRow title={`Position`}>{entry.reference.jobTitle}</SectionRow>
                <SectionRow title={`Name`}>{entry.reference.name}</SectionRow>
                <SectionRow title={`Capacity in which known`}>{entry.reference.capacity}</SectionRow>
                <SectionRow title={`Address`}>{getAddress(entry.reference.address)}</SectionRow>
                <SectionRow title={`Contact Number`}>{entry.reference.phone}</SectionRow>
                <SectionRow title={`Email`}>{entry.reference.email}</SectionRow>
              </Section>
            )}
          </Fragment>
        ))}
      </Section>
    </Page>

  const PDFPage8 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Equality Act 2010">
        <SectionRow title={`Do you consider that you have a disability as defined by the Equality Act 2010?`}>{state.sections.equalityAct.disability}</SectionRow>
        <SectionRow title={`I may require reasonable adjustments to be implemented.`}>{state.sections.equalityAct.adjustments}</SectionRow>
        <SectionRow title={`If I have indicated yes above and I am offered the job, I give my consent for my managers to be advised that I would like a meeting to be arranged to discuss adjustments with me in more detail.`}>{state.sections.equalityAct.meetRequirements}</SectionRow>
      </Section>
    </Page>

  const PDFPage9 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Cascade Application Form</Text>
      </View>
      <Section title="Overseas Checks">
        <SectionRow title={`In the last 10 years have you spent over a year, either in one stay or cumulatively (e.g. one month or week every so often, amounting to a year in total) outside of the UK?`}>
          {state.sections.safeguarding.outsideUK}
        </SectionRow>
      </Section>
    </Page>

  const PDFPage10 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Convictions</Text>
      </View>
      <Section title="Convictions">
        <SectionRow title={`Do you have any convictions or cautions (excluding youth cautions, reprimands or warnings) that are not ‘protected’ as defined by the Ministry of Justice?`}>
          {state.sections.convictions.declaration}
        </SectionRow>
        {state.sections.convictions.declaration === "YES" && (
          <>
            <SectionRow title="Name">{state.sections.convictions.name}</SectionRow>
            <SectionRow title="Surname">{state.sections.convictions.surname}</SectionRow>
            <SectionRow title="Date">{(new Date(state.sections.convictions.date)).toLocaleDateString()}</SectionRow>
            <SectionRow title="Details or conviction information">{state.sections.convictions.convictionDetail}</SectionRow>
          </>
        )}
      </Section>
    </Page>

  const PDFPage11 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Safer Recruitment</Text>
      </View>
      <Section title="Safer Recruitment">
        <Text style={styles.textBlock}>I certify that I am not disqualified from working with children or subject to sanctions imposed by a regulatory body which would restrict me from applying for this post.</Text>
      </Section>
      <Section title="Privacy">
        <Text style={styles.textBlock}>Cascade  will only collect data for specified, explicit and legitimate use in relation to the recruitment process. By signing this application form you consent to Cascade  holding the information contained within this application form. If successfully shortlisted, data will also include shortlisting scoring  and interview records. We would like to keep this data until the vacancy is filled. (We cannot estimate the exact time period, but we will consider this period over when a candidate accepts our job offer for the position for which we are considering you). When that period is over, we will either delete your data or inform you that we would like to keep it in our database for future roles. We have privacy policies that you can request for further information. Please be assured your data will be securely stored by the Recruitment Manager and only used for the purposes of recruiting for this vacant post. You have a right for your data to be forgotten, to rectify or access data, to restrict processing, to withdraw  consent and to be kept informed about the processing of your data. If you would like to discuss this further or withdraw your consent at any time please contact the Recruitment Manager or Data Protection Officer.</Text>
      </Section>
      <Section title="Declaration">
        <Text style={styles.textBlock}>The information in this application form is true and complete. I agree that any deliberate omission, falsification or misrepresentation in the application form will be grounds for rejecting this application or subsequent dismissal if employed by Cascade. Where applicable, I consent that Cascade  can seek clarification regarding professional registration details.</Text>

        <SectionRow title="I have read and understood the above content and declaration">
          {state.sections.saferRecruitment.declaration}
        </SectionRow>
      </Section>
    </Page>

  const PDFPage12 = () =>
    <Page size="A4" style={styles.page}>
      <View style={styles.pageTitleSection}>
        <Text style={styles.pageTitle}>Social Media and Consent</Text>
      </View>
      <Section title="Social Media and Consent">
        <SectionRow title="Pre-screen of Social Media">{state.sections.consent.prescreen === "YES" ? "Yes" : "No"}</SectionRow>
        <SectionRow title="ASDAN">{state.sections.consent.asdan === "YES" ? "Yes" : "No"}</SectionRow>
        <SectionRow title="Social Media (Twitter, Facebook)">{state.sections.consent.social === "YES" ? "Yes" : "No"}</SectionRow>
      </Section>
    </Page>

  const PDFPages = [PDFPage1, PDFPage2, PDFPage3, PDFPage4, PDFPage5, PDFPage6, PDFPage7, PDFPage8, PDFPage9, PDFPage10, PDFPage11, PDFPage12];

  const renderDoc = () => (
    <Document>
      {PDFPages.map((Page, index) => (
        <Fragment key={`page-${index}`}>
          {index === viewingPage && (
            <Page />
          )}
        </Fragment>
      ))}
    </Document>
  );
  
  const saveDoc = () => (
    <Document>
      <PDFPage1 />
      <PDFPage2 />
      <PDFPage3 />
      <PDFPage4 />
      <PDFPage5 />
      <PDFPage6 />
      <PDFPage7 />
      <PDFPage8 />
      <PDFPage9 />
      <PDFPage10 />
      <PDFPage11 />
      <PDFPage12 />
    </Document>
  );

  const submitApplication = async () => {
    // if (!cv) {
    //   setNoCv(true);
    //   window.scrollTo(0, 0);
    //   return;
    // } else {
    //   setNoCv(false);
    // }

    setIsSubmitting(true);
    const subjectPDF = pdf(saveDoc());
    const blob = await subjectPDF.toBlob();
    const file = new File([blob], `${state.sections.personalDetails.firstName}-${state.sections.personalDetails.lastName}-application.pdf`, { lastModified: (new Date()).getTime() });

    const response = await createEntry(state, file, cv);

    if (response !== "SUCCESS") {
      setIsSubmittingError(true);
      window.scrollTo(0, 0);
    } else {
      setIsSubmittingError(false);
      setIsSubmittingSuccess(true);
      clearForm();
      window.scrollTo(0, 0);
    }

    setIsSubmitting(false);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    setCv(file);
  }


  return (
    <>
      {isSubmitting && (
        <>
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="inline-block">
                <div
                  className="h-12 w-12 animate-spin ml-auto mr-auto mb-2 rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                  role="status">
                </div>
                <span className="text-white font-bold text-lg">Submitting Application...</span>
              </div>
            </div>
          </div>
        </>
      )}
      
      {isSubmittingError && (
        <>
          <div className="space-y-12">
            <div>
              <h2 className={Title}>Error Submitting Application</h2>
              <p className={`${Para} text-red-600`}>There was an error submitting your application.</p>
              <p className={Para}>
                Please download the application form and email your submission
                along with your CV to: <a href="mailto:recruitment@cascade-care.com">recruitment@cascade-care.com</a>
              </p>
            </div>
            <div>
              <PDFDownloadLink
                className={`${Btn}`} 
                document={saveDoc()} fileName={`${state.sections.personalDetails.firstName}-${state.sections.personalDetails.lastName}-application.pdf`}>Download</PDFDownloadLink>
            </div>
          </div>
        </>
      )}

      {isSubmittingSuccess && (
        <>
          <div className="space-y-12">
            <div>
              <h2 className={Title}>Application Submitted</h2>
              <p className={Para}>
                Thank you for submitting your application. We will be in touch shortly.
              </p>
            </div>
          </div>
        </>
      )}

      {!isSubmittingError && !isSubmittingSuccess && (
        <div className='space-y-6'>

          <div>
            <h2 className={Title}>Preview and Submit Your Application</h2>
          </div>


          <div>
            <label
              htmlFor="cv"
              className={LblClass}>Your CV</label>
            <input
              id="cv"
              accept="application/pdf,application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/gif, image/jpeg"
              className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-indigo-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:text-white file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-indigo-600 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-indigo-500 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none"
              type="file" onChange={handleFileChange} />
          </div>
          <div className="flex justify-between items-center">
            <button
              disabled={viewingPage === 0}
              className={`${Btn} disabled:bg-slate-200 disabled:cursor-not-allowed`}
              onClick={() => {
                if(viewingPage > 0) setViewingPage(viewingPage - 1);
              }}>Prev</button>
              <span className="text-sm text-gray-500 font-bold">{viewingPage + 1} of {PDFPages.length}</span>
            <button
              disabled={viewingPage === PDFPages.length - 1}
              className={`${Btn} disabled:bg-slate-200 disabled:cursor-not-allowed`}
              onClick={() => {
                if(viewingPage < PDFPages.length - 1) setViewingPage(viewingPage + 1);
              }}>Next</button>
          </div>
          <PDFViewer
            showToolbar={false}
            width={`100%`}
            height={`1000px`}>
            {renderDoc()}
          </PDFViewer>
          
          <div className="flex justify-end sm:justify-normal">
            <button
              className={`${Btn}`}
              onClick={() => submitApplication()}>Submit Your Application</button>
          </div>
        </div>
      )}
    </>
  );
}

export default PreviewForm;