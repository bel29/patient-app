import React from "react";
import { Col, Row } from "reactstrap";
import "react-datepicker/dist/react-datepicker.css";

import DateFormatter from "../Utils/DateFormatter";

import styles from "./CustomTable.module.scss";

interface TableProps {
  headTitles?: (string | React.ReactNode)[];
  content: (string | Date | (string | Date)[])[];
}

const CustomTable: React.FC<TableProps> = ({ headTitles = [], content = [] }) => {
  const isValidDate = (value: string): boolean => {
    const iso8601Regex = /^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z)$/;
    return iso8601Regex.test(value);
  };
  return (
    <div>
      <div className={styles.container}>
        <Row sm={12} lg={12} className={styles.table__header}>
          {headTitles.map((head, index) => (
            <Col key={index}>{head}</Col>
          ))}
        </Row>
      </div>
      <div className={styles.content__container}>
        <Row className={styles.table__content}>
          {content.map((content_row, rowIndex) => (
            <Row key={rowIndex} sm={12}>
              {Array.isArray(content_row) ? (
                content_row.map((item, itemIndex) => (
                  <Col key={itemIndex}>
                    {item instanceof Date || isValidDate(item) ? (
                      <DateFormatter
                        date={new Date(item.toString())}
                        customFormat="yyyy-MM-dd"
                        format="short"
                      />
                    ) : (
                      item
                    )}
                  </Col>
                ))
              ) : (
                <Col>
                  {content_row instanceof Date || !isNaN(Date.parse(content_row.toString())) ? (
                    <DateFormatter date={new Date(content_row.toString())} />
                  ) : (
                    content_row
                  )}
                </Col>
              )}
            </Row>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default CustomTable;
