import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import MainLayout from '../../layouts/MainLayout';
import { CreateAuthorSchema } from './Author.schema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createAuthor } from './Author.thunks';
import { removeMessage } from './Author.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.author.isLoading,
  message: state.author.message,
});

const mapDispatchToProps = {
  createAuthor,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const AuthorCreate = ({
  isLoading,
  message,
  createAuthor,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.AUTHOR.INDEX,
        title: 'Tác Giả',
      },
      {
        link: PATH.AUTHOR.CREATE,
        title: 'Tạo Tác Giả',
      },
    ],
    [],
  );

  type FormValues = {
    firstname: string;
    lastname: string;
    biography: string;
  };

  const defaultValue: FormValues = {
    firstname: '',
    lastname: '',
    biography: '',
  };

  const handleSubmit = (data: FormValues) => {
    createAuthor({ ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.AUTHOR.INDEX);
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
        title='Tạo Tác Giả'
        defaultValue={defaultValue}
        validationSchema={CreateAuthorSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Họ'
              type='text'
              error={errors.lastname && errors.lastname.message}
              {...register('lastname')}
            />

            <InputField
              label='Tên'
              error={errors.firstname && errors.firstname.message}
              {...register('firstname')}
            />

            <Textarea
              label='Tiểu sử'
              error={errors.biography && errors.biography.message}
              {...register('biography')}
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

export default connector(AuthorCreate);
