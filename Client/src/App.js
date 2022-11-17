// import Form from "./components/Form";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
// import GetForm from "./components/GetForm";
import AddForm from "./components/AddForm";
// import Duplicate from "./components/Duplicate";

function App() {
  return (
    <Router>
      <div>
        <ToastContainer />

        <AddForm />

        {/* <Duplicate/> */}
      </div>
    </Router>
  );
}

export default App;
