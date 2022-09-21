import type { NextPage } from "next";
import Image from "next/image";

import bannerGeaan from "../../public/images/bannerGeaan.png";
import CardBuyTickets from "../components/CardBuyTickets";

import { AiOutlineCalendar } from "react-icons/ai";
import { BsPersonCheck } from "react-icons/bs";
import { HiLocationMarker } from "react-icons/hi";

import LayoutApplication from "../components/Layout";
import Link from "next/link";

import IconInstagram from "../../public/images/instagramIcon.png";
import IconGmail from "../../public/images/gmailIcon.png";
import IconWpp from "../../public/images/wppIcon.png";

const Home: NextPage = () => {
  return (
    <>
      <div className="w-full h-screen bg-cover absolute top-0 ">
        <div className="w-full h-full bg-gradient-to-b from-transparent  to-gray-300"></div>
      </div>
      <LayoutApplication>
        <div className="relative  w-full min-h-screen ">
          <div className=" w-full min-h-[calc(100vh-79px)] mt-[79px] lg:px-6 xl:px-0">
            <div className="pt-6">
              <div className=" relative h-[200px] sm:h-[250px] w-full max-w-[768px] overflow-hidden rounded-lg mx-auto md:h-[250px] lg:h-[480px] lg:container">
                <Image src={bannerGeaan} alt="Banner" layout="fill" />
              </div>
            </div>
            <div className="bg-white mt-6 flex flex-col px-6 py-12 max-w-[768px] mx-auto rounded-lg lg:container lg:justify-between lg:flex-row">
              <div className="lg:w-3/4">
                <h1 className="lg:mb-6 lg: text-center">
                  4º Simpósio de desenvolvimento da pecuária leiteira Milk Days
                  - Geaan Leite Praça - Belo Horizonte 2022
                </h1>

                <span className=" text-center mt-6 text-text-gray flex items-center">
                  <AiOutlineCalendar
                    size={20}
                    className="text-text-gray mr-3"
                  />
                  26/11/2022 - 18:00 - 22:00 GMT-3 <br />
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
                  <span className="font-semibold text-primary-500">
                    GeanLeite2022!
                  </span>
                  <br />
                  <br /> Em sua IV edição, o simpósio de tecnologia e
                  desenvolvimento da pecuária leiteira- Milk Days, segue
                  inovando seus temas, trazendo para o setor leiteiro os
                  assuntos mais relevantes e que nortearão o futuro da pecuária.
                  Nessa edição, serão apresentados temas relacionado:
                  reprodução, gado jovem, nutrição e avaliação linear em vacas
                  leiteiras. <br /> <br />
                </p>
                <div>
                  <a
                    href="https://goo.gl/maps/2c9BGk3nf8goGusH7"
                    target="blank"
                  >
                    <span className="flex w-full justify-center ">
                      <HiLocationMarker
                        size={35}
                        className="text-center text-primary-500 "
                      />
                    </span>
                    <h2 className="text-center  ">Local do evento</h2>
                    <br />
                    <span className="text-blue-400 text-center w-full flex hover:underline ">
                      Puc minas, Praça da liberdade auditório 1, rua Sergipe,
                      790 funcionários Belo Horizonte-mg
                    </span>
                  </a>
                </div>
                {/* <div>
                  <h2 className="text-center text-xl mb-3">Organizador</h2>
                  GEAAN Leite- Grupo de estudos aplicados ao agronegócio <br />
                </div> */}
                <div className="flex justify-around mt-6 w-full ">
                  <Link
                    href="https://www.instagram.com/geaanleitepraca/"
                    target="_blank"
                    passHref
                  >
                    <a target="_blank" className="w-1/2">
                      <div className="relative w-[30px] h-[30px] mx-auto mt-6">
                        <Image
                          src={IconInstagram}
                          alt="Icon Instagram"
                          layout="fill"
                        />
                      </div>

                      <div className="flex justify-center">
                        <span className=" ">@geaanleitepraca</span>
                      </div>
                    </a>
                  </Link>

                  <Link
                    href="mailto:geaanleitepraca@gmail.com"
                    target="_blank"
                    passHref
                  >
                    <a target="_blank" className="w-1/2">
                      <div className="relative w-[30px] h-[30px] mx-auto mt-6">
                        <Image
                          src={IconGmail}
                          alt="Icon Instagram"
                          layout="fill"
                        />
                      </div>

                      <div className="flex justify-center">
                        <span className=" ">geaanleiteppl@gmail.com</span>
                      </div>
                    </a>
                  </Link>
                </div>
                <div className="flex justify-around items-center">
                  <Link href="https://wa.me/5531991492727?text=Olá%20Sofia%20Valle!%20vim%20pelo%20site%20do%20Geaan%20Eventos%20e%20gostaria%20de%20saber%20mais%20informações!">
                    <a target="_blank" className="w-1/2">
                      <div className="flex flex-col items-center mt-6">
                        <div className="relative w-[30px] h-[30px] ">
                          <Image
                            src={IconWpp}
                            alt="Icon Instagram"
                            layout="fill"
                          />
                        </div>

                        <span className=" ">Sofia: 31 99149-2727</span>
                      </div>
                    </a>
                  </Link>
                  <Link href="https://wa.me/553199302443?text=Olá%20João%20Pedro!%20vim%20pelo%20site%20do%20Geaan%20Eventos%20e%20gostaria%20de%20saber%20mais%20informações!">
                    <a target="_blank" className="w-1/2">
                      <div className="flex flex-col items-center mt-6">
                        <div className="relative w-[30px] h-[30px] ">
                          <Image
                            src={IconWpp}
                            alt="Icon Instagram"
                            layout="fill"
                          />
                        </div>

                        <span className=" ">João Pedro: 31 9930-2443</span>
                      </div>
                    </a>
                  </Link>
                </div>

                <div className="font-extralight mt-12 flex justify-center text-primary-500 text-2xl">
                  Esperamos vocês!
                </div>
                {/* <div className="relative w-full h-[160px] mt-12 md:h-[230px] lg:h-[280px]">
                  <Image src={lotes} alt="lote" layout="fill" />
                </div>
                <div className="relative w-full h-[72px] mt-12 md:h-[100px] lg:h-[150px]">
                  <Image src={waves} alt="lote" layout="fill" />
                </div> */}
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
      </LayoutApplication>
    </>
  );
};

export default Home;
