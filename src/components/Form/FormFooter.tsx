import { ReactNode } from 'react';

interface IProps {
  children?: ReactNode;
}

const FormFooter = ({ children }: IProps): JSX.Element => {
  return (
    <>
      <hr className='my-6 -mx-6 border-t border-gray-100 dark:border-gray-700' />
      <div className='flex items-center justify-start flex-wrap -mb-3'>
        {children}
      </div>
    </>
  );
};

export default FormFooter;
