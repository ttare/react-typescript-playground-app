import React from 'react';
import { Button as ButtonSemantic } from 'semantic-ui-react';

type Props = any;

const Button: React.FC<Props> = ({ children, ...rest }) => {
  return <ButtonSemantic {...rest}>{children}</ButtonSemantic>;
};

export default Button;
