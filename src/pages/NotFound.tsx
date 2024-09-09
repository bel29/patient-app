import { FC } from "react";
import { useTranslation } from "react-i18next";

export const NotFound: FC = () => {
  const { t } = useTranslation();
  return <h1>{t("notFound")}</h1>;
};
