import { useEffect, useState } from 'react';

interface IProps {
  isShow: boolean;
  message: string;
  duration?: number;
  callback?: Function;
  type?: string;
}

const FlashMessage = ({
  isShow,
  message,
  duration = 5000,
  callback,
  type = 'blue',
}: IProps) => {
  const [msg, setMsg] = useState(message);
  useEffect(() => {
    setTimeout(() => {
      callback && callback();
    }, duration);
  }, [isShow, duration, callback]);

  return (
    <div
      className={`notification ${type} ${
        isShow ? '' : 'animate-bounce hidden'
      }`}
    >
      <div className='flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 hiden'>
        <div>
          <span className='icon'>
            <i className='mdi mdi-buffer'></i>
          </span>
          <b>{message}</b>
        </div>
      </div>
    </div>
  );
};

export default FlashMessage;
