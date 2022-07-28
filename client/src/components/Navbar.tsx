import Wrapper from "../assets/wrappers/Navbar";
import Logo from "./Logo";
import { AiOutlineMenu} from "react-icons/ai"
import useAppContext from "../store/appContext";

const Navbar: React.FC= () => {
  const { user } = useAppContext()
  const nameTag = user?.firstName[0] || "A"

  return (
    <Wrapper>
      <div className="nav-container">

        <div>
            <Logo />
        </div>

        <ul className="nav-items">
          <li>Home</li>
          <li>Take Test</li>
          <li>Check Results</li>
        </ul>

        <div className="btn-div">
          <button className="btn">Get Started</button>
        </div>

        <div className="user">
          <span>{nameTag}</span>
        </div>

        <div className="nav-toggle" aria-label="toggle navigation">
          <AiOutlineMenu />
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
