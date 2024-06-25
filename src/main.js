import { photoCardsTemplate } from './js/render-functions';
import { getPhotos } from './js/pixabay-api';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('.entry-form'),
  input: document.querySelector('.entry-form-input'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loader'),
};

const iziParams = {
  titleColor: '#FFFFFF',
  messageColor: '#FFFFFF',
  backgroundColor: '#EF4040',
  progressBarColor: '#B51B1B',
  message:
    'Sorry, there are no images matching<br>' +
    'your search query.Please try again!',
  position: 'topRight',
  iconUrl: '../img/sad.svg',
};

const simpleParams = {
  captions: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
  overlayOpacity: 0.8,
};

let gallery;

function showLoader() {
  refs.loader.classList.remove('visually-hidden');
}

function hideLoader() {
  refs.loader.classList.add('visually-hidden');
}

function onPhotosSearch(query) {
  refs.gallery.innerHTML = '';
  showLoader();
  getPhotos(query)
    .then(res => {
      if (res.hits.length === 0) {
        iziToast.show(iziParams);
        return;
      }
      const markup = photoCardsTemplate(res.hits);
      refs.gallery.insertAdjacentHTML('afterbegin', markup);
      gallery = new SimpleLightbox('.gallery a', simpleParams);
      gallery.refresh();
      gallery.on('show.simplelightbox');
    })
    .finally(() => hideLoader());
}

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  const query = refs.input.value.trim();
  onPhotosSearch(query);
  refs.form.reset();
});
