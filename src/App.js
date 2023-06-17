import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, createContext} from "react";
// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
// Component
import Header from './component/Header/Header';
const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  return (
    <BrowserRouter>
        <UserContext.Provider value={user}>
          <div className="App">
            <Header />
            {/* Header */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signUp" element={<SignUpPage setUser={setUser} />}/>
            </Routes>
          </div>
        </UserContext.Provider>
    </BrowserRouter>
    
    
  );
}

export default App;
export {UserContext};