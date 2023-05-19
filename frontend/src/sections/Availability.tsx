import { useEffect } from 'react';
import useFormState from '../hooks/useFormState';
import { useForm, Validate } from 'react-hook-form';
import { Availability, AvailabilityOption } from '../global';

const AvailabilityComponent = () => {

  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const { sections: { availability } } = state;

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

  return (
    <form onSubmit={onSubmit}>
      <h2>Availability</h2>
      <p>I undestand this role may include: Shift work, Unsociable Hours, Lone working. Please tell us your availability.</p>
      <div className='flex-fieldset'>
      <fieldset
        className={errors.mon ? 'error' : ''} >
        <legend>Monday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('mon', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('mon', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('mon', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('mon', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.tue ? 'error' : ''} >
        <legend>Tuesday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('tue', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('tue', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('tue', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('tue', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.wed ? 'error' : ''} >
        <legend>Wednesday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('wed', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('wed', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('wed', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('wed', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.thu ? 'error' : ''} >
        <legend>Thursday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('thu', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('thu', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('thu', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('thu', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.fri ? 'error' : ''} >
        <legend>Friday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('fri', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('fri', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('fri', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('fri', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.sat ? 'error' : ''} >
        <legend>Saturday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('sat', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('sat', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('sat', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('sat', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      <fieldset
        className={errors.sun ? 'error' : ''} >
        <legend>Sunday</legend>

        <label className="checkbox-control">
          <input type="checkbox" value="AM" {...register('sun', { required: true, validate: checkSelection })} />AM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="PM" {...register('sun', { required: true, validate: checkSelection })} />PM
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NIGHT" {...register('sun', { required: true, validate: checkSelection })} />NIGHT
        </label>
        <label className="checkbox-control">
          <input type="checkbox" value="NONE" {...register('sun', { required: true, validate: checkSelection })} />NONE
        </label>
      </fieldset>

      {errors.mon || errors.tue || errors.wed || errors.thu || errors.fri || errors.sat || errors.sun ? <p className="error-msg">Please select at least one time slot for each day or none if you can't work any time that day.</p> : null}
      </div>
      
      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
      
    </form>
  );
}

export default AvailabilityComponent;