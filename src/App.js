import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, createContext, useEffect} from "react";
import getUserInfo from './util/getUserInfo';
// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from './pages/Login/Login';
// Component
import Header from './component/Header/Header';
import ProtectedRoute from './component/ProtectedRoute/ProctectedRoute';

const UserContext = createContext();

function App() {
  const [user, setUser] = useState({});
  // Load user information to store in the state if the accessToken exists
    useEffect(() => {
        if (localStorage.getItem("accessToken")){
            const fetchUser = async()=> {
                const userInfo = await getUserInfo();
                setUser(userInfo);
            }
            fetchUser();
        }
        
    }, [])
  return (
    <BrowserRouter>
        <UserContext.Provider value={user}>
          <div className="App">
            <Header />
            {/* Header */}
            <Routes>
              <Route path="/" element={<LandingPage setUser={setUser} />} />
              <Route path="/signUp" element={<SignUpPage setUser={setUser} />}/>
              <Route path="/login" element={<Login setUser={setUser} />} />
              {/* Protected Route */}
              <Route 
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </UserContext.Provider>
    </BrowserRouter>
    
    
  );
}

export default App;
export {UserContext};