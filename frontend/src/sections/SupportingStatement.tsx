import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";
import { SupportingStatement } from "../global";

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
  }, [isValid, isSubmitSuccessful]);

  return (
    <form onSubmit={onSubmit}>
      <h2>Supporting Statement</h2>
      
      <p>Please add here your reasons for applying. You should refer to the job description and person specification to guide you. It would also be of value to describe particular strengths and talents that set you apart from others as well as including skills gained from work, home and other activities.</p>
      
      <label
        className={errors.statement ? "error" : ""}
      >
        Supporting Statement
        <textarea
          rows={10}
          {...register("statement", { required: true })}
        />
      </label>
      {errors.statement && <p className="error-msg">This field is required</p>}

      <p>Please also write a short statement about how you have met, achieved or taken part in the cascade values.</p>

      <label
        className={errors.care ? "error" : ""}>
        <strong>Care</strong> For &amp; respect yourself, your peers &amp; the environment.
        <textarea
          rows={3}
          {...register("care", { required: true })}
        />
      </label>
      {errors.care && <p className="error-msg">This field is required</p>}

      <label
        className={errors.achieve ? "error" : ""}>
        <strong>Achieve</strong> Beyond previous expectations &amp; compete for equality.
        <textarea
          rows={3}
          {...register("achieve", { required: true })}
        />
      </label>
      {errors.achieve && <p className="error-msg">This field is required</p>}

      <label
        className={errors.safe ? "error" : ""}>
        <strong>Safe</strong> Keep everyonse safe, take positive &amp; appropriate risks.
        <textarea
          rows={3}
          {...register("safe", { required: true })}
        />
      </label>
      {errors.safe && <p className="error-msg">This field is required</p>}

      <label
        className={errors.consistent ? "error" : ""}>
        <strong>Consistent</strong> Establish clear channels of communication to enable consistency.
        <textarea
          rows={3}
          {...register("consistent", { required: true })}
        />
      </label>
      {errors.consistent && <p className="error-msg">This field is required</p>}

      <label
        className={errors.active ? "error" : ""}>
        <strong>Active</strong> Be active &amp; have a healthy approach to everything we do.
        <textarea
          rows={3}
          {...register("active", { required: true })}
        />
      </label>
      {errors.active && <p className="error-msg">This field is required</p>}

      <label
        className={errors.diverse ? "error" : ""}>
        <strong>Diverse</strong> Embrace uniqueness &amp; engage in the diversity of British values.
        <textarea
          rows={3}
          {...register("diverse", { required: true })}
        />
      </label>
      {errors.diverse && <p className="error-msg">This field is required</p>}

      <label
        className={errors.enjoy ? "error" : ""}>
        <strong>Enjoy</strong> Living, learning &amp; challenging ourselves.
        <textarea
          rows={3}
          {...register("enjoy", { required: true })}
        />
      </label>
      {errors.enjoy && <p className="error-msg">This field is required</p>}

      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  )
}

export default SupportingStatementComponent;