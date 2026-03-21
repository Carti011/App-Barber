import Image from "next/image";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return (
    <div>
      {/* Header */}
      <Header />

      <div className="mx-auto max-w-5xl p-5">
        {/* Texto */}
        <h2 className="text-xl font-bold">Olá, Felipe! </h2>
        <p>Segunda-feira, 05 de agosto.</p>

        {/* Busca */}
        <div className="mt-6">
          <Search />
        </div>

        {/* IMAGEM */}
        <div className="relative mt-6 h-[150px] w-full md:h-75">
          <Image
            alt="Agende nos melhores com FSW Barber"
            src="/banner-01.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
