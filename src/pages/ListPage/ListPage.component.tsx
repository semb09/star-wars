import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useDebounce } from 'use-debounce';
import {
  InfiniteLoader,
  List,
  AutoSizer,
} from 'react-virtualized';

import type { ListRowRenderer, Index } from 'react-virtualized';

import * as api from 'api';

import { Input, Character } from 'components';

import { PageContent } from 'styles';
import { Container, InputWrapper, ListWrapper } from './ListPage.styles';

const ListPage = () => {
  const [hasOpened, setHasOpened] = useState<{[id: string]: boolean}>({});
  // allows immediate loading state despite debounced search
  const listRef = useRef<null | List>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery] = useDebounce(query, 1000);

  useEffect(() => {
    const selected = document.cookie.replace('selected=', '');
    if (selected.length) setOpenIndex(parseInt(selected, 10));
  }, []);

  const {
    data,
    isFetchingNextPage,
    fetchNextPage,
  } = api.people.useInfinitePeople({
    query: debouncedQuery,
    onSuccess: () => isSearching && setIsSearching(false),
  });

  const setOpen = (index: number) => {
    if (index === openIndex) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
    listRef.current?.recomputeRowHeights();
    listRef.current?.forceUpdate();
    document.cookie = `selected=${index}`;
  };

  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    const page = Math.floor(index / 10);
    const person = data?.pages?.[page]?.results[index % 10];

    if (!person) {
      return (
        <Character
          key={key}
          style={style}
          loading
        />
      );
    }

    return (
      <Character
        key={key}
        person={person}
        style={style}
        isOpen={index === openIndex}
        onClick={() => setOpen(index)}
        hasFetched={hasOpened[index] || false}
        // eslint-disable-next-line no-shadow
        setHasFetched={() => setHasOpened((hasOpened) => ({ ...hasOpened, [index]: true }))}
      />
    );
  };

  const getPersonFromIndex = (index: number) => {
    const page = Math.floor(index / 10);
    return data?.pages?.[page]?.results[index % 10];
  };

  const isRowLoaded = ({ index }: Index) => {
    const person = getPersonFromIndex(index);
    return !!person;
  };

  const loadMoreRows = () => {
    if (isFetchingNextPage) return Promise.resolve();
    return fetchNextPage();
  };

  const searchPeople = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    setQuery(value);
  };

  const noResults = (
    !!debouncedQuery.length
    && !isSearching
    && (!data?.pages?.[0].results.length)
  );

  const calculateRowHeight = ({ index }: { index: number }) => {
    const person = getPersonFromIndex(index);
    let calcHeight = 77;
    if (index === openIndex && person) {
      const { starships } = person;
      calcHeight += (starships.length * 30) + 15;
      if (starships.length === 0) {
        calcHeight += 30;
      }
    }
    return calcHeight;
  };

  return (
    <PageContent>
      <Container>
        <InputWrapper>
          <Input
            placeholder="Search"
            onChange={searchPeople}
            value={query}
          />
        </InputWrapper>
        <ListWrapper>
          {noResults && (
            <strong>
              Sorry, no results found.
            </strong>
          )}
          {isSearching
            ? (
              <Character
                loading
              />
            ) : (
              <>
                {!noResults && (
                  <AutoSizer>
                    {({ width, height }) => (
                      <InfiniteLoader
                        isRowLoaded={isRowLoaded}
                        loadMoreRows={loadMoreRows}
                        rowCount={data?.pages[0].count || 0}
                      >
                        {({ onRowsRendered, registerChild }) => (
                          <List
                            ref={(ref) => {
                              listRef.current = ref;
                              registerChild(ref);
                            }}
                            height={height}
                            onRowsRendered={onRowsRendered}
                            overscanRowCount={0}
                            rowCount={data?.pages[0].count || 0}
                            rowHeight={calculateRowHeight}
                            rowRenderer={rowRenderer}
                            width={width}
                          />
                        )}
                      </InfiniteLoader>
                    )}
                  </AutoSizer>
                )}
              </>
            )}
        </ListWrapper>
      </Container>
    </PageContent>
  );
};

export default ListPage;
