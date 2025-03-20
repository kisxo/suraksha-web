import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Track from './pages/track/Track';
import Home from './pages/home/Home';


function App() {

  return (
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/track" element={<Track/>} />

        </Routes>
      </BrowserRouter>
    );
}

export default App
