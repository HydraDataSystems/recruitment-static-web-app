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
import { isDateBefore, isDateAfter } from '../helpers';
import AccordianItem from '../component/AccordianItem';

interface EmploymentRecordsProps {
  control: Control<EmploymentHistory>;
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
  endDate: ''
}

const EmploymentRecords = ({ control, register, trigger, setValue, getValues, onAddSection, employmentRecords, errors}: EmploymentRecordsProps) => {
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
  }, [employmentRecords]);

  return (
    <>
      <p>Please provide full details of your past employment history, beginning with your current or most recent employer first.</p>

      {fields.length < 1 && <h3>I've had no previous employment</h3>}
      <ul className="accordian">
        {fields.map((item, index) => (
          <AccordianItem 
            key={item.id}
            title={`Employment Record ${item.name ? 'for ' + item.name : index + 1}`}
            active={clicked === index}
            onToggle={() => handleToggle(index)}
            removeItem={() => remove(index)}
            error={errors.employmentRecords?.[index] ? true : false}
          >
            <label 
              className={errors.employmentRecords?.[index]?.name ? 'error' : ''}>
              Company Name
              <input  
                {...register(`employmentRecords.${index}.name`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.name && <p className='error-msg'>Company Name is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.address?.addressLine1 ? 'error' : ''}
            >
              Address Line 1
              <input  
                {...register(`employmentRecords.${index}.address.addressLine1`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.address?.addressLine1 && <p className='error-msg'>Address Line 1 is required</p>}

            <label>
              Address Line 2
              <input  
                {...register(`employmentRecords.${index}.address.addressLine2`)} />
            </label>

            <label
              className={errors.employmentRecords?.[index]?.address?.town ? 'error' : ''}
            >
              Town
              <input 
                 {...register(`employmentRecords.${index}.address.town`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.address?.town && <p className='error-msg'>Town is required</p>}

            <label>
              County
              <input  
                {...register(`employmentRecords.${index}.address.county`)} />
            </label>

            <label
              className={errors.employmentRecords?.[index]?.address?.postcode ? 'error' : ''}
            >
              Postcode
              <input  {...register(`employmentRecords.${index}.address.postcode`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.address?.postcode && <p className='error-msg'>Postcode is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.contact ? 'error' : ''}
            >
              Contact
              <input  {...register(`employmentRecords.${index}.contact`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.contact && <p className='error-msg'>Contact is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.telephone ? 'error' : ''}
            >
              Telephone
              <input  
                {...register(`employmentRecords.${index}.telephone`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.telephone && <p className='error-msg'>Telephone is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.email ? 'error' : ''}
            >
              Email
              <input  
                type="email"
                {...register(`employmentRecords.${index}.email`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.email && <p className='error-msg'>Email is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.position ? 'error' : ''}
            >
              Position
              <input  {...register(`employmentRecords.${index}.position`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.position && <p className='error-msg'>Position is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.reasonForLeaving ? 'error' : ''}
            >
              Reason For Leaving
              <input  {...register(`employmentRecords.${index}.reasonForLeaving`, { required: true })} />
            </label>
            {errors.employmentRecords?.[index]?.reasonForLeaving && <p className='error-msg'>Reason For Leaving is required</p>}

            <label
              className={errors.employmentRecords?.[index]?.startDate ? 'error' : ''}
            >
              Start Date
              <input
                type="date"  
                max={new Date().toISOString().split('T')[0]}
                {...register(`employmentRecords.${index}.startDate`, { 
                  onChange: (e) => { 
                    trigger(`employmentRecords.${index}.startDate`)
                    trigger(`employmentRecords.${index}.endDate`) },
                  required: true,
                  validate: {
                    isBeforeEndDate: (value) => getValues(`employmentRecords.${index}.endDate`) ? isDateBefore(value, getValues(`employmentRecords.${index}.endDate`)) : true,
                    isBeforePreviousStartDate: (value) => getValues(`employmentRecords.${index - 1}.startDate`) ? isDateBefore(value, getValues(`employmentRecords.${index - 1}.startDate`)) : true
                  }
                })} />
            </label>
            {errors.employmentRecords?.[index]?.startDate?.type === 'required' && <p className='error-msg'>Start Date is required</p>}
            {errors.employmentRecords?.[index]?.startDate?.type === 'isBeforeEndDate' && <p className='error-msg'>Start Date must be before End Date</p>}
            {errors.employmentRecords?.[index]?.startDate?.type === 'isBeforePreviousStartDate' && <p className='error-msg'>Start Date must be before previous Start Date</p>}
            <label
              className={errors.employmentRecords?.[index]?.endDate ? 'error' : ''}
            >
              End Date
              <input
                type="date"
                max={new Date().toISOString().split('T')[0]}
                {...register(`employmentRecords.${index}.endDate`, { 
                  onChange: (e) => { 
                    trigger(`employmentRecords.${index}.startDate`) 
                    trigger(`employmentRecords.${index}.endDate`) },
                  required: true,
                  validate: {
                    isAfterStartDate: async (value) => getValues(`employmentRecords.${index}.startDate`) ? isDateAfter(value, getValues(`employmentRecords.${index}.startDate`)) : true,
                    isBeforePreviousStartDate: (value) => getValues(`employmentRecords.${index - 1}.startDate`) ? isDateBefore(value, getValues(`employmentRecords.${index - 1}.startDate`)) : true
                  } 
                })} />
            </label>
            {errors.employmentRecords?.[index]?.endDate?.type === 'required' && <p className='error-msg'>End Date is required</p>}
            {errors.employmentRecords?.[index]?.endDate?.type === 'isAfterStartDate' && <p className='error-msg'>End Date must be after Start Date</p>}
            {errors.employmentRecords?.[index]?.endDate?.type === 'isBeforePreviousStartDate' && <p className='error-msg'>End Date must be before previous Start Date</p>}
          </AccordianItem>
        ))}
      </ul>
     
        
      <button
        className='btn btn--add' 
        type="button" onClick={() => { 
          onAddSection()
          append(defaultEmploymentRecord) 
        }}>
        Add Employment Record
      </button>
    </>
  )
}

const EmploymentHistoryComponent = () => {

  const { state, updateEmploymentHistorySection, nextSection } = useFormState();

  const {
    control, 
    register, 
    handleSubmit, 
    getValues,
    setValue,
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
  }, [isValid, isSubmitSuccessful]);

  const onAddSection = useCallback(() => {
    // if(formRef.current) {
    //   onSubmit();
    // }
  }, [formRef.current]);

  const onSubmit = handleSubmit((data) => {
    updateEmploymentHistorySection(data as EmploymentHistory);

    // if(state.sections.employmentHistory.employmentGaps.length > 0) {
    //   navigate('/employment-gaps');
    // } else {
    //   navigate('/supporting-statement');
    // }
  });

  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <h2>Employment History</h2>

      <EmploymentRecords
        {...{ control, register, setValue, getValues, errors, trigger, onAddSection, employmentRecords }} />

      <button
        className='btn'
        onSubmit={onSubmit}
        type="submit">Next</button>

    </form>
  )
}

export default EmploymentHistoryComponent;