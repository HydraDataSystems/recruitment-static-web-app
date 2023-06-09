import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import { useForm, useFieldArray } from "react-hook-form";
import { EducationTraining } from "../global";
import { Btn, LblClass, InputClass, InputClassError, InputContainerClass, InputErrorMsgClass } from "../helpers";

const EducationTrainingComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections: { educationTraining } } = state;

  const { register, control, handleSubmit, formState: { errors, isValid, isSubmitSuccessful } } = useForm({
    defaultValues: {
      educationRecords: educationTraining?.educationRecords?.length ? educationTraining.educationRecords : [{ establishment: '', qualification: '', startDate: '', endDate: '' }],
      trainingRecords: educationTraining?.trainingRecords?.length ? educationTraining.trainingRecords : [{ subject: '', qualification: '', startDate: '', endDate: '' }],
    }
  });

  const { fields: education, remove: removeEducation, append: appendEducation } = useFieldArray({
    control,
    name: "educationRecords"
  });

  const { fields: training, remove: removeTraining, append: appendTraining } = useFieldArray({
    control,
    name: "trainingRecords"
  });

  const onSubmit = handleSubmit((data: Omit<EducationTraining, "status">) => {
    updateSection(data);
  });

  useEffect(() => {
    if (isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-sm font-bold my-2'>Education</h2>
      <p className='text-sm my-2'>If you are shortlisted for an interview you will be asked to provide evidence of your qualifications relevant to the role. Your entries will be ordered by the most recent first.</p>
      {education.length < 1 && <h3>No Education to report.</h3>}
      <ul className="education-list">
        {education.map((item, index) => (
          <li className='p-2 m-2 border border-gray-200 bg-gray-100 rounded relative' key={item.id}>
            <button
              title="Remove Education"
              className={`${Btn} my-0 bg-red-600 hover:bg-red-500 top-0 right-0 absolute`} 
              type="button" 
              onClick={() => removeEducation(index)}>X</button>
            <div className="my-2">
              <label
                htmlFor={`educationRecords.${index}.establishment`}
                className={LblClass}>
                School / College / University
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.establishment ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.establishment`, { required: true })} />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.establishment && <span className={InputErrorMsgClass}>Please enter a school.</span>}
            </div>

            <div className="my-2">
              <label
                htmlFor={`educationRecords.${index}.startDate`}
                className={LblClass}>
                Start Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.startDate`, { required: true })} />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate && <span className={InputErrorMsgClass}>Please enter a start date</span>}
            </div>

            <div className="my-2">
              <label
                htmlFor={`educationRecords.${index}.endDate`}
                className={LblClass}>
                End Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.endDate`, { required: true })}
                />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate && <span className={InputErrorMsgClass}>Please enter an end date</span>}
            </div>

            <div className="my-2">
              <label
                htmlFor={`educationRecords.${index}.qualification`}
                className={LblClass}>
                Examinations Passed, Qualifications Gained.
              </label>
              <div className={InputContainerClass}>
                <textarea
                  rows={5}
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.qualification ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.qualification`, { required: true })}
                />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.qualification && <span className={InputErrorMsgClass}>Please enter a qualification</span>}
            </div>
          </li>
        ))}
      </ul>
      
      <button
        className={Btn}
        type="button" 
        onClick={() => appendEducation({ establishment: '', qualification: '', startDate: '', endDate: '' })}>Add Education</button>

      <h2 className='text-sm font-bold my-2'>Training</h2>
      <p className='text-sm my-2'>If you are shortlisted for an interview you will be asked to provide evidence of your qualifications relevant to the role.</p>
      {training.length < 1 && <h3>No Training to report.</h3>}
      <ul className="education-list">
        {training.map((item, index) => (
          <li className='p-2 m-2 border border-gray-200 bg-gray-100 rounded relative' key={item.id}>
            <button
              title="Remove Training"
              className={`${Btn} my-0 bg-red-600 hover:bg-red-500 top-0 right-0 absolute`}
              type="button"
              onClick={() => removeTraining(index)}>X</button>
            
            <div className="my-2">
              <label
                htmlFor={`trainingRecords.${index}.subject`}
                className={LblClass}>
                Subject
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.subject ? InputClassError : InputClass}
                  {...register(`trainingRecords.${index}.subject`, { required: true })}
                />
              </div>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.subject && <span className={InputErrorMsgClass}>Please enter a subject</span>}
            </div>

            <div className="my-2">
              <label
                htmlFor={`trainingRecords.${index}.startDate`}
                className={LblClass}>
                Start Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"
                  className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.startDate ? InputClassError : InputClass}
                  {...register(`trainingRecords.${index}.startDate`, { required: true })}
                />
              </div>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.startDate && <span className={InputErrorMsgClass}>Please enter a start date</span>} 
            </div>

            <div className="my-2">
              <label
                htmlFor={`trainingRecords.${index}.endDate`}
                className={LblClass}>
                End Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"
                  className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate ? InputClassError : InputClass}
                  {...register(`trainingRecords.${index}.endDate`, { required: true })}
                />
              </div>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate && <span className={InputErrorMsgClass}>Please enter an end date</span>}
            </div>

            <div className="my-2">
              <label
                htmlFor={`trainingRecords.${index}.qualification`}
                className={LblClass}>
                Examinations Passed, Qualifications Gained.
              </label>
              <div className={InputContainerClass}>
                <textarea
                  rows={5}
                  className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.qualification ? InputClassError : InputClass}
                  {...register(`trainingRecords.${index}.qualification`, { required: true })}
                />
              </div>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.qualification && <span className={InputErrorMsgClass}>Please enter a qualification</span>}
            </div>
          </li>
        ))}
      </ul>

      <button
        className={Btn}
        type="button"
        onClick={() => appendTraining({ subject: '', qualification: '', startDate: '', endDate: '' })}>Add Training</button>

      <div className="my-2">
        <button
          className={Btn}
          onSubmit={onSubmit}
          type="submit">Next</button>
      </div>
    </form>
  );
}

export default EducationTrainingComponent;