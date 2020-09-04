import React, { ReactNode } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { currentTheme, flipTheme } from '../features/app/appSlice';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const theme = useSelector(currentTheme);
  const skeletonColor = theme === 'dark' ? '#8599c5' : '#E0E0E0';
  const skeletonHighlightClr = theme === 'dark' ? '#d5e2ff' : '#C2C2C2';
  const dispatch = useDispatch();

  return (
    <SkeletonTheme color={skeletonColor} highlightColor={skeletonHighlightClr}>
      <div className={`app-${theme}-theme app`}>
        {children}
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
      </div>
    </SkeletonTheme>
  );
}
