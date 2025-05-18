import { config } from './config.js';

export const get = async (endpoint) => {
  const url = `${config.apiUrl}/${endpoint}?api_key=${config.apiKey}`;

  try {
    const response = await fetch(url);

    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(
        `Det gick inte så bra ${response.status}, ${response.statusText}`
      );
    }
  } catch (error) {
    console.error(error);
  }
};

export const post = async (endpoint, data) => {
  const url = `${config.apiUrl}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.log(error);
  }
};
export const put = async (endpoint, data) => {
  const url = `${config.apiUrl}/${endpoint}`;
  try {
    const response = await fetch(url, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data ? JSON.stringify(data) : null, 
    });

    if (response.ok) {
      return true;
    }
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (endpoint) => {
  const url = `${config.apiUrl}/${endpoint}`;

  try {
    const response = await fetch(url, {
      method: 'DELETE',
    });

    console.log(response);

    if (response.ok) {
      return response.status;
    }
  } catch (error) {
    console.log(error);
  }
};
