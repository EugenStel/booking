import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from "./components/sign-in/sign-in"
// import { ProtectedRoute } from './components/protected-route/ProtectedRoute';
import { BookingPage } from './pages/booking-page.tsx/BookingPage';

export const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/booking" element={<BookingPage />} />
        {/* <Route element={<ProtectedRoute />}>
          <Route path="/booking" element={<BookingPage />} />
        </Route> */}
      </Routes>
    </Router>
  )
}
