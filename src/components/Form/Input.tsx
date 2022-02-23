import { forwardRef, DetailedHTMLProps, InputHTMLAttributes } from 'react';

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IInputProps extends InputProps {
  name: string;
  type?: string;
  label: string;
  error: string | undefined;
}

const InputField = forwardRef<HTMLInputElement, IInputProps>((props, ref) => {
  const { name, label, type, error } = props;
  return (
    <div className='mb-6 last:mb-0'>
      <label htmlFor={name} className='block font-bold mb-2'>
        {label}
      </label>
      <div className=''>
        <div className='relative'>
          <input
            type={type}
            ref={ref}
            {...props}
            className='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800'
          />
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

export default InputField;
