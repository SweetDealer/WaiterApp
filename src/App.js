import MainPage from "./components/pages/MainPage/MainPage";
import TablePage from "./components/pages/TablePage/TablePage";
import NotFound from "./components/pages/NotFound/NotFound";
import { Routes, Route } from 'react-router-dom';
import Footer from "./components/views/Footer/Footer";
import Header from "./components/views/Header/Header";
import { Container } from 'react-bootstrap';
import { fetchTables } from "./redux/tablesRedux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <main>
      <Header />
      <Container>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/table/:tableId" element={<TablePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      </Container>
      <Footer />
    </main>
  );
}

export default App;
