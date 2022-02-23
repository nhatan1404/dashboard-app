import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { CreateBookSchema } from './BookSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import FormFooter from '../../components/Form/FormFooter';
import { createBook } from './Book.thunks';
import { Status } from '../../constants/enum';
import { removeMessage } from './Book.actions';
import Textarea from '../../components/Form/Textarea';
import { getListAuthor } from '../Author/Author.thunks';
import { getListLanguage } from '../Language/Language.thunks';
import { getListParentCategory } from '../Category/Category.thunks';
import { getListPublisher } from '../Publisher/Publisher.thunks';
import Select from '../../components/Form/Select';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.book.isLoading,
  message: state.book.message,
  listCategory: state.category.listParents,
  listPublisher: state.publisher.listPublisher,
  listLanguage: state.language.listLanguage,
  listAuthor: state.author.listAuthor,
});

const mapDispatchToProps = {
  createBook,
  removeMessage,
  getListAuthor,
  getListLanguage,
  getListPublisher,
  getListParentCategory,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const BookCreate = ({
  isLoading,
  message,
  listAuthor,
  listCategory,
  listPublisher,
  listLanguage,
  createBook,
  removeMessage,
  getListAuthor,
  getListLanguage,
  getListPublisher,
  getListParentCategory,
}: IProps) => {
  const history = useHistory();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.BOOK.INDEX,
        title: 'Sách',
      },
      {
        link: PATH.BOOK.CREATE,
        title: 'Thêm Sách',
      },
    ],
    [],
  );

  type FormValues = {
    title: string;
    description: string;
    quantity: number;
    sold?: number | 0;
    page_number: number;
    images: string;
    status: Status;
    price: number;
    discount?: number | 0;
    publication_date?: string | '';
    reprint_date?: string | '';
    category_id: string;
    author_id: string;
    publisher_id: string;
    language_id: string;
  };

  const defaultValue = {
    title: '',
    description: '',
    quantity: 0,
    page_number: 0,
    images: '',
    status: Status.ACTIVE,
    price: 0,
    discount: 0,
    publication_date: '',
    reprint_date: '',
    category_id: '',
    author_id: '',
    publisher_id: '',
    language_id: '',
  };

  const handleSubmit = (data: FormValues) => {
    const bookData = JSON.stringify({
      ...data,
      category_id: parseInt(data.category_id),
      language_id: parseInt(data.language_id),
      publisher_id: parseInt(data.publisher_id),
      author_id: parseInt(data.author_id),
    });

    const formData = new FormData();
    formData.append('book', bookData);
    console.log(formData);
    // createBook({
    //   ...data,
    //   category_id: parseInt(data.category_id),
    //   language_id: parseInt(data.language_id),
    //   publisher_id: parseInt(data.publisher_id),
    //   author_id: parseInt(data.author_id),
    // });
  };

  useEffect(() => {
    if (message.type === 'success') {
      history.push(PATH.BOOK.INDEX);
    }
    if (message.type === 'error') {
      toast.error(message.value, {
        onClose: () => removeMessage(),
      });
    }
  }, [history, message, removeMessage]);

  useEffect(() => {
    getListPublisher();
    getListLanguage();
    getListAuthor();
    getListParentCategory();
  }, [getListPublisher, getListLanguage, getListAuthor, getListParentCategory]);

  const optionsLanguage: IOption[] = listLanguage.map((language) => ({
    label: language.name,
    value: language.id,
  }));

  const optionsAuthor: IOption[] = listAuthor.map((author) => ({
    label: `${author.lastname} ${author.firstname}`,
    value: author.id,
  }));

  const optionsPublisher: IOption[] = listPublisher.map((publisher) => ({
    label: publisher.name,
    value: publisher.id,
  }));

  const optionsCategory: IOption[] = listCategory.map((category) => ({
    label: category.title,
    value: category.id,
    children:
      category.children &&
      category.children.map((child: ICategory) => ({
        label: child.title,
        value: child.id,
      })),
  }));

  const optionsStatus: IOption[] = useMemo(
    () => [
      { label: 'Hiển thị', value: Status.ACTIVE },
      { label: 'Ẩn', value: Status.INACTIVE },
    ],
    [],
  );

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <Form<FormValues>
        title='Thêm Sách'
        defaultValue={defaultValue}
        validationSchema={CreateBookSchema}
        onSubmit={handleSubmit}
      >
        {({ register, formState: { errors, isValid } }) => (
          <>
            <InputField
              label='Tiêu đề'
              error={errors.title && errors.title.message}
              {...register('title')}
            />

            <Textarea
              label='Mô tả'
              error={errors.description && errors.description.message}
              {...register('description')}
            />

            <InputField
              label='Ảnh'
              type='file'
              error={errors.images && errors.images.message}
              {...register('images')}
            />

            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
                <InputField
                  label='Số lượng'
                  type='number'
                  error={errors.quantity && errors.quantity.message}
                  {...register('quantity', { valueAsNumber: true })}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <InputField
                  label='Số trang'
                  type='number'
                  error={errors.page_number && errors.page_number.message}
                  {...register('page_number', { valueAsNumber: true })}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <InputField
                  label='Giá'
                  type='number'
                  error={errors.price && errors.price.message}
                  {...register('price', { valueAsNumber: true })}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <InputField
                  label='Chiết khấu'
                  type='number'
                  min={0}
                  max={50}
                  error={errors.discount && errors.discount.message}
                  {...register('discount', { valueAsNumber: true })}
                />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/4 px-3 mb-6 md:mb-0'>
                <Select
                  label='Danh mục'
                  isGroup={true}
                  error={errors.category_id && errors.category_id.message}
                  {...register('category_id')}
                  options={optionsCategory}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <Select
                  label='Tác giả'
                  error={errors.author_id && errors.author_id.message}
                  {...register('author_id')}
                  options={optionsAuthor}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <Select
                  label='Ngôn ngữ'
                  error={errors.language_id && errors.language_id.message}
                  {...register('language_id')}
                  options={optionsLanguage}
                />
              </div>
              <div className='w-full md:w-1/4 px-3'>
                <Select
                  label='Nhà Xuất Bản'
                  error={errors.publisher_id && errors.publisher_id.message}
                  {...register('publisher_id')}
                  options={optionsPublisher}
                />
              </div>
            </div>
            <Select
              label='Trạng thái'
              error={errors.status && errors.status.message}
              {...register('status')}
              options={optionsStatus}
            />
            <FormFooter>
              <Button title='Tạo' />
            </FormFooter>
          </>
        )}
      </Form>
    </MainLayout>
  );
};

export default connector(BookCreate);
