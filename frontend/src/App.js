import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Registre from "./pages/Registre"
import Header from "./components/Header"
import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <main className="container">
     <Router>
       <Header />
       <Routes>
         <Route path="/" element={<Dashboard/>}></Route>
         <Route path="/login" element={<Login/>}></Route>
         <Route path="/registre" element={<Registre/>}></Route>
       </Routes>
     </Router>
     <ToastContainer />
    </main>
  );
}

export default App;
