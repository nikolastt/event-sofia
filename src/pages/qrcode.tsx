import dynamic from "next/dynamic";
import React, { useState } from "react";

import { MdFlipCameraIos } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";

import Layout from "../components/Layout";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

interface IUserQRCode {
  image: string;
  name: string;
}

// import { QrReader } from "react-qr-reader";

interface IData {
  status: string;
  user: IUserQRCode;
}

const notifySuccess = (name: string) =>
  toast.success(`🐄 Ticket Válido - ${name}`, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifyError = () =>
  toast.error("🐄 Ticket Inválido !", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const notifyErrorQrUsed = () =>
  toast.error("🐄 Qr Code já utilizado!", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

const Qrcode = () => {
  const [data, setData] = useState<IData>();
  const [isBackCamera, setIsBackCamera] = useState("environment");
  const [renderScan, setRenderScan] = useState(false);

  const [QRUsed, setQRUsed] = useState(false);
  const [readQR, setreadQR] = useState(false);

  const [errorQR, setErrorQR] = useState(false);

  const handleCamera = () => {
    setRenderScan(false);
    isBackCamera === "user"
      ? setIsBackCamera("environment")
      : setIsBackCamera("user");

    setTimeout(() => {
      setRenderScan(true);
    }, 200);
  };

  const constraints = {
    facingMode: isBackCamera,
  };

  const handleResult = async (result: any) => {
    setErrorQR(false);
    setQRUsed(false);
    setreadQR(true);

    try {
      const docRef = doc(db, "orders", result.text);
      const docSnap = await getDoc(docRef);
      const order = docSnap.data();
      if (order?.qrCode?.statusQR === "used") {
        throw new Error("QrUsed");
      } else {
        if (order?.status === "pago") {
          const userId = order.userId;
          const userRef = doc(db, "users", userId);
          const docSnap = await getDoc(userRef);
          const user = docSnap.data();
          setData({ status: order?.status, user: user as IUserQRCode });

          await updateDoc(docRef, {
            "qrCode.statusQR": "used",
          });
          notifySuccess(user?.name);
          setRenderScan(!renderScan);
        } else {
          throw new Error();
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "QrUsed") {
          setRenderScan(!renderScan);
          setData({
            status: "error",
            user: {
              image: "",
              name: "",
            },
          });
          setQRUsed(true);
          setErrorQR(true);
          notifyErrorQrUsed();
          return;
        }
      }
      setRenderScan(!renderScan);
      setData({
        status: "error",
        user: {
          image: "",
          name: "",
        },
      });
      notifyError();
      setErrorQR(true);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-79px)] mt-[79px]">
        <div className="mx-auto h-full  ">
          <div className="w-full flex items-center py-6">
            <div className="flex justify-center w-full">
              <h1 className="text-center text-white ">Escanear e-ticket</h1>
            </div>
            {renderScan && (
              <div className="h-full ml-auto pr-6">
                <MdFlipCameraIos
                  size={30}
                  className=" cursor-pointer hover:scale-105 duration-200 z-50"
                  onClick={handleCamera}
                />
              </div>
            )}
          </div>
          <div
            className={`w-[300px] m-auto h-[300px] ${
              !renderScan && "border-[50px] border-gray-900/30 "
            }`}
            style={{
              boxShadow:
                (!renderScan && `rgb(255 0 0 / 50%) 0px 0px 0px 5px inset`) ||
                "transparent",
            }}
          >
            {renderScan && (
              <QrReader
                constraints={constraints}
                scanDelay={500}
                onResult={(result, error) => {
                  if (!!result) {
                    handleResult(result);
                  }

                  if (!!error) {
                    // console.info(error);
                  }
                }}
                videoStyle={{ objectFit: "cover", zIndex: "-1" }}
                videoContainerStyle={{
                  paddingTop: "0px",
                  height: "100%",
                  boxSizing: "border-box",
                  position: "static",
                  border: "50px solid rgba(0,0,0,0.3)",
                  boxShadow: "rgb(255 0 0 / 50%) 0px 0px 0px 5px inset",
                  top: "0px",
                  left: "0px",
                }}
                containerStyle={{
                  height: "100%",
                  width: "100%",
                  position: "relative",
                }}
              />
            )}
          </div>

          <div className="  flex w-full justify-center my-6 ">
            <button
              onClick={() => {
                setreadQR(false);
                setRenderScan(!renderScan);
              }}
              className="py-2 px-6 bg-primary-500 w-2/3 rounded-md text-white  text-lg h-min my-auto"
            >
              {renderScan ? "Parar de escanear" : "Escanear"}
            </button>
          </div>

          <span className="flex justify-center items-center  ">
            Alinhe o QR code ao centro do frame.
          </span>

          {readQR && !errorQR && data?.status === "pago" ? (
            <div className=" h-full w-full flex flex-col items-center  ">
              <div className="bg-primary-500/30 shadow w-full mt-6 rounded-2xl p-5 ">
                <div className="flex justify-center mt-6 rounded-full overflow-hidden w-50 h-50">
                  <img
                    src={data.user.image}
                    alt="User Image"
                    className="rounded-full"
                  />
                </div>
                <p className="font-light text-center pt-6">Olá,</p>
                <h1 className="pt- text-white">{data.user.name}</h1>

                <div className=" w-20 h-20 bg-primary-500 rounded-full mx-auto mt-6 flex items-center justify-center ">
                  <BsCheckLg size={35} color="white" />
                </div>
              </div>
            </div>
          ) : (
            errorQR &&
            readQR && (
              <div className=" h-full w-full flex flex-col items-center  ">
                <div className="bg-red-500/30 shadow w-full mt-6 rounded-2xl p-5 ">
                  <div className=" w-20 h-20 bg-red-500 rounded-full mx-auto mt-6 flex items-center justify-center ">
                    <IoMdClose size={40} color="white" />
                  </div>

                  <h1 className="py-6 text-white">
                    {QRUsed ? "QR Code já foi utilizado" : "e-Ticket inválido!"}
                  </h1>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <ToastContainer
        theme="dark"
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Layout>
  );
};

export default Qrcode;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const autorizedReadRef = doc(
    db,
    "autorizedReadQRCode",
    "SUu76JhBy0ISIDKUY76a"
  );
  const response = await getDoc(autorizedReadRef);
  const emailsAutorized = response.data();
  let autorized = false;
  Array(emailsAutorized?.email).map((email) => {
    if (email === session?.user?.email) {
      autorized = true;
    }
  });

  if (!autorized) {
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
