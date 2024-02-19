import { useSelector } from 'react-redux';
import { getTables } from '../../redux/tableRedux';
import Table from '../common/Table';

const RenderTable = () => {
  const allTables = useSelector(getTables);

  return (
    <div className='d-flex flex-wrap'>
      {allTables.map(table => (
        <Table key={table.id} {...table} />
      ))}
    </div>
  );
};

export default RenderTable;