function photoCardTemplate({
  views,
  downloads,
  likes,
  comments,
  webformatURL,
  largeImageURL,
  tags,
}) {
  return `<li class="card">
      <a class="card-image-wrapper" href="${largeImageURL}">
        <img class="card-image" src="${webformatURL}" alt="${tags}" data-full="${largeImageURL}">
      </a>
      <ul class="card-content">
        <li class="card-content-item">Likes <span data-likes="">${likes}</span></li>
        <li class="card-content-item">Comments <span data-comments="">${comments}</span></li>
        <li class="card-content-item">Views <span data-views="">${views}</span></li>
        <li class="card-content-item">Downloads <span data-downloads="">${downloads}</span></li>
      </ul>
    </li>`;
}

export function photoCardsTemplate(photos) {
  return photos.map(photo => photoCardTemplate(photo)).join('');
}
