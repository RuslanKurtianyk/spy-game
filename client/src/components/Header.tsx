import spyLogo from '../assets/spy-logo.svg'
import '../App.scss';

export const Header = () => {
  return (
    <>
      <div>
        <a href="#">
          <img src={spyLogo} className="logo react" alt="Spy logo" />
        </a>
      </div>
    </>
  );
};
