import React from 'react';

const SubsTableHeadCol = ({
  label,
  labelKey,
  sortOpts,
  onClick,
  style,
}: {
  label: string;
  labelKey: string;
  sortOpts: any;
  onClick: any;
  style: any;
}) => {
  const iconType = sortOpts.sortType === 'asc' ? 'up' : 'down';
  const isSameLabel = sortOpts.sortKey === labelKey;
  return (
    <div
      onClick={() => onClick(labelKey)}
      className="user-select-none text-white d-flex cursor-pointer p-1"
      style={{ ...style, fontSize: 15 }}
      role="presentation"
    >
      <div
        className="d-flex"
        // style={{ marginRight: isSameLabel ? '' : 'calc(10px + 0.25rem)' }}
      >
        {label}
        {isSameLabel && <i className={`fas fa-caret-${iconType} ml-1 mt-1`} />}
      </div>
    </div>
  );
};

export default SubsTableHeadCol;
