import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route  exact path="/" element={ <Dashboard /> }></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
