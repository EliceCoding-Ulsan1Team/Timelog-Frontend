import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Pages/Main/main-page';
import SettingPage from './Pages/Setting/setting-page';
import LoginPage from './Pages/Login/login-page';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/main' element={<MainPage />} />
          <Route path='/setting' element={<SettingPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
