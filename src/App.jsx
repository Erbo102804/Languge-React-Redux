import Header from './components/Header'
import Toast from './components/Toast'
import AppRoutes from './routes/AppRoutes'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <Toast />
      <main className="main">
        <div className="container">
          <AppRoutes />
        </div>
      </main>
    </div>
  )
}

export default App
