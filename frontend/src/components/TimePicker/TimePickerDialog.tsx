import React from 'react';
import styled from 'styled-components';

import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp';
import { formatNumber } from './utils';

const TimePickerDialog = styled.div`
  align-items: center;
  background: white;
  border-radius: 5px;
  border: 1px solid #104065;
  box-shadow: 0 1px 3px #d3d3d380, 0 1px 3px #d3d3d380;
  color: #104065;
  display: flex;
  font-size: 22px;
  justify-content: center;
  position: absolute;
  user-select: none;
  width: 190px;
  z-index: 999;
`;

const TimePickerPart = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: auto 12px;
`;

type TimePickerBlockProps = {
  number: number;
  onDownClick: () => void;
  onUpClick: () => void;
};

export const TimePickerBlock = ({
  number,
  onDownClick,
  onUpClick,
}: TimePickerBlockProps) => (
  <TimePickerPart>
    <ArrowUp onClick={onUpClick} size={36} />
    {formatNumber(number)}
    <ArrowDown onClick={onDownClick} size={36} />
  </TimePickerPart>
);

export default TimePickerDialog;
