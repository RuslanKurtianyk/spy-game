import { RecoilRoot } from 'recoil';
import { Main } from './components/Main';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <RecoilRoot>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </RecoilRoot>
);

export default App;
