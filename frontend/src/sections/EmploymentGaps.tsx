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

  const { sections : 
    { employmentGaps, employmentHistory: 
      { 
        employmentGaps: employmentGapsCapture, 
        employmentOverlap: employmentOverlapCapture,
        educationToEmploymentGap: educationToEmploymentGapCapture
      } 
    } 
  } = state;
  
  const defaultValues:Omit<EmploymentGaps, "status"> = {
    employmentOverlap: [...employmentOverlapCapture],
    educationToEmploymentGapReason: employmentGaps.educationToEmploymentGapReason ?? null,
    acknowledgedOverlap: employmentGaps.acknowledgedOverlap ?? "NO",
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
      
      {state.sections.employmentHistory.employmentRecords.filter(item => item.endDate === null).length > 0 ? (
        <div>
          <h2 className={Title}>Current Employment</h2>
          <p className={Para}>You have indicated that you are still employed at these locations.</p>

          <ul className={`text-sm list-disc list-inside ${Para}`}>
          {state.sections.employmentHistory.employmentRecords.filter(item => item.endDate === null).map((item, index) => (
            <li key={index}>{item.name}</li>
          ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className={Title}>Current Employment</h2>
          <p className={Para}>You have indicated that you are not currently employed.</p>
        </div>
      )}

      {employmentOverlapCapture.length > 0 && (
        <>
          <div>
            <h2 className={Title}>Employment Overlap</h2>
            <p className={Para}>You have indicated that you have overlapping employment.</p>
            
              {employmentOverlapCapture.map((item, index) => (
                <div key={index}>
                  <p className={Para}>from {item.startDate} to {item.endDate === "Invalid Date" ? "Present" : item.endDate} there {item.endDate === "Invalid Date" ? 'is' : 'was'} overlap in your employment at these locations: {item.placesOfEmployment.join(", ")}</p>
                </div>
              ))}
          </div>

          <div>
            <label
              htmlFor="acknowledgedOverlap"
              className={LblClass}>
              <input
                type="checkbox"
                value="YES"
                className="mr-2"
                {...register('acknowledgedOverlap', { required: true })} />
                I acknowledge that I have overlapping employment as stated above
                {errors.acknowledgedOverlap && <p className={InputErrorMsgClass}>This field is required</p>}
            </label>
          </div>
        </>
      )}
      {educationToEmploymentGapCapture && (
        <div>
          <h2 className={Title}>Education to Employment Gap</h2>
          <p className={Para}></p>
          
          <div>
            <label
              htmlFor="educationToEmploymentGapReason"
              className={LblClass}>
                {`There is a gap of ${educationToEmploymentGapCapture} days between leaving education and your first employment.
                Please explain why.`}
            </label>
            <div className={InputContainerClass}>
              <textarea
                defaultValue={employmentGaps.educationToEmploymentGapReason ?? ''}
                className={errors.educationToEmploymentGapReason ? InputClassError : InputClass}
                {...register('educationToEmploymentGapReason', { required: true })} />
            </div>
          </div>
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