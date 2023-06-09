import { useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import useFormState from '../hooks/useFormState';
import { PersonalDetails } from '../global';

import { 
  LblClass, 
  SelectClass, 
  SelectClassError, 
  InputContainerClass, 
  InputClass, 
  InputClassError,
  InputErrorMsgClass,
  Btn
 } from '../helpers';

const PersonalDetailsComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections: { personalDetails} } = state;
  
  const { 
    register, 
    control,
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful }, 
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
  const hasMoreNames = watch('otherNames');
  const isVisaRequired = watch('visaRequired');

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-sm font-bold my-2'>Personal Details</h2>
      
      <div className='my-2'>
        <label
          htmlFor='firstName'
          className={LblClass}
        >
          First Name
        </label>
        <div className={InputContainerClass}>
          <input
            className={errors.firstName ? InputClassError : InputClass}
            {...register('firstName', { required: true })} />
        </div>
        {errors.firstName && <p className={InputErrorMsgClass}>First Name is required</p>}
      </div>

      <div className='my-2'>
        <label
          htmlFor='lastName'
          className={LblClass}
        >
          Last Name
        </label>
        <div className={InputContainerClass}>
          <input
            className={errors.lastName ? InputClassError : InputClass}
            {...register('lastName', { required: true })} />
        </div>
        {errors.lastName && <p className={InputErrorMsgClass}>Last Name is required</p>}
      </div>

      <div className='my-2'>
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
        <div className='mt-4'>
          <h2 className='text-sm font-medium my-2'>Additional Names</h2>
          {otherNames.map((item, index) => (
            <div
              className='p-2 m-2 border border-gray-200 bg-gray-100 rounded relative' 
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
                    className={errors.otherNamesDetails && errors.otherNamesDetails[index] && errors.otherNamesDetails[index]?.firstName ? InputClassError : InputClass}
                    {...register(`otherNamesDetails.${index}.firstName`, { required: true })} />
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

      <div className='my-2'>
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

      <div className='my-2'>
        <label
          htmlFor='placeOfBirth'
          className={LblClass}
        >
          Place of Birth
        </label>
        <div className={InputContainerClass}>
          <input
            className={errors.placeOfBirth ? InputClassError : InputClass}
            {...register('placeOfBirth', { required: true })} />
        </div>
        {errors.placeOfBirth && <p className={InputErrorMsgClass}>Place of Birth is required</p>}
      </div>

      <div className='my-2'>
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
              <option value="British">British</option>
              <option value="Irish">Irish</option>
              <option value="Other">Other</option>
          </select>
        </div>
        {errors.nationality && <p className={InputErrorMsgClass}>Nationality is required</p>}
      </div>

      <fieldset>
        <legend className='font-medium text-sm'>Current Address</legend>
        <div className='my-2'>
          <label
            htmlFor='currentAddress.addressLine1'
            className={LblClass}
          >
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.currentAddress?.addressLine1 ? InputClassError : InputClass}
              {...register('currentAddress.addressLine1', { required: true })} />
          </div>
          {errors.currentAddress?.addressLine1 && <p className={InputErrorMsgClass}>Address Line 1 is required</p>}
        </div>
        
        <div className='my-2'>
          <label
            htmlFor='currentAddress.addressLine2'
            className={LblClass}
          >
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.currentAddress?.addressLine2 ? InputClassError : InputClass}
              {...register('currentAddress.addressLine2')} />
          </div>
          {errors.currentAddress?.addressLine2 && <p className={InputErrorMsgClass}>Address Line 2 is required</p>}
        </div>
        
        <div className='my-2'>
          <label
            htmlFor='currentAddress.town'
            className={LblClass}
          >
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.currentAddress?.town ? InputClassError : InputClass}
              {...register('currentAddress.town')} />
          </div>
          {errors.currentAddress?.town && <p className={InputErrorMsgClass}>Town is required</p>}
        </div>
        
        <div className='my-2'>
          <label
            htmlFor='currentAddress.county'
            className={LblClass}
          >
            County
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.currentAddress?.county ? InputClassError : InputClass}
              {...register('currentAddress.county')} />
          </div>
          {errors.currentAddress?.county && <p className={InputErrorMsgClass}>County is required</p>}
        </div>
        
        <div className='my-2'>
          <label
            htmlFor='currentAddress.postcode'
            className={LblClass}
          >
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.currentAddress?.postcode ? InputClassError : InputClass}
              {...register('currentAddress.postcode', { required: true })} />
          </div>
          {errors.currentAddress?.postcode && <p className={InputErrorMsgClass}>Postcode is required</p>}
        </div>

      </fieldset>
      
      <div className='my-2'>
        <label
          htmlFor='email'
          className={LblClass}
        >
          Email
        </label>
        <div className={InputContainerClass}>
          <input
            className={errors.email ? InputClassError : InputClass}
            {...register('email', { required: true })} />
        </div>
        {errors.email && <p className={InputErrorMsgClass}>Email is required</p>}
      </div>
      
      <div className='my-2'>
        <label
          htmlFor='phone'
          className={LblClass}
        >
          Telephone
        </label>
        <div className={InputContainerClass}>
          <input
            className={errors.phone ? InputClassError : InputClass}
            {...register('phone', { required: true })} />
        </div>
        {errors.phone && <p className={InputErrorMsgClass}>Phone is required</p>}
      </div>
      
      <div className='my-2'>
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
          <div className='my-2'>
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
          
          <div className='my-2'>
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
                  <option value="FULL">Full</option>
                  <option value="PROVISIONAL">Provisional</option>
                  <option value="OTHER">Other</option>
              </select>
            </div>
            {errors.licenceType && <p className={InputErrorMsgClass}>Licence Type is required</p>}
          </div>

          {personalDetails.licenceType === "OTHER" && (
            <div className='my-2'>
              <label
                htmlFor='licenceOther'
                className={LblClass}
              >
                Please provide details of your licence type.
              </label>
              <div className={InputContainerClass}>
                <input
                  className={errors.licenceOther ? InputClassError : InputClass}
                  {...register('licenceOther', { required: true })} />
              </div>
              {errors.licenceOther && <p className={InputErrorMsgClass}>Licence Other is required</p>}
            </div>
          )}

          <div className='my-2'>
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
          
          <div className='my-2'>
            <label
              htmlFor='drivingEndorsements'
              className={LblClass}
            >
              Please give details of any driving endorsements you have.
            </label>
            <div className={InputContainerClass}>
              <input
                className={errors.drivingEndorsements ? InputClassError : InputClass}
                {...register('drivingEndorsements')} />
            </div>
            {errors.drivingEndorsements && <p className={InputErrorMsgClass}>Driving Endorsements is required</p>}
          </div>
        </>
      )}

      <div className='my-2'>
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
            {...register('visaRequired', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </div>
        {errors.visaRequired && <p className={InputErrorMsgClass}>Visa Required is required</p>}
      </div>

      {isVisaRequired === "YES" && (
        <div className='my-2'>
          <label
            htmlFor='visaType'
            className={LblClass}
          >
            What type of visa do you have?
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.visaType ? InputClassError : InputClass}
              {...register('visaType', { required: true })} />
          </div>
          {errors.visaType && <p className={InputErrorMsgClass}>Visa Type is required</p>}
        </div>
      )}
      
      {isVisaRequired === "NO" && (
        <div className='my-2'>
          <label
            htmlFor='national_insurance_number'
            className={LblClass}
          >
            National Insurance Number
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.national_insurance_number ? InputClassError : InputClass}
              {...register('national_insurance_number', { required: true })} />
          </div>
        </div>
      )}

      <div className='my-2'>
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

      {personalDetails.related_to_employee === "YES" && (
        <div className='my-2'>
          <label
            htmlFor='related_to_employee_details'
            className={LblClass}
          >
            Name of Cascade employee or service user
          </label>
          <div className={InputContainerClass}>
            <input
              className={errors.related_to_employee_details ? InputClassError : InputClass}
              {...register('related_to_employee_details', { required: true })} />
          </div>
          {errors.related_to_employee_details && <p className={InputErrorMsgClass}>Related to employee details is required</p>}
        </div>
      )}

      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
      
    </form>
  )
}

export default PersonalDetailsComponent;