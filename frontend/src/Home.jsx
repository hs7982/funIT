import Moviebox from "./Moviebox.jsx";

const Home = () => {
  return (
    <>
      <h1>홈화면</h1>
        <div className="flex-nowrap">
        <Moviebox/><Moviebox/><Moviebox/><Moviebox/><Moviebox/><Moviebox/><Moviebox/><Moviebox/>
        </div>
    </>
  );
};
export default Home;
