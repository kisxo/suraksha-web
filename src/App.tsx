import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Track from './pages/track/Track';


function App() {

  return (
      <BrowserRouter>
        <Routes>

        <Route path="/track" element={<Track/>} />

        </Routes>
      </BrowserRouter>
    );
}

export default App
