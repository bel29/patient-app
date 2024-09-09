import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { useTranslation } from "react-i18next";
import { TailSpin } from "react-loader-spinner";

import FilterButton from "../../components/Buttons/Filter/FilterButton";
import CustomTable from "../../components/Table/CustomTable";
import { getPatientRecords } from "../../services/api/account";
import ActionButton from "../../components/Buttons/Action/ActionButton";
import PatientModal from "../../components/Modal/PatientModal";
import { ToastWrapper, showErrorToast, showSuccessToast } from "../../components/Modal/CustomToast";

import styles from "./PatientsList.module.scss";

interface PatientInfo {
  avatar: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  website: string;
}

const initialData = {
  avatar: "",
  createdAt: "",
  description: "",
  id: "",
  name: "",
  website: "",
};

export const PatientsList: FC = () => {
  const { t } = useTranslation();
  const [patientsData, setPatientsData] = useState<string[][]>([]);
  const [filteredPatientsData, setFilteredPatientsData] = useState<string[][]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSave = async (updatedData: {
    name: string;
    description: string;
    website: string;
    avatar: string;
  }) => {
    try {
      const patientData: { id: string; name: string; createdAt: string; website: string } = {
        id: patientsData.length.toString(),
        name: updatedData.name,
        createdAt: new Date().toISOString(),
        website: updatedData.website,
      };

      const data = [...patientsData, Object.values(patientData)];

      setFilteredPatientsData(data);
      setPatientsData(data);

      toggleModal();
      showSuccessToast(t("patients.updateSuccess"));
    } catch (error) {
      showErrorToast(t("patients.errorFetching"));
      console.error("Error saving patient record:", error);
    }
  };

  const handleFilterChange = (filterBy: string, searchTerm: string) => {
    const indexMap: Record<string, number> = {
      [t("patients.name")]: 1,
      [t("patients.website")]: 3,
      [t("patients.id")]: 0,
    };

    const filterIndex = indexMap[filterBy];

    const filtered = patientsData.filter((patient) => {
      let fieldValue = patient[filterIndex];
      return fieldValue.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredPatientsData(filtered);
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatientRecords();

      const patientsArray = Object.values(data as Record<string, PatientInfo>).map((patient) => [
        patient.id.trim(),
        patient.name.trim(),
        patient.createdAt.trim(),
        patient.website.trim(),
      ]);

      setPatientsData(patientsArray);
      setFilteredPatientsData(patientsArray);
    } catch (error) {
      showErrorToast(t("patients.errorFetching"));
      console.error("Error fetching patient records:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <Container className={styles.container}>
        <Row>
          <Col className={styles.add__button}>
            <ActionButton
              onClick={() => {
                toggleModal();
              }}
              outline={true}
              label={t("patients.addPatient")}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FilterButton
              retrieveData={fetchPatients}
              options={[
                t("patients.filterOptions.name"),
                t("patients.filterOptions.website"),
                t("patients.filterOptions.id"),
              ]}
              onFilterChange={handleFilterChange}
            />
          </Col>
        </Row>

        <Row className={styles.custom__table_div} sm={12} md={12} lg={12}>
          {loading ? (
            <div className={styles.loader}>
              <TailSpin
                height="80"
                width="80"
                color="#3498db"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <CustomTable
              headTitles={[
                t("patients.id"),
                t("patients.name"),
                t("patients.createdAt"),
                t("patients.website"),
              ]}
              content={filteredPatientsData}
            />
          )}
        </Row>
        <ToastWrapper />
      </Container>

      <PatientModal
        isOpen={isModalOpen}
        toggle={toggleModal}
        patientData={initialData}
        disabled={false}
        index={0}
        onSave={handleSave}
      />
    </>
  );
};
