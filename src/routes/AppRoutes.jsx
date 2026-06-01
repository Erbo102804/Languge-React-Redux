import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import StudentsPage from '../pages/StudentsPage'
import CoursesPage from '../pages/CoursesPage'
import CourseDetailPage from '../pages/CourseDetailPage'
import SchedulePage from '../pages/SchedulePage'
import AboutPage from '../pages/AboutPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import ProfilePage from '../pages/ProfilePage'

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/students" element={<StudentsPage />} />
      <Route path="/courses" element={<CoursesPage />} />
      <Route path="/courses/:id" element={<CourseDetailPage />} />
      <Route path="/schedule" element={<SchedulePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  )
}

export default AppRoutes
