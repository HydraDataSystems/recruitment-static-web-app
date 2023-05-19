import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";

const SafeguardingComponent = () => {
  
  const { state, updateSection, nextSection } = useFormState();

  const { sections: { safeguarding } } = state;

  const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful } } = useForm({
    defaultValues: safeguarding
  });

  const onSubmit = handleSubmit((data) => {
    updateSection(data);
  });

  useEffect(() => {
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful]);

  return (
    <form onSubmit={onSubmit}>
      <h2>Safeguarding</h2>
      <p>Cascade  aims to promote equality of opportunity and is committed to treating
         all applicants fairly regardless of ethnicity, disability, age, gender or gender
          reassignment, religion or belief, sexual orientation, pregnancy or maternity and
           marriage or civil partnership. Cascade  undertakes not to discriminate unfairly
            against applicants on the basis of a criminal conviction or other information
             declared.</p>
      <p>Answering 'yes' to the question below will not necessarily prevent your employment.
         This will depend on the relevance of the information you provide in respect of 
         the nature of the position and the particular circumstances.</p>

      <label>
      Are you currently bound over or do you have any current UNSPENT convictions that have been issued by a Court or Court-Martial in the United Kingdom or in any other country?
        <select {...register("convictions", { required: true })}>
          <option disabled value="">Please select</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
      </label>
      {errors.convictions && <p className="error-msg">This field is required</p>}

      <label>
      Do you have any current UNSPENT police cautions, reprimands or final warnings in the United Kingdom or in any other country?
        <select {...register("cautions", { required: true })}>
          <option disabled value="">Please select</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
      </label>
      {errors.cautions && <p className="error-msg">This field is required</p>}

      <label>
      I am happy for a pre-screen check on any social media platforms I hold to be carried out.
        <select {...register("preScreening", { required: true })}>
          <option disabled value="">Please select</option>
          <option value="YES">Yes</option>
          <option value="NO">No</option>
        </select>
      </label>
      {errors.preScreening && <p className="error-msg">This field is required</p>}

      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  );

}

export default SafeguardingComponent;