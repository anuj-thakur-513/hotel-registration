import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Alert from './Components/Alert'
import Navbar from './Components/Navbar'
import { lazy, Suspense } from 'react'
import BookingContextProvider from './Context/BookingContext'
import AlertContextProvider from './Context/AlertContext'
const Home = lazy(() => import('./Screens/Home'))
const AddBooking = lazy(() => import('./Screens/AddBooking'))

import './App.css'

const App = () => {
  return (
    <>
      <BookingContextProvider>
        <AlertContextProvider>
          <Navbar />
          <Alert />
          <Suspense fallback={<h2>LOADING.....</h2>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="booking" element={<AddBooking />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </Suspense>
        </AlertContextProvider>
      </BookingContextProvider>
    </>
  )
}

export default App
