import React, { useState } from "react";

import { QrReader } from "react-qr-reader";

const Qrcode = (props) => {
  const [data, setData] = useState("No result");
  const [selected, setSelected] = useState("environment");

  const constraints = {
    facingMode: selected,
  };

  return (
    <>
      <select onChange={(e) => setSelected(e.target.value)}>
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
              console.info(error);
            }
          }}
          style={{ width: "200px", heigth: "100px" }}
        />
      </div>
      <p>{data}</p>
    </>
  );
};

export default Qrcode;
