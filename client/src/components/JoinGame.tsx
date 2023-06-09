import spyLogo from '../assets/spy-logo.svg';
import '../App.scss';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import gameAtom from '../recoil/game/atom';
import userAtom from '../recoil/user/atom';
import { useNavigate } from 'react-router-dom';

export const JoinGame = () => {
  const navigate = useNavigate();
  const [, setGame] = useRecoilState(gameAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const [gameId, setGameId] = useState('');

  const onGameIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGameId(event.target.value);
  };

  const onNickNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUser((currentUser) => ({
      ...currentUser,
      nickName: event.target.value
    }));
  };

  const onGameJoin = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/games/${gameId}/join`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(
            { name: user.name }
        )
        }
      );
      const data = await response.json();
      console.log(data);
      setGame(data);
      navigate('/game');
    } catch(error) {
      // TODO: handle errors
    }

  };

  return (
    <>
      <div>
        <a href="#" target="_blank">
          <img src={spyLogo} className="logo react" alt="Spy logo" />
        </a>
      </div>
      <h1>Spy Game</h1>
      <div className="card">
        <label>
          Enter Game Id:
          <input type="text" value={gameId} onChange={onGameIdChange} />
        </label>
      </div>
      <div className="card">
        <label>
          Enter your nickname:
          <input type="text" value={user?.name} onChange={onNickNameChange} />
        </label>
      </div>
      <div className="card">
        <button onClick={onGameJoin}>Join</button>
      </div>
    </>
  );
};
