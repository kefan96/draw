import "./App.css";
import Draw from "./Draw";
import Order from "./Order";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">比武抽签</Link>
            </li>
            <li>
              <Link to="/order">出场顺序</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/order" element={<Order />} />
          <Route path="/" element={<Draw />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
