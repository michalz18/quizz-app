import React, { useState } from "react";
import PureModal from "react-pure-modal";
import "./ChangePassword.css";
import { useLoggedUser } from "../../App";

export default function ChangePasswordFrom() {
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { loggedUser } = useLoggedUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setModalContent("Passwords do not match!");
      setModalVisible(true);
      return;
    }
    const response = await savePassword( newPassword, prevPassword);
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

  async function savePassword( newPassword, prevPassword) {
    return await fetch("http://localhost:8080/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: loggedUser,
        oldPassword: prevPassword,
        newPassword: newPassword,
      }),
    });
  }

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
