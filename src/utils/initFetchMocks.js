import fetchMock from 'fetch-mock';
import flatten from 'lodash.flatten';

export function initFetchMocks(...mocks) {
  fetchMock.restore();

  flatten(mocks).forEach((mock) => {
    const [matcher, response, options] = mock;

    fetchMock.mock(
      matcher,
      { status: 200, ...response },
      { method: 'get', ...options },
    );
  });
}
