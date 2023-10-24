import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import { useForm, useFieldArray } from "react-hook-form";
import { EducationTraining, YesNo } from "../global";
import { 
  Btn, 
  LblClass, 
  InputClass, 
  InputClassError, 
  InputContainerClass, 
  InputErrorMsgClass, 
  Title,
  Para
 } from "../helpers";

const EducationTrainingComponent = () => {

  const { state, updateSection, nextSection } = useFormState();

  const { sections: { educationTraining, position: { isEducation } } } = state;

  const { register, control, handleSubmit, watch, formState: { errors, isValid, isSubmitSuccessful } } = useForm({
    defaultValues: {
      qts: educationTraining?.qts || '' as YesNo,
      induction: educationTraining?.induction || '' as YesNo,
      dfeNo: educationTraining?.dfeNo || '' as YesNo,
      educationRecords: educationTraining?.educationRecords?.length ? educationTraining.educationRecords : [{ establishment: '', qualification: '', startDate: '', endDate: '' }],
      trainingRecords: educationTraining?.trainingRecords?.length ? educationTraining.trainingRecords : [{ subject: '', qualification: '', startDate: '', endDate: '' }],
    }
  });

  const isQts = watch('qts');

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

  console.log(errors);
  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div> 
        <h2 className={Title}>Education</h2>
        <p className={Para}>If you are shortlisted for an interview you will be asked to provide evidence of your qualifications relevant to the role. Your entries will be ordered by the most recent first.</p>
      </div>

      <div className="space-y-6">
      {isEducation === 'YES' && (
        <>
          <div>
            <label
              htmlFor='qts'
              className={LblClass}
            >
              Do you have Qualified Teacher Status (QTS)?
            </label>
            <div className={InputContainerClass}>
              <select
                className={errors.qts ? InputClassError : InputClass}
                {...register('qts', { required: true })}
              >
                <option value=''>Please select</option>
                <option value='YES'>Yes</option>
                <option value='NO'>No</option>
              </select>
            </div>
            {errors.qts && <span className={InputErrorMsgClass}>Please select an option</span>}
          </div>

          {isQts === 'YES' && (
            <>
              <div className="my-2">
                <label
                  htmlFor='dfeNo'
                  className={LblClass}
                >
                  Please enter your DfE number
                </label>
                <div className={InputContainerClass}>
                  <input
                    type="text"
                    className={errors.dfeNo ? InputClassError : InputClass}
                    {...register('dfeNo', { required: true })}
                  />
                </div>
                {errors.dfeNo && <span className={InputErrorMsgClass}>Please enter your DfE number</span>}
              </div>
              <div className="my-2">
                <label
                  htmlFor='induction'
                  className={LblClass}
                >
                  Have you completed your induction year?
                </label>
                <div className={InputContainerClass}>
                  <select
                    className={errors.induction ? InputClassError : InputClass}
                    {...register('induction', { required: true })}
                  >
                    <option value=''>Please select</option>
                    <option value='YES'>Yes</option>
                    <option value='NO'>No</option>
                  </select>
                </div>
                {errors.induction && <span className={InputErrorMsgClass}>Please select an option</span>}
              </div>
            </>
          )}
        </>
      )} 
      
      {education.length < 1 && <h3>No Education to report.</h3>}
      
      <ul className="space-y-6">
        {education.map((item, index) => (
          <li className='space-y-6 p-2 border border-gray-200 bg-gray-50 rounded relative' key={item.id}>
            <button
              title="Remove Education"
              className={`p-2 w-8 text-white font-bold rounded bg-red-600 hover:bg-red-500 top-2 right-2 absolute`} 
              type="button" 
              onClick={() => removeEducation(index)}>X</button>
            <div>
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

            <div>
              <label
                htmlFor={`educationRecords.${index}.startDate`}
                className={LblClass}>
                Start Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="month"
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.startDate`, { required: true })} />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.startDate && <span className={InputErrorMsgClass}>Please enter a start date</span>}
            </div>

            <div>
              <label
                htmlFor={`educationRecords.${index}.endDate`}
                className={LblClass}>
                End Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="month"
                  className={errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate ? InputClassError : InputClass}
                  {...register(`educationRecords.${index}.endDate`, { required: true, min: { value: watch(`educationRecords.${index}.startDate`), message: 'End date must be after start date' }})}
                />
              </div>
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate?.type === 'required' && <span className={InputErrorMsgClass}>This is a required field.</span>}
              {errors.educationRecords && errors.educationRecords[index] && errors.educationRecords[index]?.endDate && <span className={InputErrorMsgClass}>{errors.educationRecords[index]?.endDate?.message}</span>}
            </div>

            <div>
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

      <div>
        <h2 className={Title}>Training</h2>
        <p className={Para}>If you are shortlisted for an interview you will be asked to provide evidence of your qualifications relevant to the role. If you have no additional training to add, you can remove this field by clicking the red "x".</p>
      </div>
      {training.length < 1 && <h3>No Training to report.</h3>}
      <ul className="space-y-6">
        {training.map((item, index) => (
          <li className='space-y-6 p-2 border border-gray-200 bg-gray-50 rounded relative' key={item.id}>
            <button
              title="Remove Training"
              className={`p-2 w-8 text-white font-bold rounded bg-red-600 hover:bg-red-500 top-2 right-2 absolute`}
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
                  type="month"
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
                  type="month"
                  className={errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate ? InputClassError : InputClass}
                  {...register(`trainingRecords.${index}.endDate`, { required: true, min: { value: watch(`trainingRecords.${index}.startDate`), message: 'End date must be after start date' }})}
                />
              </div>
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate?.type === 'required' && <span className={InputErrorMsgClass}>Please enter an end date</span>}
              {errors.trainingRecords && errors.trainingRecords[index] && errors.trainingRecords[index]?.endDate && <span className={InputErrorMsgClass}>{errors.trainingRecords[index]?.endDate?.message}</span>}
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
      </div>

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