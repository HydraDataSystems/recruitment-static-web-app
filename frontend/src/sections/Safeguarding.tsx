import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";
import { 
  Title,
  Para,
  Btn, 
  LblClass, 
  SelectClass, 
  SelectClassError, 
  InputErrorMsgClass, 
  InputContainerClass } from "../helpers";
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
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Safeguarding</h2>
        <p className={Para}>The application process for criminal records checks or ‘Certificates of Good Character’ for a candidate from overseas varies from country to country. Cascade can apply to the relevant embassy in the UK where this is required. Where further help or support is needed, the Disclosure & Barring Service can be contacted for support.</p>
        <p className={Para}>A certificate is required for all candidates to Cascade who have lived outside of the UK for 12 months or more (whether continuously or in total) in the last ten years, while aged 18 or over.</p>
      </div>

      <div>
        <label
          htmlFor="outsideUK"
          className={LblClass}
        >
        In the last 10 years have you spent over a year, either in one stay or cumulatively (e.g. one month or week every so often, amounting to a year in total) outside of the UK?
        </label>
        <div className={InputContainerClass}>
          <select 
            className={errors.outsideUK ? SelectClassError : SelectClass}
            {...register("outsideUK", { required: true })}>
            <option disabled value="">Please select</option>
            <option value="YES">Yes</option>
            <option value="NO">No</option>
          </select>
        </div>
        {errors.outsideUK && <p className={InputErrorMsgClass}>This field is required</p>}
      </div>

      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  );

}

export default SafeguardingComponent;