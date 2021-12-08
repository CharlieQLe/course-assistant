'use strict';

import * as notification from "./notification.js"

/*
<!-- Page navbar -->
<nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">

        <div class="logo-icon-padded">
        <img src="./images/logo.png" alt="" width="24" height="24" class="logo-icon-padded">
        </div>
        <div class="navbar-brand">Course Assistant</div>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav" id="classNavList">

                <li class="nav-item">
                    <a class="nav-link" href="">Home</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="">files</a>
                </li>
            </ul>

            <!-- user profile buttons -->
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
                data-bs-toggle="dropdown" aria-expanded="false">
                Name
            </button>
            <ul class="ms-auto dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
                <li><a class="dropdown-item" href="./user-profile.html">Edit Profile</a></li>
                <li><a class="dropdown-item" href="#">Log Out</a></li>
            </ul>
        </div>

    </div>
</nav>
*/

const url = window.location.pathname;       // reads url
const split = url.split('/');

window.addEventListener('load', () => {
    renderNavbar(document.getElementById('navbar'));
});

function renderNavbar(element) {
    element.innerHTML = '';
    const navbar = document.createElement('nav');
    navbar.classList.add('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light');

    const containerFluid = document.createElement('div');
    containerFluid.classList.add('container-fluid');

    // logo
    const logoContainer = document.createElement('div');
    logoContainer.classList.add('logo-icon-padded');
    const logo = document.createElement('img');
    logo.classList.add('logo-icon-padded');
    logo.setAttribute('src', './images/logo.png');
    logo.setAttribute('alt', '');
    logo.setAttribute('width', '24');
    logo.setAttribute('height', '24');
    logo.addEventListener('click', () => {
        window.location.href = `/${split[1]}/${split[2]}`;
    });
    logo.addEventListener('mouseover', () => {
        logo.style.cursor = 'pointer';
    });
    logo.addEventListener('mouseout', () => {
        logo.style.cursor = 'default';
    });

    logoContainer.appendChild(logo);

    // brand
    const brand = document.createElement('div');
    brand.classList.add('navbar-brand');
    brand.innerHTML = 'Course Assistant';

    // the button will appear on the navbar when the screen size 
    // becomes smaller. 
    const resizeButton = document.createElement('button');
    resizeButton.classList.add('navbar-toggler');
    resizeButton.setAttribute('type', 'button');
    resizeButton.setAttribute('data-bs-toggle', 'collapse');
    resizeButton.setAttribute('data-bs-target', '#navbarNav');
    resizeButton.setAttribute('aria-controls', 'navbarNav');
    resizeButton.setAttribute('aria-expanded', 'false');
    resizeButton.setAttribute('aria-label', 'Toggle navigation');

    const s = document.createElement('span');
    s.classList.add('navbar-toggler-icon');
    resizeButton.appendChild(s);

    const collapse = document.createElement('div');
    collapse.classList.add('collapse', 'navbar-collapse');
    collapse.setAttribute('id', 'navbarNav');

    const ul = document.createElement('ul');
    ul.classList.add('navbar-nav');

    const home = document.createElement('li');
    home.classList.add('nav-item');
    const homeAnchor = document.createElement('a');
    homeAnchor.classList.add('nav-link');
    homeAnchor.addEventListener('click', () => {
        window.location.href = `/${split[1]}/${split[2]}`;
    });
    homeAnchor.innerHTML = 'Home';
    if (split[split.length - 2] !== 'files' && split[split.length - 2] !== 'profile') {
        homeAnchor.classList.add('active');
    }
    home.appendChild(homeAnchor);
    ul.appendChild(home);
    const li = document.createElement('li');
    li.classList.add('nav-item');
    const a = document.createElement('a');
    a.classList.add('nav-link');
    a.innerHTML = 'Files';
    if (split[split.length - 2] === 'files') {
        a.classList.add('active');
    }
    a.addEventListener('click', () => {
        window.location.href = `/${split[1]}/${split[2]}/files`;
    })
    li.appendChild(a);
    ul.appendChild(li);
    collapse.appendChild(ul);

    // user profile buttons
    const userProfileButton = document.createElement('button');
    userProfileButton.classList.add('ms-auto', 'btn', 'btn-secondary', 'dropdown-toggle');
    userProfileButton.setAttribute('type', 'button');
    userProfileButton.setAttribute('id', 'dropdownMenuButton1');
    userProfileButton.setAttribute('data-bs-toggle', 'dropdown');
    userProfileButton.setAttribute('aria-expanded', 'false');
    userProfileButton.innerHTML = "no name found";
    fetch(`/api/users/${split[2]}`)
        .then(response => response.json())
        .then(response => {
            if (response.status === 0) {
                userProfileButton.innerHTML = response.result.name;
            }
        })
        .catch(notification.showDangerToast);
    collapse.appendChild(userProfileButton);

    // user profile dropdown
    const userProfileDropdownUl = document.createElement('ul');
    userProfileDropdownUl.classList.add('dropdown-menu', 'dropdown-menu-end');
    userProfileDropdownUl.setAttribute('aria-labeledby', 'dropdownMenuButton1');

    const editProfileLi = document.createElement('li');
    const editProfile = document.createElement('a');
    editProfile.classList.add('dropdown-item');
    editProfile.addEventListener('click', () => {
        window.location.href = `/${split[1]}/${split[2]}/profile`;
    });
    editProfile.innerHTML = 'Edit Profile';
    editProfileLi.appendChild(editProfile);

    const logoutLi = document.createElement('li');
    const logout = document.createElement('a');
    logout.classList.add('dropdown-item');
    logout.addEventListener('click', () => {
        window.location.href = "/logout";
    });
    logout.innerHTML = 'Log out';
    logoutLi.appendChild(logout);

    userProfileDropdownUl.appendChild(editProfileLi);
    userProfileDropdownUl.appendChild(logoutLi);

    collapse.appendChild(userProfileDropdownUl);


    containerFluid.appendChild(logoContainer);
    containerFluid.appendChild(brand);
    containerFluid.appendChild(resizeButton);
    containerFluid.appendChild(collapse);

    navbar.appendChild(containerFluid);
    element.appendChild(navbar);
}
