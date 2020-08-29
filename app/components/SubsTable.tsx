import React, { useState, useEffect, Fragment } from 'react';
import { Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const SubsTable = ({
  listData,
  onSelection,
}: {
  listData: any[];
  onSelection: any;
}) => {
  return (
    <>
      <div className="scrollable-tbody">
        <Table
          striped
          hover
          // variant="dark"
          borderless
          className="text-white mb-0"
          size="sm"
          style={{ fontSize: 15 }}
        >
          <thead className="bg-customDarkBlue border-customDarkBlue">
            <tr>
              <th>Name</th>
              <th>Downloads</th>
              <th>Score</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody className="mt-2" style={{ border: '1px solid #425b92a8' }}>
            {listData.map((subObj) => (
              <tr
                key={subObj.id}
                onClick={() => onSelection(subObj)}
                className="cursor-pointer"
                title={`${subObj.filename} | Click to download`}
              >
                <td className="max-width-0 w-100 text-truncate">
                  {subObj.filename}
                </td>
                <td className="max-width-0 text-truncate">
                  {subObj.downloads}
                </td>
                <td className="max-width-0 text-truncate">{subObj.score}</td>
                <td className="max-width-0 text-truncate">{subObj.lang}</td>
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
};

SubsTable.defaultProps = {
  listData: [],
  onSelection: () => {},
};

export default SubsTable;
