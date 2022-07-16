import './App.css';
import Home from './components/homepage/homepage.tsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element = {<Home />}>
          </Route>
          <Route path='/Home' element = {<Home />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
