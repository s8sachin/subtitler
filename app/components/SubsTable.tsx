import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';
import { sortAsc, sortDesc } from '../utils/sortHelper';
import SubsTableHeadCol from './SubsTableHeaderCol';

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

const SubsTable = ({
  listData,
  onSelection,
  isLoading,
}: {
  listData: any[];
  onSelection: any;
  isLoading: boolean;
}) => {
  const [sortOpts, setSortOpts] = useState({
    sortKey: 'lang',
    sortType: 'asc',
  });
  let sortedList = listData;
  sortedList = listData.sort((a: any, b: any) =>
    sortOpts.sortType === 'asc'
      ? sortAsc(a, b, sortOpts.sortKey)
      : sortDesc(a, b, sortOpts.sortKey)
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

  return (
    <>
      <div
        className="bg-customDarkBlue border-customDarkBlue d-flex"
        // style={{ width: 'calc(100% - 9px)' }}
        style={{ paddingRight: 9 }}
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
        </div>
      </div>
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
            {isLoading && (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
                  <tr key={num} style={{ opacity: 0.8, marginRight: 9 }}>
                    {tableHeadersList.map((it) => (
                      <td key={it.label} className="w-100" style={it.style}>
                        <Skeleton />
                      </td>
                    ))}
                  </tr>
                ))}
              </>
            )}
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
