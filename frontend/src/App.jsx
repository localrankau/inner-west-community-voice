import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './ToastContext'
import HomePage from './pages/HomePage'
import IssueDetailPage from './pages/IssueDetailPage'
import './index.css'

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/issue/:id" element={<IssueDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  )
}
