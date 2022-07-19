import React from 'react';
import { Link } from 'react-router-dom';

import LogoMain from '../../assets/SoftBee_Logo.svg';

export const Logo = () => (
  <Link to="/">
    <img alt="logo" src={LogoMain} width="100px" />
  </Link>
);
