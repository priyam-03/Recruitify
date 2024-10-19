import React, { useState } from "react";
import styles from "../../styles/modal.module.css"; // Create your own styles for the modal

const ShortlistModal = ({ isOpen, onClose, onSubmit }) => {
  const [numberOfApplicants, setNumberOfApplicants] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(numberOfApplicants);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Shortlist Applicants</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={numberOfApplicants}
            onChange={(e) => setNumberOfApplicants(e.target.value)}
            placeholder="Enter number of applicants to shortlist"
            required
          />
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShortlistModal;
