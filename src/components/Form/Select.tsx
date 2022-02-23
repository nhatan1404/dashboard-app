import { forwardRef, DetailedHTMLProps, SelectHTMLAttributes } from 'react';

type SelectProps = DetailedHTMLProps<
  SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & { options: IOption[] };

interface ISelectProps extends SelectProps {
  label: string;
  isGroup?: boolean;
  options: IOption[];
  error: string | undefined;
}

interface IOption {
  label: string;
  value: string | number | string[] | undefined;
  children?: IOption[];
}

const Select = forwardRef<HTMLSelectElement, ISelectProps>((props, ref) => {
  const { label, error, isGroup, options, ...rest } = props;

  const normalOption = () =>
    options.map(({ label, value }, index) => (
      <option key={index} value={value}>
        {label}
      </option>
    ));

  const groupOption = () =>
    options.map(({ label, children }) => (
      <optgroup key={label} label={label}>
        {children &&
          children.map(({ label: childLabel, value }) => (
            <option key={childLabel} value={value}>
              {childLabel}
            </option>
          ))}
      </optgroup>
    ));

  return (
    <div className='mb-6 last:mb-0'>
      <label className='block font-bold mb-2'> {label}</label>
      <div className=''>
        <div className='relative'>
          <select
            ref={ref}
            {...rest}
            className='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800'
          >
            <option value=''>Chọn</option>
            {isGroup ? groupOption() : normalOption()}
          </select>
        </div>
      </div>
      {error && (
        <div className='text-xs text-red-400 dark:text-gray-400 mt-1'>
          {error}
        </div>
      )}
    </div>
  );
});
export default Select;
