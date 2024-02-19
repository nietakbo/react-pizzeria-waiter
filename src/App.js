import { Container } from 'react-bootstrap';
import NavBar from './components/views/NavBar';
import Footer from './components/views/Footer';
import { Route, Routes } from 'react-router-dom';
import Home from './components/pages/Home';
import { fetchTables } from './redux/tableRedux';
import { fetchStatuses } from './redux/statusRedux';
import { useDispatch } from 'react-redux';
import { useEffect, useRef } from 'react';
import TableDetails from './components/pages/TableDetails';
import EditTable from './components/pages/EditTable';
import PageNotFound from './components/pages/PageNotFound';
import AddTable from './components/pages/AddTable';

const App = () => {
  const dispatch = useDispatch();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;

      dispatch(fetchStatuses());
      dispatch(fetchTables());
    }
  }, [dispatch]);

  return (
    <Container>
      <NavBar />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/table/:id'} element={<TableDetails />} />
        <Route path={'/table/update/:id'} element={<EditTable />} />
        <Route path={'/table/add'} element={<AddTable />} />
        <Route path={'*'} element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;