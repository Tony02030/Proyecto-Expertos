import './App.css';
import { Home } from './components/home/Home';
import { Login } from './components/login/Login';
import { useState } from 'react';
import { NavigationBar } from './components/navigationBar/NavigationBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { IntelligenceTest } from './components/intelligenceTest/IntelligenceTest';
import { Match }  from './components/match/Match';
import { Container } from 'react-bootstrap';

function App() {

  const [user, setUser] = useState([])

  return (
    <div className="App">
      {
        !user.length > 0 ? <Login setUser={setUser}/> 
        : <Router>
            <NavigationBar user={user} setUser={setUser} />
            <Container>
              <Routes>
                  <Route path="/" element={<Home user={user} setUser={setUser}/>} />
                  <Route path="/intelligenceTest" element={<IntelligenceTest />} />
                  <Route path="/match" element={<Match />} />
              </Routes>
            </Container>
          </Router>
      }
    </div>
  );
}

export default App;
