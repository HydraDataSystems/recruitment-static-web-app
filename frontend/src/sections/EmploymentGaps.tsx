import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import {useForm, useFieldArray } from "react-hook-form";
import { EmploymentGaps } from "../global";
import { Btn, InputClass, InputClassError, InputContainerClass, InputErrorMsgClass, LblClass } from "../helpers";
const EmploymentGapsComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections : { employmentGaps, employmentHistory: { employmentGaps: employmentGapsCapture, employmentOverlap: employmentOverlapCapture } } } = state;
  
  const defaultValues:Omit<EmploymentGaps, "status"> = {
    employmentOverlap: [...employmentOverlapCapture],
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
      
      {employmentOverlapCapture.length > 0 && (
        <>
          <h2 className='text-sm font-bold my-2'>Employment Overlap</h2>
          <p className='text-sm my-2'>You have indicated that you have overlapping employment.</p>
          
            {employmentOverlapCapture.map((item, index) => (
              <div className="my-2" key={index}>
                <p className='text-sm my-2'>from {item.startDate} to {item.endDate} there was overlap in your employment at these locations: {item.placesOfEmployment.join(", ")}</p>
              </div>
            ))}
        </>
      )}

      <h2 className='text-sm font-bold my-2'>Employment Gaps</h2>
      <ul className="employment-gap-list">
        {fields.map((item, index) => (
          <li
            className="my-2" 
            key={item.id}>
            <label
              htmlFor={`placements.${index}.leaving`}
              className={LblClass}>
              {`Between leaving "${item.leaving}" and arriving at "${item.arriving}" there was a gap of ${item.duration} days. Please explain why.`}
            </label>
            <div className={InputContainerClass}>
              <textarea
                defaultValue={item.reason}
                className={errors.placements?.[index]?.reason ? InputClassError : InputClass}
                {...register(`placements.${index}.reason`, { required: true })} />
            </div>
            {errors.placements?.[index]?.reason && <p className={InputErrorMsgClass}>This field is required</p>}
          </li>
        ))}
      </ul>
    
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form> 
  )
}

export default EmploymentGapsComponent;