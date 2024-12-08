// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Находим элементы формы
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Функция для открытия поп-апа
function openModal(popup) {
  popup.classList.add('popup_is-opened');
}

// Функция для закрытия поп-апа
function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
}

// Закрытие поп-апов по нажатию на крестик
popupCloseButtons.forEach(button => {
  button.addEventListener('click', () => {
    const popup = button.closest('.popup');
    closeModal(popup);
  });
});

// @todo: Функция создания карточки
function createCard(data) {
  const card = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const cardLikeButton = card.querySelector('.card__like-button');
  const cardDeleteButton = card.querySelector('.card__delete-button');

  // Заполнение данных карточки
  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  // Лайк карточки
  cardLikeButton.addEventListener('click', () => {
    cardLikeButton.classList.toggle('card__like-button_is-active');
  });

  // Удаление карточки
  cardDeleteButton.addEventListener('click', () => {
    card.remove();
  });

  // Открытие поп-апа с картинкой
  cardImage.addEventListener('click', () => {
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
    openModal(imagePopup);
  });

  return card;
}

// @todo: Вывести карточки на страницу
initialCards.forEach(cardData => {
  const card = createCard(cardData);
  placesList.append(card);
});

// Открытие поп-апа редактирования профиля
const editButton = document.querySelector('.profile__edit-button');
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(profilePopup);
});

// Обработчик формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(profilePopup);
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);

// Открытие поп-апа добавления карточки
const addButton = document.querySelector('.profile__add-button');
addButton.addEventListener('click', () => {
  const cardForm = cardPopup.querySelector('.popup__form');
  cardForm.reset();
  openModal(cardPopup);
});

// Обработчик формы добавления карточки
const cardFormElement = cardPopup.querySelector('.popup__form');
cardFormElement.addEventListener('submit', function(evt) {
  evt.preventDefault();
  const placeName = cardFormElement.querySelector('.popup__input_type_card-name').value;
  const link = cardFormElement.querySelector('.popup__input_type_url').value;
  const newCard = {
    name: placeName,
    link: link
  };
  const card = createCard(newCard);
  placesList.prepend(card); 
  closeModal(cardPopup);
});

//плавная анимация
window.addEventListener('DOMContentLoaded', () => {
  const popups = document.querySelectorAll('.popup');
  popups.forEach(popup => {
    popup.classList.add('popup_is-animated');
  });
});