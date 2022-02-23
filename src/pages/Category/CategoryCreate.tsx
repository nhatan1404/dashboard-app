import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import Select from '../../components/Form/Select';
import Textarea from '../../components/Form/Textarea';
import MainLayout from '../../layouts/MainLayout';
import { CreateCategorySchema } from './CategorySchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { createCategory, getListParentCategory } from './Category.thunks';
import { stringToInt } from '../../shared/utils/parse.util';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { removeMessage } from './Category.actions';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.category.isLoading,
  parents: state.category.listParents,
  message: state.category.message,
});

const mapDispatchToProps = {
  createCategory,
  getListParentCategory,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const CategoryCreate = ({
  isLoading,
  parents,
  message,
  createCategory,
  getListParentCategory,
  removeMessage,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.CATEGORY.INDEX,
        title: 'Danh Mục',
      },
      {
        link: PATH.CATEGORY.CREATE,
        title: 'Tạo Danh Mục',
      },
    ],
    [],
  );

  type FormValues = {
    title: string;
    description: string;
    parent: string;
  };

  const defaultValue: FormValues = {
    title: '',
    description: '',
    parent: '',
  };

  const options: IOption[] = parents.map(({ id, title }) => ({
    label: title,
    value: id,
  }));

  const onSubmit = (data: FormValues) => {
    createCategory({
      ...data,
      parent_id: stringToInt(data.parent),
    });
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
  }, [getListParentCategory]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Tạo danh mục'
        defaultValue={defaultValue}
        validationSchema={CreateCategorySchema}
        onSubmit={onSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tên danh mục'
              type='text'
              error={errors.title && errors.title.message}
              {...register('title')}
            />

            <Textarea
              label='Ghi chú'
              error={errors.description && errors.description.message}
              {...register('description')}
            />

            <Select
              label='Danh mục cha'
              error={errors.parent && errors.parent.message}
              {...register('parent')}
              options={options}
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

export default connector(CategoryCreate);
