import dynamic from "next/dynamic";
import React, { useState } from "react";

import { MdFlipCameraIos } from "react-icons/md";

const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

// import { QrReader } from "react-qr-reader";

const Qrcode = (props) => {
  const [data, setData] = useState("");
  const [cameraSelected, setCameraSelected] = useState("environment");
  const [renderScan, setRenderScan] = useState(false);

  const constraints = {
    video: {
      facingMode: cameraSelected,
    },
  };

  const handleCamera = () => {
    setRenderScan(false);
    cameraSelected === "environment"
      ? setCameraSelected("user")
      : setCameraSelected("environment");
    setTimeout(() => {
      setRenderScan(true);
    }, 200);
  };

  console.log(cameraSelected);

  return (
    <div className="flex flex-col h-screen ">
      <div className="h-1/2">
        <div className="pt-6">
          <h1>Escanear e-ticket</h1>
        </div>
        <div className="mx-auto h-full  ">
          <div className="w-full h-1/6 flex items-center justify-center">
            {renderScan && (
              <MdFlipCameraIos
                size={30}
                className=" cursor-pointer hover:scale-105 duration-200"
                onClick={handleCamera}
              />
            )}
          </div>
          {renderScan && (
            <div className="w-[300px] m-auto h-[300px] ">
              <QrReader
                constraints={constraints}
                scanDelay={500}
                onResult={(result, error) => {
                  if (!!result) {
                    setData(result?.text);
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
            </div>
          )}
        </div>
        <span className="flex justify-center items-center  ">
          Alinhe o QR code ao centro do frame.
        </span>
      </div>

      <div className="h-1/2">
        <div className=" h-5/6 flex items-center justify-center">{data}</div>

        <div className="  flex w-full justify-center  h-1/6">
          <button
            onClick={() => setRenderScan(!renderScan)}
            className="py-2 px-6 bg-primary-500 w-2/3 rounded-md text-white  text-lg h-min my-auto"
          >
            {renderScan ? "Parar de escanear" : "Escanear"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Qrcode;
