import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import {useForm, useFieldArray } from "react-hook-form";
import { EmploymentGaps } from "../global";

const EmploymentGapsComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections : { employmentGaps, employmentHistory: { employmentGaps: employmentGapsCapture } } } = state;
  
  const defaultValues:Omit<EmploymentGaps, "status"> = {
    placements: employmentGapsCapture.map((employmentGap) => 
      ({
        leaving: employmentGap.nameA,
        arriving: employmentGap.nameB,
        duration: employmentGap.gapInDays,
        reason: employmentGaps.placements.filter(item => item.duration === employmentGap.gapInDays)[0]?.reason || ''
      })),
  };
  
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitSuccessful } } = useForm<EmploymentGaps>({
    defaultValues: defaultValues,
  });

  const { fields } = useFieldArray({
    control,
    name: "placements"
  });

  const onSubmit = handleSubmit((data: EmploymentGaps) => {
    updateSection(data);
  });

  useEffect(() => {
    if (isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form onSubmit={onSubmit}>
      <h2>Employment Gaps</h2>
      <ul className="employment-gap-list">
        {fields.map((item, index) => (
          <li 
            key={item.id}>
            <label
              className={errors.placements?.[index]?.reason ? 'error' : ''}>
              {`Between leaving "${item.leaving}" and arriving at "${item.arriving}" there was a gap of ${item.duration} days. Please explain why.`}
              <textarea
                defaultValue={item.reason}
                className="form-control"
                {...register(`placements.${index}.reason`, { required: true })} />
            </label>
            {errors.placements?.[index]?.reason && <p className="error-msg">This field is required</p>}
          </li>
        ))}
      </ul>
    
      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form> 
  )
}

export default EmploymentGapsComponent;