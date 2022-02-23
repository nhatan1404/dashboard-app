import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { EditLanguageSchema } from './LanguageSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { updateLanguage, getItemLanguage } from './Language.thunks';
import { removeMessage, removeCurrentLanguage } from './Language.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.language.isLoading,
  message: state.language.message,
  language: state.language.language,
});

const mapDispatchToProps = {
  updateLanguage,
  getItemLanguage,
  removeMessage,
  removeCurrentLanguage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const LanguageEdit = ({
  isLoading,
  message,
  language,
  updateLanguage,
  getItemLanguage,
  removeMessage,
  removeCurrentLanguage,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.LANGUAGE.INDEX,
        title: 'Ngôn Ngữ',
      },
      {
        link: `${PATH.LANGUAGE.EDIT}/${id}`,
        title: 'Sửa Ngôn Ngữ',
      },
    ],
    [id],
  );

  type FormValues = {
    name: string;
  };

  const handleSubmit = (data: FormValues) => {
    updateLanguage(parseInt(id), { ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.LANGUAGE.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  useEffect(() => {
    getItemLanguage({ id: parseInt(id) });
  }, [getItemLanguage, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentLanguage();
    });
  }, [history, removeCurrentLanguage]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Sửa Ngôn Ngữ'
        defaultValue={language}
        validationSchema={EditLanguageSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tên'
              error={errors.name && errors.name.message}
              {...register('name')}
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

export default connector(LanguageEdit);
