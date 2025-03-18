import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Track from './pages/track/Track';


function App() {

  return (
      <div className="bg-animation-container">
          <div className="bg"></div>
      <BrowserRouter>
        <Routes>

        <Route path="/track" element={<Track/>} />

        </Routes>
      </BrowserRouter>
      </div>
    );
}

export default App
