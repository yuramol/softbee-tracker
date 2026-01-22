import { Link } from "react-router-dom";

import LogoMain from "../../assets/SoftBee_Logo.png";

export const Logo = () => (
  <Link to="/">
    <img alt="logo" src={LogoMain} width="90px" />
  </Link>
);
