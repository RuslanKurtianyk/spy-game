import '../App.scss';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { currentGameIdAtom, currentGameQuery } from '../recoil/game/atom';
import userAtom from '../recoil/user/atom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from './Header';

export const Game = () => {
  const navigate = useNavigate();
  const currentGameId = useRecoilValue(currentGameIdAtom);
  const game = useRecoilValueLoadable(currentGameQuery);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    if (!currentGameId) {
      navigate('/');
    }
  }, []);

  useEffect(() => {
    console.log();
    if (game.state === 'hasError') {
      navigate('/');
    }
  }, [game]);

  return (
    <>
      <Header />
      <h1>Spy Game</h1>
      <h2>This is the game page</h2>
      <div className="card">
        <h3>Your joined the game as {user.name}</h3>
        <h4>Game: {game?.contents.name}</h4>
        <h4>Players:</h4>
        <ul>
          {game.contents.players?.map((player: any) => (
            <li>{player.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
