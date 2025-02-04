import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './components/HomePage/Home';
import Faculty from './components/Faculty/Faculty';
import Student from './components/Student/AuthPage/Student';
import Department from './components/Department/Department';
import Signup from './components/Student/AuthPage/Signup';
import ProtectedRoute from './components/Backend/context/ProtectedRoutes/ProtectedRoute'
import { UserAuthContextProvider } from './components/Backend/context/UserAuthContext';
import AdminProtectedRoute from './components/Backend/context/ProtectedRoutes/AdminProtectedRoute';
import AdminDashboard from './components/Department/AdminDashboard';
import ManageFaculty from './components/Department/ManageFaculty';
import AttendanceSession from './components/Faculty/AttendanceSession';
import Events from './components/OtherPages/Events';
import FacultyProtectedRoute from './components/Backend/context/ProtectedRoutes/FacultyProtectedRoute';
import { AttendanceTable } from './components/Faculty/AttendanceTable';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import StudentMobileNav from './components/Student/MobileNav/StudentMobileNav';
import StudentAttendanceTable from './components/Student/AttendanceDashboard/StudentAttendanceTable';
import CgpaMarksDashboard from './components/Student/CGPA/CgpaMarksDashboard'
import Dashboard from './components/Student/HomePage/Dashboard';
import Course from './components/Student/CourseSection/Course'
import { AttendanceProvider } from './components/Student/AttendanceDashboard/AttendanceContext';
import { useEffect , useState} from 'react';
import HomePageRoute from './components/Backend/context/ProtectedRoutes/HomePageRoute';
import './App.css'
import ProfileStudent from './components/Student/Profile/ProfileStudent';
import StudentTopNavbar from './components/Student/MobileNav/StudentTopNavbar';
import Test from './components/Student/Test/Test';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import FacultyProfile from './components/Faculty/FacultyProfile';
import FacultyMobileNav from './components/Faculty/FacultyMobileNav';
import DataTestFirebase from './components/Faculty/DataTestFirebase';
import NewAttendanceSessionPage from './components/Faculty/NewAttendanceSessionPage';
import CoursePage from './components/Student/CourseSection/CoursePage';
import CourseMaterial from './components/Student/CourseSection/CourseMaterial/CourseMaterial';
import Assignment from './components/Student/CourseSection/Assignment';
import FacultySidebar from './components/Faculty/FacultySidebar';




function App() {


  return (
    <>
     
 
      <BrowserRouter>      
      
      <UserAuthContextProvider>
      <Routes>
        <Route path="/" element = {
          <HomePageRoute>
        
          <Home/>
        </HomePageRoute>
        }/>
        <Route path="/faculty" element = {
     
        <><Faculty /></>
      }/>
        <Route path="/student" element = {<><Student /></>}/>
        <Route path="/student/signup" element = {<><Signup /></>}/>
        <Route path="/department" element = {<HomePageRoute><Department/></HomePageRoute>}/> 
        <Route path="/auth/forgotpassword" element = {<><ForgotPassword /></>}/> 
        <Route path="/testingg" element = {<><DataTestFirebase /></>}/>  
    

        <Route
                path="/student/dashboard" 
                element={
                  <ProtectedRoute >
                    <Dashboard/>
                    <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="student/dashboard/attendance" 
                element={
                  <ProtectedRoute >
                  <AttendanceProvider>
                  <StudentAttendanceTable />
                    <StudentMobileNav/>
                    </AttendanceProvider>
                  </ProtectedRoute>
                }
              />
        <Route
                path="/student/dashboard/course" 
                element={
                  <ProtectedRoute >
                  <Course/>
                  
                   <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
                      <Route
                path="/student/dashboard/course/material" 
                element={
                  <ProtectedRoute >
                  <CourseMaterial/>
                  
                   <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
                                    <Route
                path="/student/dashboard/course/assignment" 
                element={
                  <ProtectedRoute >
                  <Assignment/>
                  
                   <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />
        <Route
                path="/student/dashboard/profile" 
                element={
                  <ProtectedRoute >
                  <ProfileStudent/>
                     <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />

        <Route
                path="/student/dashboard/marks" 
                element={
                  <ProtectedRoute >
                     <CgpaMarksDashboard/>
                     <StudentMobileNav/>
                  </ProtectedRoute>
                }
              />

          <Route
                path="/department/admin-dashboard"
                element={
                  <AdminProtectedRoute >
                    <AdminDashboard/> 
                  </AdminProtectedRoute>
                }
              />

          <Route
                path="/department/admin-dashboard/manage-faculty"
                element={
                  <AdminProtectedRoute >
                    <ManageFaculty/> 
                  </AdminProtectedRoute>
                }
              />
            <Route
                path="/faculty/dashboard" 
                element={
                  <FacultyProtectedRoute>
                    <FacultyDashboard/>
                  </FacultyProtectedRoute>
                }
              />
            <Route
                path="/faculty/dashboard/attendance" 
                element={
                  <FacultyProtectedRoute >
                    <FacultySidebar />
                    <AttendanceSession/>
                  </FacultyProtectedRoute>
                }
              />
                          <Route
                path="/faculty/dashboard/attendance/new" 
                element={
                  <FacultyProtectedRoute >
                    <FacultySidebar/>
                    <NewAttendanceSessionPage/>
                  </FacultyProtectedRoute>
                }
              />
                <Route
                path="/faculty/dashboard/attendance/history" 
                element={
                  <FacultyProtectedRoute >
                  <StudentTopNavbar text={'Export Attendance'} backButton={true} />
                    <AttendanceTable/>
                  </FacultyProtectedRoute>
                }
              />
                      <Route
                path="/faculty/dashboard/profile" 
                element={
                  <FacultyProtectedRoute >
                  <FacultyProfile/>
                  <FacultyMobileNav/>
                  </FacultyProtectedRoute>
                }
              />
            <Route
                path="/events" 
                element={
                    <><Navbar /><Events /></>
                }
              />
        
          </Routes>


      </UserAuthContextProvider>
      
     </BrowserRouter>

     
    </> 
  );
}

export default App;
