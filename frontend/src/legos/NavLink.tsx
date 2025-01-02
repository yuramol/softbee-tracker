import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from 'theme';

//@ts-ignore
export const NavLink = styled(Link)`
  text-decoration: unset;
  color: ${(props) => props.color || theme.palette.primary.main};
  &.active {
    background-color: ${theme.palette.action.hover};
    border-radius: 5%;
  }
`;
