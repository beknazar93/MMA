// components/Notification/Notifications.jsx
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Notifications = () => {
  const notify = () => toast("New notification!");

  return (
    <div>
      <button onClick={notify}>Show Notification</button>
      <ToastContainer />
    </div>
  );
};

export default Notifications;
