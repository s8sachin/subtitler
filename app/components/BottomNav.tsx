import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentTheme, flipTheme } from '../features/app/appSlice';

const BottomNav = () => {
  const dispatch = useDispatch();
  const theme = useSelector(currentTheme);

  return (
    <div className="d-flex justify-content-between position-absolute bottom-nav-custom px-3 user-select-none">
      <div
        className="cursor-pointer px-2"
        role="presentation"
        title="About Subtitleh"
        onClick={() => {}}
      >
        <span>Subtitleh | V1.2.0</span>
      </div>
      <div
        onClick={() => dispatch(flipTheme())}
        title="Switch theme"
        role="presentation"
        className="cursor-pointer px-2"
      >
        <i className={`fas fa-${theme === 'dark' ? 'sun' : 'moon'}`} />
      </div>
    </div>
  );
};

export default BottomNav;
