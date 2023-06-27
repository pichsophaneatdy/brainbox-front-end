import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {useState, createContext, useEffect} from "react";
import getUserInfo from './util/getUserInfo';
// Pages
import LandingPage from './pages/LandingPage/LandingPage';
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from './pages/Login/Login';
import CourseReview from './pages/CourseReview/CourseReview';
import Review from './pages/Review/Review';
import ChatApp from './pages/Chat/Chat';
import CourseManagement from './pages/CourseManagement/CourseManagement';
import ProfileDetail from './pages/ProfileDetail/ProfileDetail';
// Component
import ProtectedRoute from './component/ProtectedRoute/ProctectedRoute';
import HeaderDashboard from "./component/HeaderDashboard/HeaderDashboard.jsx";
import Network from './pages/Network/Network';

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
            <HeaderDashboard />
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
              <Route 
                path="/courseReview/:courseID"
                element={
                  <CourseReview user={user} />
                }
              />
              <Route 
                path="/reviewForm/:courseID"
                element={
                  <Review user={user} />
                }
              />
              <Route
                path="/chat"
                element={
                  <ChatApp />
                }
              />
              <Route
                path="/courseManagement"
                element={
                  <CourseManagement />
                }
              />
              <Route
                path="/profileDetail"
                element={
                  <ProfileDetail />
                }
              />
              <Route
                path="/network"
                element={
                  <Network />
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