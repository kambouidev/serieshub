enum HttpMethos {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum Paths {
  SHOWS = '/show',
  SEARCH = '/search/shows',
}

const BASE_URL = 'https://api.tvmaze.com';

export async function get<T>(path: string): Promise<T> {
  const localOptions = {
    method: HttpMethos.GET,
  };

  const res = await fetch(BASE_URL + path, localOptions);
  return handleResponse(res);
}

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
