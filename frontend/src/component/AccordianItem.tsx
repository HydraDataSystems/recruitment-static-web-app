import { 
  useRef, 
  useState, 
  PropsWithChildren, 
  useEffect } from 'react';

import { MdOutlineError } from 'react-icons/md'

type AccordianItemProps = {
  title: string;
  active: boolean;
  onToggle: () => void;
  removeItem: () => void;
  error?: boolean;
}

const AccordianItem = ({ title, active, onToggle, removeItem, error = false, children }: PropsWithChildren<AccordianItemProps>) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const [height, setHeight] = useState(0);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { height } = entries[0].contentRect;
      setHeight(height);
    })
    setHeight(contentRef.current?.scrollHeight || 0);
    observer.observe(contentRef.current!);
    return () => { 
      contentRef.current && observer.unobserve(contentRef.current) 
    };
  }, []);

  return (
    <li className={`accordian-item ${ active ? "accordian-item--active" : ""}`}>
      <div
        className='accordian-item__toggle'
        onClick={onToggle}
      >
        <span className='accordian-item__toggle-icon'>{ active ? "-" : "+" }</span>
        {title}
        {error && !active && <span className='accordian-item__error'><MdOutlineError /></span>}
        <button 
          className='btn btn--remove'
          type="button" 
          onClick={removeItem}> 
          Delete
        </button>
        
      </div>
      <div
        className='accordian-item__content__wrapper'
        style={{ height: active ? contentRef.current?.scrollHeight : "0px" }}
      >
        <div 
          ref={contentRef}
          className='accordian-item__content'>
          {children}
        </div>
      </div>
    </li>
  );
};

export default AccordianItem;