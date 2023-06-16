import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import useFormState from '../hooks/useFormState';
import {
    Title,
    Para, 
    Btn, 
    LblClass, 
    SelectClass, 
    SelectClassError, 
    InputContainerClass, 
    InputErrorMsgClass } from '../helpers';

const EqualityActComponent = () => {

    const {
        state,
        updateSection,
        nextSection,
      } = useFormState();

    const { sections: { equalityAct } } = state;

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid, isSubmitSuccessful},
    } = useForm({
        defaultValues: equalityAct 
    });

    const onSubmit = handleSubmit((data: any) => { 
        updateSection(data);
    });

    useEffect(() => {
        if(isValid && isSubmitSuccessful ) nextSection();
    }, [isValid, isSubmitSuccessful, nextSection]);

    return (
        <form className='space-y-12' onSubmit={onSubmit}>
            <div>
                <h2 className={Title}>Equality Act 2010</h2>
                <p className={Para}>
                    Under the Equality Act 2010 the definition of disability is if you have a physical or mental impairment that has a{' '} 
                    'substantial' and 'long-term' adverse effect on your ability to carry out normal day to day activities. Further{' '}
                    information regarding the definition of disability can be found at:
                    <a className="text-indigo-700 hover:text-indigo-500" href="https://www.gov.uk/definition-of-disability-under-equality-act-2010">https://www.gov.uk/definition-of-disability-under-equality-act-2010</a>
                </p>
            </div>

            <fieldset className='space-y-6'>
                <legend className='text-sm font-bold'>Your disabled status</legend>
                <div>
                    <label
                        htmlFor='disability'
                        className={LblClass}
                    >
                        Do you consider that you have a disability as defined by the Equality Act 2010?
                    </label>
                    <div className={InputContainerClass}>
                        <select
                            className={errors.disability ? SelectClassError : SelectClass}
                            {...register('disability', { required: true })}
                        >
                            <option value=''>Please select</option>
                            <option value='YES'>Yes</option>
                            <option value='NO'>No</option>
                        </select>
                    </div>
                    {errors.disability && <p className={InputErrorMsgClass}>Please select an option</p>}
                </div>
                <div>
                    <label
                        htmlFor='adjustments'
                        className={LblClass}
                    >
                        I may require reasonable adjustments to be implemented.
                    </label>
                    <div className={InputContainerClass}>
                        <select
                            className={errors.adjustments ? SelectClassError : SelectClass}
                            {...register('adjustments', { required: true })}
                        >
                            <option value=''>Please select</option>
                            <option value='YES'>Yes</option>
                            <option value='NO'>No</option>
                        </select>
                    </div>
                    {errors.adjustments && <p className={InputErrorMsgClass}>Please select an option</p>}
                </div>
                <div>
                    <label
                        htmlFor='meetRequirements'
                        className={LblClass}
                    >
                        If I have indicated yes above and I am offered the job, I give my consent for my managers to be advised that I would like a meeting to be arranged to discuss adjustments with me in more detail.
                    </label>
                    <div className={InputContainerClass}>
                        <select
                            className={errors.meetRequirements ? SelectClassError : SelectClass}
                            {...register('meetRequirements', { required: true })}
                        >
                            <option value=''>Please select</option>
                            <option value='YES'>Yes</option>
                            <option value='NO'>No</option>
                        </select>
                    </div>
                    {errors.meetRequirements && <p className={InputErrorMsgClass}>Please select an option</p>}
                </div>
            </fieldset>
            
            <div>
                <h2 className={Title}>Information about arrangements to discuss reasonable adjustments</h2>

                <p className={Para}>
                You will be contacted to arrange a convenient time for you to meet to discuss the reasonable adjustments you may need in order to carry out the role and for you to discuss any issues or concerns you may have.
                </p>

                <p className={Para}>
                It would be helpful if you could consider what sort of adjustments may assist you in the roles before this meeting but if you are not sure about this, or do not identify everything you might need at the meeting don’t worry. Once you have taken up your role, your manager will give you the opportunity to discuss further adjustments.
                </p>
            </div>
            <button
                className={Btn}
                onSubmit={onSubmit}
                type="submit">Next</button>
        </form>
    )
}

export default EqualityActComponent;