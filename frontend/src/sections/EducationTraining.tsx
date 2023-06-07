import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import { useForm, useFieldArray } from "react-hook-form";
import { EducationTraining } from "../global";

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
      <h2>Education</h2>

      {education.length < 1 && <h3>No Education to report.</h3>}
      <ul className="education-list">
        {education.map((item, index) => (
          <li key={item.id}>
            <button
              title="Remove Education"
              className="btn btn--remove btn--education" 
              type="button" 
              onClick={() => removeEducation(index)}>X</button>
            <div>
              <label
                className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.establishment ? 'error' : ''}>
                School / College / University
                <input
                  type="text"
                  {...register(`educationRecords.${index}.establishment`, { required: true })}
                />
              </label>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.establishment && <span className="error-msg">Please enter a school.</span>}
            </div>

            <div>
              <label
                className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate ? 'error' : ''}>
                Start Date
                <input
                  type="date"
                  {...register(`educationRecords.${index}.startDate`, { required: true })}
                />
              </label>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate && <span className="error-msg">Please enter a start date</span>}
            </div>

            <div>
              <label
                className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate ? 'error' : ''}>
                End Date
                <input
                  type="date"
                  {...register(`educationRecords.${index}.endDate`, { required: true })}
                />
              </label>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate && <span className="error-msg">Please enter an end date</span>}
            </div>

            <div>
              <label
                className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.qualification ? 'error' : ''}>
                Examinations Passed, Qualifications Gained.
                <textarea
                  rows={5}
                  {...register(`educationRecords.${index}.qualification`, { required: true })}
                />
              </label>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.qualification && <span className="error-msg">Please enter a qualification</span>}
            </div>
          </li>
        ))}
      </ul>
      
      <button
        className='btn btn--add' 
        type="button" 
        onClick={() => appendEducation({ establishment: '', qualification: '', startDate: '', endDate: '' })}>Add Education</button>

      <h2>Training</h2>
      
      {training.length < 1 && <h3>No Training to report.</h3>}
      <ul className="education-list">
        {training.map((item, index) => (
          <li key={item.id}>
            <button
              title="Remove Training"
              className="btn btn--remove btn--education"
              type="button"
              onClick={() => removeTraining(index)}>X</button>
            <div>
              <label
                className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.subject ? 'error' : ''}>
                Subject
                <input
                  type="text"
                  {...register(`trainingRecords.${index}.subject`, { required: true })}
                />
              </label>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.subject && <span className="error-msg">Please enter a subject</span>}
            </div>

            <div>
              <label
                className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.startDate ? 'error' : ''}>
                Start Date
                <input
                  type="date"
                  {...register(`trainingRecords.${index}.startDate`, { required: true })}
                />
              </label>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.startDate && <span className="error-msg">Please enter a start date</span>} 
            </div>

            <div>
              <label
                className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate ? 'error' : ''}>
                End Date
                <input
                  type="date"
                  {...register(`trainingRecords.${index}.endDate`, { required: true })}
                />
              </label>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate && <span className="error-msg">Please enter an end date</span>}
            </div>

            <div>
              <label
                className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.qualification ? 'error' : ''}>
                Examinations Passed, Qualifications Gained.
                <textarea
                  rows={5}
                  {...register(`trainingRecords.${index}.qualification`, { required: true })}
                />
              </label>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.qualification && <span className="error-msg">Please enter a qualification</span>}
            </div>
          </li>
        ))}
      </ul>

      <button
        className='btn btn--add'
        type="button"
        onClick={() => appendTraining({ subject: '', qualification: '', startDate: '', endDate: '' })}>Add Training</button>

        <button
          className='btn'
          onSubmit={onSubmit}
          type="submit">Next</button>
    </form>
  );
}

export default EducationTrainingComponent;