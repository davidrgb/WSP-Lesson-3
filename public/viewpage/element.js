// ROOT
export const root = document.getElementById('root');

// top menus
export const menuSignIn = document.getElementById('menu-signin');
export const menuHome = document.getElementById('menu-home');
export const menuPurchases = document.getElementById('menu-purchases');
export const menuSignout = document.getElementById('menu-signout');
export const menuCart = document.getElementById('menu-cart');
export const menuProfile = document.getElementById('menu-profile');
export const shoppingCartCount = document.getElementById('shoppingcart-count');

// forms
export const formSignIn = document.getElementById('form-signin');

// modals
export const modalSignIn = new bootstrap.Modal(document.getElementById('modal-signin'), {backdrop: 'static'});
export const modalInfo = new bootstrap.Modal(document.getElementById('modal-info'), {backdrop: 'static'});
export const modalInfoTitle = document.getElementById('modal-info-title');
export const modalInfoBody = document.getElementById('modal-info-body');