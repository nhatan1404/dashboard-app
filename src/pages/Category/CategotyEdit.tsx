import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Textarea from '../../components/Form/Textarea';
import MainLayout from '../../layouts/MainLayout';
import { CreateCategorySchema } from './CategorySchema';
import {
  updateCategory,
  getListParentCategory,
  getItemCategory,
} from './Category.thunks';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import FormFooter from '../../components/Form/FormFooter';
import { stringToInt } from '../../shared/utils/parse.util';
import { removeCurrentCategory, removeMessage } from './Category.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.category.isLoading,
  category: state.category.category,
  parents: state.category.listParents,
  message: state.category.message,
});

const mapDispatchToProps = {
  getItemCategory,
  updateCategory,
  getListParentCategory,
  removeMessage,
  removeCurrentCategory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface Props extends ConnectedProps<typeof connector> {}

const CategoryEdit = ({
  isLoading,
  category,
  parents,
  message,
  getItemCategory,
  updateCategory,
  getListParentCategory,
  removeCurrentCategory,
  removeMessage,
}: Props) => {
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.CATEGORY.INDEX,
        title: 'Danh Mục',
      },
      {
        link: `${PATH.CATEGORY.EDIT}/${id}`,
        title: 'Sửa Danh Mục',
      },
    ],
    [id],
  );

  type FormValues = {
    title: string;
    note: string;
    parent_id: string;
  };

  const defaultValue = category;

  const handleSubmit = async (data: FormValues) => {
    try {
      await updateCategory(parseInt(id), {
        ...data,
        parent_id: stringToInt(data.parent_id),
      });
      history.push(PATH.CATEGORY.INDEX);
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.CATEGORY.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  useEffect(() => {
    getListParentCategory();
    getItemCategory({ id: parseInt(id) });
  }, [getListParentCategory, getItemCategory, id]);

  useEffect(() => {
    history.block(() => {
      removeCurrentCategory();
    });
  }, [history, removeCurrentCategory]);

  const options: IOption[] = parents.map(({ id, title }) => ({
    label: title,
    value: id,
  }));

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Tạo danh mục'
        defaultValue={defaultValue}
        validationSchema={CreateCategorySchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors } }) => (
          <>
            <InputField
              label='Tên danh mục'
              type='text'
              error={errors.title && errors.title.message}
              {...register('title')}
            />

            <Textarea
              label='Ghi chú'
              error={errors.note && errors.note.message}
              {...register('note')}
            />

            <Select
              label='Danh mục cha'
              error={errors.parent_id && errors.parent_id.message}
              {...register('parent_id')}
              options={options}
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

export default connector(CategoryEdit);
