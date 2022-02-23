import { useHistory } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { connect, ConnectedProps } from 'react-redux';
import { login } from './Auth.thunks';
import { PATH } from '../../constants/paths';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginSchema } from './LoginSchema';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = {
  login,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface Props extends ConnectedProps<typeof connector> {}

type FormValues = {
  email: string;
  password: string;
};

const Login = ({ isLoading, error, login }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(LoginSchema) });
  const history = useHistory();

  const onSubmit: SubmitHandler<FormValues> = async (
    data: FormValues,
  ): Promise<void> => {
    try {
      await login(data);
      history.push(PATH.HOME);
    } catch (error: PayloadError | any) {}
  };

  return (
    <section className='section main-section -mt-14 lg:-ml-60 px-0 md:px-6 flex h-screen items-center justify-center bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='rounded-lg bg-white border border-gray-100 dark:bg-gray-900 dark:border-gray-900 w-10/12 md:w-5/12 lg:w-5/12 xl:w-3/12 shadow-2xl'
      >
        <div className='p-6'>
          <div className='mb-6 last:mb-0'>
            <label className='block font-bold mb-2'>Email</label>
            <div>
              <div className='relative'>
                <input
                  type='text'
                  placeholder='Nhập email'
                  {...register('email')}
                  className='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800 pl-10'
                />
                <span
                  className='inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400'
                  data-v-3ca1866b
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={16}
                    height={16}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                    />
                  </svg>
                </span>
              </div>
            </div>
            {(errors.email || error) && (
              <div className='text-xs text-red-500 dark:text-red-700 mt-1'>
                {errors.email ? errors.email.message : error.message}
              </div>
            )}
          </div>
          <div className='mb-6 last:mb-0'>
            <label className='block font-bold mb-2'>Mật khẩu</label>
            <div>
              <div className='relative'>
                <input
                  type='password'
                  placeholder='************'
                  {...register('password')}
                  className='px-3 py-2 max-w-full focus:ring focus:outline-none border-gray-700 rounded w-full dark:placeholder-gray-400 h-12 border bg-white dark:bg-gray-800 pl-10'
                />
                <span
                  className='inline-flex justify-center items-center w-10 h-12 absolute top-0 left-0 z-10 pointer-events-none text-gray-500 dark:text-gray-400'
                  data-v-3ca1866b
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={16}
                    height={16}
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
                    />
                  </svg>
                </span>
              </div>
            </div>
            {(errors.password || error) && (
              <div className='text-xs text-red-500 dark:text-red-700 mt-1'>
                {errors.password ? errors.password.message : error.message}
              </div>
            )}
          </div>
          <hr className='my-6 -mx-6 border-t border-gray-100 dark:border-gray-700' />
          <div className='flex items-center justify-start flex-wrap -mb-3'>
            <button
              className='inline-flex cursor-pointer justify-center items-center whitespace-nowrap focus:outline-none transition-colors focus:ring duration-150 border rounded ring-blue-700 p-2 bg-blue-500 text-white border-blue-600 hover:bg-blue-600 mr-3 last:mr-0 mb-3'
              type='submit'
            >
              <span className='px-2'>Đăng Nhập</span>
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default connector(Login);
