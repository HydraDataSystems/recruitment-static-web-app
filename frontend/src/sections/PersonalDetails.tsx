import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useFormState from '../hooks/useFormState';
import { PersonalDetails } from '../global';

import { 
  Title,
  Subtitle,
  LblClass, 
  SelectClass, 
  SelectClassError, 
  InputContainerClass, 
  InputClass, 
  InputClassError,
  InputErrorMsgClass,
  Btn,
  Para
 } from '../helpers';

const PersonalDetailsComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections: { personalDetails} } = state;
  
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful },
    setValue, 
    watch 
  } = useForm({
    defaultValues: {
      ...personalDetails,
      otherNamesDetails: personalDetails.otherNamesDetails?.length > 0 ? personalDetails.otherNamesDetails : [{ firstName: '', lastName: '' }]
    }
  });

  const { fields: otherNames, remove: removeOtherNames, append: appendOtherNames } = useFieldArray({
    control,
    name: "otherNamesDetails"
  });

  const onSubmit = handleSubmit((data) => { 
    updateSection(data as PersonalDetails);
  });

  useEffect(() => { 
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  const isDriver = watch('driver');
  const isOtherLicence = watch('licenceType');
  const hasMoreNames = watch('otherNames');
  const isVisaRequired = watch('visaRequired');
  const relatedToEmployee = watch('related_to_employee');

  return (
    <form className='space-y-12' onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Personal Details</h2>
        <p className={Para}>To facilitate a smooth application process, please provide the requested information about yourself.</p>
      </div>

      <div className='space-y-6'>
      <div>
        <label
          htmlFor='firstName'
          className={LblClass}
        >
          First Name
        </label>
        <div className={InputContainerClass}>
          <input
            type="text"
            className={errors.firstName ? InputClassError : InputClass}
            {...register('firstName', { required: true })} />
        </div>
        {errors.firstName && <p className={InputErrorMsgClass}>First Name is required</p>}
      </div>

      <div>
        <label
          htmlFor='lastName'
          className={LblClass}
        >
          Last Name
        </label>
        <div className={InputContainerClass}>
          <input
            type="text"
            className={errors.lastName ? InputClassError : InputClass}
            {...register('lastName', { required: true })} />
        </div>
        {errors.lastName && <p className={InputErrorMsgClass}>Last Name is required</p>}
      </div>

      <div>
        <label
          htmlFor='otherNames'
          className={LblClass}>Have you ever used any other names?</label>
        <div className={InputContainerClass}>
          <select
            defaultValue={personalDetails.otherNames}
            className={errors.otherNames ? SelectClassError : SelectClass}
            {...register('otherNames', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </div>
        {errors.otherNames && <p className={InputErrorMsgClass}>Other Names is required</p>}
      </div>

      {hasMoreNames === "YES" && (
        <div>
          <h2 className='text-sm font-medium my-2'>Additional Names</h2>
          {otherNames.map((item, index) => (
            <div
              className='p-2 border border-gray-200 bg-gray-100 rounded relative' 
              key={index}>
              {(index > 0) && <button
                className={`${Btn} my-0 bg-red-600 hover:bg-red-500 top-0 right-0 absolute`}
                type='button'
                onClick={() => removeOtherNames(index)}>X</button>}
              <div className='my-2'>
                <label
                  htmlFor={`otherNamesDetails.${index}.firstName`}
                  className={LblClass}>
                  First Name(s)
                </label>
                <div className={InputContainerClass}>
                  <input
                    type="text"
                    className={errors.otherNamesDetails && errors.otherNamesDetails[index] && errors.otherNamesDetails[index]?.firstName ? InputClassError : InputClass}
                    {...register(`otherNamesDetails.${index}.firstName`)} />
                </div>
                {errors.otherNamesDetails && errors.otherNamesDetails[index] && errors.otherNamesDetails[index]?.firstName && <p className={InputErrorMsgClass}>First Name is required</p>}
              </div>
              <div className='my-2'>
                <label
                  htmlFor={`otherNamesDetails.${index}.lastName`}
                  className={LblClass}>
                  Last Name
                </label>
                <div className={InputContainerClass}>
                  <input
                    type="text"
                    className={errors.otherNamesDetails && errors.otherNamesDetails[index] && errors.otherNamesDetails[index]?.lastName ? InputClassError : InputClass}
                    {...register(`otherNamesDetails.${index}.lastName`, { required: true })} />
                </div>
                {errors.otherNamesDetails && errors.otherNamesDetails[index] && errors.otherNamesDetails[index]?.lastName && <p className={InputErrorMsgClass}>Last Name is required</p>}
              </div>
            </div>
          ))}
          <button
            className={Btn}
            type='button'
            onClick={() => appendOtherNames({ firstName: '', lastName: '' })}>Add Name</button>
        </div>
      )}

      <div>
        <label
          htmlFor='gender'
          className={LblClass}>
          Gender
        </label>
        <div className={InputContainerClass}>
          <select
            className={errors.gender ? SelectClassError : SelectClass}
            {...register('gender', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-Binary">Non-Binary</option>
              <option value="Prefer not to say">Prefer not to say</option>
          </select>
        </div>
        {errors.gender && <p className={InputErrorMsgClass}>Gender is required</p>}
      </div>

      <div>
        <label
          htmlFor='placeOfBirth'
          className={LblClass}
        >
          Place of Birth
        </label>
        <div className={InputContainerClass}>
          <input
            type="text"
            className={errors.placeOfBirth ? InputClassError : InputClass}
            {...register('placeOfBirth', { required: true })} />
        </div>
        {errors.placeOfBirth && <p className={InputErrorMsgClass}>Place of Birth is required</p>}
      </div>

      <div>
        <label
          htmlFor='nationality'
          className={LblClass}
        >
          Nationality
        </label>
        <div className={InputContainerClass}>
          <select
            className={errors.nationality ? SelectClassError : SelectClass}
            {...register('nationality', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="british">British</option>
              <option value="afghan">Afghan</option>
              <option value="albanian">Albanian</option>
              <option value="algerian">Algerian</option>
              <option value="american">American</option>
              <option value="andorran">Andorran</option>
              <option value="angolan">Angolan</option>
              <option value="antiguans">Antiguans</option>
              <option value="argentinean">Argentinean</option>
              <option value="armenian">Armenian</option>
              <option value="australian">Australian</option>
              <option value="austrian">Austrian</option>
              <option value="azerbaijani">Azerbaijani</option>
              <option value="bahamian">Bahamian</option>
              <option value="bahraini">Bahraini</option>
              <option value="bangladeshi">Bangladeshi</option>
              <option value="barbadian">Barbadian</option>
              <option value="barbudans">Barbudans</option>
              <option value="batswana">Batswana</option>
              <option value="belarusian">Belarusian</option>
              <option value="belgian">Belgian</option>
              <option value="belizean">Belizean</option>
              <option value="beninese">Beninese</option>
              <option value="bhutanese">Bhutanese</option>
              <option value="bolivian">Bolivian</option>
              <option value="bosnian">Bosnian</option>
              <option value="brazilian">Brazilian</option>
              <option value="bruneian">Bruneian</option>
              <option value="bulgarian">Bulgarian</option>
              <option value="burkinabe">Burkinabe</option>
              <option value="burmese">Burmese</option>
              <option value="burundian">Burundian</option>
              <option value="cambodian">Cambodian</option>
              <option value="cameroonian">Cameroonian</option>
              <option value="canadian">Canadian</option>
              <option value="cape verdean">Cape Verdean</option>
              <option value="central african">Central African</option>
              <option value="chadian">Chadian</option>
              <option value="chilean">Chilean</option>
              <option value="chinese">Chinese</option>
              <option value="colombian">Colombian</option>
              <option value="comoran">Comoran</option>
              <option value="congolese">Congolese</option>
              <option value="costa rican">Costa Rican</option>
              <option value="croatian">Croatian</option>
              <option value="cuban">Cuban</option>
              <option value="cypriot">Cypriot</option>
              <option value="czech">Czech</option>
              <option value="danish">Danish</option>
              <option value="djibouti">Djibouti</option>
              <option value="dominican">Dominican</option>
              <option value="dutch">Dutch</option>
              <option value="east timorese">East Timorese</option>
              <option value="ecuadorean">Ecuadorean</option>
              <option value="egyptian">Egyptian</option>
              <option value="emirian">Emirian</option>
              <option value="equatorial guinean">Equatorial Guinean</option>
              <option value="eritrean">Eritrean</option>
              <option value="estonian">Estonian</option>
              <option value="ethiopian">Ethiopian</option>
              <option value="fijian">Fijian</option>
              <option value="filipino">Filipino</option>
              <option value="finnish">Finnish</option>
              <option value="french">French</option>
              <option value="gabonese">Gabonese</option>
              <option value="gambian">Gambian</option>
              <option value="georgian">Georgian</option>
              <option value="german">German</option>
              <option value="ghanaian">Ghanaian</option>
              <option value="greek">Greek</option>
              <option value="grenadian">Grenadian</option>
              <option value="guatemalan">Guatemalan</option>
              <option value="guinea-bissauan">Guinea-Bissauan</option>
              <option value="guinean">Guinean</option>
              <option value="guyanese">Guyanese</option>
              <option value="haitian">Haitian</option>
              <option value="herzegovinian">Herzegovinian</option>
              <option value="honduran">Honduran</option>
              <option value="hungarian">Hungarian</option>
              <option value="icelander">Icelander</option>
              <option value="indian">Indian</option>
              <option value="indonesian">Indonesian</option>
              <option value="iranian">Iranian</option>
              <option value="iraqi">Iraqi</option>
              <option value="irish">Irish</option>
              <option value="israeli">Israeli</option>
              <option value="italian">Italian</option>
              <option value="ivorian">Ivorian</option>
              <option value="jamaican">Jamaican</option>
              <option value="japanese">Japanese</option>
              <option value="jordanian">Jordanian</option>
              <option value="kazakhstani">Kazakhstani</option>
              <option value="kenyan">Kenyan</option>
              <option value="kittian and nevisian">Kittian and Nevisian</option>
              <option value="kuwaiti">Kuwaiti</option>
              <option value="kyrgyz">Kyrgyz</option>
              <option value="laotian">Laotian</option>
              <option value="latvian">Latvian</option>
              <option value="lebanese">Lebanese</option>
              <option value="liberian">Liberian</option>
              <option value="libyan">Libyan</option>
              <option value="liechtensteiner">Liechtensteiner</option>
              <option value="lithuanian">Lithuanian</option>
              <option value="luxembourger">Luxembourger</option>
              <option value="macedonian">Macedonian</option>
              <option value="malagasy">Malagasy</option>
              <option value="malawian">Malawian</option>
              <option value="malaysian">Malaysian</option>
              <option value="maldivan">Maldivan</option>
              <option value="malian">Malian</option>
              <option value="maltese">Maltese</option>
              <option value="marshallese">Marshallese</option>
              <option value="mauritanian">Mauritanian</option>
              <option value="mauritian">Mauritian</option>
              <option value="mexican">Mexican</option>
              <option value="micronesian">Micronesian</option>
              <option value="moldovan">Moldovan</option>
              <option value="monacan">Monacan</option>
              <option value="mongolian">Mongolian</option>
              <option value="moroccan">Moroccan</option>
              <option value="mosotho">Mosotho</option>
              <option value="motswana">Motswana</option>
              <option value="mozambican">Mozambican</option>
              <option value="namibian">Namibian</option>
              <option value="nauruan">Nauruan</option>
              <option value="nepalese">Nepalese</option>
              <option value="new zealander">New Zealander</option>
              <option value="ni-vanuatu">Ni-Vanuatu</option>
              <option value="nicaraguan">Nicaraguan</option>
              <option value="nigerien">Nigerien</option>
              <option value="north korean">North Korean</option>
              <option value="northern irish">Northern Irish</option>
              <option value="norwegian">Norwegian</option>
              <option value="omani">Omani</option>
              <option value="pakistani">Pakistani</option>
              <option value="palauan">Palauan</option>
              <option value="panamanian">Panamanian</option>
              <option value="papua new guinean">Papua New Guinean</option>
              <option value="paraguayan">Paraguayan</option>
              <option value="peruvian">Peruvian</option>
              <option value="polish">Polish</option>
              <option value="portuguese">Portuguese</option>
              <option value="qatari">Qatari</option>
              <option value="romanian">Romanian</option>
              <option value="russian">Russian</option>
              <option value="rwandan">Rwandan</option>
              <option value="saint lucian">Saint Lucian</option>
              <option value="salvadoran">Salvadoran</option>
              <option value="samoan">Samoan</option>
              <option value="san marinese">San Marinese</option>
              <option value="sao tomean">Sao Tomean</option>
              <option value="saudi">Saudi</option>
              <option value="scottish">Scottish</option>
              <option value="senegalese">Senegalese</option>
              <option value="serbian">Serbian</option>
              <option value="seychellois">Seychellois</option>
              <option value="sierra leonean">Sierra Leonean</option>
              <option value="singaporean">Singaporean</option>
              <option value="slovakian">Slovakian</option>
              <option value="slovenian">Slovenian</option>
              <option value="solomon islander">Solomon Islander</option>
              <option value="somali">Somali</option>
              <option value="south african">South African</option>
              <option value="south korean">South Korean</option>
              <option value="spanish">Spanish</option>
              <option value="sri lankan">Sri Lankan</option>
              <option value="sudanese">Sudanese</option>
              <option value="surinamer">Surinamer</option>
              <option value="swazi">Swazi</option>
              <option value="swedish">Swedish</option>
              <option value="swiss">Swiss</option>
              <option value="syrian">Syrian</option>
              <option value="taiwanese">Taiwanese</option>
              <option value="tajik">Tajik</option>
              <option value="tanzanian">Tanzanian</option>
              <option value="thai">Thai</option>
              <option value="togolese">Togolese</option>
              <option value="tongan">Tongan</option>
              <option value="trinidadian or tobagonian">Trinidadian or Tobagonian</option>
              <option value="tunisian">Tunisian</option>
              <option value="turkish">Turkish</option>
              <option value="tuvaluan">Tuvaluan</option>
              <option value="ugandan">Ugandan</option>
              <option value="ukrainian">Ukrainian</option>
              <option value="uruguayan">Uruguayan</option>
              <option value="uzbekistani">Uzbekistani</option>
              <option value="venezuelan">Venezuelan</option>
              <option value="vietnamese">Vietnamese</option>
              <option value="welsh">Welsh</option>
              <option value="yemenite">Yemenite</option>
              <option value="zambian">Zambian</option>
              <option value="zimbabwean">Zimbabwean</option>
          </select>
        </div>
        {errors.nationality && <p className={InputErrorMsgClass}>Nationality is required</p>}
      </div>

      <fieldset className='space-y-6'>
        <legend className={Subtitle}>Current Address</legend>
        <div>
          <label
            htmlFor='currentAddress.addressLine1'
            className={LblClass}
          >
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentAddress?.addressLine1 ? InputClassError : InputClass}
              {...register('currentAddress.addressLine1', { required: true })} />
          </div>
          {errors.currentAddress?.addressLine1 && <p className={InputErrorMsgClass}>Address Line 1 is required</p>}
        </div>
        
        <div>
          <label
            htmlFor='currentAddress.addressLine2'
            className={LblClass}
          >
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentAddress?.addressLine2 ? InputClassError : InputClass}
              {...register('currentAddress.addressLine2')} />
          </div>
          {errors.currentAddress?.addressLine2 && <p className={InputErrorMsgClass}>Address Line 2 is required</p>}
        </div>
        
        <div>
          <label
            htmlFor='currentAddress.town'
            className={LblClass}
          >
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentAddress?.town ? InputClassError : InputClass}
              {...register('currentAddress.town')} />
          </div>
          {errors.currentAddress?.town && <p className={InputErrorMsgClass}>Town is required</p>}
        </div>
        
        <div>
          <label
            htmlFor='currentAddress.county'
            className={LblClass}
          >
            County
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentAddress?.county ? InputClassError : InputClass}
              {...register('currentAddress.county')} />
          </div>
          {errors.currentAddress?.county && <p className={InputErrorMsgClass}>County is required</p>}
        </div>
        
        <div>
          <label
            htmlFor='currentAddress.postcode'
            className={LblClass}
          >
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentAddress?.postcode ? InputClassError : InputClass}
              {...register('currentAddress.postcode', { required: true })} />
          </div>
          {errors.currentAddress?.postcode && <p className={InputErrorMsgClass}>Postcode is required</p>}
        </div>

      </fieldset>
      
      <div>
        <label
          htmlFor='email'
          className={LblClass}
        >
          Email
        </label>
        <div className={InputContainerClass}>
          <input
            type="email"
            className={errors.email ? InputClassError : InputClass}
            {...register('email', { required: true })} />
        </div>
        {errors.email && <p className={InputErrorMsgClass}>Email is required</p>}
      </div>
      
      <div>
        <label
          htmlFor='phone'
          className={LblClass}
        >
          Telephone
        </label>
        <div className={InputContainerClass}>
          <input
            type="tel"
            className={errors.phone ? InputClassError : InputClass}
            {...register('phone', { required: true })} />
        </div>
        {errors.phone && <p className={InputErrorMsgClass}>Phone is required</p>}
      </div>
      
      <div>
        <label
          htmlFor='driver'
          className={LblClass}
        >
          Do you hold a current valid driving licence?
        </label>
        <div className={InputContainerClass}>
          <select
            defaultValue={personalDetails.driver}
            className={errors.driver ? SelectClassError : SelectClass}
            {...register('driver', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </div>
        {errors.driver && <p className={InputErrorMsgClass}>Driver is required</p>}
      </div>

      {isDriver === "YES" && (
        <>
          <div>
            <label
              htmlFor='licenceHeld'
              className={LblClass}
            >
              How long have you held your licence?
            </label>
            <div className={InputContainerClass}>
              <input
                className={errors.licenceHeld ? InputClassError : InputClass}
                type="number"
                {...register('licenceHeld', { required: true })} />
            </div>
            {errors.licenceHeld && <p className={InputErrorMsgClass}>Licence Held is required</p>}
          </div>
          
          <div>
            <label
              htmlFor='licenceType'
              className={LblClass}
            >
              What type of licence do you hold?
            </label>
            <div className={InputContainerClass}>
              <select
                defaultValue={personalDetails.licenceType}
                className={errors.licenceType ? SelectClassError : SelectClass}
                {...register('licenceType', { required: true })}>
                  <option value="" disabled>Please Select</option>
                  <option value="FULL">UK Full</option>
                  <option value="PROVISIONAL">UK Provisional</option>
                  <option value="OTHER">Other</option>
              </select>
            </div>
            {errors.licenceType && <p className={InputErrorMsgClass}>Licence Type is required</p>}
          </div>

          {isOtherLicence === "OTHER" && (
            <div>
              <label
                htmlFor='licenceOther'
                className={LblClass}
              >
                Please provide details of your licence type.
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.licenceOther ? InputClassError : InputClass}
                  {...register('licenceOther', { required: true })} />
              </div>
              {errors.licenceOther && <p className={InputErrorMsgClass}>Licence Other is required</p>}
            </div>
          )}

          <div>
            <label
              htmlFor='ownTransport'
              className={LblClass}
            >
              Do you have your own transport?
            </label>
            <div className={InputContainerClass}>
              <select
                defaultValue={personalDetails.ownTransport}
                className={errors.ownTransport ? SelectClassError : SelectClass}
                {...register('ownTransport', { required: true })}>
                  <option value="" disabled>Please Select</option>
                  <option value="YES">Yes</option>
                  <option value="NO">No</option>
              </select>
            </div>
            {errors.ownTransport && <p className={InputErrorMsgClass}>Own Transport is required</p>}
          </div>
          
          <div>
            <label
              htmlFor='drivingEndorsements'
              className={LblClass}
            >
              Please give details of any driving endorsements you have.
            </label>
            <div className={InputContainerClass}>
              <input
                type="text"
                className={errors.drivingEndorsements ? InputClassError : InputClass}
                {...register('drivingEndorsements')} />
            </div>
            {errors.drivingEndorsements && <p className={InputErrorMsgClass}>Driving Endorsements is required</p>}
          </div>
        </>
      )}

      <div>
        <label
          htmlFor="visaRequired"
          className={LblClass}
        >
          Do you require a visa to work in the UK?
        </label>
        <div className={InputContainerClass}>
          <select
            defaultValue={personalDetails.visaRequired}
            className={errors.visaRequired ? SelectClassError : SelectClass}
            {...register('visaRequired', { required: true, onChange: (e) => {
              if(e.target.value === "NO") {
                setValue('visaType', '');
                setValue('visaExpiry', '');
              }
            }})}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </div>
        {errors.visaRequired && <p className={InputErrorMsgClass}>Visa Required is required</p>}
      </div>

      {isVisaRequired === "YES" && (
        <>
        <div>
          <label
            htmlFor='visaType'
            className={LblClass}
          >
            What type of visa do you have?
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.visaType ? InputClassError : InputClass}
              {...register('visaType', { required: true })} />
          </div>
          {errors.visaType && <p className={InputErrorMsgClass}>Visa Type is required</p>}
        </div>

        <div>
          <label
            htmlFor='visaExpiry'
            className={LblClass}
          >
            When does your visa expire?
          </label>
          <div className={InputContainerClass}>
            <input
              type="date"
              className={errors.visaExpiry ? InputClassError : InputClass}
              {...register('visaExpiry', { required: true })} />
          </div>
          {errors.visaExpiry && <p className={InputErrorMsgClass}>Visa Expiry is required</p>}
        </div>
        </>
      )}
      
      {isVisaRequired === "NO" && (
        <div>
          <label
            htmlFor='national_insurance_number'
            className={LblClass}
          >
            National Insurance Number
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.national_insurance_number ? InputClassError : InputClass}
              {...register('national_insurance_number', { required: true })} />
          </div>
        </div>
      )}

      <div>
        <label
          htmlFor='related_to_employee'
          className={LblClass}
        >
          Are you related to an employee or service user at Cascade?
        </label>
        <div className={InputContainerClass}>
          <select
            defaultValue={personalDetails.related_to_employee}
            className={errors.related_to_employee ? SelectClassError : SelectClass}
            {...register('related_to_employee', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </div>
        {errors.related_to_employee && <p className={InputErrorMsgClass}>Related to employee is required</p>}
      </div>

      {relatedToEmployee === "YES" && (
        <div>
          <label
            htmlFor='related_to_employee_details'
            className={LblClass}
          >
            Name of Cascade employee or service user
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.related_to_employee_details ? InputClassError : InputClass}
              {...register('related_to_employee_details', { required: true })} />
          </div>
          {errors.related_to_employee_details && <p className={InputErrorMsgClass}>Related to employee details is required</p>}
        </div>
      )}
      </div>

      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
      
    </form>
  )
}

export default PersonalDetailsComponent;