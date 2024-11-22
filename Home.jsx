const Home = () => {
  const userToken = localStorage.getItem("userToken");
  console.log(userToken);
  return (
    <>
      <div>HOME PAGE</div>
    </>
  );
};

export default Home;
