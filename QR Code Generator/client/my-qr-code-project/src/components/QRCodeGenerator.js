import React, { useState } from "react";
// import { QRCode } from "qrcode.react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text for QR code"
      />
      <QRCodeCanvas value={text} />
    </div>
  );
};

export default QRCodeGenerator;
