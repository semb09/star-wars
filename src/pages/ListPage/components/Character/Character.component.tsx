import * as api from 'api';

import {
  Wrapper,
  ListButton,
  Name,
  Starships,
  StarshipName,
} from './Character.styles';

type Props = {
  person?: api.people.Person,
  loading?: boolean,
  style?: any,
  onClick?: () => void,
  isOpen?: boolean,
  hasFetched?: boolean,
  setHasFetched?: () => void,
}

const Character = ({
  isOpen,
  loading,
  onClick,
  person,
  style,
  hasFetched,
  setHasFetched,
}: Props) => {
  const starships = api.starships.useStarships({
    shouldFetch: (isOpen && !hasFetched) || false,
    urls: person?.starships || [],
    onSuccess: () => setHasFetched && setHasFetched(),
  });

  return (
    <Wrapper style={style}>
      <ListButton
        disabled={loading}
        isLoading={loading}
        onClick={onClick}
        isSelected={isOpen}
      >
        <Name>
          {loading ? 'Loading...' : person?.name}
        </Name>
      </ListButton>
      {isOpen && (
        <Starships>
          {person?.starships.length === 0 && (
            <strong>No starships here.</strong>
          )}
          {starships.map(({ isLoading, data }) => {
            if (isLoading) {
              return (
                <strong>Loading...</strong>
              );
            }
            return (
              <StarshipName>
                {data.name}
              </StarshipName>
            );
          })}
        </Starships>
      )}
    </Wrapper>
  );
};

Character.defaultProps = {
  loading: false,
  style: {},
  onClick: () => {},
  person: null,
  isOpen: false,
  setHasFetched: () => {},
  hasFetched: true,
};

export default Character;
