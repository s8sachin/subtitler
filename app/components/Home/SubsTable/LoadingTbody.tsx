import React from 'react';
import Skeleton from 'react-loading-skeleton';

const LoadingTbody = ({ tableHeadersList }: { tableHeadersList: any[] }) => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((num) => (
        <tr key={num} style={{ opacity: 0.8, marginRight: 9 }}>
          {tableHeadersList.map((it) => (
            <td key={it.label} className="w-100" style={it.style}>
              <Skeleton duration={2} />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
};

export default LoadingTbody;
