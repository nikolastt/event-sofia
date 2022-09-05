import dynamic from "next/dynamic";
import React, { useState } from "react";

const QrReader = dynamic(
  () => import("react-qr-reader").then((mod) => mod.QrReader),
  { ssr: false }
);

// import { QrReader } from "react-qr-reader";

const Qrcode = (props) => {
  const [data, setData] = useState("No result");
  const [selected, setSelected] = useState("environment");
  const [renderScan, setRenderScan] = useState(false);

  const constraints = {
    video: {
      facingMode: selected,
    },
  };

  const handleSelect = (value) => {
    setRenderScan(false);
    setSelected(value);
    setTimeout(() => {
      setRenderScan(true);
    }, 200);
  };

  return (
    <>
      <button onClick={() => setRenderScan(!renderScan)}>scan</button>
      {renderScan && (
        <>
          <select onChange={(e) => handleSelect(e.target.value)}>
            <option value={"environment"}>Back Camera</option>
            <option value={"user"}>Front Camera</option>
          </select>

          <div className="bg-red-200 w-full ">
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
            />
          </div>
        </>
      )}

      <p>{data}</p>
    </>
  );
};

export default Qrcode;
