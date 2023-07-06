import spyLogo from '../assets/spy-logo.svg';
import '../App.scss';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { currentGameIdAtom } from '../recoil/game/atom';
import { useNavigate } from 'react-router-dom';
import { GameFormData } from '../model/game-form-data.type';
import userAtom from '../recoil/user/atom';

export const CreateGame = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<GameFormData>();
  const [, setUser] = useRecoilState(userAtom);
  const [, setCurrentGameId] = useRecoilState(currentGameIdAtom);

  const onSubmit = async (formData: GameFormData) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/games`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          status: 'New',
          players: [
            {
              name: formData.admin,
            },
          ],
        }),
      });
      const data = await response.json();
      console.log(data);
      setCurrentGameId(data.id);
      setUser({ name: formData.admin });
      navigate('/game');
    } catch (error) {
      // TODO: handle errors
    }
  };

  return (
    <>
      <div>
        <a href="/" target="_blank">
          <img src={spyLogo} className="logo" alt="Spy logo" />
        </a>
      </div>
      <h1>Spy Game</h1>
      <h2>Create New Game</h2>
      <div className="card">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>
              Enter your name:
              <input type="text" {...register('admin')} />
            </label>
          </div>

          <div>
            <label>
              Enter game name:
              <input type="text" {...register('name')} />
            </label>
          </div>

          <div>
            <label>
              Enter min players count:
              <input defaultValue="3" type="text" {...register('minPlayers')} />
            </label>
          </div>

          <div>
            <label>
              Enter max players count:
              <input
                defaultValue="10"
                type="text"
                {...register('maxPlayers')}
              />
            </label>
          </div>

          <input type="submit" />
        </form>
      </div>
    </>
  );
};
