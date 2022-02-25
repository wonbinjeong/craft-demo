import './App.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Networth from './routes/Networth';
import Info from './routes/Info';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Networth/>} />
        <Route path='/info' element={<Info/>} />
      </Routes>
    </Router>
    );
}

export default App;
