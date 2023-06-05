import { Fragment, useState, ChangeEvent } from 'react';
import { PDFViewer, pdf, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { useStateMachine } from 'little-state-machine';
import { Section, SectionRow } from '../PreviewPDF';
import { Address } from '../global';
import { createEntry } from '../service';

const PreviewForm = () => {
  const { state } = useStateMachine();

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

  const getAddress = (address: Address) => 
    `${address.addressLine1}, ${address.addressLine2}, ${address.town}, ${address.county}, ${address.postcode}`;

  const renderDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="Position">
          <SectionRow title="Position applied for">{state.sections.position.position}</SectionRow>
          <SectionRow title="Location">{state.sections.position.location}</SectionRow>
          <SectionRow title="Preferred employment type">{state.sections.position.workingPattern}</SectionRow>
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
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="Personal Details">
          <SectionRow title="Name">{state.sections.personalDetails.firstName}</SectionRow>
          <SectionRow title="Surname">{state.sections.personalDetails.lastName}</SectionRow>
          <SectionRow title="Maiden Name">{state.sections.personalDetails.maidenName}</SectionRow>
          <SectionRow title="Previous Name(s)">{state.sections.personalDetails.previousNames}</SectionRow>
          <SectionRow title="Gender">{state.sections.personalDetails.gender}</SectionRow>
          <SectionRow title="Place of Birth">{state.sections.personalDetails.placeOfBirth}</SectionRow>
          <SectionRow title="Nationality">{state.sections.personalDetails.nationality}</SectionRow>
          <SectionRow title="Current Address">{getAddress(state.sections.personalDetails.currentAddress)}</SectionRow>
          <SectionRow title="Telephone Number">{state.sections.personalDetails.phone}</SectionRow>
          <SectionRow title="Mobile Number">{state.sections.personalDetails.mobile}</SectionRow>
          <SectionRow title="Email Address">{state.sections.personalDetails.email}</SectionRow>
          <SectionRow title="Are you a driver?">{state.sections.personalDetails.driver}</SectionRow>
          <SectionRow title="License duration">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.licenceHeld : "Not Applicable"}</SectionRow>
          <SectionRow title="Own Transport">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.ownTransport : "Not Applicable"}</SectionRow>
          <SectionRow title="Driving Endorsements">{state.sections.personalDetails.driver === "YES" ? state.sections.personalDetails.drivingEndorsements : "Not Applicable"}</SectionRow>
          <SectionRow title="UK, EC or EEA national?">{state.sections.personalDetails.uk_ec_eea_resident}</SectionRow>
          <SectionRow title="Immigration Status">{state.sections.personalDetails.uk_ec_eea_resident === "NO" ? state.sections.personalDetails.immigration_status : "Not Applicable"}</SectionRow>
          <SectionRow title="Visa Number">{state.sections.personalDetails.uk_ec_eea_resident === "NO" ? state.sections.personalDetails.visa_number : "Not Applicable"}</SectionRow>
          <SectionRow title="Related to a Cascade employee?">{state.sections.personalDetails.related_to_employee}</SectionRow>
          <SectionRow title="Equality Act 2010, According to the definition of disability do you consider yourself to have a disability?">{state.sections.personalDetails.disability}</SectionRow>
        </Section>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="Education">
          {state.sections.educationTraining.educationRecords.length ? state.sections.educationTraining.educationRecords.map((education, index) => (
            <Fragment key={`education-${index}`}>
              <SectionRow title={`School / College / University`}>{education.establishment}</SectionRow>
              <SectionRow title={`Start Date`}>{(new Date(education.startDate)).toLocaleDateString()}</SectionRow>
              <SectionRow title={`End Date`}>{(new Date(education.endDate)).toLocaleDateString()}</SectionRow>
              <SectionRow title={`Qualification`}>{education.qualification}</SectionRow>
              <View style={styles.sectionBreak} />
            </Fragment>
          )) : <SectionRow title={`No education records`}>No Education Records</SectionRow> }
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
          )) : <SectionRow title={`No training records`}>No Training Records</SectionRow> }
        </Section>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
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
          )) : <SectionRow title={`No employment records`}>No Employment Records</SectionRow> }
        </Section>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="Employment Gaps">
          {state.sections.employmentGaps.placements.length ? state.sections.employmentGaps.placements.map((placement, index) => (
            <Fragment key={`placement-${index}`}>
              <SectionRow title={`Between leaving ${placement.leaving} and starting at ${placement.arriving} there was a gap of ${placement.duration} days. Please explain why?`}>{placement.reason}</SectionRow>
            </Fragment>
          )) : <SectionRow title={`No employment gaps`}>No Employment Gaps</SectionRow> }
        </Section>
      </Page>
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
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="References" />
        <Section title="Current or Most Recent Employer">
          <SectionRow title={`Position`}>{state.sections.references.currentOrMostRecentEmployer.jobTitle}</SectionRow>
          <SectionRow title={`Name`}>{state.sections.references.currentOrMostRecentEmployer.name}</SectionRow>
          <SectionRow title={`Capacity in which known`}>{state.sections.references.currentOrMostRecentEmployer.capacity}</SectionRow>
          <SectionRow title={`Address`}>{getAddress(state.sections.references.currentOrMostRecentEmployer.address)}</SectionRow>
          <SectionRow title={`Contact Number`}>{state.sections.references.currentOrMostRecentEmployer.phone}</SectionRow>
          <SectionRow title={`Email`}>{state.sections.references.currentOrMostRecentEmployer.email}</SectionRow>
        </Section>
        <Section title="Previous Employer">
          <SectionRow title={`Position`}>{state.sections.references.previousEmployer.jobTitle}</SectionRow>
          <SectionRow title={`Name`}>{state.sections.references.previousEmployer.name}</SectionRow>
          <SectionRow title={`Capacity in which known`}>{state.sections.references.previousEmployer.capacity}</SectionRow>
          <SectionRow title={`Address`}>{getAddress(state.sections.references.previousEmployer.address)}</SectionRow>
          <SectionRow title={`Contact Number`}>{state.sections.references.previousEmployer.phone}</SectionRow>
          <SectionRow title={`Email`}>{state.sections.references.previousEmployer.email}</SectionRow>
        </Section>
        <Section title="Character Reference">
          <SectionRow title={`Name`}>{state.sections.references.characterReference.name}</SectionRow>
          <SectionRow title={`Relationship`}>{state.sections.references.characterReference.relationship}</SectionRow>
          <SectionRow title={`Address`}>{getAddress(state.sections.references.characterReference.address)}</SectionRow>
          <SectionRow title={`Contact Number`}>{state.sections.references.characterReference.phone}</SectionRow>
          <SectionRow title={`Email`}>{state.sections.references.characterReference.email}</SectionRow>
        </Section>
        {state.sections.references.characterReference2.name &&
          <Section title="Additional Character Reference">
            <SectionRow title={`Name`}>{state.sections.references.characterReference2.name}</SectionRow>
            <SectionRow title={`Relationship`}>{state.sections.references.characterReference2.relationship}</SectionRow>
            <SectionRow title={`Address`}>{getAddress(state.sections.references.characterReference2.address)}</SectionRow>
            <SectionRow title={`Contact Number`}>{state.sections.references.characterReference2.phone}</SectionRow>
            <SectionRow title={`Email`}>{state.sections.references.characterReference2.email}</SectionRow>
          </Section>
        }
      </Page> 
      <Page size="A4" style={styles.page}>
        <View style={styles.pageTitleSection}>
          <Text style={styles.pageTitle}>Cascade Application Form</Text>
        </View>
        <Section title="Safeguarding">
          <SectionRow title={`Are you currently bound over or do you have any current UNSPENT convictions that have been issued by a Court or Court-Martial in the United Kingdom or in any other country?`}>{state.sections.safeguarding.convictions}</SectionRow>
          <SectionRow title={`Do you have any current UNSPENT police cautions, reprimands or final warnings in the United Kingdom or in any other country?`}>{state.sections.safeguarding.cautions}</SectionRow>
          <SectionRow title={`I am happy for a pre-screen check on any social media platforms I hold to be carried out.`}>{state.sections.safeguarding.preScreening}</SectionRow> 
        </Section>
      </Page>
    </Document>
  );

  const submitApplication = async () => {
    const subjectPDF = pdf(renderDoc());
    const blob = await subjectPDF.toBlob();
    const file = new File([blob], `${state.sections.personalDetails.firstName}-${state.sections.personalDetails.lastName}-application.pdf`, {lastModified: (new Date()).getTime()});
    
    createEntry(state, file, cv);
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setCv(file);
  }


  return (
    <>
      <input type="file" onChange={handleFileChange} />
      <button onClick={() => submitApplication()}>Submit Your Application</button>
      <PDFViewer width={`100%`} height={`1000px`}>
        {renderDoc()}
      </PDFViewer>
    </>
  );
}

export default PreviewForm;