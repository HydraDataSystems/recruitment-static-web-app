import { Fragment } from 'react';
import useFormState from '../../hooks/useFormState';
import './index.css';

const NavIndicator = () => {

    const { state } = useFormState();

    const { sections, currentSection } = state;

    const sectionKeys = [...Object.keys(sections), "previewForm"];

    const nav = sectionKeys.map((section) => {
        return (
        <Fragment key={section}>    
            <li className={ section === currentSection ? 'nav-indicator__item active' : 'nav-indicator__item'}><a>{section}</a></li>
        </Fragment>   
        )
    });

    return (
        <>
            <div className="nav-indicator">
                <div className='nav-indicator__cell'>
                    <ul className='nav-indicator__list'>
                        {nav}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default NavIndicator;