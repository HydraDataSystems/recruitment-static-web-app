import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useFormState from "../hooks/useFormState";
import {
  Title,
  Para,
  LblClass,
  SelectClass,
  SelectClassError,
  InputContainerClass,
  InputClass,
  InputClassError,
  InputErrorMsgClass,
  Btn
} from '../helpers';
import { Conviction } from "../global";

const ConvictionsComponent = () => {
  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const { sections: { convictions } } = state;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
    watch
  } = useForm({
    defaultValues: convictions
  });

  const onSubmit = handleSubmit((data: Omit<Conviction, "status">) => {
    updateSection(data);
  });

  useEffect(() => {
    if (isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  const isConviction = watch('declaration');

  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Disclosure of Criminal Convictions and Rehabilitation of Offenders Act 1974 and Barred List Checks</h2>
        <p className={Para}>
          The appointment of any member of staff who may have contact with,
          or access to children or vulnerable adults will be subject to a satisfactory disclosure being
          issued by the Disclosure and Barring Service (DBS).
          Where a post meets the eligibility criteria under the Protection of Freedoms Act 2012 for an Enhanced check for regulated activity,
          this check will be required. An Enhanced DBS check will be required where the criteria of Schedule 4
          under the Safeguarding and Vulnerable Groups Act 2006 is met.</p>

        <p className={Para}>Where jobs are exempt from the Rehabilitation of Offenders Act 1974 all cautions and bind overs,
          including those regarded as ‘spent’, must be declared.
          However, the amendments to the Exceptions Order 1975 (2013) and (2020) provide that certain spent convictions and cautions; and youth cautions,
          warnings and reprimands are ‘protected’ and are not subject to disclosure to employers and cannot be taken into account.
          Guidance and criteria on the filtering of these cautions and convictions can be read on the Disclosure and Barring Service website.
          The presence of a criminal record will not necessarily prevent employment.</p>

      </div>
      <div className='space-y-6'>
        <div>
          <label
            htmlFor='declaration'
            className={LblClass}
          >
            Do you have any convictions or cautions (excluding youth cautions, reprimands or warnings) that are not ‘protected’ as defined by the  Ministry of Justice?
          </label>
          <div className={InputContainerClass}>
            <select
              {...register('declaration', { required: true })}
              className={errors.declaration ? SelectClassError : SelectClass}
            >
              <option value="" disabled>Please Select</option>
              <option value="YES">Yes</option>
              <option value="NO">No</option>
            </select>
            {errors.declaration && <span className={InputErrorMsgClass}>This field is required</span>}
          </div>
        </div>
        {isConviction === 'YES' && (
          <div>
            <label
              htmlFor='name'
              className={LblClass}
            >
              Name
            </label>
            <div className={InputContainerClass}>
              <input
                type='text'
                {...register('name', { required: true })}
                className={errors.name ? InputClassError : InputClass}
              />
              {errors.name && <span className={InputErrorMsgClass}>This field is required</span>}
            </div>
          </div>
        )}
        {isConviction === 'YES' && (
          <div>
            <label
              htmlFor='surname'
              className={LblClass}
            >
              Surname
            </label>
            <div className={InputContainerClass}>
              <input
                type='text'
                {...register('surname', { required: true })}
                className={errors.surname ? InputClassError : InputClass}
              />
              {errors.surname && <span className={InputErrorMsgClass}>This field is required</span>}
            </div>
          </div>
        )}
        {isConviction === 'YES' && (
          <div>
            <label
              htmlFor='date'
              className={LblClass}
            >
              Date
            </label>
            <div className={InputContainerClass}>
              <input
                type='date'
                {...register('date', { required: true })}
                className={errors.date ? InputClassError : InputClass}
              />
              {errors.date && <span className={InputErrorMsgClass}>This field is required</span>}
            </div>
          </div>
        )}
        {isConviction === 'YES' && (
          <div>
            <label
              htmlFor='convictionDetail'
              className={LblClass}
            >
              Details or conviction information
            </label>
            <div className={InputContainerClass}>
              <textarea
                {...register('convictionDetail', { required: true })}
                className={errors.convictionDetail ? InputClassError : InputClass}
              />
              {errors.convictionDetail && <span className={InputErrorMsgClass}>This field is required</span>}
            </div>
          </div>
        )}

        <button
          className={Btn}
          onSubmit={onSubmit}
          type="submit">Next</button>
      </div>
    </form>
  );
};

export default ConvictionsComponent;