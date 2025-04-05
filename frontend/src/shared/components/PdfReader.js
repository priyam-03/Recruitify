import React, { useState } from "react";
import styles from "../../styles/PdfReader.module.css";

const truncateText = (text, maxLength) => {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
};

function PdfReader({ pdfprocessed }) {
  const [selectedFile, setSelectedFile] = useState([]);
  const [isReadyToSubmit, setIsReadyToSubmit] = useState(false);
  const [submittedFiles, setSubmittedFiles] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile([...selectedFile, file]);
      setIsReadyToSubmit(true);
    } else {
      alert("not valid PDF file");
    }
  };

  const removeFile = (index) => {
    const newSelectedFile = [...selectedFile];
    newSelectedFile.splice(index, 1);
    setSelectedFile(newSelectedFile);
    setIsReadyToSubmit(true);
  };

  const handleUpload = () => {
    const formData = new FormData();

    selectedFile.forEach((file, index) => {
      formData.append("pdf", file);
    });

    fetch("http://localhost:4000/api/jobs/CreateByAi/upload", {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((response) => response.json())
      .then(function (data) {
        pdfprocessed(data.message);
        setIsReadyToSubmit(false);
        setSubmittedFiles([...selectedFile]);
      })
      .catch((error) => console.log("Error in file uploading: ", error));
  };

  return (
    <div className={styles.layout}>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        style={{ display: "none" }}
        id="fileinput"
      />
      <label htmlFor="fileinput" className={styles.custumFileInput}>
        Add PDF
      </label>
      <div className={styles.layout2}>
        {selectedFile.map((file, index) => (
          <div
            key={index}
            className={`${styles.pdf} ${
              submittedFiles.includes(file)
                ? styles.submittedPDF
                : styles.uploadedPDF
            }`}
          >
            <h3>{truncateText(file.name, 28)}</h3>
            <a href="#" onClick={() => removeFile(index)}>
              <img src={"/Exit.svg"} alt="Exit button" />
            </a>
          </div>
        ))}
      </div>
      <button
        onClick={handleUpload}
        className={`${styles.submit} ${isReadyToSubmit ? styles.active : ""}`}
      >
        Submit
      </button>
    </div>
  );
}

export default PdfReader;
