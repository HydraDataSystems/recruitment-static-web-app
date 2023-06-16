import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useFormState from "../hooks/useFormState";

import {
  Title,
  Subtitle,
  Para,
  Btn,
  InputErrorMsgClass,
  LblClass,
} from "../helpers";

const ConsentComponent = () => {
  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const { sections: { consent } } = state;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: consent,
  });

  const onSubmit = handleSubmit((data: any) => {
    updateSection(data);
  });

  useEffect(() => {
    if (isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Social Media and Consent</h2>
        <h3 className={`${Subtitle} mt-12`}>Why we need your consent?</h3>
        <p className={Para}>
          For staff; We would like to pre-screen public information surrounding any Social Media Platforms you hold as part of our pre-screening process.
          We also would like to use your photo on our staff boards, staff files and on our company twitter page.
        </p>
      </div>
      <div>
        <h3 className={Subtitle}>What happens next?</h3>
        <p className={Para}>
          If you are unsure about why we are processing your personal data for the reasons set out above, or what we are doing with it,
          please ask our recruitment manager or your line manager who would be happy to provide more information.
        </p>
        <p className={Para}>
          Please do not check fields on this form until you are happy that you understand its content.
        </p>
        <p className={Para}>
          You can ask us to stop using your personal data in this way at any time by speaking
          to Mr Peter Stillings or by emailing us at <a className="text-indigo-700 hover:text-indigo-500" href="mailto:peter@cascade-care.com">peter@cascade-care.com</a>
          , or Tony Palmer <a className="text-indigo-700 hover:text-indigo-500" href="mailto:tonyp@cascade-care.com">tonyp@cascade-care.com</a>, or you can speak with your homes manager.
        </p>
      </div>
      <div>
        <h3 className={Subtitle}>Your consent</h3>
        <p className={Para}>
          I am happy for a pre-screen check on any social media platforms I hold to be carried out:
        </p>
        <div>
          <label
            htmlFor='prescreen'
            className={LblClass}
          >
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              value="YES"
              {...register("prescreen", { required: true })} />
            Pre-screen of Social Media
          </label>
          {errors.prescreen && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
        <p className={Para}>
          I understand that I can ask you to stop using my photos at a later date by contacting my home manager and I am happy for Cascade to use my photos for:
        </p>
        <div>
          <label
            htmlFor='asdan'
            className={LblClass}
          >
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              value="YES"
              {...register("asdan", { required: true })} />
            ASDAN
          </label>
          {errors.asdan && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
        <div>
          <label
            htmlFor='social'
            className={LblClass}
          >
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              value="YES"
              {...register("social", { required: true })} />
            Social Media (Twitter, Facebook)
          </label>
          {errors.social && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
      </div>
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>
    </form>
  )
};

export default ConsentComponent;
