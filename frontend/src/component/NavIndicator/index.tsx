import { Link } from 'react-router-dom';
import { Sections } from '../../global';
import { SECTION_ROUTES } from '../../constants';
import useFormState from '../../hooks/useFormState';

export default function NavIndicator() {

    const { state } = useFormState();
    const { sections, currentSection } = state;
    const sectionKeys = [...Object.keys(sections)];

    return (
        <nav className="flex items-center justify-center p-2 bg-gray-50" aria-label="Progress">
            <p className="text-sm font-medium">
                {sectionKeys.findIndex((section) => section === currentSection) + 1} of {sectionKeys.length}
            </p>
            <ol className="ml-6 flex items-center space-x-4">
                {sectionKeys.map((name) => (
                <li key={name}>
                    {name === currentSection ? (
                    <Link to={SECTION_ROUTES[`${name}`]} className="relative flex items-center justify-center" aria-current="step">
                        <span className="absolute flex h-5 w-5 p-px" aria-hidden="true">
                        <span className="h-full w-full rounded-full bg-indigo-200" />
                        </span>
                        <span className="relative block h-2.5 w-2.5 rounded-full bg-indigo-600" aria-hidden="true" />
                        <span className="sr-only">{name}</span>
                    </Link>
                    ) : sections[name as keyof Sections].status === "COMPLETE" ? (
                    <Link to={SECTION_ROUTES[`${name as keyof Sections}`]} className="block h-2.5 w-2.5 rounded-full bg-indigo-600 hover:bg-indigo-900">
                        <span className="sr-only">{name}</span>
                    </Link>
                    ) : (
                    <Link to={SECTION_ROUTES[`${name as keyof Sections}`]} className="block h-2.5 w-2.5 rounded-full bg-gray-200 hover:bg-gray-400">
                        <span className="sr-only">{name}</span>
                    </Link>
                    )}
                </li>
                ))}
            </ol>
        </nav>
    )
}