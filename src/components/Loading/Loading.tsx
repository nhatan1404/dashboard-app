import { FaCircleNotch } from 'react-icons/fa';

const Loading = () => {
  return (
    <section className='section main-section -mt-14 lg:-ml-60'>
      <div className='w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50'>
        <span
          className='text-green-500 opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0'
          style={{ top: '50%' }}
        >
          <FaCircleNotch size={32} className='animate-spin' />
        </span>
      </div>
    </section>
  );
};

export default Loading;
