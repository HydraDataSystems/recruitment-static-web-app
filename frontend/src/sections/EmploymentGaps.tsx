import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import {useForm, useFieldArray } from "react-hook-form";
import { EmploymentGaps } from "../global";
import { 
  Title,
  Para,
  Btn, 
  InputClass, 
  InputClassError, 
  InputContainerClass, 
  InputErrorMsgClass, 
  LblClass 
} from "../helpers";
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
    <form className="space-y-12" onSubmit={onSubmit}>
      
      {employmentOverlapCapture.length > 0 && (
        <div>
          <h2 className={Title}>Employment Overlap</h2>
          <p className={Para}>You have indicated that you have overlapping employment.</p>
          
            {employmentOverlapCapture.map((item, index) => (
              <div key={index}>
                <p className={Para}>from {item.startDate} to {item.endDate} there was overlap in your employment at these locations: {item.placesOfEmployment.join(", ")}</p>
              </div>
            ))}
        </div>
      )}

      <div>
        <h2 className={Title}>Employment Gaps</h2>
        <ul className="space-y-6">
          {fields.map((item, index) => (
            <li 
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
      </div>
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form> 
  )
}

export default EmploymentGapsComponent;