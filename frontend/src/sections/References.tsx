import { 
  BaseSyntheticEvent,
  useEffect,
  useState 
} from "react";
import AccordianItem from "../component/AccordianItem";
import { 
  useForm,
  useFieldArray,
} from "react-hook-form";

import useFormState from "../hooks/useFormState";

import {
  Title,
  Para,
  Btn, 
  InputClass, 
  InputClassError, 
  InputContainerClass, 
  InputErrorMsgClass, 
  SelectClass,
  SelectClassError,
  LblClass} from "../helpers";

import { References, Reference } from "../global";

const defaultReference: Reference<"PROFESSIONAL"> = {
  referenceType: "PROFESSIONAL",
  reference: {
    company: '',
    jobTitle: '',
    name: '',
    capacity: '',
    address: {
      addressLine1: '',
      addressLine2: '',
      town: '',
      county: '',
      postcode: ''
    },
    phone: '',
    email: ''
  }
};

const RefereesComponent = () => {
  const { state, updateSection, nextSection } = useFormState();
  const [formRequirements, setFormRequirements] = useState<string>('');

  const [clicked, setClicked] = useState<number | null>(state.sections.references.entries.length > 0 ? state.sections.references.entries.length - 1 : 0);
  
  const handleToggle = (index: number) => {
    if(clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const { sections: { educationTraining: { qts } } } = state;

  const { 
    register, 
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid, isSubmitSuccessful } } = useForm<References>({
    defaultValues: {
      entries: state.sections.references && state.sections.references.entries.length > 0 ? state.sections.references.entries : [defaultReference],
      status: "INCOMPLETE"
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "entries"
  });

  const watchEntries = watch("entries");

  const requiredEntries = () => {
    let characterCount = 0;
    let professionalCount = 0;
    
    watchEntries.forEach((item) => {
      if(item.referenceType === "CHARACTER") {
        characterCount++;
      }
      if(item.referenceType === "PROFESSIONAL") {
        professionalCount++;
      }
    });
    
    if(characterCount === 2) return true;
    if(professionalCount === 2 && characterCount === 1) return true;
    return false;
  };

  const onSubmit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    
    if(!requiredEntries()) {
      return setFormRequirements('2 professional references and 1 character reference are required. If you are unable to provide 2 professional references, please provide 1 professional reference and 2 character references. Character references must not be a family member.');
    };

    handleSubmit((data) => {
      updateSection(data);
    })(e);
  };

  useEffect(() => {
    if(isValid && isSubmitSuccessful) nextSection();
  }, [isValid, isSubmitSuccessful, nextSection]);

  
  return (
    <form className="space-y-12" onSubmit={onSubmit}>
      <div>
        <h2 className={Title}>Referees</h2>
        <p className={Para}>You must provide references from your two most recent employers. We require references covering your last five years of employment, if you have not had more than one employer in the last five years, we require a further reference. Please provide two character references if you are unable to provide two professional references e.g. in the case of an applicant who has been raising children for ten years.</p>
        
        <p className={Para}>Please note: You must always provide at least one character reference - <strong>Not family.</strong></p>
        
        {qts === "YES" &&
          <p className={Para}>All will be contacted, therefore please inform the referees of the fact that you have used their name. If you are unable to provide the required references, please discuss the matter with us.</p>
        }
      </div>
      
      <ul className="accordian">
      {fields.map((item, index) => (
        <AccordianItem
          key={item.id}
          title={`Record ${index + 1}`}
          active={clicked === index}
          onToggle={() => handleToggle(index)}
          removeItem={() => remove(index)}
          error={errors.entries?.[index] ? true : false}
        >
        <div className="space-y-6"> 
            <div>
              <label 
                className={LblClass}
                htmlFor={`entries[${index}].referenceType`}>Reference Type</label>
              <div className={InputContainerClass}>
                <select
                  className={errors.entries?.[index]?.referenceType ? SelectClassError : SelectClass}
                  {...register(`entries.${index}.referenceType`, { required: true })}>
                  <option value='' disabled>Please select</option>
                  <option value="PROFESSIONAL">Professional</option>
                  <option value="CHARACTER">Character</option>
                </select>
              </div>
            </div>
            {(watchEntries[index].referenceType === "PROFESSIONAL") && (
              <>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.company`}>Business Name</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.company ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.company`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.company && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.jobTitle`}>Job Title</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.jobTitle ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.jobTitle`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.jobTitle && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.name`}>Name</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.name ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.name`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.name && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.capacity`}>Capacity in which known</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.capacity ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.capacity`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.capacity && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.addressLine1`}>Address Line 1</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.addressLine1 ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.addressLine1`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.addressLine1 && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.addressLine2`}>Address Line 2</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.addressLine2 ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.addressLine2`)} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.addressLine2 && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.town`}>Town</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.town ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.town`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.town && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.county`}>County</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.county ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.county`)} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.county && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.postcode`}>Postcode</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.postcode ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.postcode`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.postcode && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.phone`}>Phone</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.phone ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.phone`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.phone && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.email`}>Email</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.email ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.email`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.email && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
              </>
            )}
            {watchEntries[index].referenceType === "CHARACTER" && (
              <>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.name`}>Name</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.name ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.name`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.name && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.relationship`}>Relationship to you</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.relationship ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.relationship`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.relationship && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.addressLine1`}>Address Line 1</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.addressLine1 ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.addressLine1`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.addressLine1 && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                    <label
                      className={LblClass}
                      htmlFor={`entries.${index}.reference.address.addressLine2`}>Address Line 2</label>
                    <div className={InputContainerClass}>
                      <input
                        className={(errors as any).entries?.[index]?.reference?.address?.addressLine2 ? InputClassError : InputClass}
                        type="text"
                        {...register(`entries.${index}.reference.address.addressLine2`)} />
                    </div>
                    {(errors as any).entries?.[index]?.reference?.address?.addressLine2 && (
                      <div className={InputErrorMsgClass}>This is a required field</div>
                    )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.town`}>Town</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.town ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.town`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.town && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                    <label
                      className={LblClass}
                      htmlFor={`entries.${index}.reference.address.county`}>County</label>
                    <div className={InputContainerClass}>
                      <input
                        className={(errors as any).entries?.[index]?.reference?.address?.county ? InputClassError : InputClass}
                        type="text"
                        {...register(`entries.${index}.reference.address.county`)} />
                    </div>
                    {(errors as any).entries?.[index]?.reference?.address?.county && (
                      <div className={InputErrorMsgClass}>This is a required field</div>
                    )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.address.postcode`}>Postcode</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.address?.postcode ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.address.postcode`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.address?.postcode && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>
                <div>
                    <label
                      className={LblClass}
                      htmlFor={`entries.${index}.reference.email`}>Email</label>
                    <div className={InputContainerClass}>
                      <input
                        className={(errors as any).entries?.[index]?.reference?.email ? InputClassError : InputClass}
                        type="email"
                        {...register(`entries.${index}.reference.email`, { required: true })} />
                    </div>
                    {(errors as any).entries?.[index]?.reference?.email && (
                      <div className={InputErrorMsgClass}>This is a required field</div>
                    )}
                </div>
                <div>
                  <label
                    className={LblClass}
                    htmlFor={`entries.${index}.reference.phone`}>Phone</label>
                  <div className={InputContainerClass}>
                    <input
                      className={(errors as any).entries?.[index]?.reference?.phone ? InputClassError : InputClass}
                      type="text"
                      {...register(`entries.${index}.reference.phone`, { required: true })} />
                  </div>
                  {(errors as any).entries?.[index]?.reference?.phone && (
                    <div className={InputErrorMsgClass}>This is a required field</div>
                  )}
                </div>

              </>
            )}
        </div>
        </AccordianItem>
      ))}
      </ul>
      
      <div>
        <button
          className={Btn}
          type="button" onClick={() => { 
            append(defaultReference)
            setClicked(watchEntries.length); 
          }}>
          Add Reference
        </button>
      </div>

      <div className="my-2">
        <div className={`${Para} text-red-500`}>{formRequirements}</div>
        <button
          className={Btn}
          onSubmit={onSubmit}
          type="submit">Next</button>
      </div>
    </form>
  );
}

export default RefereesComponent;