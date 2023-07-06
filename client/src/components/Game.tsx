import spyLogo from '../assets/spy-logo.svg';
import '../App.scss';
import { useRecoilValue } from 'recoil';
import { currentGameIdAtom, currentGameQuery } from '../recoil/game/atom';
import userAtom from '../recoil/user/atom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Game = () => {
  const navigate = useNavigate();
  const currentGameId = useRecoilValue(currentGameIdAtom);
  const game = useRecoilValue(currentGameQuery);
  const user = useRecoilValue(userAtom);
console.log(game)
  useEffect(() => {
    if (!currentGameId) {
      navigate('/')
      return;
    }
  }, []);

  return (
    <>
      <div>
        <a href="/">
          <img src={spyLogo} className="logo" alt="Spy logo" />
        </a>
      </div>
      <h1>Spy Game</h1>
      <h2>This is the game page</h2>
      <div className="card">

        <h3>Your joined the game as {user.name}</h3>
        <h4>Game: {game.name}</h4>
        <h4>Players:</h4>
        <ul>
          {game.players?.map((player) => (
            <li>{player.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
