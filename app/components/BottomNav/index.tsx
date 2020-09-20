import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { shell } from 'electron';
import { currentTheme, flipTheme } from '../../features/app/appSlice';
import { APP_VERSION } from '../../utils/constants';

const openLink = () =>
  shell.openExternal(`https://s8sachin.github.io/subtitler`);

const BottomNav = () => {
  const dispatch = useDispatch();
  const theme = useSelector(currentTheme);

  return (
    <div className="d-flex justify-content-between position-absolute bottom-nav-custom px-3 user-select-none">
      <div
        className="cursor-pointer px-2"
        role="presentation"
        title="About Subtitler"
        onClick={() => {}}
      >
        <span onClick={openLink} role="presentation">
          {`Subtitler | V${APP_VERSION}`}
        </span>
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
