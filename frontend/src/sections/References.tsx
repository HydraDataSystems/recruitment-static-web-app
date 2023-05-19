import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";

const RefereesComponent = () => {
  
  const { state, updateSection, nextSection } = useFormState();

  const { sections: { references } } = state;

  const { register, handleSubmit, formState: { errors, isValid, isSubmitSuccessful } } = useForm({
    defaultValues: references
  });

  const onSubmit = handleSubmit((data) => {
    updateSection(data);
  });

  useEffect(() => {
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form onSubmit={onSubmit}>
      <h2>Referees</h2>
      <p>You must provide references from your two most recent employers. We require references covering your last five years of employment, if 
        you have not had more than one employer in the last five years, we require a further reference. 
        Please provide two character references if you are unable to provide two professional references 
        e.g. in the case of an applicant who has been raising children for ten years.</p>
      
      <p>All will be contacted, therefore please inform the referees of the fact that you have used their name. 
        If you are unable to provide the required references, please discuss the matter with us.</p>

      <p>Please note, we will not apply for references unless you have been offered a position with Cascade, and given us permission to do so.</p>

      <fieldset>
        <legend>Current or most recent employer</legend>
        <label
        className={errors.currentOrMostRecentEmployer?.company ? 'error' : ''}>
          Business Name
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.company", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.company && <p className="error-msg">This field is required</p>}
      
        <label
        className={errors.currentOrMostRecentEmployer?.jobTitle ? 'error' : ''}>
          Job Title
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.jobTitle", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.jobTitle && <p className="error-msg">This field is required</p>}

        <label
        className={errors.currentOrMostRecentEmployer?.name ? 'error' : ''}>
          Name
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.name", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.name && <p className="error-msg">This field is required</p>}

        <label
        className={errors.currentOrMostRecentEmployer?.capacity ? 'error' : ''}>
          Capacity in which known
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.capacity", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.capacity && <p className="error-msg">This field is required</p>}

        <label
        className={errors.currentOrMostRecentEmployer?.email ? 'error' : ''}>
          Email
          <input
            type="email"
            {...register("currentOrMostRecentEmployer.email", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.email && <p className="error-msg">This field is required</p>}

        <label
        className={errors.currentOrMostRecentEmployer?.phone ? 'error' : ''}>
          Tel No.
          <input
            type="tel"
            {...register("currentOrMostRecentEmployer.phone", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.phone && <p className="error-msg">This field is required</p>}

        <label
        className={errors.currentOrMostRecentEmployer?.address?.addressLine1 ? 'error' : ''}>
          Address Line 1
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.address.addressLine1", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.address?.addressLine1 && <p className="error-msg">This field is required</p>}

        <label>
          Address Line 2
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.address.addressLine2")} />
        </label>
        
        <label
        className={errors.currentOrMostRecentEmployer?.address?.town ? 'error' : ''}>
          Town
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.address.town", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.address?.town && <p className="error-msg">This field is required</p>}

        <label>
          County
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.address.county")} />
        </label>

        <label
        className={errors.currentOrMostRecentEmployer?.address?.postcode ? 'error' : ''}>
          Postcode
          <input
            type="text"
            {...register("currentOrMostRecentEmployer.address.postcode", { required: true })} />
        </label>
        {errors.currentOrMostRecentEmployer?.address?.postcode && <p className="error-msg">This field is required</p>}
      </fieldset>

      <fieldset>
        <legend>Previous employer</legend>
        <label
        className={errors.previousEmployer?.company ? 'error' : ''}>
          Business Name
          <input
            type="text"
            {...register("previousEmployer.company", { required: true })} />
        </label>
        {errors.previousEmployer?.company && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.jobTitle ? 'error' : ''}>
          Job Title
          <input
            type="text"
            {...register("previousEmployer.jobTitle", { required: true })} />
        </label>
        {errors.previousEmployer?.jobTitle && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.name ? 'error' : ''}>
          Name
          <input
            type="text"
            {...register("previousEmployer.name", { required: true })} />
        </label>
        {errors.previousEmployer?.name && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.capacity ? 'error' : ''}>
          Capacity in which known
          <input
            type="text"
            {...register("previousEmployer.capacity", { required: true })} />
        </label>
        {errors.previousEmployer?.capacity && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.email ? 'error' : ''}>
          Email
          <input
            type="email"
            {...register("previousEmployer.email", { required: true })} />
        </label>
        {errors.previousEmployer?.email && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.phone ? 'error' : ''}>
          Tel No.
          <input
            type="tel"
            {...register("previousEmployer.phone", { required: true })} />
        </label>
        {errors.previousEmployer?.phone && <p className="error-msg">This field is required</p>}

        <label
        className={errors.previousEmployer?.address?.addressLine1 ? 'error' : ''}>
          Address Line 1
          <input
            type="text"
            {...register("previousEmployer.address.addressLine1", { required: true })} />
        </label>
        {errors.previousEmployer?.address?.addressLine1 && <p className="error-msg">This field is required</p>}

        <label>
          Address Line 2
          <input
            type="text"
            {...register("previousEmployer.address.addressLine2")} />
        </label>
        
        <label
        className={errors.previousEmployer?.address?.town ? 'error' : ''}>
          Town
          <input
            type="text"
            {...register("previousEmployer.address.town", { required: true })} />
        </label>
        {errors.previousEmployer?.address?.town && <p className="error-msg">This field is required</p>}

        <label>
          County
          <input
            type="text"
            {...register("previousEmployer.address.county")} />
        </label>

        <label
        className={errors.previousEmployer?.address?.postcode ? 'error' : ''}>
          Postcode
          <input
            type="text"
            {...register("previousEmployer.address.postcode", { required: true })} />
        </label>
        {errors.previousEmployer?.address?.postcode && <p className="error-msg">This field is required</p>}
      </fieldset>

      <fieldset>
        <legend>Character Reference</legend>
        <label
        className={errors.characterReference?.name ? 'error' : ''}>
          Name
          <input
            type="text"
            {...register("characterReference.name", { required: true })} />
        </label>
        {errors.characterReference?.name && <p className="error-msg">This field is required</p>}

        <label
        className={errors.characterReference?.relationship ? 'error' : ''}>
          Relationship to you
          <input
            type="text"
            {...register("characterReference.relationship", { required: true })} />
        </label>
        {errors.characterReference?.relationship && <p className="error-msg">This field is required</p>}

        <label
        className={errors.characterReference?.email ? 'error' : ''}>
          Email
          <input
            type="email"
            {...register("characterReference.email", { required: true })} />
        </label>
        {errors.characterReference?.email && <p className="error-msg">This field is required</p>}
      
        <label
        className={errors.characterReference?.phone ? 'error' : ''}>
          Tel No.
          <input
            type="tel"
            {...register("characterReference.phone", { required: true })} />
        </label>
        {errors.characterReference?.phone && <p className="error-msg">This field is required</p>}

        <label
        className={errors.characterReference?.address?.addressLine1 ? 'error' : ''}>
          Address Line 1
          <input
            type="text"
            {...register("characterReference.address.addressLine1", { required: true })} />
        </label>
        {errors.characterReference?.address?.addressLine1 && <p className="error-msg">This field is required</p>}

        <label>
          Address Line 2
          <input
            type="text"
            {...register("characterReference.address.addressLine2")} />
        </label>

        <label
        className={errors.characterReference?.address?.town ? 'error' : ''}>
          Town
          <input
            type="text"
            {...register("characterReference.address.town", { required: true })} />
        </label>
        {errors.characterReference?.address?.town && <p className="error-msg">This field is required</p>}

        <label>
          County
          <input
            type="text"
            {...register("characterReference.address.county")} />
        </label>

        <label
        className={errors.characterReference?.address?.postcode ? 'error' : ''}>
          Postcode
          <input
            type="text"
            {...register("characterReference.address.postcode", { required: true })} />
        </label>
        {errors.characterReference?.address?.postcode && <p className="error-msg">This field is required</p>}
      </fieldset>

      <fieldset>
        <legend>Additional Character Reference</legend>
        <label>
          Name
          <input
            type="text"
            {...register("characterReference2.name")} />
        </label>

        <label>
          Relationship to you
          <input
            type="text"
            {...register("characterReference2.relationship")} />
        </label>

        <label>
          Email
          <input
            type="email"
            {...register("characterReference2.email")} />
        </label>

        <label>
          Tel No.
          <input
            type="tel"
            {...register("characterReference2.phone")} />
        </label>

        <label>
          Address Line 1
          <input
            type="text"
            {...register("characterReference2.address.addressLine1")} />
        </label>

        <label>
          Address Line 2
          <input
            type="text"
            {...register("characterReference2.address.addressLine2")} />
        </label>

        <label>
          Town
          <input
            type="text"
            {...register("characterReference2.address.town")} />
        </label>

        <label>
          County
          <input
            type="text"
            {...register("characterReference2.address.county")} />
        </label>

        <label>
          Postcode
          <input
            type="text"
            {...register("characterReference2.address.postcode")} />
        </label>
      </fieldset>

      
      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>
    
    </form>
  );
}

export default RefereesComponent;