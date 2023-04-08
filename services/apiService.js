import httpService from './httpService'

/**
 * Gets all the movies.
 *
 * @returns a response object with a data field containing an array of movie objects.
 */
// eslint-disable-next-line arrow-body-style
export const getMovies = () => {
  return httpService.get('/api/getMovies')
}
