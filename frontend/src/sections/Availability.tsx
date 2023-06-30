import { useState, useEffect, BaseSyntheticEvent, FormEvent } from 'react';
import useFormState from '../hooks/useFormState';
import { useForm, Validate } from 'react-hook-form';
import { Availability, AvailabilityOption } from '../global';
import { Title, Para, Checkbox, CheckboxContainer, InputErrorMsgClass, Btn, LblClass } from '../helpers';
import { Link } from 'react-router-dom';
import { SECTION_ROUTES } from '../constants';

const AvailabilityComponent = () => {

  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const [availabilityError, setAvailabilityError] = useState<string | null>(null);

  const { sections: { availability, position: { status: positionStatus } } } = state;

  const { 
    register, 
    handleSubmit, 
    getValues,
    setValue,
    formState: { errors, isValid, isSubmitSuccessful } 
  } = useForm({
    defaultValues: availability
  });

  const alwaysAvailable = (e: FormEvent<HTMLInputElement>) => {
    if(e.currentTarget.checked) {
      setValue('mon', ['AM', 'PM', 'NIGHT']);
      setValue('tue', ['AM', 'PM', 'NIGHT']);
      setValue('wed', ['AM', 'PM', 'NIGHT']);
      setValue('thu', ['AM', 'PM', 'NIGHT']);
      setValue('fri', ['AM', 'PM', 'NIGHT']);
      setValue('sat', ['AM', 'PM', 'NIGHT']);
      setValue('sun', ['AM', 'PM', 'NIGHT']);
    } else {
      setValue('mon', []);
      setValue('tue', []);
      setValue('wed', []);
      setValue('thu', []);
      setValue('fri', []);
      setValue('sat', []);
      setValue('sun', []);
    }
  }

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();

    const data = getValues();

    const mondayIsValid = data.mon.length > 1 && data.mon.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const tuesdayIsValid = data.tue.length > 1 && data.tue.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const wednesdayIsValid = data.wed.length > 1 && data.wed.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const thursdayIsValid = data.thu.length > 1 && data.thu.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const fridayIsValid = data.fri.length > 1 && data.fri.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const saturdayIsValid = data.sat.length > 1 && data.sat.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    const sundayIsValid = data.sun.length > 1 && data.sun.find((v: AvailabilityOption) => v === 'NONE') ? false : true;
    
    const allIsNone = data.mon.length === 1 && data.mon.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.tue.length === 1 && data.tue.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.wed.length === 1 && data.wed.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.thu.length === 1 && data.thu.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.fri.length === 1 && data.fri.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.sat.length === 1 && data.sat.find((v: AvailabilityOption) => v === 'NONE') &&
                      data.sun.length === 1 && data.sun.find((v: AvailabilityOption) => v === 'NONE') ? true : false;

    
    if(!mondayIsValid || !tuesdayIsValid || !wednesdayIsValid || !thursdayIsValid || !fridayIsValid || !saturdayIsValid || !sundayIsValid) {
      setAvailabilityError("Please select at least one time slot for each day or none if you can't work any time that day.");
      return;
    } else if(allIsNone) {
      setAvailabilityError("Please ensure you have some availability.");
      return;
    }

    setAvailabilityError(null);
    
    handleSubmit((data) => {
      updateSection(data as Availability);
      nextSection();
    })(e);
  }
  useEffect(() => {
    if(isValid && isSubmitSuccessful) nextSection();
  },[isValid, isSubmitSuccessful, nextSection]);

  const checkSelection: Validate<AvailabilityOption[], Availability> | Record<string, Validate<AvailabilityOption[], Availability>> | undefined = (value, formValues) => {
    if(value.length > 1 && value.find((v) => v === 'NONE')) return false;
    return true;
  }

  if(positionStatus !== "COMPLETE") {
    return (
      <>
      <h2 className={Title}>Please complete the previous section: Position</h2>
      <Link
        className={Btn}  
        to={SECTION_ROUTES.position}>Position</Link>
      </>
    )
  }

  return (
    <form className='space-y-12' onSubmit={onSubmit} onChange={() => setAvailabilityError(null)}>
      <div>
      <h2 className={Title}>Availability</h2>
      <p className={Para}>I understand this role may include: Shift work, Unsociable Hours, Lone working involved. Please select your availability.</p>
      </div>
      <div className='space-y-6'>
      <label className={LblClass}>
        <input
          onChange={alwaysAvailable}
          className={Checkbox}
          type="checkbox"/>
        <span className='ml-2'>I am available for all shift patterns.</span>
      </label>
      <fieldset
        className={`p-4 border flex mb-2 ${errors.mon ? 'border-red-500' : ''}`}>
        <legend className={LblClass}>Monday</legend>

        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="AM" {...register('mon', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="PM" {...register('mon', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="NIGHT" {...register('mon', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="NONE" {...register('mon', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.tue ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Tuesday</legend>

        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="AM" {...register('tue', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="PM" {...register('tue', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('tue', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('tue', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.wed ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Wednesday</legend>

        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="AM" {...register('wed', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="PM" {...register('wed', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('wed', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('wed', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.thu ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Thursday</legend>

        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="AM" {...register('thu', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="PM" {...register('thu', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('thu', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('thu', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.fri ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Friday</legend>

        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="AM" {...register('fri', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="PM" {...register('fri', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('fri', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('fri', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.sat ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Saturday</legend>

        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="AM" {...register('sat', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input 
            className={Checkbox}
            type="checkbox" 
            value="PM" {...register('sat', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('sat', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('sat', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      <fieldset
        className={`p-4 border flex mb-2 ${errors.sun ? 'border-red-500' : ''}`} >
        <legend className={LblClass}>Sunday</legend>

        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="AM" {...register('sun', { required: true, validate: checkSelection })} /><span className='indent-1'>AM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="PM" {...register('sun', { required: true, validate: checkSelection })} /><span className='indent-1'>PM</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NIGHT" {...register('sun', { required: true, validate: checkSelection })} /><span className='indent-1'>NIGHT</span>
        </label>
        <label className={CheckboxContainer}>
          <input
            className={Checkbox} 
            type="checkbox" 
            value="NONE" {...register('sun', { required: true, validate: checkSelection })} /><span className='indent-1'>NONE</span>
        </label>
      </fieldset>

      {errors.mon || errors.tue || errors.wed || errors.thu || errors.fri || errors.sat || errors.sun ? <p className={InputErrorMsgClass}>Please select at least one time slot for each day or none if you can't work any time that day.</p> : null}
      {availabilityError ? <p className={InputErrorMsgClass}>{availabilityError}</p> : null}
      </div>
      
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  );
}

export default AvailabilityComponent;