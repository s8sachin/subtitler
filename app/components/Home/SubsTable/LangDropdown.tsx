/* eslint-disable react/require-default-props */
/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { useState, forwardRef } from 'react';
import { Dropdown, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { langMapArrayObj } from '../../../utils/languageMap';

const CustomMenu = forwardRef(
  (
    {
      children,
      style,
      className,
      'aria-labelledby': labeledBy,
    }: {
      children: React.ReactNode;
      style?: any;
      className?: string;
      'aria-labelledby'?: any;
    },
    ref: any
  ) => {
    const [value, setValue] = useState('');

    return (
      <div
        ref={ref}
        style={{ maxHeight: 200, overflowY: 'auto', ...style }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="mx-3 my-2 w-auto text-customDarkBlue"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child: any) =>
              !value ||
              child.props.children.toLowerCase().startsWith(value.toLowerCase())
          )}
        </ul>
      </div>
    );
  }
);

const LangDropdown = ({
  selectedLang,
  onClickItem,
}: {
  selectedLang: string;
  onClickItem: any;
}) => {
  return (
    <Dropdown className="lang-dropdown">
      <Dropdown.Toggle
        variant="none"
        className="p-0 lang-dropdown-toggle text-white outline-0 user-select-none box-shadow-none"
      >
        <i className="fas fa-ellipsis-v" />
      </Dropdown.Toggle>
      <Dropdown.Menu as={CustomMenu} className="lang-dropdown-menu">
        <Dropdown.Item
          variant="customDarkBlue"
          className={`${
            selectedLang === 'all' ? 'text-white' : 'text-customDarkBlue'
          }`}
          onClick={() => onClickItem('all')}
          active={selectedLang === 'all'}
        >
          All Languages
        </Dropdown.Item>
        {langMapArrayObj.map((langObj) => (
          // <Form.Check
          //   className="ml-2"
          //   key={langObj.langCode}
          //   type="checkbox"
          //   label={langObj.language}
          // />
          <Dropdown.Item
            className={`${
              selectedLang === langObj.langCode
                ? 'text-white'
                : 'text-customDarkBlue'
            } text-truncate`}
            key={langObj.langCode}
            onClick={() => onClickItem(langObj.langCode)}
            active={selectedLang === langObj.langCode}
          >
            {langObj.language}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

LangDropdown.propTypes = {
  selectedLang: PropTypes.string,
  onClickItem: PropTypes.func,
};

LangDropdown.defaultProps = {
  selectedLang: 'all',
  onClickItem: () => {},
};

export default LangDropdown;
