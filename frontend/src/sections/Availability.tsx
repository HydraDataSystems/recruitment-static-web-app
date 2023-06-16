import { useEffect } from 'react';
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

  const { sections: { availability, position: { status: positionStatus } } } = state;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful } 
  } = useForm({
    defaultValues: availability
  });

  const onSubmit = handleSubmit((data) => { 
    updateSection(data as Availability);
  });

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
    <form className='space-y-12' onSubmit={onSubmit}>
      <div>
      <h2 className={Title}>Availability</h2>
      <p className={Para}>I undestand this role may include: Shift work, Unsociable Hours, Lone working involved. Please select your availability.</p>
      </div>
      <div className='space-y-6'>
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
      </div>
      
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
      
    </form>
  );
}

export default AvailabilityComponent;