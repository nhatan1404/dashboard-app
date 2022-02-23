import { useEffect, useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import FlashMessage from '../../components/Notification/FlashMessage';
import Breadcrumb from '../../components/Shared/Breadcrumb';
import Table from '../../components/Table/Table';
import TableActionCol from '../../components/Table/TableActionCol';
import { PATH } from '../../constants/paths';
import MainLayout from '../../layouts/MainLayout';
import { useQueryTable, HandleQueryTable, IQueryTable } from '../../shared/hooks/useQueryTable';
import { removeMessage } from './Language.actions';
import { deleteLanguage, getListLanguage } from './Language.thunks';

const mapStateToProps = (state: AppState) => ({
  listLanguage: state.language.listLanguage,
  pagination: state.language.pagination,
  message: state.language.message,
});

const mapDispatchToProps = {
  getListLanguage,
  deleteLanguage,
  removeMessage,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

interface IProps extends ConnectedProps<typeof connector> {}

const LanguageList = ({
  listLanguage,
  pagination,
  message,
  getListLanguage,
  deleteLanguage,
  removeMessage,
}: IProps) => {
  const breadcrumb: LinkBreadcrumb[] = useMemo(
    () => [
      {
        link: PATH.LANGUAGE.INDEX,
        title: 'Ngôn Ngữ',
      },
    ],
    [],
  );

  const columns: ColumnTable[] = useMemo(
    () => [
      {
        header: 'Mã',
        accessor: 'id',
      },
      {
        header: 'Tên',
        accessor: 'name',
      },
    ],
    [],
  );

  const [queryTable, handleQuery] = useQueryTable({ page: 1, limit: 10 });

  useEffect(() => {
    getListLanguage();
  }, [getListLanguage]);

  return (
    <MainLayout>
      <Breadcrumb value={breadcrumb} />
      <FlashMessage
        isShow={message.type !== ''}
        callback={removeMessage}
        message={message.value}
      />
      <Table
        name='Ngôn Ngữ'
        columns={columns}
        linkCreate={PATH.LANGUAGE.CREATE}
        pagination={pagination}
        handleQuery={handleQuery as HandleQueryTable}
        query={queryTable as IQueryTable}
      >
        {listLanguage &&
          listLanguage.map((language) => (
            <tr key={language.id}>
              <td className='checkbox-cell'>
                <label className='checkbox'>
                  <input type='checkbox' />
                  <span className='check' />
                </label>
              </td>
              <td data-label={columns[0].header}>{language.id}</td>
              <td data-label={columns[1].header}>{language.name}</td>
              <TableActionCol
                id={language.id}
                linkEdit={PATH.LANGUAGE.EDIT}
                onDelete={deleteLanguage}
              />
            </tr>
          ))}
      </Table>
    </MainLayout>
  );
};

export default connector(LanguageList);
