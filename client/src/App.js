import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";

function App() {
  const [name, setName] = useState("");
  const [receiptId, setReceiptId] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [price2, setPrice2] = useState(0);

  const data = { name, receiptId, price1, price2 };

  const createAndDownloadPdf = () =>
    axios
      .post("/create-pdf", data)
      .then(() => axios.get("fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });
        saveAs(pdfBlob, "newPdf.pdf");
      });

  return (
    <div className="App">
      <input
        type="text"
        name="name"
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        type="number"
        name="receiptId"
        onChange={(e) => setReceiptId(e.target.value)}
        placeholder="Receipt ID"
      />
      <input
        type="number"
        name="price1"
        onChange={(e) => setPrice1(e.target.value)}
        placeholder="Price 1"
      />
      <input
        type="number"
        name="price2"
        onChange={(e) => setPrice2(e.target.value)}
        placeholder="Price 2"
      />
      <button onClick={createAndDownloadPdf}>Download PDF</button>
    </div>
  );
}

export default App;
