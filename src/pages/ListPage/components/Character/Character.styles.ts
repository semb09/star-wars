import styled from 'styled-components';
import type { HTMLProps } from 'react';

export const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

type ListButtonProps = HTMLProps<HTMLButtonElement> & {
  isLoading?: boolean,
  isSelected?: boolean,
};

export const ListButton = styled.button<ListButtonProps>`
  background: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : theme.colors.box)};
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.border};
  box-shadow: 0px 0px 20px ${({ theme }) => theme.colors.secondary};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.bodyTextInverted : theme.colors.bodyText)};
  cursor: pointer;
  font-size: 16px;
  height: 62px;
  margin-bottom: 15px;
  max-width: 540px;
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
  padding: 20px;
  transition: background .2s;
  width: 100%;

  &:hover {
    background: ${({ theme, isSelected }) => (isSelected ? theme.colors.primary : theme.colors.boxLight)};
  }
`;

export const Name = styled.span`
  font-weight: bold;
  text-transform: uppercase;
`;

export const Starships = styled.div`
  display: block;
  margin-bottom: 15px;
`;

export const StarshipName = styled.div`
  display: block;
  height: 20px;
  margin-bottom: 10px;
`;
