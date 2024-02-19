import { useSelector } from 'react-redux';
import { Link, Navigate, useParams } from 'react-router-dom';
import { getTableById } from '../../redux/tableRedux';
import { Button } from 'react-bootstrap';

const TableDetails = () => {
  const { id } = useParams();
  const table = useSelector(state => getTableById(state, id));
  if (!table) return <Navigate to='/' />;
  else
    return (
      <div className='ms-2'>
        <h2 className='fs-1'>{table.name}</h2>
        <div className='d-flex my-3'>
          <p style={{ width: '100px' }} className='my-auto'>
            <b>Status: </b>
          </p>
          <p className='my-auto'>{table.status}</p>
        </div>
        <div className='d-flex my-3'>
          <p style={{ width: '100px' }} className='my-auto'>
            <b>People:</b>
          </p>
          <p className='my-auto'>
            {table.status === 'Free' || table.status === 'Clining'
              ? 0
              : table.peopleAmount}
          </p>
          <b className='mx-1'>/</b>
          <p className='my-auto'>{table.maxPeopleAmount}</p>
        </div>
        <div
          className={`my-3 ${table.status === 'Busy' ? 'd-flex' : 'd-none'}`}>
          <p style={{ width: '100px' }} className='my-auto'>
            <b>Bill:</b>
          </p>
          $<p className='my-auto'> {table.bill}</p>
        </div>
        <Button
          as={Link}
          to={`/table/update/${id}`}
          variant='primary'
          className='me-1'>
          Edit
        </Button>
      </div>
    );
};

export default TableDetails;