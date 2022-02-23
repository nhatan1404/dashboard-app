import {
  useEffect,
  forwardRef,
  DetailedHTMLProps,
  InputHTMLAttributes,
} from 'react';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { useFormContext } from 'react-hook-form';

type InputFileProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

interface IInputFileProps extends InputFileProps {
  name: string;
  accept?: string;
  label?: string;
}

const InputFile = forwardRef<HTMLInputElement, IInputFileProps>(
  (props, ref) => {
    const { name, label, accept } = props;

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    return (
      <>
        <label
          className='block text-gray-700 text-sm font-bold mb-2 capitalize'
          htmlFor={name}
        >
          {label}
        </label>
        <div {...getRootProps()}>
          <input
            {...props}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id={name}
            {...getInputProps()}
          />
        </div>
      </>
    );
  },
);

export default InputFile;
