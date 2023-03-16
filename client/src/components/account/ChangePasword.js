import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "./ChangePassword.css";

export default function ChangePasswordFrom() {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setModalContent("Passwords do not match!");
      setModalVisible(true);
      return;
    }

    const response = await fetch("http://localhost:8080/user", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        email: "agnieszka@gmail.com",
        oldPassword: prevPassword,
        newPassword: newPassword,
      }),
    });

    

    if (response.ok) {
      setModalContent("Password has been successfully changed!");
      setModalVisible(true);
      setPrevPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent("");
  };

  return (
    <>
      <form className="changePassword-form" onSubmit={handleSubmit}>
        <h1>Change your password</h1>
        <label htmlFor="prevPassword">Previous Password:</label>
        <input
          type="password"
          className="prevPassword-input"
          value={prevPassword}
          onChange={(event) => setPrevPassword(event.target.value)}
        />

        <label htmlFor="newPassword">New Password:</label>
        <input
          type="password"
          className="newPassword-input"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
        />

        <label htmlFor="confirmNewPassword">Confirm New Password:</label>
        <input
          type="password"
          className="confirmNewPassword-input"
          value={confirmNewPassword}
          onChange={(event) => setConfirmNewPassword(event.target.value)}
        />

        <button className="submit-btn" type="submit">
          Accept
        </button>
      </form>

      <PureModal
        isOpen={modalVisible}
        onClose={closeModal}
        className="my-modal"
      >
        {modalContent}
      </PureModal>
    </>
  );
}