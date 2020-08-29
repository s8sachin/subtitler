import React from 'react';

const SubsTableHeadCol = ({
  label,
  labelKey,
  sortOpts,
  onClick,
}: {
  label: string;
  labelKey: string;
  sortOpts: any;
  onClick: any;
}) => {
  const iconType = sortOpts.sortType === 'asc' ? 'up' : 'down';
  const isSameLabel = sortOpts.sortKey === labelKey;
  return (
    <th onClick={() => onClick(labelKey)} className="user-select-none">
      <div
        className="d-flex cursor-pointer"
        style={{ marginRight: isSameLabel ? '' : 'calc(10px + 0.25rem)' }}
      >
        {label}
        {isSameLabel && <i className={`fas fa-caret-${iconType} ml-1 mt-1`} />}
      </div>
    </th>
  );
};

export default SubsTableHeadCol;
