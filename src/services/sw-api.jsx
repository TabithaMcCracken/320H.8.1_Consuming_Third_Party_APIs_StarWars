// src/services/sw-api.js

const BASE_URL = 'https://swapi.dev/api/starships/';

export async function getAllStarships() {
  try {
    let starships = [];
    let nextUrl = BASE_URL;

    while (nextUrl) {
      const response = await fetch(nextUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      starships = [...starships, ...data.results];
      nextUrl = data.next;
    }

    return starships;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}
