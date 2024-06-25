const BASE_URL = 'https://pixabay.com';
const END_POINT = '/api/';

export function getPhotos(query) {
  query = query.toLowerCase().split(' ').join('+').toString();

  const params = new URLSearchParams({
    key: '44447717-1f020d7968b38ed176a967b4c',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const url = `${BASE_URL}${END_POINT}?${params}`;

  return fetch(url)
    .then(res => res.json())
    .catch(err => console.log(err));
}
