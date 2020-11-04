'use strict';

(function () {
  // открытие/закрытие модального окна
  var closePopup = function () {
    background.classList.remove('overlay--show');
    body.classList.remove('overflow');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var openPopup = function () {
    background.classList.add('overlay--show');
    body.classList.add('overflow');
    document.addEventListener('keydown', onPopupEscPress);
  };

  // Обработчик клика для открытия/закрытия блока

  var addTabsClickToggle = function (button, activeClass) {
    button.addEventListener('click', function () {
      button.classList.toggle(activeClass);
    });
  };

  // Обработчик Enter для открытия/закрытия блока

  var addTabsEnterToggle = function (item, activeClass) {
    item.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        item.classList.toggle(activeClass);
      }
    });
  };

  // открытие/закрытие меню в мобильной версии

  var header = document.querySelector('.header');
  var navToggle = document.querySelector('.header button');

  header.classList.remove('header--nojs');
  header.classList.remove('header--opened');
  header.classList.add('header--closed');

  navToggle.addEventListener('click', function () {
    if (header.classList.contains('header--closed')) {
      header.classList.remove('header--closed');
      header.classList.add('header--opened');
    } else {
      header.classList.add('header--closed');
      header.classList.remove('header--opened');
    }
  });

  // слайдер New In

  var createNewInSwiper = function () {
    var newInSwiper = new Swiper('.product-slider__swiper-container', { // eslint-disable-line
      spaceBetween: 0,
      slidesPerView: 4,
      slidesPerGroup: 4,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
          },
        },
        // when window width is >= 768px
        768: {
          slidesPerView: 2,
          slidesPerGroup: 2,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        1024: {
        // when window width is >= 1024px
          slidesPerView: 3,
          slidesPerGroup: 3,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        },
        1252: {
          // when window width is >= 1252px
          slidesPerView: 4,
          slidesPerGroup: 4,
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  };

  createNewInSwiper();

  window.addEventListener('resize', function () {
    createNewInSwiper();
  });

  // FAQ

  var faq = document.querySelector('.faq');

  if (faq) {
    faq.classList.remove('faq--nojs');
    var faqButtons = faq.querySelectorAll('.faq button');
    for (var i = 0; i < faqButtons.length; i++) {
      addTabsClickToggle(faqButtons[i], 'faq__button--active');
    }
  }

  // Фильтры

  var filter = document.querySelector('.filters');

  if (filter) {
    filter.classList.remove('filters--nojs');

    // открытие/скрытие fieldset

    var fieldsets = filter.querySelectorAll('.filters__fieldset');
    for (i = 0; i < fieldsets.length; i++) {
      addTabsClickToggle(fieldsets[i], 'filters__fieldset--active');
      addTabsEnterToggle(fieldsets[i], 'filters__fieldset--active');
    }

    // очистка чекбоксов по кнопке Clear All

    var clearButton = filter.querySelector('.filters__clear-button');
    clearButton.addEventListener('click', function () {
      var checkboxs = filter.querySelectorAll('input[type=checkbox]');
      for (i = 0; i < checkboxs.length; i++) {
        checkboxs[i].checked = false;
      }
    });

    // открытие/закрытие фильтров на планшете и мобильной версии

    var body = document.querySelector('body');
    var background = document.querySelector('.overlay');

    var openFilterButton = filter.querySelector('.filters__open-button');
    var closeFilterButton = filter.querySelector('.filters__close-button');
    var applyFiltersButton = filter.querySelector('.filters button[type=submit]');

    var onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        filter.classList.remove('filters--active');
        closePopup();
      }
    };

    openFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filter.classList.add('filters--active');
      openPopup();
    });

    closeFilterButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filter.classList.remove('filters--active');
      closePopup();
    });

    applyFiltersButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      filter.classList.remove('filters--active');
      closePopup();
    });

    background.addEventListener('click', function () {
      filter.classList.remove('filters--active');
      closePopup();
    });
  }

  // Карточка товара

  var card = document.querySelector('.card');

  if (card) {

    // открытие/закрытие description и additional info

    var cardLinks = card.querySelectorAll('.card__link');
    var cardInfos = card.querySelectorAll('.card__info');

    card.classList.remove('card--nojs');

    var addTabsClickHandler = function (activeLink, activeText, link, text) {
      link.addEventListener('click', function () {

        var activeNavLink = document.querySelector('.' + activeLink);
        var activeDescription = document.querySelector('.' + activeText);

        activeNavLink.classList.remove(activeLink);
        activeDescription.classList.remove(activeText);

        link.classList.add(activeLink);
        text.classList.add(activeText);
      });
    };

    for (i = 0; i < cardLinks.length; i++) {
      addTabsClickHandler('card__link--active', 'card__info--active', cardLinks[i], cardInfos[i]);
    }

    // Слайдер на фотографиях

    var cardSlider = document.querySelector('.card__swiper-container');

    var cardSwiper;

    var createCardSlider = function () {
      if (window.innerWidth < 768 && cardSlider.dataset.mobile === 'false') {
        var cardPagination = document.createElement('div');
        cardPagination.className = 'swiper-pagination card__pagination';
        var cardContainer = document.querySelector('.card__swiper-container');
        cardContainer.append(cardPagination);

        cardSwiper = new Swiper(cardSlider, { // eslint-disable-line
          pagination: {
            el: '.card__pagination',
            type: 'fraction',
          },
        });

        cardSlider.dataset.mobile = 'true';
      }

      if (window.innerWidth >= 768) {
        cardSlider.dataset.mobile = 'false';
        if (cardSlider.classList.contains('swiper-container-initialized')) {
          cardSwiper.destroy();
        }
      }
    };

    createCardSlider();

    window.addEventListener('resize', function () {
      createCardSlider();
    });

    // Открытие/скрытие модального окна добавления в корзину

    body = document.querySelector('body');
    background = document.querySelector('.overlay');

    var cartPopUp = document.querySelector('.pop-up-add');
    var openCartButton = card.querySelector('.card__add-to-cart');
    var closeCartButton = cartPopUp.querySelector('.pop-up-add__close-button');

    onPopupEscPress = function (evt) {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        cartPopUp.classList.remove('pop-up-add--show');
        closePopup();
      }
    };

    openCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      cartPopUp.classList.add('pop-up-add--show');
      openPopup();
    });

    closeCartButton.addEventListener('click', function (evt) {
      evt.preventDefault();
      cartPopUp.classList.remove('pop-up-add--show');
      closePopup();
    });

    background.addEventListener('click', function () {
      cartPopUp.classList.remove('pop-up-add--show');
      closePopup();
    });
  }


})();
