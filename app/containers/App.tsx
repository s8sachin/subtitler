import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { SkeletonTheme } from 'react-loading-skeleton';
import { currentTheme } from '../features/app/appSlice';
import BottomNav from '../components/BottomNav';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  const theme = useSelector(currentTheme);
  const skeletonColor = theme === 'dark' ? '#8599c5' : '#E0E0E0';
  const skeletonHighlightClr = theme === 'dark' ? '#d5e2ff' : '#C2C2C2';

  return (
    <SkeletonTheme color={skeletonColor} highlightColor={skeletonHighlightClr}>
      <div className={`app-${theme}-theme app`}>{children}</div>
      <BottomNav />
    </SkeletonTheme>
  );
}
