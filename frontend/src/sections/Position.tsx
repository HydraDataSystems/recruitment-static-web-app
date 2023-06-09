import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useFormState from '../hooks/useFormState';
import { Position } from '../global';
import { 
  Title,
  LblClass, 
  SelectClass, 
  SelectClassError, 
  InputContainerClass, 
  InputClass, 
  InputClassError,
  InputErrorMsgClass,
  Btn
 } from '../helpers';
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

  const onSubmit = handleSubmit((data: Omit<Position, "status">) => { 
    updateSection(data);
  });

  useEffect(() => {
    if(isValid && isSubmitSuccessful ) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  const watchPosition = watch('position');

  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Position</h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">Please note that no applicant will be unfairly discriminated against. This includes discrimination on account of age, cultural, religious political belief, disability, ethnicity, gender, race, relationship status, sexual orientation, and or Trade Union membership or stewardship.</p>
        <p className="mt-1 text-sm leading-6 text-gray-600">If you have any special requirements to support you to complete this form (e.g. the need for large print or additional time) please contact the <a href="https://cascade-care.com/our-team">Registered Manager.</a></p>
      </div>
      
      <div className='space-y-6'>
        <div>
          <label
            htmlFor='position'
            className={LblClass}
          >
            Which position are you applying for?
          </label>
          <div className={InputContainerClass}>
            <select
              className={errors.position ? SelectClassError : SelectClass}
              {...register('position', { required: true })}>
                <option value="" disabled>Please Select</option>
                <option value="Support Worker - Adult Care">Support Worker - Adult Care</option>
                <option value="Support Worker - Child Care">Support Worker - Child Care</option>
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
          </div>
          {errors.position && <p className={InputErrorMsgClass}>Position is required</p>}
        </div>

        {watchPosition === 'Other' && (
          <div>
            <label
              htmlFor='otherPosition' 
              className={LblClass}>
              What position are you applying for?
            </label>
            <div className={InputContainerClass}>
              <input
                className={errors.otherPosition ? InputClassError : InputClass}
                {...register('otherPosition', { required: true })} />
            </div>
            {errors.otherPosition && <p className={InputErrorMsgClass}>Other Position is required</p>}
          </div>
        )}

        <div>
          <label
            htmlFor='isEducation'
            className={LblClass}
          >
            Is this position in teaching or education?
          </label>
          <div className={InputContainerClass}>
            <select
              className={errors.isEducation ? SelectClassError : SelectClass}
              {...register('isEducation', { required: true })}>
                {watchPosition === "Teaching Assistant" && (
                  <>
                  <option value="" disabled>Please Select</option>
                  <option value="YES">Yes</option>
                  </>
                )}
                
                {watchPosition !== "Teaching Assistant" && watchPosition !== "Other" && (
                  <>
                    <option value="" disabled>Please Select</option>
                    <option value="NO">No</option>
                  </>
                )}

                {watchPosition === "Other" && (
                  <>
                    <option value="" disabled>Please Select</option>
                    <option value="YES">Yes</option>
                    <option value="NO">No</option>
                  </>
                )}
            </select>
          </div>
          {errors.isEducation && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div>
          <label
            htmlFor='location'
            className={LblClass}
          >
            Where is the position located?
          </label>
          <div className={InputContainerClass}>
            <select
              className={errors.location ? SelectClassError : SelectClass}
              {...register('location', { required: true })}>
                <option value="" disabled>Please Select</option>
                <option value="Hull">Hull</option>
                <option value="Norwich">Norwich</option>
            </select>
          </div>
          {errors.location && <p className={InputErrorMsgClass}>Location is required</p>}
        </div>
        
        <div>
          <label
            htmlFor='workingPattern'
            className={LblClass}
          >
            What's your preferred working pattern?
          </label>
          <div className={InputContainerClass}>
          <select
            className={errors.workingPattern ? SelectClassError : SelectClass}
            {...register('workingPattern', { required: true })}>
              <option value="" disabled>Please Select</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
          </select>
          </div>
          {errors.workingPattern && <p className={InputErrorMsgClass}>Working Pattern is required</p>}
        </div>

        <div>
          <label
            htmlFor='hoursRequested'
            className={LblClass}
            >
            Requested hours per week?
          </label>
          <div className={InputContainerClass}>
            <input
              type="number"
              className={errors.hoursRequested ? InputClassError : InputClass}
              {...register('hoursRequested', { required: true })} />
          </div>
          {errors.hoursRequested && <p className={InputErrorMsgClass}>Hours Requested is required</p>}
        </div>
      </div>

      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>

    </form>
  )
}

export default PositionComponent;