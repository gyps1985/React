import "./App.css";
import HeaderNav from "./Component/Header";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <div className="row">
    <div className="col-md-12">
    <Router>
      <HeaderNav />
    </Router>
    </div>
    </div>
  );
}

export default App;
