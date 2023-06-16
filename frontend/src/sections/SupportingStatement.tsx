import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";
import { SupportingStatement } from "../global";
import {
  Title,
  Para, 
  Btn, 
  InputClass, 
  InputClassError, 
  InputContainerClass, 
  InputErrorMsgClass, 
  LblClass } from "../helpers";
const SupportingStatementComponent = () => {
  
  const { state, updateSection, nextSection } = useFormState();

  const { sections: { supportingStatement } } = state;

  const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful } } = useForm({
    defaultValues: supportingStatement
  });

  const onSubmit = handleSubmit((data: SupportingStatement) => {
    updateSection(data as SupportingStatement);
  });

  useEffect(() => { 
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form
      className="space-y-12" 
      onSubmit={onSubmit}>

      <div>
        <h2 className={Title}>Supporting Statement</h2>
        <p className={Para}>Please add here your reasons for applying. You should refer to the job description and person specification to guide you. It would also be of value to describe particular strengths and talents that set you apart from others as well as including skills gained from work, home and other activities.</p>
      </div>

      <div className='space-y-6'>
      <div>
        <label
          htmlFor='statement'
          className={LblClass}
        >
          Supporting Statement
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={10}
            className={errors.statement ? InputClassError : InputClass}
            {...register("statement", { required: true })}
          />
        </div>
        {errors.statement && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>
      <p className={Para}>Please also write a short statement about how you have met, achieved or taken part in the cascade values.</p>

      <div>
      <label
        htmlFor="care"
        className={LblClass}>
        <strong>Care</strong> For &amp; respect yourself, your peers &amp; the environment.
      </label>
      <div className={InputContainerClass}>
        <textarea
          rows={3}
          className={errors.care ? InputClassError : InputClass}
          {...register("care", { required: true })}
        />
      </div>
      {errors.care && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="achieve"
          className={LblClass}>
          <strong>Achieve</strong> Beyond previous expectations &amp; compete for equality.
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={3}
            className={errors.achieve ? InputClassError : InputClass}
            {...register("achieve", { required: true })}
          />
        </div>
        {errors.achieve && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="safe"
          className={LblClass}>
          <strong>Safe</strong> Keep everyonse safe, take positive &amp; appropriate risks.
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={3}
            className={errors.safe ? InputClassError : InputClass}
            {...register("safe", { required: true })}
          />
        </div>
        {errors.safe && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="consistent"
          className={LblClass}>
          <strong>Consistent</strong> Establish clear channels of communication to enable consistency.
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={3}
            className={errors.consistent ? InputClassError : InputClass}
            {...register("consistent", { required: true })}
          />
        </div>
        {errors.consistent && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="active"
          className={LblClass}>
          <strong>Active</strong> Be active &amp; have a healthy approach to everything we do.
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={3}
            className={errors.active ? InputClassError : InputClass}
            {...register("active", { required: true })}
          />
        </div>
        {errors.active && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="diverse"
          className={LblClass}>
          <strong>Diverse</strong> Embrace uniqueness &amp; engage in the diversity of British values.
        </label>
        <div className={InputContainerClass}>
          <textarea
            rows={3}
            className={errors.diverse ? InputClassError : InputClass}
            {...register("diverse", { required: true })}
          />
        </div>
        {errors.diverse && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <div>
        <label
          htmlFor="enjoy"
          className={LblClass}>
          <strong>Enjoy</strong> Living, learning &amp; challenging ourselves.
        </label>
        <div className={InputContainerClass}>
          <textarea
            className={errors.enjoy ? InputClassError : InputClass}
            rows={3}
            {...register("enjoy", { required: true })}
          />
        </div>
        {errors.enjoy && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>
      </div>
    
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  )
}

export default SupportingStatementComponent;