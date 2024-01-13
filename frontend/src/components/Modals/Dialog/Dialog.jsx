import { useEffect, useState } from "react";
import "./Dialog.css";

const Dialog = () => {
  const [showModalDialog, setShowModalDialog] = useState(false);

  useEffect(() => {
    const dialogStatus = localStorage.getItem("dialog")
      ? JSON.parse(localStorage.getItem("dialog"))
      : localStorage.setItem("dialog", JSON.stringify(true));

    setTimeout(() => {
      setShowModalDialog(dialogStatus);
    }, 2000);
  }, []);

  const handleCloseDialog = (e) => {
    const checked = e.target.checked;

    localStorage.setItem("dialog",JSON.stringify(!checked))

  };

  return (
    <div className={`modal-dialog ${showModalDialog ? "show" : ""}`}>
      <div className="modal-content">
        <button
          className="modal-close"
          onClick={() => setShowModalDialog(false)}
        >
          <i className="bi bi-x" />
        </button>
        <div className="modal-image">
          <img src="/img/modal-dialog.jpg" alt="" />
        </div>
        <div className="popup-wrapper">
          <div className="popup-content">
            <div className="popup-title">
              <h3>NEWSLETTER</h3>
            </div>
            <p className="popup-text">
              Sign up to our newsletter and get exclusive deals you won find any
              where else straight to your inbox!
            </p>
            <form className="popup-form">
              <input type="text" placeholder="Enter Email Address Here" />
              <button className="btn btn-primary">SUBSCRIBE</button>
              <label>
                <input type="checkbox" onChange={handleCloseDialog} />
                <span>Don`t show this popup again</span>
              </label>
            </form>
          </div>
        </div>
      </div>
      <div
        onClick={() => setShowModalDialog(false)}
        className="modal-overlay"
      ></div>
    </div>
  );
};

export default Dialog;
