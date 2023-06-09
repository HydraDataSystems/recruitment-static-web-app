import { 
  useRef, 
  useState, 
  PropsWithChildren, 
  useEffect } from 'react';

import { MdOutlineError } from 'react-icons/md'

import { Btn } from '../helpers';
type AccordianItemProps = {
  title: string;
  active: boolean;
  onToggle: () => void;
  removeItem: () => void;
  error?: boolean;
}

const AccordianItem = ({ title, active, onToggle, removeItem, error = false, children }: PropsWithChildren<AccordianItemProps>) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [, setHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      setHeight(height);
    })

    const ref = contentRef.current;

    setHeight(contentRef.current?.scrollHeight || 0);
    observer.observe(ref!);
    return () => { 
      ref && observer.unobserve(ref) 
    };
  }, []);

  return (
    <li className={`bg-gray-200 overflow-hidden border-gray-200 border ${ active ? "accordian-item--active" : ""}`}>
      <div
        className="flex justify-between items-center accordian-item__header"
        onClick={onToggle}
      >
        <span className="bg-gray-400 p-3 w-8">{ active ? "-" : "+" }</span>
        {title}
        {error && !active && <span className='accordian-item__error'><MdOutlineError /></span>}
        <button 
          className="p-3 w-8 font-bold text-white bg-red-600 hover:bg-red-500"
          type="button" 
          onClick={removeItem}> 
          X
        </button>
        
      </div>
      <div
        className='overflow-hidden transition-all duration-500 ease-in-out'
        style={{ height: active ? contentRef.current?.scrollHeight : "0px" }}
      >
        <div 
          ref={contentRef}
          className='bg-gray-100 p-2'>
          {children}
        </div>
      </div>
    </li>
  );
};

export default AccordianItem;