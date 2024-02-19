import React from 'react';
import RenderTable from '../features/RenderTable';
import { useSelector } from 'react-redux';
import { getTables } from '../../redux/tableRedux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const table = useSelector(getTables);
  return (
    <>
      <div className='d-flex justify-content-between'>
        <h1>All tables</h1>
        <Button
          as={Link}
          to={`/table/add`}
          variant='outline-primary'
          className='btn-lg d-flex align-items-center px-4'>
          Add table
        </Button>
      </div>
      {table.length === 0 ? <h2>Loading...</h2> : <RenderTable />}
    </>
  );
};

export default Home;