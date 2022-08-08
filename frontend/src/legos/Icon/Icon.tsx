import React, { FC } from 'react';

import { IconsMap } from './helpers';
import { IconProps } from './types';

export const Icon: FC<IconProps> = ({
  icon,
  height,
  width,
  color,
  size,
  ...props
}) => {
  const Render = IconsMap[icon];

  return (
    <Render
      fontSize={size}
      height={height}
      width={width}
      color={color}
      {...props}
    />
  );
};

export * from './types';
