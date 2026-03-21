import Header from "./_components/header";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      {/* Texto */}
      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Felipe! </h2>
        <p>Segunda-feira, 05 de agosto.</p>
      </div>
    </div>
  );
};

export default Home;
