import type { NextPage } from "next";
import Image from "next/image";
import Header from "../components/Header";

import bannerGeaan from "../../public/images/bannerGeaan.png";
import lotes from "../../public/images/lotes.png";
import waves from "../../public/images/wave.png";
import CardBuyTickets from "../components/CardBuyTickets";
import { useEffect, useState } from "react";

import { AiOutlineCalendar } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";

const Home: NextPage = () => {
  const [changeColor, setChangeColor] = useState(false);

  useEffect(() => {
    function positionScroll() {
      if (window.scrollY > 20) {
        setChangeColor(true);
      } else {
        setChangeColor(false);
      }
    }

    window.addEventListener("scroll", positionScroll);
  }, []);

  return (
    <>
      <div className="bg-logo-back-img w-full h-screen bg-cover absolute top-0 ">
        <div className="w-full h-full bg-gradient-to-b from-transparent  to-gray-300"></div>
      </div>
      <Header changeColor={changeColor} />
      <div className="relative  w-full min-h-screen ">
        <div className="backdrop-blur-3xl w-full min-h-[calc(100vh-79px)] mt-[79px] lg:px-6 xl:px-0">
          <div className="pt-6">
            <div className=" relative h-[170px] sm:h-[250px] w-full max-w-[768px] overflow-hidden rounded-lg mx-auto md:h-[250px] lg:h-[400px] lg:container">
              <Image src={bannerGeaan} alt="Banner" layout="fill" />
            </div>
          </div>
          <div className="bg-white mt-6 flex flex-col px-6 py-12 max-w-[768px] mx-auto rounded-lg lg:container lg:justify-between lg:flex-row">
            <div className="lg:w-3/4">
              <h1 className="lg:mb-6 lg: text-left">
                1° Congresso de palestras de gado de leite do Grupo de Estudos
                Gean Leite - Belo Horizonte 2022
              </h1>

              <span className=" text-center mt-6 text-text-gray flex items-center">
                <AiOutlineCalendar size={20} className="text-text-gray mr-3" />
                17/10/2022 - 18:00 - 22:00 GMT-3 <br />
              </span>
              <span className="mt-3 text-center text-text-gray flex">
                <BsPersonCheck size={20} className="text-text-gray mr-3" />
                Este é um evento presencial
              </span>
            </div>

            <div className="flex justify-center items-center mt-12 lg:w-1/4 lg:h-full">
              <button className="bg-primary-500 py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 ">
                REALIZAR INSCRIÇÃO
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white py-12 px-6 max-w-[768px] mx-auto rounded-lg lg:container">
            <div className="max-w-[768px] mx-auto">
              <h1 className="text-center">Sobre o evento</h1>
              <p className="text-justify mt-6 leading-relaxed">
                Sejam bem vindos ao{" "}
                <span className="font-semibold">GeanLeite2022!</span>
                <br />
                <br /> Nosso congresso faz parte do calendário bianual dos
                profissionais cariocas que atuam na área do envelheciment o! E
                mais uma vez, apresentará temas atuais sobre o cuidado à pessoa
                idosa.
                <br />
                <br />
                Prezando por um conteúdo unificado, geriatras e especialistas em
                gerontologia trarão uma discussão rica mostrando que na atenção
                ao indivíduo que envelhece não se caminha sozinho. É preciso
                compartilhar saberes. A atenção à saúde não é uma ação isolada.
                As questões biológicas são atravessadas por questões sociais,
                culturais, ambientais, emocionais entre outras, o que nos chama
                cada vez mais para um trabalho conjunto.
                <br />
                <br /> Esse ano, nosso tema é “Envelhecimento sem muros: os
                caminhos que nos unem” e o nosso congresso virtual será mais uma
                demonstração de que Geriatria e Gerontologia formam um time
                perfeito. <br />
                <br />
                Nossa ideia é mostrar que o lema “Mais fortes juntos”, criado na
                gestão passada, é a nossa identidade e, assim não perderemos de
                vista nunca o nosso maior desafio: trabalhar em conjunto para
                garantir aos idosos o acesso ao cuidado de qualidade. <br />
                <br />
                <span className="font-semibold">Esperamos vocês!</span>
              </p>
              <div className="relative w-full h-[160px] mt-12 md:h-[230px] lg:h-[280px]">
                <Image src={lotes} alt="lote" layout="fill" />
              </div>
              <div className="relative w-full h-[72px] mt-12 md:h-[100px] lg:h-[150px]">
                <Image src={waves} alt="lote" layout="fill" />
              </div>
            </div>
          </div>

          <div className="my-6 bg-white  py-12 max-w-[760px] mx-auto rounded-lg px-3 md:px-6 lg:container">
            <div className="max-w-[768px] mx-auto">
              <h1>Inscrições</h1>
              <div className="px-3 mt-6">
                <CardBuyTickets
                  priceOfTicket={5}
                  title="Associados Geaan Leite"
                />
              </div>

              <div className="px-3 mt-6">
                <CardBuyTickets
                  priceOfTicket={5}
                  title="Associados Geaan Leite"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
