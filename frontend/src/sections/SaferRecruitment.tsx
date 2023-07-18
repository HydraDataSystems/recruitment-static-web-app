import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useFormState from "../hooks/useFormState";

import {
  Title,
  Para,
  Btn,
  InputErrorMsgClass,
  LblClass,
} from "../helpers";
import { SaferRecruitment } from "../global";

const SaferRecruitmentComponent = () => {
  const {
    state,
    updateSection,
    nextSection,
  } = useFormState();

  const { sections: { saferRecruitment } } = state;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitSuccessful },
  } = useForm({
    defaultValues: saferRecruitment,
  });

  const onSubmit = handleSubmit((data: Omit<SaferRecruitment, "status">) => {
    updateSection(data);
  });

  useEffect(() => {
    if (isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  return (
    <form className='space-y-12' onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Safer Recruitment</h2>
        <p className={Para}>I certify that I am not disqualified from working with children or subject to sanctions imposed by a regulatory body which would restrict me from applying for this post.</p>
      </div>
      <div>
        <h2 className={Title}>Privacy</h2>
        <p className={Para}>Cascade will only collect data for specified, explicit and legitimate use in relation to the recruitment process.
          By signing this application form you consent to Cascade  holding the information contained within this application form. If successfully shortlisted,
          data will also include shortlisting scoring  and interview records.
          We would like to keep this data until the vacancy is filled.
          (We cannot estimate the exact time period, but we will consider this period over when a candidate accepts our job offer for the position for which we are considering you).
          When that period is over, we will either delete your data or inform you that we would like to keep it in our database for future roles.
          We have privacy policies that you can request for further information.
          Please be assured your data will be securely stored by the Recruitment Manager and only used for the purposes of recruiting for this vacant post.
          You have a right for your data to be forgotten, to rectify or access data, to restrict processing, to withdraw  consent and to be kept informed about the processing of your data.
          If you would like to discuss this further or withdraw your consent at any time please contact the <a className="text-indigo-600" href="mailto:recruitment@cascade-care.com">Recruitment Manager</a> or <a className="text-indigo-600" href="mailto:tonyp@cascade-care.com">Data Protection Officer.</a></p>
      </div>
      <div>
        <h2 className={Title}>Declaration</h2>
        <p className={Para}>The information in this application form is true and complete.
          I agree that any deliberate omission, falsification or misrepresentation in the application form will be grounds for rejecting this application or subsequent dismissal if employed by Cascade.
          Where applicable, I consent that Cascade can seek clarification regarding professional registration details.</p>
      </div>
      <div className='space-y-6'>
        <div>
          <label
            htmlFor='declaration'
            className={LblClass}
          >
            <input
              className='mr-2'
              type='checkbox'
              value={"YES"}
              {...register("declaration", { required: true })}
            />
            I have read and understood the above content and declaration</label>
          {errors.declaration && <p className={InputErrorMsgClass}>This field is required</p>}
        </div>
      </div>
      <button
        className={Btn}
        onSubmit={onSubmit}
        type="submit">Next</button>

    </form>
  );

}

export default SaferRecruitmentComponent;