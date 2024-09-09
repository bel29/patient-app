import { FC, useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { TailSpin } from "react-loader-spinner";
import { useTranslation } from "react-i18next";

import { getPatientRecords } from "../../services/api/account";
import PatientCard from "../../components/CardComponent/PatientCard/PatientCard";
import FilterButton from "../../components/Buttons/Filter/FilterButton";
import { ToastWrapper, showErrorToast, showSuccessToast } from "../../components/Modal/CustomToast";

import styles from "./Patients.module.scss";

interface PatientInfo {
  avatar: string;
  createdAt: string;
  description: string;
  id: string;
  name: string;
  website: string;
}

export const Patients: FC = () => {
  const [patientsInfo, setPatients] = useState<PatientInfo[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<PatientInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  const handleFilterChange = (filterBy: string, searchTerm: string) => {
    if (searchTerm === "") {
      setFilteredPatients(patientsInfo);
    } else {
      const filtered = patientsInfo.filter((patient: any) =>
        patient[filterBy.toLowerCase()].toLowerCase().includes(searchTerm.toLowerCase())
      );

      setFilteredPatients(filtered);
    }
  };

  const handleSave = (
    updatedData: { name: string; description: string; website: string; avatar: string },
    index: number
  ) => {
    const updatedPatients = [...patientsInfo];

    updatedPatients[index] = {
      ...updatedPatients[index],
      name: updatedData.name,
      description: updatedData.description,
      website: updatedData.website,
      avatar: updatedData.avatar,
    };

    setPatients(updatedPatients);
    setFilteredPatients(updatedPatients);
    showSuccessToast(t("patients.updateSuccess"));
  };

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const data = await getPatientRecords();
      setPatients(data);
      setFilteredPatients(data);
    } catch (error) {
      showErrorToast(t("patients.errorFetching"));
      console.error(t("patients.errorFetching"), error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <FilterButton
            retrieveData={fetchPatients}
            options={[t("patients.name"), t("patients.description"), t("patients.website")]}
            onFilterChange={handleFilterChange}
          />
        </Col>
      </Row>
      <Row>
        {loading ? (
          <Col className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            <TailSpin
              height="80"
              width="80"
              color="#3498db"
              ariaLabel="tail-spin-loading"
              radius="1"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </Col>
        ) : (
          filteredPatients.map((patientCard: PatientInfo, index: number) => (
            <PatientCard key={index} data={patientCard} index={index} handleSave={handleSave} />
          ))
        )}
      </Row>
      <ToastWrapper />
    </Container>
  );
};
