import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { sortAsc, sortDesc } from '../../../utils/sortHelper';
import SubsTableHeadCol from './SubsTableHeaderCol';
import EmptySvg from '../../../utils/empty.svg';
import LangDropdown from './LangDropdown';
import LoadingTbody from './LoadingTbody';

const tableHeadersList = [
  {
    label: 'Name',
    key: 'filename',
    style: { width: '100%' },
  },
  {
    label: 'Downloads',
    key: 'downloads',
    style: { minWidth: 100 },
  },
  {
    label: 'Score',
    key: 'score',
    style: { minWidth: 60 },
  },
  {
    label: 'Language',
    key: 'lang',
    style: { minWidth: 90 },
  },
];

const initialLang = localStorage.getItem('lang') || 'all';
const initialSortOpts = { sortKey: 'lang', sortType: 'asc' };

const SubsTable = ({
  listData,
  onSelection,
  isLoading,
}: {
  listData: any[];
  onSelection: any;
  isLoading: boolean;
}) => {
  const [sortOpts, setSortOpts] = useState(initialSortOpts);
  const [selectedLang, setSelectedLang] = useState(initialLang);

  let sortedList = listData;
  sortedList = listData.sort((a: any, b: any) =>
    sortOpts.sortType === 'asc'
      ? sortAsc(a, b, sortOpts.sortKey)
      : sortDesc(a, b, sortOpts.sortKey)
  );

  sortedList = sortedList.filter(({ langcode }) =>
    ['all', langcode].includes(selectedLang)
  );

  const handleHeadClick = (labelKey: string) => {
    const newSortOpts = { ...sortOpts };
    if (labelKey === sortOpts.sortKey) {
      newSortOpts.sortType = sortOpts.sortType === 'asc' ? 'desc' : 'asc';
    } else {
      newSortOpts.sortKey = labelKey;
      newSortOpts.sortType = 'desc';
    }
    setSortOpts(newSortOpts);
  };

  const onLangClick = (langCode: string) => {
    setSelectedLang(langCode);
    localStorage.setItem('lang', langCode);
  };

  return (
    <>
      {(isLoading || listData.length !== 0) && (
        <div
          className="bg-customDarkBlue border-customDarkBlue d-flex"
          // style={{ width: 'calc(100% - 9px)' }}
          style={{ paddingRight: 3 }}
        >
          <div className="d-flex w-100">
            {tableHeadersList.map((headerObj: any) => (
              <SubsTableHeadCol
                label={headerObj.label}
                labelKey={headerObj.key}
                sortOpts={sortOpts}
                key={headerObj.key}
                onClick={handleHeadClick}
                style={headerObj.style}
              />
            ))}
            <LangDropdown
              selectedLang={selectedLang}
              onClickItem={onLangClick}
            />
          </div>
        </div>
      )}
      {!isLoading && sortedList.length === 0 && (
        <>
          <h3 className="w-100 d-flex justify-content-center">
            No results found
          </h3>
          <img src={EmptySvg} className="img-fluid w-100 h-50" alt="Empty" />
        </>
      )}
      <div className="scrollable-tbody">
        <Table
          striped
          hover
          borderless
          className="mb-0 text-inherit"
          size="sm"
          style={{ fontSize: 15 }}
        >
          <tbody className="mt-2" style={{ border: '1px solid #425b92a8' }}>
            {isLoading && <LoadingTbody tableHeadersList={tableHeadersList} />}
            {!isLoading &&
              sortedList.map((subObj) => (
                <tr
                  key={subObj.id}
                  onClick={() => onSelection(subObj)}
                  className="cursor-pointer tr-hover"
                  title={`${subObj.filename} | Click to download`}
                >
                  <td className="max-width-0 w-100 text-truncate">
                    {subObj.filename}
                  </td>
                  <td
                    className="max-width-0 text-truncate"
                    style={{ minWidth: 100 }}
                  >
                    {subObj.downloads}
                  </td>
                  <td
                    className="max-width-0 text-truncate"
                    style={{ minWidth: 60 }}
                  >
                    {subObj.score}
                  </td>
                  <td
                    className="max-width-0 text-truncate"
                    style={{ minWidth: 90 }}
                  >
                    {subObj.lang}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

SubsTable.propTypes = {
  listData: PropTypes.arrayOf(PropTypes.object),
  onSelection: PropTypes.func,
  isLoading: PropTypes.bool,
};

SubsTable.defaultProps = {
  listData: [],
  onSelection: () => {},
  isLoading: true,
};

export default SubsTable;
