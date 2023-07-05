import '../App.scss'
import { Route, Routes } from 'react-router-dom';
import { NoMatch } from './NoMatch';
import { Home } from './Home';
import { JoinGame } from './JoinGame';
import { CreateGame } from './CreateGame';
import { Game } from './Game';

export const Main = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<JoinGame />} />
        <Route path="/create" element={<CreateGame />} />
        <Route path="/game" element={<Game />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </>
  )
}

