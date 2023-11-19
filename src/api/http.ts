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

interface CustomOptions {
  userToken?: string;
  contentJson?: boolean;
}

const BASE_URL = 'https://api.tvmaze.com';

export async function get<T>(path: string, options: CustomOptions): Promise<T> {
  const localOptions = {
    method: HttpMethos.GET,
    headers: createHeaders(options),
  };

  const res = await fetch(BASE_URL + path, localOptions);
  return handleResponse(res);
}

export async function post<T, K>(path: string, dataBody: K, options: CustomOptions): Promise<T> {
  const body = options.contentJson ? JSON.stringify(dataBody) : (dataBody as FormData);
  const localOptions = {
    method: HttpMethos.POST,
    headers: createHeaders(options),
    body,
  };

  const res = await fetch(BASE_URL + path, localOptions);
  return handleResponse(res);
}

export async function postUrl<T, K>(path: string, dataBody: K, options: CustomOptions): Promise<T> {
  const body = options.contentJson ? JSON.stringify(dataBody) : (dataBody as FormData);
  const localOptions = {
    method: HttpMethos.POST,
    headers: createHeaders(options),
    body,
  };

  const res = await fetch(path, localOptions);
  return handleResponse(res);
}

function createHeaders(options: CustomOptions): Headers {
  const headers = new Headers();

  if (options.userToken) {
    headers.set('Authorization', `Bearer ${options.userToken}`);
  }

  if (options.contentJson) {
    headers.set('Content-Type', `application/json; charset=utf-8`);
  } else {
    headers.set('Content-Type', `multipart/form-data; charset=utf-8`);
  }
  return headers;
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
    console.log('QUE TEXTO ES ESTEEEE', text);
    const data = text && JSON.parse(text);
    return data;
  });
}
