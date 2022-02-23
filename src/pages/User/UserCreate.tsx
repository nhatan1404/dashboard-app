import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { CreateUserSchema } from './UserSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createUser } from './User.thunks';
import { removeMessage } from './User.actions';
import { Role, Status } from '../../constants/enum';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.language.isLoading,
  message: state.language.message,
});

const mapDispatchToProps = {
  createUser,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const UserCreate = ({
  isLoading,
  message,
  createUser,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.USER.INDEX,
        title: 'Tài Khoản',
      },
      {
        link: PATH.USER.CREATE,
        title: 'Thêm Tài Khoản',
      },
    ],
    [],
  );

  type FormValues = {
    firstname: string;
    lastname: string;
    password?: string;
    avatar: string;
    address?: string;
    email: string;
    phone: string;
    role: Role;
    status: Status;
  };

  const defaultValue: FormValues = {
    firstname: '',
    lastname: '',
    password: '',
    avatar: '',
    address: '',
    email: '',
    phone: '',
    role: Role.Customer,
    status: Status.ACTIVE,
  };

  const handleSubmit = (data: FormValues) => {
    createUser({ ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.USER.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Thêm Tài Khoản'
        defaultValue={defaultValue}
        validationSchema={CreateUserSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tên'
              error={errors.firstname && errors.firstname.message}
              {...register('firstname')}
            />

            <InputField
              label='Họ'
              error={errors.lastname && errors.lastname.message}
              {...register('lastname')}
            />

            <FormFooter>
              <Button title='Tạo' />
              <Button type='reset' title='Xoá' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(UserCreate);
