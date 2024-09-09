import React from "react";
import { Modal, ModalBody, ModalFooter, Button, Row, Col } from "reactstrap";
import { useTranslation } from "react-i18next";

import ActionButton from "../Buttons/Action/ActionButton";

import styles from "./LogoutModal.module.scss";

interface LogoutModalProps {
  isOpen: boolean;
  toggle: () => void;
  handleClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ isOpen, toggle, handleClose }) => {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} toggle={toggle} backdrop centered>
      <Row>
        <Col className={styles.modal}>
          <Row>
            <Col className={styles.close__button}>
              <Button close aria-label="Close" onClick={toggle} />
            </Col>
          </Row>
          <ModalBody>
            <p className={styles.modal__title}>{t("logOut.title")}</p>
          </ModalBody>
          <ModalFooter className={styles.footer}>
            <Col>
              <ActionButton fullWidth={true} label={t("logOut.continue")} outline onClick={toggle} />
            </Col>
            <Col>
              <ActionButton fullWidth={true} label={t("logOut.exit")} onClick={handleClose} />
            </Col>
          </ModalFooter>
        </Col>
      </Row>
    </Modal>
  );
};

export default LogoutModal;
