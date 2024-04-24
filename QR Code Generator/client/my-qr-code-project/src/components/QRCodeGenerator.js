import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = () => {
  const [text, setText] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const handleShareClick = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const qrCode = new QRCodeCanvas({ value: text, size: 256 });

    try {
      qrCode.render(context);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "qr-code.png";
      link.click();
    } catch (error) {
      console.error("Error generating QR code image:", error);
      // Handle error gracefully, e.g., display an error message to the user
    }
  };

  const handleCopyClick = () => {
    if (!navigator.clipboard) {
      console.warn(
        "Clipboard API not supported. Copy functionality unavailable."
      );
      return;
    }

    navigator.clipboard
      .writeText(text)
      .then(() => {
        console.log("QR code text copied to clipboard");
      })
      .catch((error) => {
        console.error("Error copying QR code text:", error);
        // Handle error gracefully, e.g., display an error message to the user
      });
  };

  const handleInputChange = (event) => {
    setText(event.target.value);
    if (event.target.value) {
      setShowQRCode(true); // Show QR code if there's input
    } else {
      setShowQRCode(false); // Hide QR code if input is empty
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleInputChange(event); // Trigger QR code generation on Enter key press
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">QR CODE GENERATOR</h1>
      <div className="flex flex-col items-center gap-4">
        <label htmlFor="qr-input" className="text-gray-700 mb-2">
          Enter URL or Text
        </label>
        <input
          type="text"
          id="qr-input"
          value={text}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Enter URL or Text"
          className="w-full bg-gray-200 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        />
        {showQRCode && ( // Conditionally render QR code and button
          <div className="flex justify-center mt-4">
            <QRCodeCanvas value={text} size={256} className="mx-auto" />
          </div>
        )}
        <div className="flex justify-content-between space-x-2">
          <button
            type="button"
            onClick={handleShareClick}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Share QR
          </button>
          <button
            type="button"
            onClick={handleCopyClick}
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
          >
            Copy QR
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
