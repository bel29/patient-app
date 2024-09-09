import React, { useState } from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
import { FaInfoCircle, FaQuestionCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import PatientModal from "../../Modal/PatientModal";

import styles from "./PatientCard.module.scss";
import DateFormatter from "../../Utils/DateFormatter";

interface PatientCardProps {
  data: {
    avatar: string;
    createdAt: string;
    description: string;
    id: string;
    name: string;
    website: string;
  };
  index: number;
  handleSave: (
    updatedData: { name: string; description: string; website: string; avatar: string },
    index: number
  ) => void;
}

const PatientCard: React.FC<PatientCardProps> = ({ data, index, handleSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleExpand = () => setIsExpanded(!isExpanded);

  const handleEditClick = () => {
    setIsDisabled(false);
    toggleModal();
  };

  const handleInfoClick = () => {
    setIsDisabled(true);
    toggleModal();
  };

  return (
    <Col xs={12} lg={6}>
      <Card className={styles.card} key={index}>
        <CardBody>
          <Row className={styles.card__row}>
            <Col xs="auto" className={styles.avatar}>
              <img src={data.avatar} alt="Patient Avatar" />
            </Col>
            <Col className={styles.patient__info}>
              <div className={styles.patient__name}>{data.name.toUpperCase()}</div>
              <div className={styles.patient__description}>{data.description}</div>
            </Col>
            {isExpanded && (
              <Col>
                <div className={styles.patient__extraInfo}>
                  <p>
                    <strong>{t("patients.website")}:</strong> {data.website}
                  </p>
                  <p>
                    <strong>{t("patients.createdAt")}:</strong> <DateFormatter date={data.createdAt} />
                  </p>
                </div>
              </Col>
            )}

            <Col xs="auto" className={styles.patient__actions}>
              <div>
                <Button className={styles.action__btn} onClick={handleEditClick}>
                  {t("edit")}
                </Button>
              </div>
              <div className={styles.patient_button}>
                <Button className={styles.icon__btn} onClick={handleInfoClick}>
                  <FaInfoCircle />
                </Button>
                <Button className={styles.icon__btn}>
                  <FaQuestionCircle onClick={toggleExpand} />
                </Button>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <PatientModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        patientData={data}
        disabled={isDisabled}
        index={index}
        onSave={handleSave}
      />
    </Col>
  );
};

export default PatientCard;
