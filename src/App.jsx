import React, { useState, useMemo } from "react";
import Card from "./Card";
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PdfDocument from "./PdfDocument";
import { ErrorBoundary } from "./PreventBackSpace";
import PreventBackSpace from "./PreventBackSpace";

const App = () => {
  const [cards, setCards] = useState([{ topic: "", content: "" }]);
  const [previewMode, setPreviewMode] = useState(false);
  const [showDownloadLink, setShowDownloadLink] = useState(false);

  const handleChange = (index, field, value) => {
    setCards((prevCards) => {
      const updated = [...prevCards];
      updated[index][field] = value;
      return updated;
    });
    setShowDownloadLink(false);
  };

  const addCard = () => {
    setCards((prevCards) => [...prevCards, { topic: "", content: "" }]);
    toast("Added New Card!");
  };

  const deleteCard = () => {
    if (cards.length > 1) {
      setCards((prevCards) => prevCards.slice(0, -1));
      toast("Card Deleted!");
    } else {
      toast("Card can't be Deleted!");
    }
  };

  const hasContent = cards.some(
    (card) => card.topic.trim() || card.content.trim()
  );

  const MemoizedPdf = useMemo(() => <PdfDocument cards={cards} />, [cards]);

  return (
    <>
      <h1 className="bg-red-600 text-white text-center font-bold p-4 text-5xl">
        pdfMaker
      </h1>
      <div className="w-2/3 mx-auto my-8 flex flex-col gap-y-4">
        <div className="space-y-4">
          <PreventBackSpace />
          {cards.map((card, index) => (
            <Card
              key={index}
              index={index}
              card={card}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="flex gap-x-4">
          <FaPlus
            className="text-3xl font-bold cursor-pointer text-white bg-gray-900 p-1 rounded-full"
            onClick={addCard}
          />
          <FaMinus
            onClick={deleteCard}
            className="text-3xl font-bold cursor-pointer text-white bg-gray-900 p-1 rounded-full"
          />
          <ToastContainer className="mx-auto" />
        </div>

        {hasContent ? (
          <>
            {!showDownloadLink ? (
              <button
                onClick={() => setShowDownloadLink(true)}
                className="block w-fit mx-auto  px-6 py-2 bg-blue-600 hover:bg-blue-800 text-white text-xl rounded-full cursor-pointer"
              >
                Generate PDF
              </button>
            ) : (
              <ErrorBoundary>
                <PDFDownloadLink
                  document={MemoizedPdf}
                  fileName="pdfMaker.pdf"
                  className="block w-fit mx-auto px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 text-xl text-center"
                >
                  Download PDF
                </PDFDownloadLink>
              </ErrorBoundary>
            )}

            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="mx-auto mt-2 underline text-blue-600 text-center cursor-pointer hidden md:block"
            >
              {previewMode ? "Hide PDF Preview" : "Show PDF Preview"}
            </button>

            {previewMode && (
              <ErrorBoundary>
                <div className="hidden md:block">
                  <PDFViewer className="h-80 w-full border mt-4">
                    {MemoizedPdf}
                  </PDFViewer>
                </div>
              </ErrorBoundary>
            )}
          </>
        ) : (
          <button
            type="button"
            className="block w-fit mx-auto px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-800 text-xl text-center cursor-no-drop"
            onClick={() => toast("Please add content to generate PDF")}
          >
            Generate PDF
          </button>
        )}
      </div>
    </>
  );
};

export default App;
