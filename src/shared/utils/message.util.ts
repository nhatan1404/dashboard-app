const success = (msg: string) => ({
  type: 'success',
  value: msg,
});

const error = (msg: string) => ({
  type: 'error',
  value: msg,
});

const reset = () => ({
  type: '',
  value: '',
});

const Message = { success, error, reset };

export default Message;
