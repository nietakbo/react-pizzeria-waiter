import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getTableById, updateDataOnServer } from '../../redux/tableRedux';
import { getStatus } from '../../redux/statusRedux';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

const EditTable = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const table = useSelector(state => getTableById(state, id));
  const allStatuses = useSelector(getStatus);
  const [status, setStatus] = useState(table.status);
  const [peopleAmount, setPeopleAmount] = useState(table.peopleAmount);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(table.maxPeopleAmount);
  const [bill, setBill] = useState(table.bill);

  const updatedData = {
    status,
    peopleAmount,
    maxPeopleAmount,
    bill,
  };
  const checkStatus = selected => {
    if (selected === 'Cleaning' || selected === 'Free') {
      setPeopleAmount(0);
    }
  };

  const handleSubmit = () => {
    dispatch(updateDataOnServer(id, updatedData));
    navigate(`/`);
  };

  const validatePeople = value => {
    if (value > 10) {
      setMaxPeopleAmount(10);
    } else {
      setMaxPeopleAmount(value);
      if (maxPeopleAmount < peopleAmount) {
        setPeopleAmount(maxPeopleAmount);
      }
    }
  };
  const {
    register,
    handleSubmit: validate,
    formState: { errors },
  } = useForm();

  if (!table) return <Navigate to='/' />;
  else
    return (
      <form onSubmit={validate(handleSubmit)} className='ms-2'>
        <h2 className='fs-1'>{table.name}</h2>
        <Form.Group className='d-flex my-3'>
          <Form.Label style={{ width: '100px' }} className='my-auto'>
            <b>Status:</b>
          </Form.Label>
          <select
            style={{ width: '150px' }}
            className='ps-1'
            value={status}
            onChange={e => {
              setStatus(e.target.value);
              checkStatus(e.target.value);
              setBill(0);
            }}>
            {allStatuses.map(status => (
              <option key={status.id} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
        </Form.Group>
        <Form.Group className='d-flex my-3'>
          <Form.Label style={{ width: '100px' }} className='my-auto'>
            <b>People:</b>
          </Form.Label>
          <input
            {...register('peopleAmount', {
              required: true,
              min: 0,
              max: maxPeopleAmount,
            })}
            style={{ width: '30px' }}
            className='me-1 ps-1'
            name='peopleAmount'
            value={peopleAmount}
            onChange={e => {
              setPeopleAmount(e.target.value);
            }}
          />
          /
          <input
            {...register('maxPeopleAmount', {
              required: true,
              min: 0,
              max: 10,
            })}
            style={{ width: '30px' }}
            className='ms-1 ps-1'
            value={maxPeopleAmount}
            onChange={e => {
              validatePeople(e.target.value);
            }}
          />
          {errors.peopleAmount && (
            <small className='d-block form-text text-danger ms-2 mt-2'>
              Amount of people is required and should not be greater than{' '}
              {maxPeopleAmount}.
            </small>
          )}
          {errors.maxPeopleAmount && (
            <small className='d-block form-text text-danger ms-2 mt-2'>
              Max amount of people should not be greater than 10
            </small>
          )}
        </Form.Group>
        <Form.Group
          className={`my-3 ${status !== 'Busy' ? 'd-none' : 'd-flex '} `}>
          <Form.Label style={{ width: '100px' }} className='my-auto'>
            <b>Bill:</b>
          </Form.Label>
          $
          <input
            {...register('bill', {
              min: 0,
              pattern: {
                value: /^[0-9]*$/,
              },
            })}
            style={{ width: '60px' }}
            className='ms-1 ps-1'
            value={bill}
            onChange={e => setBill(e.target.value)}
          />
          {errors.bill && (
            <small className='d-block form-text text-danger ms-2 mt-2'>
              Bill should be number and not be lower than 0
            </small>
          )}
        </Form.Group>
        <Button type='submit' className='btn btn-primary me-1'>
          Update
        </Button>
      </form>
    );
};

export default EditTable;