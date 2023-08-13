import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import OwnerProfile from "../components/Sections/Home/OwnerProfile";
import UserProfile from "../components/Sections/Home/UserProfile";

const Home = ({ windowWidth }) => {
  const { username } = useParams();
  const auth = useSelector((state) => state.auth);

  const Component =
    username === auth.username && auth.isLoggedIn ? (
      <OwnerProfile username={username} windowWidth={windowWidth} />
    ) : (
      <UserProfile username={username} windowWidth={windowWidth} />
    );

  return Component;
};

export default Home;
