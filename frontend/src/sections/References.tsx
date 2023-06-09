import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useFormState from "../hooks/useFormState";
import {Btn, InputClass, InputClassError, InputContainerClass, InputErrorMsgClass, LblClass} from "../helpers";

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
      <h2 className='text-sm font-bold my-2'>Referees</h2>
      <p className='text-sm my-2'>You must provide references from your two most recent employers. We require references covering your last five years of employment, if you have not had more than one employer in the last five years, we require a further reference. Please provide two character references if you are unable to provide two professional references e.g. in the case of an applicant who has been raising children for ten years.</p>
      
      <p className='text-sm my-2'>Please note: You must always provide at least one character reference - <strong>Not family.</strong></p>

      {/* Change statement below if school */}
      <p className='text-sm my-2'>All will be contacted, therefore please inform the referees of the fact that you have used their name. If you are unable to provide the required references, please discuss the matter with us.</p>

      <fieldset>
        <legend className="text-md font-bold">Current or most recent employer</legend>
        
        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.company`}
            className={LblClass}>
            Business Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.company ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.company", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.company && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.jobTitle`}
            className={LblClass}>
            Job Title
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.jobTitle ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.jobTitle", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.jobTitle && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.name`}
            className={LblClass}>
            Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.name ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.name", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.name && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.capacity`}
            className={LblClass}>
            Capacity in which known
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.capacity ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.capacity", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.capacity && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.email`}
            className={LblClass}>
            Email
          </label>
          <div className={InputContainerClass}>
            <input
              type="email"
              className={errors.currentOrMostRecentEmployer?.email ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.email", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.email && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.phone`}
            className={LblClass}>
            Tel No.
          </label>
          <div className={InputContainerClass}>
            <input
              type="tel"
              className={errors.currentOrMostRecentEmployer?.phone ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.phone", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.phone && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.address.addressLine1`}
            className={LblClass}>
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.address?.addressLine1 ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.address.addressLine1", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.address?.addressLine1 && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.address.addressLine2`}
            className={LblClass}>
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.address?.addressLine2 ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.address.addressLine2")} />
          </div>
          {errors.currentOrMostRecentEmployer?.address?.addressLine2 && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.address.town`}
            className={LblClass}>
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.address?.town ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.address.town", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.address?.town && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.address.county`}
            className={LblClass}>
            County
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.address?.county ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.address.county")} />
          </div>
          {errors.currentOrMostRecentEmployer?.address?.county && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`currentOrMostRecentEmployer.address.postcode`}
            className={LblClass}>
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.currentOrMostRecentEmployer?.address?.postcode ? InputClassError : InputClass}
              {...register("currentOrMostRecentEmployer.address.postcode", { required: true })} />
          </div>
          {errors.currentOrMostRecentEmployer?.address?.postcode && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-md font-bold">Previous employer</legend>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.company`}
            className={LblClass}>
            Business Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.company ? InputClassError : InputClass}
              {...register("previousEmployer.company", { required: true })} />
          </div>
          {errors.previousEmployer?.company && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.jobTitle`}
            className={LblClass}>
            Job Title
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.jobTitle ? InputClassError : InputClass}
              {...register("previousEmployer.jobTitle", { required: true })} />
          </div>
          {errors.previousEmployer?.jobTitle && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.name`}
            className={LblClass}>
            Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.name ? InputClassError : InputClass}
              {...register("previousEmployer.name", { required: true })} />
          </div>
          {errors.previousEmployer?.name && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.capacity`}
            className={LblClass}>
            Capacity in which known
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.capacity ? InputClassError : InputClass}
              {...register("previousEmployer.capacity", { required: true })} />
          </div>
          {errors.previousEmployer?.capacity && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.email`}
            className={LblClass}>
            Email
          </label>
          <div className={InputContainerClass}>
            <input
              type="email"
              className={errors.previousEmployer?.email ? InputClassError : InputClass}
              {...register("previousEmployer.email", { required: true })} />
          </div>
          {errors.previousEmployer?.email && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.phone`}
            className={LblClass}>
            Tel No.
          </label>
          <div className={InputContainerClass}>
            <input
              type="tel"
              className={errors.previousEmployer?.phone ? InputClassError : InputClass}
              {...register("previousEmployer.phone", { required: true })} />
          </div>
          {errors.previousEmployer?.phone && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.address.addressLine1`}
            className={LblClass}>
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.address?.addressLine1 ? InputClassError : InputClass}
              {...register("previousEmployer.address.addressLine1", { required: true })} />
          </div>
          {errors.previousEmployer?.address?.addressLine1 && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.address.addressLine2`}
            className={LblClass}>
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.address?.addressLine2 ? InputClassError : InputClass}
              {...register("previousEmployer.address.addressLine2")} />
          </div>
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.address.town`}
            className={LblClass}>
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.address?.town ? InputClassError : InputClass}
              {...register("previousEmployer.address.town", { required: true })} />
          </div>
          {errors.previousEmployer?.address?.town && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.address.county`}
            className={LblClass}>
            County
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.address?.county ? InputClassError : InputClass}
              {...register("previousEmployer.address.county")} />
          </div>
        </div>

        <div className="my-2">
          <label
            htmlFor={`previousEmployer.address.postcode`}
            className={LblClass}>
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.previousEmployer?.address?.postcode ? InputClassError : InputClass}
              {...register("previousEmployer.address.postcode", { required: true })} />
          </div>
          {errors.previousEmployer?.address?.postcode && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
      </fieldset>
      
      <fieldset>
        <legend className="text-md font-bold">Character Reference</legend>

        <div className="my-2">
          <label
            htmlFor={`characterReference.name`}
            className={LblClass}>
            Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.name ? InputClassError : InputClass}
              {...register("characterReference.name", { required: true })} />
          </div>
          {errors.characterReference?.name && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.relationship`}
            className={LblClass}>
            Relationship to you
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.relationship ? InputClassError : InputClass}
              {...register("characterReference.relationship", { required: true })} />
          </div>
          {errors.characterReference?.relationship && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.email`}
            className={LblClass}>
            Email
          </label>
          <div className={InputContainerClass}>
            <input
              type="email"
              className={errors.characterReference?.email ? InputClassError : InputClass}
              {...register("characterReference.email", { required: true })} />
          </div>
          {errors.characterReference?.email && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.phone`}
            className={LblClass}>
            Tel No.
          </label>
          <div className={InputContainerClass}>
            <input
              type="tel"
              className={errors.characterReference?.phone ? InputClassError : InputClass}
              {...register("characterReference.phone", { required: true })} />
          </div>
          {errors.characterReference?.phone && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.address.addressLine1`}
            className={LblClass}>
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.address?.addressLine1 ? InputClassError : InputClass}
              {...register("characterReference.address.addressLine1", { required: true })} />
          </div>
          {errors.characterReference?.address?.addressLine1 && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.address.addressLine2`}
            className={LblClass}>
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.address?.addressLine2 ? InputClassError : InputClass}
              {...register("characterReference.address.addressLine2")} />
          </div>
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.address.town`}
            className={LblClass}>
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.address?.town ? InputClassError : InputClass}
              {...register("characterReference.address.town", { required: true })} />
          </div>
          {errors.characterReference?.address?.town && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.address.county`}
            className={LblClass}>
            County
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.address?.county ? InputClassError : InputClass}
              {...register("characterReference.address.county")} />
          </div>
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference.address.postcode`}
            className={LblClass}>
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference?.address?.postcode ? InputClassError : InputClass}
              {...register("characterReference.address.postcode", { required: true })} />
          </div>
          {errors.characterReference?.address?.postcode && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-md font-bold">Additional Character Reference</legend>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.name`}
            className={LblClass}>
            Name
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.name ? InputClassError : InputClass}
              {...register("characterReference2.name", { required: true })} />
          </div>
          {errors.characterReference2?.name && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.relationship`}
            className={LblClass}>
            Relationship to you
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.relationship ? InputClassError : InputClass}
              {...register("characterReference2.relationship", { required: true })} />
          </div>
          {errors.characterReference2?.relationship && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.email`}
            className={LblClass}>
            Email
          </label>
          <div className={InputContainerClass}>
            <input
              type="email"
              className={errors.characterReference2?.email ? InputClassError : InputClass}
              {...register("characterReference2.email", { required: true })} />
          </div>
          {errors.characterReference2?.email && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.phone`}
            className={LblClass}>
            Tel No.
          </label>
          <div className={InputContainerClass}>
            <input
              type="tel"
              className={errors.characterReference2?.phone ? InputClassError : InputClass}
              {...register("characterReference2.phone", { required: true })} />
          </div>
          {errors.characterReference2?.phone && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
          htmlFor={`characterReference2.address.addressLine1`}
          className={LblClass}>
            Address Line 1
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.address?.addressLine1 ? InputClassError : InputClass}
              {...register("characterReference2.address.addressLine1", { required: true })} />
          </div>
          {errors.characterReference2?.address?.addressLine1 && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
        <label
          htmlFor={`characterReference2.address.addressLine2`}
          className={LblClass}>
            Address Line 2
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.address?.addressLine2 ? InputClassError : InputClass}
              {...register("characterReference2.address.addressLine2")} />
          </div>
        </div>

        <div className="my-2">
          <label
          htmlFor={`characterReference2.address.town`}
          className={LblClass}>
            Town
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.address?.town ? InputClassError : InputClass}
              {...register("characterReference2.address.town", { required: true })} />
          </div>
          {errors.characterReference2?.address?.town && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.address.county`}
            className={LblClass}>
            County
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.address?.county ? InputClassError : InputClass}
              {...register("characterReference2.address.county")} />
          </div>
        </div>

        <div className="my-2">
          <label
            htmlFor={`characterReference2.address.postcode`}
            className={LblClass}>
            Postcode
          </label>
          <div className={InputContainerClass}>
            <input
              type="text"
              className={errors.characterReference2?.address?.postcode ? InputClassError : InputClass}
              {...register("characterReference2.address.postcode", { required: true })} />
          </div>
          {errors.characterReference2?.address?.postcode && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>

      </fieldset>

      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    
    </form>
  );
}

export default RefereesComponent;