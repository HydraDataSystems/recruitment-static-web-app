export const LblClass = "block text-sm font-medium leading-6 text-gray-900";
export const InputContainerClass = "mt-1 relative rounded-md shadow-sm";
export const InputClass = "mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
export const InputClassError = "mt-2 block w-full rounded-md border-0 py-1.5 px-3 text-red-900 shadow-sm ring-1 ring-inset ring-red-300 placeholder:text-red-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6";
export const SelectClass = "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
export const SelectClassError = "mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-red-600 focus:ring-2 focus:ring-red-600 sm:text-sm sm:leading-6"
export const InputErrorMsgClass = "mt-2 text-sm text-red-600";
export const Btn = "my-2 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
export const Checkbox = "h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600";
export const CheckboxContainer = "flex items-center mr-2";

export const isDateBefore = (date: Date | string, dateToCompare: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  };
  if (typeof dateToCompare === 'string') {
    dateToCompare = new Date(dateToCompare);
  };
  return date.getTime() < dateToCompare.getTime();
}

export const isDateAfter = (date: Date | string, dateToCompare: Date | string): boolean => {
  if (typeof date === 'string') {
    date = new Date(date);
  };
  if (typeof dateToCompare === 'string') {
    dateToCompare = new Date(dateToCompare);
  };
  return date.getTime() > dateToCompare.getTime();
}

