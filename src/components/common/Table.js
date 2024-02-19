import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DeleteModal from '../features/DeleteModal';
import { useState } from 'react';

const Table = props => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Card
      style={{ width: '100%' }}
      className='border-top-0 border-start-0 border-end-0'>
      <Card.Body className='d-flex px-0'>
        <Card.Title className='my-auto text-center w-25'>
          {props.name}
        </Card.Title>
        <Card.Text className=' d-flex ms-3 my-auto w-75'>
          <b className='me-1'>Status:</b>
          {props.status}
        </Card.Text>
        <div className='ms-auto'>
          <Button
            as={Link}
            to={`/table/${props.id}`}
            variant='primary'
            className='btn-sm w-100 mb-2'>
            Show more
          </Button>
          <Button
            onClick={() => setModalShow(true)}
            variant='danger'
            className='btn-sm w-100'>
            Delete
          </Button>
        </div>
      </Card.Body>
      <DeleteModal
        id={props.id}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </Card>
  );
};

export default Table;