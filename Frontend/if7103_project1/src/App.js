import './App.css';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
import { useState } from 'react';
import { NavigationBar } from './components/navigationBar/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IntelligenceTest } from './components/intelligenceTest/IntelligenceTest';
import { Match }  from './components/match/Match';
import { Container } from 'react-bootstrap';
import { SignUp } from './components/up/SignUp';

function App() {

  const [idUser, setIdUser] = useState([])
  const [user, setUser] = useState([])

  return (
    <div className="App">
      {
        !user.length > 0 ? 
        <Router>
        <Container>
          <Routes>
              <Route path="/" element={<Login setUser={setUser} setIdUser={setIdUser}/>} />
              <Route path='/signup' element={<SignUp setUser={setUser}/>} />
          </Routes>
        </Container>
        </Router>
        : 
        <Router>
          <NavigationBar setUser={setUser} />
          <Container>
            <Routes>
                <Route path="/" element={<Home user={user}/>} />
                <Route path="/intelligenceTest" element={<IntelligenceTest idUser={idUser}/>} />
                <Route path="/match" element={<Match idUser={idUser}/>} />
            </Routes>
          </Container>
        </Router>
      }
    </div>
  );
}

export default App;
