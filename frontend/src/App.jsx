import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route  exact path="/" element={ <Dashboard /> }></Route>
        <Route  exact path="/login" element={ <Login /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
