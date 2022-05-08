import { useContext } from "react";
import AppContext from "../common/context/appContext";

const Home = (): JSX.Element => {
  const ctx = useContext(AppContext);
  return (
    <>
      <h1>My page</h1>
      <h3>Context Name: {ctx.name}</h3>
    </>
  );
};

export default Home;
