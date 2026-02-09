import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StudentsPage from './pages/StudentsPage'
import CoursesPage from './pages/CoursesPage'
import CourseDetailPage from './pages/CourseDetailPage'
import SchedulePage from './pages/SchedulePage'
import AboutPage from './pages/AboutPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
