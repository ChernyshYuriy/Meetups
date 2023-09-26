import { useContext, useState, useRef } from "react";
import elementsStyles from "../../css/adminModal.module.css";

import MeetupsContext from "../../store/meetUpsState";
import Modal from "../modal/index";

function AdminModal() {
  const context = useContext(MeetupsContext);
  // useEffect(() => {
  //   if (context.isAdmin) {
  //     setCode(true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [context.isAdmin]);

  function closeModal(value) {
    context.setAdminModalOpen(value);
  }
  const inputCode = useRef();

  const bodyGetAdmin = (
    <form className={elementsStyles.container}>
      <input
        autoFocus
        className={elementsStyles.input}
        ref={inputCode}
        maxLength="12"
        type="text"
      />
      <button className={elementsStyles.btn} onClick={checkCode}>
        GET ADMIN
      </button>
    </form>
  );
  const logoutAdmin = (
    <>
      <button className={elementsStyles.btn} onClick={() => context.logout()}>
        LOG OUT
      </button>
    </>
  );
  const modalBody = context.isAdmin ? logoutAdmin : bodyGetAdmin;
  const adminModalTitle = context.isAdmin ? "Вийти з адмінки" : "Адмін статус";
  function checkCode() {
    const getCode = inputCode.current.value;
    context.changeAdminStatus(getCode);
  }
  return (
    <Modal isOpen={context.isAdminModalOpen} close={closeModal}>
      {{
        title: adminModalTitle,
        body: modalBody,
      }}
    </Modal>
  );
}
export default AdminModal;
