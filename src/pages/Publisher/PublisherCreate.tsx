import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { CreatePublisherSchema } from './PublisherSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createPublisher } from './Publisher.thunks';
import { removeMessage } from './Publisher.actions';
import Textarea from '../../components/Form/Textarea';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.language.isLoading,
  message: state.publisher.message,
});

const mapDispatchToProps = {
  createPublisher,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const PublisherCreate = ({
  isLoading,
  message,
  createPublisher,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.LANGUAGE.INDEX,
        title: 'Nhà Xuất Bản',
      },
      {
        link: PATH.LANGUAGE.CREATE,
        title: 'Thêm Nhà Xuất Bản',
      },
    ],
    [],
  );

  type FormValues = {
    name: string;
    description?: string;
  };

  const defaultValue: FormValues = {
    name: '',
    description: '',
  };

  const handleSubmit = (data: FormValues) => {
    createPublisher({ ...data });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.PUBLISHER.INDEX);
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
        title='Thêm Nhà Xuất Bản'
        defaultValue={defaultValue}
        validationSchema={CreatePublisherSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tên'
              error={errors.name && errors.name.message}
              {...register('name')}
            />

            <Textarea
              label='Mô tả'
              error={errors.name && errors.name.message}
              {...register('description')}
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

export default connector(PublisherCreate);
