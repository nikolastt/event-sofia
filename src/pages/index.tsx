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

import { motion } from "framer-motion";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Geaan Eventos</title>
        <meta name="theme-color" content="#70963F" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#70963F" />
        <meta name="msapplication-navbutton-color" content="#70963F" />
      </Head>

      <LayoutApplication>
        <div className=" max-w-full min-h-[calc(100vh-79px)] overflow-x-hidden mt-[79px] lg:px-6 xl:px-0">
          <div className="pt-6">
            <div className=" relative h-[200px] sm:h-[250px] w-full max-w-[768px] overflow-hidden rounded-lg mx-auto md:h-[250px] lg:h-[480px] lg:container">
              <Image src={bannerGeaan} alt="Banner" layout="fill" />
            </div>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              x: -300,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1.5,
            }}
            className="bg-white mt-6 flex flex-col px-6 py-12 max-w-[768px] mx-auto rounded-lg lg:container lg:justify-between lg:flex-row "
          >
            <div className="lg:w-3/4 ">
              <h1 className="lg:mb-6 lg: text-center">
                4º Simpósio de desenvolvimento da pecuária leiteira Milk Days -
                Geaan Leite Praça - Belo Horizonte 2022
              </h1>

              <span className=" text-center mt-6 text-text-gray flex items-center">
                <AiOutlineCalendar size={20} className="text-text-gray mr-3" />
                26/11/2022 - 7:30 - 17:00 GMT-3 <br />
              </span>
              <span className="mt-3 text-center text-text-gray flex">
                <BsPersonCheck size={20} className="text-text-gray mr-3" />
                Este é um evento presencial
              </span>
            </div>

            <div className="flex justify-center items-center mt-12 lg:w-1/4 lg:h-full">
              <Link href="/checkOut" passHref>
                <button className="bg-primary-500 py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 animate-pulse">
                  COMPRAR INGRESSOS
                </button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 300,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 1.5,
            }}
            className="mt-6 bg-white py-12 px-6 max-w-[768px] mx-auto rounded-lg lg:container"
          >
            <div className="max-w-[768px] h-full mx-auto">
              <h1 className="text-center">Sobre o evento</h1>
              <p className="text-justify mt-6 leading-relaxed text-black">
                Sejam bem vindos ao{" "}
                <span className="font-semibold text-primary-500">
                  Milk Days 2022!
                </span>
                <br />
                <br /> Em sua IV edição, o simpósio de tecnologia e
                desenvolvimento da pecuária leiteira- Milk Days, segue inovando
                seus temas, trazendo para o setor leiteiro os assuntos mais
                relevantes e que nortearão o futuro da pecuária. Nessa edição,
                serão apresentados temas relacionando: reprodução, gado jovem,
                nutrição e avaliação linear em vacas leiteiras. <br /> <br />
              </p>
              <div>
                <a href="https://goo.gl/maps/2c9BGk3nf8goGusH7" target="blank">
                  <span className="flex w-full justify-center ">
                    <HiLocationMarker
                      size={35}
                      className="text-center text-primary-500 "
                    />
                  </span>
                  <h2 className="text-center text-black ">Local do evento</h2>
                  <br />
                  <span className="text-blue-400 text-center w-full  justify-center flex hover:underline ">
                    Puc minas, Praça da liberdade auditório 1, rua Sergipe, 790
                    funcionários Belo Horizonte-mg
                  </span>
                </a>
              </div>
              {/* <div>
                  <h2 className="text-center text-xl mb-3">Organizador</h2>
                  GEAAN Leite- Grupo de estudos aplicados ao agronegócio <br />
                </div> */}
              <div className="grid h-full  sm:grid-cols-2  gap-3 items-center  mt-6 w-full overflow-y-visible text-black">
                <Link
                  href="https://www.instagram.com/geaanleitepraca/"
                  target="_blank"
                  passHref
                >
                  <motion.a
                    initial={{
                      opacity: 0,
                      y: 300,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    target="_blank"
                    className="h-[120px] shadow-lg py-3 rounded-md"
                  >
                    <div className="relative w-[30px] h-[30px] mx-auto mt-6 ">
                      <Image
                        src={IconInstagram}
                        alt="Icon Instagram"
                        layout="fill"
                      />
                    </div>

                    <div className="flex justify-center pt-3">
                      <span className=" ">@geaanleitepraca</span>
                    </div>
                  </motion.a>
                </Link>

                <Link
                  href="mailto:geaanleitepraca@gmail.com"
                  target="_blank"
                  passHref
                >
                  <motion.a
                    initial={{
                      opacity: 0,
                      y: 300,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    target="_blank"
                    className="h-[120px] shadow-lg py-3 rounded-md"
                  >
                    <div className="relative w-[30px] h-[30px] mx-auto mt-6">
                      <Image
                        src={IconGmail}
                        alt="Icon Instagram"
                        layout="fill"
                      />
                    </div>

                    <div className="flex justify-center">
                      <span className=" pt-3">geaanleiteppl@gmail.com</span>
                    </div>
                  </motion.a>
                </Link>

                <Link href="https://wa.me/5531991492727?text=Olá%20Sofia%20Valle!%20vim%20pelo%20site%20do%20Geaan%20Eventos%20e%20gostaria%20de%20saber%20mais%20informações!">
                  <motion.a
                    initial={{
                      opacity: 0,
                      y: 300,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    target="_blank"
                    className="h-[120px] shadow-lg py-3 rounded-md"
                  >
                    <div className="flex flex-col items-center mt-6 w-full">
                      <div className="relative w-[30px] h-[30px] ">
                        <Image
                          src={IconWpp}
                          alt="Icon Instagram"
                          layout="fill"
                        />
                      </div>

                      <span className=" pt-3">Sofia: 31 99149-2727</span>
                    </div>
                  </motion.a>
                </Link>
                <Link href="https://wa.me/553199302443?text=Olá%20João%20Pedro!%20vim%20pelo%20site%20do%20Geaan%20Eventos%20e%20gostaria%20de%20saber%20mais%20informações!">
                  <motion.a
                    initial={{
                      opacity: 0,
                      y: 300,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.8,
                    }}
                    target="_blank"
                    className="h-[120px] shadow-lg py-3 rounded-md"
                  >
                    <div className="flex flex-col items-center mt-6">
                      <div className="relative w-[30px] h-[30px] ">
                        <Image
                          src={IconWpp}
                          alt="Icon Instagram"
                          layout="fill"
                        />
                      </div>

                      <span className=" pt-3">João Pedro: 31 9930-2443</span>
                    </div>
                  </motion.a>
                </Link>
              </div>

              <div className="font-extralight mt-12 flex justify-center text-primary-500 text-2xl">
                Esperamos vocês!
              </div>
            </div>
          </motion.div>

          <div className="flex mx-auto justify-center items-center  lg:w-1/4 lg:h-full pt-12 pb-6">
            <Link href="/checkOut">
              <button className="bg-primary-500 py-3 px-12 rounded-full text-white font-medium hover:scale-105 duration-300 animate-pulse">
                COMPRAR INGRESSOS
              </button>
            </Link>
          </div>
        </div>
      </LayoutApplication>
    </>
  );
};

export default Home;
