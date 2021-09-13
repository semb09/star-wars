import styled from 'styled-components';

import type { HTMLProps } from 'react';

const StyledInput = styled.input`
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  font-size: 20px;
  height: 62px;
  margin-bottom: 15px;
  padding-left: 20px;
  width: 100%;
`;

type Props = HTMLProps<HTMLInputElement> & {

}

const Input = ({ type, placeholder, onChange }: Props) => (
  <StyledInput
    onChange={onChange}
    placeholder={placeholder}
    type={type}
  />
);

Input.defaultProps = {
  type: 'text',
};

export default Input;
