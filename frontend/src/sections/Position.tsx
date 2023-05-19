import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useFormState from '../hooks/useFormState';
import { Position } from '../global';

const PositionComponent = () => {
  
  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const { sections: { position } } = state;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful},
    watch
  } = useForm({
    defaultValues: position 
  });

  const onSubmit = handleSubmit((data) => { 
    updateSection(data as Position);
  });

  useEffect(() => {
    if(isValid && isSubmitSuccessful ) nextSection();
  }, [isValid, isSubmitSuccessful]);

  const watchPosition = watch('position');

  return (
    <form onSubmit={onSubmit}>
      <p>Please note that no applicant will be unfairly discriminated against. This includes discrimination on account of age, cultural, religious political belief, disability, ethnicity, gender, race, relationship status, sexual orientation, and or Trade Union membership or stewardship.</p>
      <p>If you have any special requirements to support you to complete this form (e.g. the need for large print or additional time) please contact the <a href="https://cascade-care.com/our-team">Registered Manager.</a></p>
      <h2>Position</h2>
      <label
        className={errors.position ? 'error' : ''}
      >
        Which position are you applying for?
        <select
          {...register('position', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="Care Support Worker - Adult Care">Care Support Worker - Adult Care</option>
            <option value="Care Support Worker - Child Care">Care Support Worker - Child Care</option>
            <option value="Deputy Manager - Adult Residential Care">Deputy Manager - Adult Residential Care</option>
            <option value="Team Leader - Adult Care">Team Leader - Adult Care</option>
            <option value="Team Leader - Child Care">Team Leader - Child Care</option>
            <option value="Waking Night Worker - Child Care">Waking Night Worker - Child Care</option>
            <option value="Deputy Manager">Deputy Manager</option>
            <option value="Registered Manager">Registered Manager</option>
            <option value="Health & Wellbeing Lead">Health & Wellbeing Lead</option>
            <option value="Recruitment & Workforce Lead">Recruitment & Workforce Lead</option>
            <option value="Teaching Assistant">Teaching Assistant</option>
            <option value="Other">Other</option>
        </select>
      </label>
      {errors.position && <p className='error-msg'>Position is required</p>}

      {watchPosition === 'Other' && (
        <>
          <label className={errors.otherPosition ? 'error' : ''}>
            What position are you applying for?
            <input
              {...register('otherPosition', { required: true })} />
          </label>
        </>
      )}

      <label
        className={errors.location ? 'error' : ''}
      >
        Where is the position located?
        <select
          {...register('location', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="Hull">Hull</option>
            <option value="Norwich">Norwich</option>
        </select>
      </label>
      {errors.location && <p className='error-msg'>Location is required</p>}

      <label
        className={errors.workingPattern ? 'error' : ''}
      >
        What's your preffered working pattern?
        <select
          {...register('workingPattern', { required: true })}>
            <option value="" disabled>Please Select</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
        </select>
      </label>
      {errors.workingPattern && <p className='error-msg'>Working Pattern is required</p>}

      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>

    </form>
  )
}

export default PositionComponent;