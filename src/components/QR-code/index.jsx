import { useState } from "react";
import QRCode from "react-qr-code";
import "./QR.css"
export default function QRCodeGenerator() {
  const [qrCode, setQrCode] = useState("");
  const [input, setInput] = useState("");

  function handleGenerateQrCode() {
    setQrCode(input);
    setInput('');
  }

  return (
    <div className="qr-container">
      <h1 className="qr-title">QR Code Generator</h1>
      <div className="qr-input-group">
        <input
          className="qr-input"
          onChange={(e) => setInput(e.target.value)}
          type="text"
          name="qr-code"
          value={input}
          placeholder="Enter your value here"
        />
        <button
          className="qr-button"
          disabled={input && input.trim() !== "" ? false : true}
          onClick={handleGenerateQrCode}
        >
          Generate
        </button>
      </div>
      <div className="qr-code">
        <QRCode id="qr-code-value" value={qrCode} size={400} bgColor="#fff" />
      </div>
    </div>
  );
}