import React from 'react';
import styled from 'styled-components';

const ArrowDown = (props: any) => (
  <svg
    id="TimePicker"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      id="TimePicker"
      d="M7.41,8.59L12,13.17l4.59-4.58L18,10l-6,6l-6-6L7.41,8.59z"
    />
    <path id="TimePicker" fill="none" d="M0,0h24v24H0V0z" />
  </svg>
);

const StyledArrowDown = styled(ArrowDown)`
  cursor: pointer;
  fill: #104065;
`;

export default StyledArrowDown;
