import '../App.scss';
import { useRecoilState } from 'recoil';
import { currentGameIdAtom } from '../recoil/game/atom';
import userAtom from '../recoil/user/atom';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { JoinGameFormData } from '../model/join-game-form-data.type';
import { Header } from './Header';

export const JoinGame = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<JoinGameFormData>();
  const [, setUser] = useRecoilState(userAtom);
  const [, setCurrentGameId] = useRecoilState(currentGameIdAtom);

  const onGameJoin = async (formData: JoinGameFormData) => {
    setCurrentGameId(formData.gameId);
    setUser((currentUser) => ({
      ...currentUser,
      name: formData.name,
    }));
    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/games/${formData.gameId}/join`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: formData.name }),
        }
      );

      navigate('/game');
    } catch (error) {
      setCurrentGameId('');
    }
  };

  return (
    <>
      <Header />
      <h1>Spy Game</h1>
      <form onSubmit={handleSubmit(onGameJoin)}>
        <div className="card">
          <label>
            Enter Game Id:
            <input type="text" {...register('gameId')} />
          </label>
        </div>
        <div className="card">
          <label>
            Enter your nickname:
            <input type="text" {...register('name')} />
          </label>
        </div>

        <input type="submit" />
      </form>
    </>
  );
};
