enum HttpMethos {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

/**
 * Enumeration for API paths.
 */
export enum Paths {
  SHOWS = '/show',
  SEARCH = '/search/shows',
  SEASON = '/seasons',
}

/** Base URL for the API. */
const BASE_URL = 'https://api.tvmaze.com';

/**
 * Performs a GET request to the API.
 * @param {string} path - The path to make the request to.
 * @returns {Promise<T>} - A promise resolving with the retrieved data.
 */
export async function get<T>(path: string): Promise<T> {
  const localOptions = {
    method: HttpMethos.GET,
  };

  const res = await fetch(BASE_URL + path, localOptions);
  return handleResponse(res);
}

/**
 * Handles the response of the request.
 * @param {Response} res - The Response object of the request.
 * @returns {Promise<T>} - A promise resolving with the data obtained from the response.
 * @throws {Error} - Error if there's an issue with the request.
 */
async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const error: Error & { code: string; message: string } = {
      ...new Error('An error occurred while fetching the data.'),
      code: '',
      message: '',
    };

    if (res.status === 500) {
      error.code = '500';
      error.message = 'SERVER ERROR';
      throw error;
    }

    const info = await res.json();
    error.code = info.code;
    error.message = info.message;

    throw error;
  }

  return await res.text().then((text) => {
    const data = text && JSON.parse(text);
    return data;
  });
}
