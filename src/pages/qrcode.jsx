import dynamic from "next/dynamic";
import React, { useState } from "react";

import { MdFlipCameraIos } from "react-icons/md";
import { BsCheckLg } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";

import Layout from "../components/Layout";

const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

// import { QrReader } from "react-qr-reader";

const Qrcode = (props) => {
  const [data, setData] = useState("");
  const [isBackCamera, setIsBackCamera] = useState("environment");
  const [renderScan, setRenderScan] = useState(false);

  const handleCamera = () => {
    setRenderScan(false);
    isBackCamera === "user"
      ? setIsBackCamera("environment")
      : setIsBackCamera("user");

    setTimeout(() => {
      setRenderScan(true);
    }, 200);
  };

  console.log(isBackCamera);

  const constraints = {
    facingMode: isBackCamera,
  };

  const handleResult = (result) => {
    const user = getUser(result?.text);

    setData(result?.text);
  };

  return (
    <Layout>
      <div className="flex flex-col h-[calc(100vh-79px)] ">
        <div className="mx-auto h-full  ">
          <div className="w-full flex items-center py-6">
            <div className="h-full ">
              <h1 className="text-left pl-6">Escanear e-ticket</h1>
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
                !renderScan && `rgb(255 0 0 / 50%) 0px 0px 0px 5px inset`,
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
        </div>

        <div className="  flex w-full justify-center my-6 ">
          <button
            onClick={() => setRenderScan(!renderScan)}
            className="py-2 px-6 bg-primary-500 w-2/3 rounded-md text-white  text-lg h-min my-auto"
          >
            {renderScan ? "Parar de escanear" : "Escanear"}
          </button>
        </div>

        <span className="flex justify-center items-center  ">
          Alinhe o QR code ao centro do frame.
        </span>

        {/* <div className=" h-full w-full flex flex-col items-center  ">
          <div className="bg-primary-500/30 shadow w-2/3 mt-6 rounded-2xl p-5 ">
            <div className=" w-20 h-20 bg-primary-500 rounded-full mx-auto mt-6 flex items-center justify-center ">
              <BsCheckLg size={35} color="white" />
            </div>

            <h1 className="py-6">Nikolas Bitencourt</h1>
          </div>

          
          {data}
        </div> */}

        <div className=" h-full w-full flex flex-col items-center  ">
          <div className="bg-red-500/30 shadow w-2/3 mt-6 rounded-2xl p-5 ">
            <div className=" w-20 h-20 bg-red-500 rounded-full mx-auto mt-6 flex items-center justify-center ">
              <IoMdClose size={40} color="white" />
            </div>

            <h1 className="py-6">e-Ticket inválido!</h1>
          </div>

          {data}
        </div>
      </div>
    </Layout>
  );
};

export default Qrcode;
