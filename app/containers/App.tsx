import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { currentTheme, flipTheme } from '../features/app/appSlice';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const theme = useSelector(currentTheme);
  const dispatch = useDispatch();

  return (
    <div className={`app-${theme}-theme app`}>
      {children}
      <div className="d-flex justify-content-between position-absolute bottom-nav-custom px-3 user-select-none">
        <div
          className="cursor-pointer px-2"
          role="presentation"
          onClick={() => {}}
        >
          <span>Subtitleh | V 1.2.0</span>
        </div>
        <div
          onClick={() => dispatch(flipTheme())}
          role="presentation"
          className="cursor-pointer px-2"
        >
          <i className={`fas fa-${theme === 'dark' ? 'moon' : 'sun'}`} />
        </div>
      </div>
    </div>
  );
}
