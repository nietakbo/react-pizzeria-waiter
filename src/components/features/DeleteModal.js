import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { removeTableFromServer } from '../../redux/tableRedux';
import { useDispatch } from 'react-redux';

const DeleteModal = props => {
  const dispatch = useDispatch();
  const handleConfirm = () => {
    dispatch(removeTableFromServer(props.id));
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered>
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Are you sure that you want remove this table?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='w-75'>
          If you click the '<b>Delete</b>' button, you will irreversibly delete
          this table and all related data. You can cancel the request by
          pressing the '<b>Cancel</b>' button.
          <br />
          <br />
          <b>Deleting the table will result in irreversible changes.</b>
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='danger'
          onClick={() => {
            handleConfirm();
          }}>
          Delete
        </Button>
        <Button onClick={props.onHide}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;