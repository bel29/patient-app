import { FC } from "react";
import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

import { Login } from "./pages/Login/Login";
import { Layout } from "./components/Layout/Layout";
import { Patients } from "./pages/Patients/Patients";
import { NotFound } from "./pages/NotFound";
import { selectUserContext } from "./store/selectors";
import { PatientsList } from "./pages/Patients/PatientsList";

i18n.changeLanguage("en");

export const App: FC = () => {
  const { t } = useTranslation();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultRoute />} />

        <Route path="/login" element={<Login />} />

        <Route path="/patients" element={<Layout title="Patients">{<Patients />}</Layout>} />
        <Route path="/patients/list" element={<Layout title="PatientsList">{<PatientsList />}</Layout>} />

        <Route path="*" element={<Layout title={t("pageNotFound")}>{<NotFound />}</Layout>} />
      </Routes>
    </Router>
  );
};

const DefaultRoute = () => {
  const user = useSelector(selectUserContext);

  return <Navigate to={user.isAuthenticated ? "/patients" : "/login"} />;
};
