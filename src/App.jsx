import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import { Landing } from "./screens/Landing"

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}