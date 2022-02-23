import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { CreateLanguageSchema } from './LanguageSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createLanguage } from './Language.thunks';
import { removeMessage } from './Language.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.language.isLoading,
  message: state.language.message,
});

const mapDispatchToProps = {
  createLanguage,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const LanguageCreate = ({
  isLoading,
  message,
  createLanguage,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.LANGUAGE.INDEX,
        title: 'Ngôn Ngữ',
      },
      {
        link: PATH.LANGUAGE.CREATE,
        title: 'Thêm Ngôn Ngữ',
      },
    ],
    [],
  );

  type FormValues = {
    name: string;
  };

  const defaultValue: FormValues = {
    name: '',
  };

  const handleSubmit = (data: FormValues) => {
    createLanguage({ ...data });
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

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Thêm Ngôn Ngữ'
        defaultValue={defaultValue}
        validationSchema={CreateLanguageSchema}
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
              <Button title='Tạo' />
              <Button type='reset' title='Xoá' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(LanguageCreate);
