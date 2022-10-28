import { usePageTitle } from 'hooks';
import React, { ReactNode, useEffect } from 'react';
interface PageTitleProps {
  children?: ReactNode;
  title: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({ children, title }) => {
  const { setTitle } = usePageTitle();
  useEffect(() => {
    setTitle(title as string);
  }, [title]);
  return <div>{children}</div>;
};
