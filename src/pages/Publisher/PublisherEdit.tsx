import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { EditPublisherSchema } from './PublisherSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { updatePublisher, getItemPublisher } from './Publisher.thunks';
import { removeMessage, removeCurrentPublisher } from './Publisher.actions';
import Textarea from '../../components/Form/Textarea';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.publisher.isLoading,
  message: state.publisher.message,
  publisher: state.publisher.publisher,
});

const mapDispatchToProps = {
  updatePublisher,
  getItemPublisher,
  removeMessage,
  removeCurrentPublisher,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const PublisherEdit = ({
  isLoading,
  message,
  publisher,
  updatePublisher,
  getItemPublisher,
  removeMessage,
  removeCurrentPublisher,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.PUBLISHER.INDEX,
        title: 'Nhà Xuất Bản',
      },
      {
        link: `${PATH.PUBLISHER.EDIT}/${id}`,
        title: 'Sửa Nhà Xuất Bản',
      },
    ],
    [id],
  );

  type FormValues = {
    name: string;
    description?: string;
  };

  const handleSubmit = (data: FormValues) => {
    updatePublisher(parseInt(id), { ...data });
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

  useEffect(() => {
    getItemPublisher({ id: parseInt(id) });
  }, [getItemPublisher, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentPublisher();
    });
  }, [history, removeCurrentPublisher]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Sửa Nhà Xuất Bản'
        defaultValue={publisher}
        validationSchema={EditPublisherSchema}
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
              error={errors.description && errors.description.message}
              {...register('description')}
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

export default connector(PublisherEdit);
