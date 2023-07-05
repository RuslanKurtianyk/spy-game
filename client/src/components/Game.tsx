import spyLogo from '../assets/spy-logo.svg';
import '../App.scss'
import { useRecoilValue } from 'recoil';
import gameAtom from '../recoil/game/atom';
import userAtom from '../recoil/user/atom';

export const Game = () => {
  const game = useRecoilValue(gameAtom);
  const user = useRecoilValue(userAtom);
  
  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={spyLogo} className="logo" alt="Spy logo" />
        </a>
      </div>
      <h1>Spy Game</h1>
      <h2>This is the game page</h2>
      <div className="card">
        <h3>Your Joined the game as {user.name}</h3>
        <h4>Game: {game.name}</h4>
        <h4>PLayers:</h4>
        <p>
          <ul>
          {game.players.map(player => (<li>{player.name}</li>))}
          </ul>
          </p>
      </div>
    </>
  )
}

