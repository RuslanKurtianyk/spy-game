import spyLogo from '../assets/spy-logo.svg'
import '../App.scss'
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={spyLogo} className="logo react" alt="Spy logo" />
        </a>
      </div>
      <h1>Welcome to Spy Game</h1>
      <div className="card">
        <button onClick={() => navigate('/create')}>
          Create New Game
        </button>
      </div>      
      <div className="card">
        <button onClick={() => navigate('/join')}>
          Join Game
        </button>
      </div>
    </>
  )
}

