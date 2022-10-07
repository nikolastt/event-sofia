import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import LayoutApplication from "../components/Layout";
import { authOptions } from "./api/auth/[...nextauth]";

// import { Container } from './styles';

const NotLogin: React.FC = () => {
  return (
    <div
      style={{ backgroundPosition: "70% 75%" }}
      className="w-full h-screen bg-cow bg-cover  md:bg-center bg-no-repeat flex items-center "
    >
      <LayoutApplication>
        <div className=" pt-[200px] flex items-center justify-center h-full px-6 ">
          <div className="w-full max-w-[700px] h-full bg-white/20 backdrop-blur-xl flex flex-col items-center rounded-3xl ">
            <p className="text-center text-3xl pt-20">Log in</p>

            <p className="pt-12 text-xl font-light">Faça login utilizando </p>
            <div className="flex justify-center w-full   rounded-lg mx-auto pb-20 mt-12 ">
              <button
                onClick={() => signIn("google")}
                className="flex bg-black/70 justify-center w-2/3 py-3 items-center rounded-lg text-white font-bold tracking-wider"
              >
                Google <FcGoogle className="ml-3" size={30} />
              </button>
            </div>
          </div>
        </div>
      </LayoutApplication>
    </div>
  );
};

export default NotLogin;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
