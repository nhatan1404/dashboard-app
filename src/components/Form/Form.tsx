import { ReactNode, useEffect } from 'react';
import { useForm, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type IFormProps<TFormValues> = {
  title: string;
  defaultValue: any;
  validationSchema: any;
  onSubmit: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => ReactNode;
};

const Form = <TFormValues extends Record<string, any> = Record<string, any>>({
  title,
  defaultValue,
  validationSchema,
  onSubmit,
  children,
}: IFormProps<TFormValues>) => {
  const methods = useForm<TFormValues>({
    mode: 'onChange',
    resolver: zodResolver(validationSchema),
  });

  // useEffect(() => {
  //   methods.reset(defaultValue);
  // }, [defaultValue, methods]);

  return (
    <section className='section main-section p-6'>
      <form
        method='post'
        onSubmit={methods.handleSubmit(onSubmit)}
        className='md:rounded bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-900'
      >
        <header className='flex items-stretch border-b border-gray-100 dark:border-gray-700'>
          <p className='flex items-center py-3 flex-grow font-bold px-4'>
            <span
              className='inline-flex justify-center items-center w-6 h-6 mr-3'
              data-v-3ca1866b
            ></span>
            {title}
          </p>
        </header>
        <div className='p-6'>{children(methods)}</div>
      </form>
    </section>
  );
};

export default Form;
