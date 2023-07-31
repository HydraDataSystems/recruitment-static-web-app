import { 
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react';

import { 
  useForm, 
  useFieldArray,
  Control,
  UseFormRegister,
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
  FieldErrors  
} from 'react-hook-form';

import useFormState from '../hooks/useFormState';
import { EmploymentHistory, EmploymentRecord } from '../global';
import AccordianItem from '../component/AccordianItem';

import { 
  Title,
  Para,
  Btn, 
  LblClass, 
  InputClass, 
  InputClassError, 
  InputContainerClass, 
  InputErrorMsgClass 
} from '../helpers';

interface EmploymentRecordsProps {
  control: Control<EmploymentHistory>;
  watch: any;
  register: UseFormRegister<EmploymentHistory>;
  setValue: UseFormSetValue<EmploymentHistory>;
  getValues: UseFormGetValues<EmploymentHistory>;
  trigger: UseFormTrigger<EmploymentHistory>;
  errors: FieldErrors<EmploymentHistory>;
  onAddSection: () => void;
  employmentRecords: EmploymentRecord[];
}

const defaultEmploymentRecord: EmploymentRecord = {
  name: '',
  address: {
    addressLine1: '',
    addressLine2: '',
    town: '',
    county: '',
    postcode: ''
  },
  contact: '',
  telephone: '',
  email: '',
  position: '',
  reasonForLeaving: '',
  startDate: '',
  isCurrentEmployment: false,
  endDate: ''
}

const EmploymentRecords = ({ 
    control, 
    register, 
    trigger, 
    watch,
    setValue, 
    onAddSection, 
    employmentRecords, 
    errors
  }: EmploymentRecordsProps ) => {
  const [clicked, setClicked] = useState<number | null>(employmentRecords.length > 0 ? employmentRecords.length - 1 : 0);
  
  const handleToggle = (index: number) => {
    if(clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  }

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'employmentRecords'
  });

  const employmentEntries = watch('employmentRecords');

  useEffect(() => {
    if(employmentRecords.length > 0) {
      employmentRecords.forEach((record, index) => {
        for(const key in record) {
          if(key === 'address') {
            for(const addressKey in record.address) {
              // @ts-ignore
              setValue(`employmentRecords.${index}.address.${addressKey}`, record.address[addressKey]);
            }
          } else {
            // @ts-ignore
            setValue(`employmentRecords.${index}.${key}`, record[key]);
          }
        }
      });
    }
  }, [employmentRecords, setValue]);

  return (
    <>
      {fields.length < 1 && <h3>I've had no previous employment</h3>}
      <ul className="accordian">
        {fields.map((item, index) => (
          <AccordianItem 
            key={item.id}
            title={`Record ${item.name ? 'for ' + item.name : index + 1}`}
            active={clicked === index}
            onToggle={() => handleToggle(index)}
            removeItem={() => remove(index)}
            error={errors.employmentRecords?.[index] ? true : false}
          >
            <div className="space-y-6">
            <div>
              <label 
                htmlFor={`employmentRecords.${index}.name`}
                className={LblClass}>
                Company Name
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.name ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.name`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.name && <p className={InputErrorMsgClass}>Company Name is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.address.addressLine1`}
                className={LblClass}
              >
                Address Line 1
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.address?.addressLine1 ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.address.addressLine1`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.address?.addressLine1 && <p className={InputErrorMsgClass}>Address Line 1 is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.address.addressLine2`}
                className={LblClass}
              >
                Address Line 2
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.address?.addressLine2 ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.address.addressLine2`)} />
              </div>
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.address.town`}
                className={LblClass}
              >
                Town
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.address?.town ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.address.town`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.address?.town && <p className={InputErrorMsgClass}>Town is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.address.county`}
                className={LblClass}
              >
                County
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.address?.county ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.address.county`)} />
              </div>
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.address.postcode`}
                className={LblClass}
              >
                Postcode
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.address?.postcode ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.address.postcode`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.address?.postcode && <p className={InputErrorMsgClass}>Postcode is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.contact`}
                className={LblClass}>
                Contact Name
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.contact ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.contact`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.contact && <p className={InputErrorMsgClass}>Contact is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.telephone`}
                className={LblClass}
              >
                Telephone
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.telephone ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.telephone`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.telephone && <p className={InputErrorMsgClass}>Telephone is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.email`}
                className={LblClass}
              >
                Email
              </label>
              <div className={InputContainerClass}>
                <input  
                  type="email"
                  className={errors.employmentRecords?.[index]?.email ? InputClassError : InputClass}
                  {...register(`employmentRecords.${index}.email`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.email && <p className={InputErrorMsgClass}>Email is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.position`}
                className={LblClass}
              >
                Position Held
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.position ? InputClassError : InputClass}
                  {...register(`employmentRecords.${index}.position`, { required: true })} />
              </div>
              {errors.employmentRecords?.[index]?.position && <p className={InputErrorMsgClass}>Position is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.reasonForLeaving`}
                className={LblClass}
              >
                Reason For Leaving
              </label>
              <div className={InputContainerClass}>
                <input
                  type="text"
                  className={errors.employmentRecords?.[index]?.reasonForLeaving ? InputClassError : InputClass}  
                  {...register(`employmentRecords.${index}.reasonForLeaving`, { 
                    required: employmentEntries[index].isCurrentEmployment ? false : true 
                  })} />
              </div>
              {errors.employmentRecords?.[index]?.reasonForLeaving && <p className={InputErrorMsgClass}>Reason For Leaving is required</p>}
            </div>

            <div>
              <label
                htmlFor={`employmentRecords.${index}.startDate`}
                className={LblClass}
              >
                Start Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"  
                  className={errors.employmentRecords?.[index]?.startDate ? InputClassError : InputClass}
                  max={new Date().toISOString().split('T')[0]}
                  {...register(`employmentRecords.${index}.startDate`, { 
                    onChange: (e) => { 
                      trigger(`employmentRecords.${index}.startDate`)
                      trigger(`employmentRecords.${index}.endDate`) },
                    required: true,
                    validate: {
                      // isBeforeEndDate: (value) => getValues(`employmentRecords.${index}.endDate`) ? isDateBefore(value, getValues(`employmentRecords.${index}.endDate`)) : true,
                      // isBeforePreviousStartDate: (value) => {
                      //   const startDate = index === 0 ? getValues('currentEmployment.startDate') : getValues(`employmentRecords.${index - 1}.startDate`); 
                      //   return isDateBefore(value, startDate);
                      // }
                    }
                  })} />
              </div>
              {errors.employmentRecords?.[index]?.startDate?.type === 'required' && <p className={InputErrorMsgClass}>Start Date is required</p>}
              {errors.employmentRecords?.[index]?.startDate?.type === 'isBeforeEndDate' && <p className={InputErrorMsgClass}>Start Date must be before End Date</p>}
              {errors.employmentRecords?.[index]?.startDate?.type === 'isBeforePreviousStartDate' && <p className={InputErrorMsgClass}>Start Date must be before previous Start Date</p>}
            </div>
            
            <div>
              <label
                htmlFor={`employmentRecords.${index}.currentEmployment`}
                className={LblClass}>
                  <input
                    type="checkbox"
                    className="mr-2"
                    {...register(`employmentRecords.${index}.isCurrentEmployment`, {
                      onChange: (e) => {
                        if(e.target.checked) {
                          //@ts-ignore
                          setValue(`employmentRecords.${index}.endDate`, null);
                        }
                        if(!e.target.checked) {
                          setValue(`employmentRecords.${index}.endDate`, '');
                        }
                      }
                    })} />
                    I am currently employed here.
                </label>
            </div>
            
            {!employmentEntries[index].isCurrentEmployment &&
              <div>
              <label
                htmlFor={`employmentRecords.${index}.endDate`}
                className={LblClass}
              >
                End Date
              </label>
              <div className={InputContainerClass}>
                <input
                  type="date"
                  className={errors.employmentRecords?.[index]?.endDate ? InputClassError : InputClass}
                  max={new Date().toISOString().split('T')[0]}
                  {...register(`employmentRecords.${index}.endDate`, { 
                    onChange: (e) => { 
                      trigger(`employmentRecords.${index}.startDate`) 
                      trigger(`employmentRecords.${index}.endDate`) },
                    required: true,
                    validate: {
                      //isAfterStartDate: async (value) => getValues(`employmentRecords.${index}.startDate`) ? isDateAfter(value, getValues(`employmentRecords.${index}.startDate`)) : true,
                      //isBeforePreviousStartDate: (value) => getValues(`employmentRecords.${index - 1}.startDate`) ? isDateBefore(value, getValues(`employmentRecords.${index - 1}.startDate`)) : true
                    } 
                  })} />
              </div>
              {errors.employmentRecords?.[index]?.endDate?.type === 'required' && <p className={InputErrorMsgClass}>End Date is required</p>}
              {errors.employmentRecords?.[index]?.endDate?.type === 'isAfterStartDate' && <p className={InputErrorMsgClass}>End Date must be after Start Date</p>}
              {errors.employmentRecords?.[index]?.endDate?.type === 'isBeforePreviousStartDate' && <p className={InputErrorMsgClass}>End Date must be before previous Start Date</p>}
            </div>}
            </div>
          </AccordianItem>
        ))}
      </ul>
     
        
      <button
        className={Btn}
        type="button" onClick={() => { 
          onAddSection()
          append(defaultEmploymentRecord) 
          setClicked(employmentEntries.length);
        }}>
        Add Employment Record
      </button>
    </>
  )
}

