import React from "react";

interface DateFormatterProps {
  date: string | Date;
  format?: "short" | "long" | "time" | "custom";
  customFormat?: string;
}

const DateFormatter: React.FC<DateFormatterProps> = ({ date, format = "long", customFormat }) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return <span>Invalid Date</span>;
  }

  const formatDate = () => {
    switch (format) {
      case "short":
        return parsedDate.toLocaleDateString();
      case "long":
        return parsedDate.toLocaleString();
      case "time":
        return parsedDate.toLocaleTimeString();
      case "custom":
        return parsedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          ...getCustomFormatOptions(customFormat),
        });
      default:
        return parsedDate.toLocaleString();
    }
  };

  const getCustomFormatOptions = (customFormat?: string) => {
    const options: Intl.DateTimeFormatOptions = {};

    if (customFormat) {
      if (customFormat.includes("yyyy")) options.year = "numeric";
      if (customFormat.includes("MM")) options.month = "2-digit";
      if (customFormat.includes("MMM")) options.month = "short";
      if (customFormat.includes("dd")) options.day = "2-digit";
      if (customFormat.includes("hh")) options.hour = "2-digit";
      if (customFormat.includes("mm")) options.minute = "2-digit";
      if (customFormat.includes("ss")) options.second = "2-digit";
    }

    return options;
  };

  return <span>{formatDate()}</span>;
};

export default DateFormatter;
