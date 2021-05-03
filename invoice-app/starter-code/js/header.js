function header() {
    const BODY = document.querySelector('body');
    const MAIN = document.querySelector('main');

    const HEADER = document.createElement('header')
    HEADER.classList.add('menu-container');

    const LOGO_CONTAINER = document.createElement('div');
    LOGO_CONTAINER.id = 'logo';

    const LOGO = document.createElement('img');
    LOGO.src = './assets/logo.svg';
    LOGO.alt = 'logo-image';

    LOGO_CONTAINER.append(LOGO);

    const MENU = document.createElement('div');
    MENU.id = 'menu';

    const THEME_SWITCHER = document.createElement('div');
    THEME_SWITCHER.id = "theme-switcher";



    const THEME_ICON = document.createElement('img');
    THEME_ICON.src = './assets/icon-moon.svg';
    THEME_ICON.alt = "icon-moon.svg";


    THEME_SWITCHER.append(THEME_ICON);
    MENU.append(THEME_SWITCHER);


    const AVATAR_CONTAINER = document.createElement('div');
    AVATAR_CONTAINER.id = "avatar";



    const AVATAR = document.createElement('img');
    AVATAR.src = './assets/image-avatar.jpg';
    AVATAR.alt = "avatar";

    AVATAR_CONTAINER.append(AVATAR);
    MENU.append(AVATAR_CONTAINER);
    HEADER.append(LOGO_CONTAINER);
    HEADER.append(MENU);

    // const BACKDROP = document.createElement('div');
    // BACKDROP.classList.add('popup', 'inactive');

    // const NEW_INVOICE_FORM = document.createElement('form');
    // const FORM_SECTION = function () {

    // }



    BODY.insertBefore(HEADER, MAIN)
}
header();