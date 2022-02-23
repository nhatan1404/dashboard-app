import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import Textarea from '../../components/Form/Textarea';
import MainLayout from '../../layouts/MainLayout';
import { EditAuthorSchema } from './Author.schema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { updateAuthor, getItemAuthor } from './Author.thunks';
import { removeMessage, removeCurrentAuthor } from './Author.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.author.isLoading,
  message: state.author.message,
  author: state.author.author,
});

const mapDispatchToProps = {
  updateAuthor,
  getItemAuthor,
  removeCurrentAuthor,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const AuthorEdit = ({
  isLoading,
  message,
  author,
  updateAuthor,
  getItemAuthor,
  removeCurrentAuthor,
  removeMessage,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.AUTHOR.INDEX,
        title: 'Tác Giả',
      },
      {
        link: `${PATH.AUTHOR.EDIT}/${id}`,
        title: 'Sửa Tác Giả',
      },
    ],
    [id],
  );

  type FormValues = {
    firstname: string;
    lastname: string;
    biography: string;
  };

  const handleSubmit = (data: FormValues) => {
    updateAuthor(parseInt(id), { ...data });
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

  useEffect(() => {
    getItemAuthor({ id: parseInt(id) });
  }, [getItemAuthor, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentAuthor();
    });
  }, [history, removeCurrentAuthor]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Sửa Tác Giả'
        defaultValue={author}
        validationSchema={EditAuthorSchema}
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
              <Button title='Cập nhật' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(AuthorEdit);
