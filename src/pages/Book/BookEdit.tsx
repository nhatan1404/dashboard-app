import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Button from '../../components/Form/Button';
import Form from '../../components/Form/Form';
import InputField from '../../components/Form/Input';
import MainLayout from '../../layouts/MainLayout';
import { EditBookSchema } from './BookSchema';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PATH } from '../../constants/paths';
import { Status } from '../../constants/enum';
import FormFooter from '../../components/Form/FormFooter';
import { updateBook, getItemBook } from './Book.thunks';
import { removeMessage, removeCurrentBook } from './Book.actions';
import Textarea from '../../components/Form/Textarea';
import { getListAuthor } from '../Author/Author.thunks';
import { getListLanguage } from '../Language/Language.thunks';
import { getListParentCategory } from '../Category/Category.thunks';
import { getListPublisher } from '../Publisher/Publisher.thunks';
import Select from '../../components/Form/Select';

const mapStateToProps = (state: AppState) => ({
  isLoading: state.book.isLoading,
  message: state.book.message,
  book: state.book.book,
  listCategory: state.category.listParents,
  listPublisher: state.publisher.listPublisher,
  listLanguage: state.language.listLanguage,
  listAuthor: state.author.listAuthor,
});

const mapDispatchToProps = {
  updateBook,
  getItemBook,
  getListAuthor,
  getListLanguage,
  getListPublisher,
  getListParentCategory,
  removeMessage,
  removeCurrentBook,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
interface IProps extends ConnectedProps<typeof connector> {}

const BookEdit = ({
  isLoading,
  message,
  book,
  listAuthor,
  listCategory,
  listPublisher,
  listLanguage,
  updateBook,
  getItemBook,
  getListAuthor,
  getListLanguage,
  getListPublisher,
  getListParentCategory,
  removeMessage,
  removeCurrentBook,
}: IProps) => {
  const history = useHistory();
  const { id }: { id: string } = useParams();

  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.BOOK.INDEX,
        title: 'Sách',
      },
      {
        link: `${PATH.BOOK.EDIT}/${id}`,
        title: 'Sửa Sách',
      },
    ],
    [id],
  );

  type FormValues = {
    title: string;
    description: string;
    quantity: number;
    sold?: number;
    page_number?: number;
    images?: string;
    status: Status;
    price: number;
    discount?: number;
    publication_date?: string;
    reprint_date?: string;
    category_id: string;
    author_id: string;
    publisher_id: string;
    language_id: string;
  };

  const handleSubmit = (data: FormValues) => {
    updateBook(parseInt(id), {
      ...data,
      category_id: parseInt(data.category_id),
      language_id: parseInt(data.language_id),
      publisher_id: parseInt(data.publisher_id),
      author_id: parseInt(data.author_id),
    });
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
    getItemBook({ id: parseInt(id) });
  }, [
    getListPublisher,
    getListLanguage,
    getListAuthor,
    getListParentCategory,
    getItemBook,
    id,
  ]);

  useEffect(() => {
    history.block(() => {
      removeCurrentBook();
    });
  }, [history, removeCurrentBook]);

  const optionsLanguage: IOption[] = listLanguage.map((language) => ({
    label: language.name,
    value: language.id,
  }));

  const optionsAuthor: IOption[] = listAuthor.map((author) => ({
    label: author.firstname,
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
        title='Sửa Sách'
        defaultValue={
          !book
            ? book
            : {
                ...book,
                status: book.status.toUpperCase() as Status,
              }
        }
        validationSchema={EditBookSchema}
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
              error={errors.images && errors.images.message}
              {...register('images')}
            />

            <InputField
              label='Số lượng'
              type='number'
              error={errors.quantity && errors.quantity.message}
              {...register('quantity', { valueAsNumber: true })}
            />

            <InputField
              label='Giá'
              type='number'
              error={errors.price && errors.price.message}
              {...register('price', { valueAsNumber: true })}
            />

            <InputField
              label='Số trang'
              type='number'
              error={errors.page_number && errors.page_number.message}
              {...register('page_number', { valueAsNumber: true })}
            />

            <InputField
              label='Chiết khấu'
              type='number'
              min={0}
              max={50}
              error={errors.discount && errors.discount.message}
              {...register('discount', { valueAsNumber: true })}
            />

            <Select
              label='Danh mục'
              isGroup={true}
              error={errors.category_id && errors.category_id.message}
              {...register('category_id')}
              options={optionsCategory}
            />

            <Select
              label='Tác giả'
              error={errors.author_id && errors.author_id.message}
              {...register('author_id')}
              options={optionsAuthor}
            />

            <Select
              label='Ngôn ngữ'
              error={errors.language_id && errors.language_id.message}
              {...register('language_id')}
              options={optionsLanguage}
            />

            <Select
              label='Nhà Xuất Bản'
              error={errors.publisher_id && errors.publisher_id.message}
              {...register('publisher_id')}
              options={optionsPublisher}
            />

            <Select
              label='Trạng thái'
              error={errors.status && errors.status.message}
              {...register('status')}
              options={optionsStatus}
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

export default connector(BookEdit);