const EmploymentHistoryComponent = () => {

  const { 
    state, 
    updateEmploymentHistorySection, 
    nextSection 
  } = useFormState();

  const {
    control, 
    register, 
    handleSubmit, 
    getValues,
    setValue,
    watch,
    trigger,
    formState: { errors, isValid, isSubmitSuccessful } } = useForm<EmploymentHistory>({ defaultValues: {
      employmentRecords: state.sections.employmentHistory.employmentRecords.length > 0 
        ? [...state.sections.employmentHistory.employmentRecords] 
        : [defaultEmploymentRecord]
    }});
  
  const formRef = useRef<HTMLFormElement>(null);

  const { sections: { employmentHistory: { employmentRecords } } } = state;

  useEffect(() => {
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  const onAddSection = useCallback(() => {
    // if(formRef.current) {
    //   onSubmit();
    // }
  }, []);

  const onSubmit = handleSubmit((data) => {
    updateEmploymentHistorySection(data as EmploymentHistory);

    // if(state.sections.employmentHistory.employmentGaps.length > 0) {
    //   navigate('/employment-gaps');
    // } else {
    //   navigate('/supporting-statement');
    // }
  });

  return (
    <form
      className="space-y-12" 
      ref={formRef} 
      onSubmit={onSubmit}>
      
      <div>
        <h2 className={Title}>Employment History</h2>
        <p className={Para}>Please list all employment, starting with the most recent, including self-employment and periods of voluntary work since leaving full time education.</p>
        <p className={Para}>Although not all jobs you have held may seem relevant to your application, it is important for you to give as much information as you can as you may have developed transferable skills in the job which you can highlight later in your application. Also, many jobs are subject to a Disclosure and Barring Service (DBS) check and it is important to demonstrate that there are not unexplained gaps in your career.</p>
      </div>

      <EmploymentRecords
        {...{ control, register, setValue, getValues, errors, trigger, onAddSection, employmentRecords, watch }} />

      <div className="my-2">
        <button
          className={Btn}
          onSubmit={onSubmit}
          type="submit">Next</button>
      </div>
    </form>
  )
}

export default EmploymentHistoryComponent;