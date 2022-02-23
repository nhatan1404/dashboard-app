import { Link } from 'react-router-dom';
import { IoPencil, IoTrashOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

interface Props {
  id: number | undefined;
  linkEdit: string;
  onDelete: Function;
}

const TableActionCol = ({ id, linkEdit, onDelete }: Props) => {
  const handleDelete = (id: number | undefined) => {
    Swal.fire({
      title: 'Bạn có muốn xoá không?',
      text: 'Dữ liệu không thể phục hồi sau khi đã xoá!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xác nhận',
      cancelButtonText: 'Huỷ',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await onDelete({ id });
          Swal.fire('Thông báo', 'Xoá thành công', 'success');
        } catch (error) {
          Swal.fire('Thông báo', 'Có lỗi xảy ra', 'error');
        }
      }
    });
  };

  return (
    <td className='actions-cell'>
      <div className='buttons right nowrap'>
        <Link
          className='button small green --jb-modal'
          data-target='sample-modal-2'
          type='button'
          to={`${linkEdit}/${id}`}
        >
          <span className='icon'>
            <IoPencil size={18} />
          </span>
        </Link>
        <button
          className='button small red --jb-modal'
          data-target='sample-modal'
          type='button'
          onClick={() => handleDelete(id)}
        >
          <span className='icon'>
            <IoTrashOutline size={18} />
          </span>
        </button>
      </div>
    </td>
  );
};

export default TableActionCol;
