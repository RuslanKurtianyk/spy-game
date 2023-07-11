import '../App.scss'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { currentGameIdAtom } from '../recoil';
import { Header } from './Header';

export const Home = () => {
  const navigate = useNavigate();
  const [, setCurrentGameId] = useRecoilState(currentGameIdAtom);
  
  useEffect(() => {
    setCurrentGameId('');
  }, []);

  return (
    <>
      <Header />
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

