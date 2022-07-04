import { BrowserRouter, Route, Routes } from "react-router-dom";
import BalanceBox from "./components/BalanceBox";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Product from "./components/Product";
import Register from "./components/Register";


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route  exact path="/" element={ <Dashboard /> }></Route>
        <Route  exact path="/login" element={ <Login /> }></Route>
        <Route  exact path="/balance" element={ <BalanceBox /> }></Route>
        <Route  exact path="/product" element={ <Product /> }></Route>
        <Route  exact path="/register" element={ <Register /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
