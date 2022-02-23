import { forwardRef, DetailedHTMLProps, TextareaHTMLAttributes } from 'react';

type TextareaProps = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

interface ITextareaProps extends TextareaProps {
  name: string;
  label: string;
  error: string | undefined;
}

const Textarea = forwardRef<HTMLTextAreaElement, ITextareaProps>(
  (props, ref) => {
    const { name, label, error } = props;
    return (
      <div className='mb-6 last:mb-0'>
        <label htmlFor={name} className='block font-bold mb-2'>
          {label}
        </label>
        <div className=''>
          <div className='relative'>
            <textarea
              ref={ref}
              {...props}
              className='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-24 border bg-white dark:bg-gray-800'
            ></textarea>
          </div>
        </div>
        {error && (
          <div className='text-xs text-red-400 dark:text-gray-400 mt-1'>
            {error}
          </div>
        )}
      </div>
    );
  },
);

export default Textarea;
