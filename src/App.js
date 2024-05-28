import './App.css';
import { Routes, Route} from "react-router-dom";
import Home from './Components/Home.tsx';
import Trend from './Components/Trend.tsx';
import Signup from './Components/Signup.tsx';
import Login from './Components/Login.tsx';
import SelectCategory from './Components/SelectCategory.tsx';
import Stats from './Components/Stats.tsx';
import Calculator from './Components/Calculator.tsx';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="" element={<Home />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
          <Route path="select-category" element={<SelectCategory />} />
          <Route path="hotcategories" element={<Trend />} />
          <Route path="hotcategoreis" element={<Stats />} />
          <Route path="calculator" element={<Calculator />} />

          
      </Routes>
    </div>
  );
}

export default App;
