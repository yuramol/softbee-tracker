import React, { FC, ReactNode } from 'react';

import { cn } from 'lib/utils';

interface Props {
  children: ReactNode;
  className?: string;
}

export const ComponentContainer: FC<Props> = ({ children, className }) => (
  <div
    className={cn(
      'max-w-[1180px] w-full mx-auto px-[15px] md:px-[30px] xl:px-[15px] py-8',
      className
    )}
  >
    {children}
  </div>
);
