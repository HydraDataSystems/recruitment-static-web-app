import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useFormState from '../hooks/useFormState';
import { PersonalDetails } from '../global';

const PersonalDetailsComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections: { personalDetails} } = state;
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful }, 
    watch 
  } = useForm({
    defaultValues: personalDetails
  });

  const onSubmit = handleSubmit((data) => { 
    updateSection(data as PersonalDetails);
  });

  useEffect(() => { 
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful]);

  const isDriver = watch('driver');
  const isNational = watch('uk_ec_eea_resident');

  return (
    <form onSubmit={onSubmit}>
      <h2>Personal Details</h2>

      <label
        className={errors.firstName ? 'error' : ''}
      >
        First Name
        <input
          {...register('firstName', { required: true })} />
      </label>
      {errors.firstName && <p className='error-msg'>First Name is required</p>}
      
      <label
        className={errors.lastName ? 'error' : ''}
      >
        Last Name
        <input
          {...register('lastName', { required: true })} />
      </label>
      {errors.lastName && <p className='error-msg'>Last Name is required</p>}

      <label
        className={errors.maidenName ? 'error' : ''}
      >
        Maiden Name
        <input
          {...register('maidenName')} />
      </label>
      {errors.maidenName && <p className='error-msg'>Maiden Name is required</p>}

      <label>
        Previous Name(s)
        <input
          {...register('previousNames')} />
      </label>

      <label
        className={errors.placeOfBirth ? 'error' : ''}
        >
        Place of Birth
        <input
          {...register('placeOfBirth', { required: true })} />
      </label>
      
      <div className='flex-fieldset'>
        <div>
          <label
            className={errors.gender ? 'error' : ''}
          >
            Gender
            <select
              {...register('gender', { required: true })}>
                <option value="" disabled>Please Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-Binary">Non-Binary</option>
                <option value="Prefer not to say">Prefer not to say</option>
            </select>
          </label>
          {errors.gender && <p className='error-msg'>Gender is required</p>}
        </div>

        <div>
          <label
            className={errors.nationality ? 'error' : ''}
          >
            Nationality
            <select
              {...register('nationality', { required: true })}>
                <option value="" disabled>Please Select</option>
                <option value="British">British</option>
                <option value="Irish">Irish</option>
                <option value="Other">Other</option>
            </select>
          </label>
          {errors.nationality && <p className='error-msg'>Nationality is required</p>}
        </div>
      </div>

      <fieldset>
        <legend>Current Address</legend>
        <label
          className={errors.currentAddress?.addressLine1 ? 'error' : ''}>
          Address Line 1
          <input
            {...register('currentAddress.addressLine1', { required: true })} />
        </label>
        {errors.currentAddress?.addressLine1 && <p className='error-msg'>Address Line 1 is required</p>}

        <label
          className={errors.currentAddress?.addressLine2 ? 'error' : ''}>
          Address Line 2
          <input
            {...register('currentAddress.addressLine2')} />
        </label>
        
        <label
          className={errors.currentAddress?.town ? 'error' : ''}>
          Town
          <input
            {...register('currentAddress.town', { required: true })} />
        </label>
        {errors.currentAddress?.town && <p className='error-msg'>Town is required</p>}

        <label
          className={errors.currentAddress?.county ? 'error' : ''}>
          County
          <input
            {...register('currentAddress.county')} />
        </label>

        <label
          className={errors.currentAddress?.postcode ? 'error' : ''}>
          Postcode
          <input
            {...register('currentAddress.postcode', { required: true })} />
        </label>
        {errors.currentAddress?.postcode && <p className='error-msg'>Postcode is required</p>}
      </fieldset>

      <label
        className={errors.email ? 'error' : ''}>
        Email
        <input
          {...register('email', { required: true })} />
      </label>
      {errors.email && <p className='error-msg'>Email is required</p>}

      <label
        className={errors.phone ? 'error' : ''}>
        Phone
        <input
          {...register('phone')} />
      </label>
      {errors.phone && <p className='error-msg'>Phone is required</p>}

      <label
        className={errors.mobile ? 'error' : ''}>
        Mobile
        <input
          {...register('mobile', { required: true })} />
      </label>
      {errors.mobile && <p className='error-msg'>Mobile is required</p>}

      <label
        className={errors.driver ? 'error' : ''}>
          Are you a driver?
          <select
            {...register('driver', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
          </select>
        </label>
        {errors.driver && <p className='error-msg'>Driver is required</p>}

      {isDriver === "YES" && (
        <>
          <label
            className={errors.licenceHeld ? 'error' : ''}>
            How long have you held your licence?
            <input
              type="number"
              defaultValue={personalDetails.licenceHeld}
              {...register('licenceHeld', { required: true })} />
          </label>
          {errors.licenceHeld && <p className='error-msg'>Licence Held is required</p>}

          <label
            className={errors.ownTransport ? 'error' : ''}>
            Do you have your own transport?
            <select
              defaultValue={personalDetails.ownTransport}
              {...register('ownTransport', { required: true })}>
                <option value="" disabled>Please Select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
            </select>
          </label>
          {errors.ownTransport && <p className='error-msg'>Own Transport is required</p>}

          <label
            className={errors.drivingEndorsements ? 'error' : ''}>
            Please give details of any driving endorsements you have.
            <input
              defaultValue={personalDetails.drivingEndorsements}
              {...register('drivingEndorsements')} />
          </label>
        </>
      )}

      <label
        className={errors.uk_ec_eea_resident ? 'error' : ''}>
        Are you a United Kingdom (UK), European Community (EC) or European Economic Area (EEA) National?
        <select
          defaultValue={personalDetails.uk_ec_eea_resident}
          {...register('uk_ec_eea_resident', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
        </select>
      </label>
      {errors.uk_ec_eea_resident && <p className='error-msg'>UK, EC or EEA Resident is required</p>}
      
      {isNational === "NO" && (
        <>
          <label
            className={errors.immigration_status ? 'error' : ''}>
            Please detail current immigration status and relevant visa currently held.
            <input
              defaultValue={personalDetails.immigration_status}
              {...register('immigration_status', { required: true })} />
          </label>
          {errors.immigration_status && <p className='error-msg'>Immigration status and visa detail is required</p>}
        
          <label
            className={errors.visa_number ? 'error' : ''}>
            If applicable, please provide your visa number.
            <input
              defaultValue={personalDetails.visa_number}
              {...register('visa_number')} />
          </label>
        </>
      )}

      <label
        className={errors.national_insurance_number ? 'error' : ''}>
          If applicable, please provide your National Insurance Number.
          <input
            defaultValue={personalDetails.national_insurance_number}
            {...register('national_insurance_number')} />
      </label>

      <label
        className={errors.related_to_employee ? 'error' : ''}>
        Are you related to an employee or service user at Cascade?
        <select
          defaultValue={personalDetails.related_to_employee}
          {...register('related_to_employee', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
      </label>
      {errors.related_to_employee && <p className='error-msg'>Related to employee is required</p>}
      
      <h4>Equality Act 2010</h4>
      <p>Under the Equality Act 2010 the definition of disability is if you have a physical or mental impairment that has a 'substantial' and 'long-term' adverse effect on your ability to carry out normal day to day activities. Further information regarding the definition of disability can be found <a href="www.gov.uk/definition-of-disability-under-equality-act-2010">here.</a></p>
      <label
        className={errors.disability ? 'error' : ''}>
        According to the definition in the Equality Act 2010, do you consider yourself to have a disability?
        <select
          defaultValue={personalDetails.disability}
          {...register('disability', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
      </label>
      {errors.disability && <p className='error-msg'>Disability is required</p>}

      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
      
    </form>
  )
}

export default PersonalDetailsComponent;