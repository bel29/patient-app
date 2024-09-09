import React, { FC, useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  FormGroup,
  Label,
  Row,
  Col,
  FormFeedback,
} from "reactstrap";
import { FaPencilAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import ActionButton from "../Buttons/Action/ActionButton";
import styles from "./PatientModal.module.scss";

interface PatientModalProps {
  index: number;
  isOpen: boolean;
  toggle: () => void;
  patientData: {
    name: string;
    description: string;
    website: string;
    avatar: string;
    createdAt: string;
  };
  disabled: boolean;
  onSave: (
    updatedData: { name: string; description: string; website: string; avatar: string },
    index: number
  ) => void;
}

const PatientModal: FC<PatientModalProps> = ({ isOpen, toggle, patientData, disabled, onSave, index }) => {
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  const [localData, setLocalData] = useState(
    patientData || { name: "", description: "", website: "", avatar: "" }
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setLocalData(patientData || { name: "", description: "", website: "", avatar: "" });
    reset(patientData);
  }, [patientData, reset]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const avatarUrl = reader.result as string;
        setValue("avatar", avatarUrl);
        setLocalData({ ...localData, avatar: avatarUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePencilClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onSubmit = (data: any) => {
    onSave(localData, index);
    toggle();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalData({
      ...localData,
      [name]: value,
    });
    setValue(name, value);
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} centered className={styles.modal}>
      <ModalHeader className={styles.modal__header} toggle={toggle}>
        {disabled ? t("patients.name") : t("edit")}
      </ModalHeader>
      <ModalBody className={styles.modal__body}>
        <Row xs="auto" className={styles.avatar__container}>
          <Col className={styles.avatar}>
            <img src={localData.avatar} alt={t("patients.name")} className={styles.avatar__image} />
            {!disabled && (
              <div className={styles.avatar__edit} onClick={handlePencilClick}>
                <FaPencilAlt />
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              ref={fileInputRef}
              className={styles.avatar__input}
              style={{ display: "none" }}
            />
          </Col>
        </Row>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col>
              <FormGroup>
                <Label for="name">{t("patients.name")}</Label>
                <Input
                  type="text"
                  value={localData.name}
                  id="name"
                  {...register("name", {
                    required: t("patients.name") + " " + t("isRequired"),
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: t("patients.name") + " " + t("invalidCharacters"),
                    },
                  })}
                  onChange={handleInputChange}
                  invalid={!!errors.name}
                  disabled={disabled}
                />
                {errors.name && <FormFeedback>{errors.name?.message?.toString()}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="description">{t("patients.description")}</Label>
                <Input
                  className={styles.description}
                  value={localData.description}
                  type="textarea"
                  id="description"
                  {...register("description", {
                    required: t("patients.description") + " " + t("isRequired"),
                  })}
                  onChange={handleInputChange}
                  invalid={!!errors.description}
                  disabled={disabled}
                />
                {errors.description && <FormFeedback>{errors.description?.message?.toString()}</FormFeedback>}
              </FormGroup>
              <FormGroup>
                <Label for="website">{t("patients.website")}</Label>
                <Input
                  type="text"
                  value={localData.website}
                  id="website"
                  {...register("website", {
                    required: t("patients.website") + " " + t("isRequired"),
                    pattern: {
                      value: /^https?:\/\/[^\s/$.?#].[^\s]*$/i,
                      message: t("patients.website") + " " + t("invalidURL"),
                    },
                  })}
                  onChange={handleInputChange}
                  invalid={!!errors.website}
                  disabled={disabled}
                />
                {errors.website && <FormFeedback>{errors.website?.message?.toString()}</FormFeedback>}
              </FormGroup>
            </Col>
          </Row>
          <ModalFooter>
            {!disabled && <ActionButton label={t("save")} onClick={handleSubmit(onSubmit)} />}
            <ActionButton label={disabled ? t("close") : t("cancel")} outline={true} onClick={toggle} />
          </ModalFooter>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default PatientModal;
