import React, { useState } from "react";
import { Input, InputGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { FaFilter, FaChevronDown } from "react-icons/fa";

import styles from "./FilterButton.module.scss";
import { useTranslation } from "react-i18next";

interface FilterButtonProps {
  onFilterChange: (filterBy: string, searchTerm: string) => void;
  options: string[];
  retrieveData: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ onFilterChange, options, retrieveData }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { t } = useTranslation();

  const toggleDropdown = () => setDropdownOpen((prevState) => !prevState);

  const handleFilterSelect = (filter: string) => {
    retrieveData();
    setSelectedFilter(filter);
    setSearchTerm("");
    setDropdownOpen(false);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onFilterChange(selectedFilter, e.target.value);
  };

  return (
    <div className={styles.filter__container}>
      <InputGroup>
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
          <DropdownToggle outline color="light" className={styles.chevron__btn}>
            <FaFilter className={`ml-2 ${styles.icon}`} />
            {selectedFilter ? selectedFilter : t("filterButton.selectFilter")}
            <FaChevronDown />
          </DropdownToggle>
          <DropdownMenu>
            {options.map((label, index) => (
              <DropdownItem key={index} onClick={() => handleFilterSelect(label)}>
                {label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>

        {selectedFilter && (
          <Input
            type="text"
            placeholder={`${t("filterButton.searchBy")} ${selectedFilter.toLowerCase()}`}
            value={searchTerm}
            onChange={handleSearchChange}
            className={styles.input__search}
          />
        )}
      </InputGroup>
    </div>
  );
};

export default FilterButton;
