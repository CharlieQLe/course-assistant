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
					<a class="nav-link" href="./home.html">Home</a>
				</li>

				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="#class-1">Class 1</a>
				</li>

				<li class="nav-item">
					<a class="nav-link" href="#class-2">Class 2</a>
				</li>
			</ul>

			// add class button
			<form class="d-flex ms-auto logo-icon-padded">
				<button class="btn btn-outline-success" type="button" data-bs-toggle="modal" data-bs-target="#addClassModal">Add Class</button>
			</form>

			<!-- user profile buttons -->
			<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1"
				data-bs-toggle="dropdown" aria-expanded="false">
				Name
			</button>
			<ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
				<li><a class="dropdown-item" href="./user-profile.html">Edit Profile</a></li>
				<li><a class="dropdown-item" href="#">Log Out</a></li>
			</ul>
		</div>

	</div>
</nav>
*/


window.addEventListener('load', () => {
	const url = window.location.pathname;       // reads url
	const split = url.split('/');

	// TODO
	// will look at url for the user
	const user = 'user1';

	// GET request to server to search the classes
	const classArr = ['Class 1', 'Class 2'];
	
	// will look at the url for the class, then find the class in in the 
	// array received from the GET request
	const active = 1;

	renderNavbar(document.getElementById('navbar'), user, classArr, active);
})




function renderNavbar(element, user, classArr, active) {
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
		const url = window.location.pathname;       // reads url
		const split = url.split('/');
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
	brand.innerHTML = 'Course Assistant'

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

	const classes = document.createElement('ul');
	classes.classList.add('navbar-nav');
	
	const home = document.createElement('li');
	home.classList.add('nav-item');
	const homeAnchor = document.createElement('a');
	homeAnchor.classList.add('nav-link');
	homeAnchor.addEventListener('click', () => {
		const url = window.location.pathname;       // reads url
		const split = url.split('/');
		window.location.href = `/${split[1]}/${split[2]}`;
	});
	homeAnchor.innerHTML = 'Home';
	home.appendChild(homeAnchor);
	classes.appendChild(home);

	for(let i = 0; i < classArr.length; i++) {
		const li = document.createElement('li');
		li.classList.add('nav-item');
		const a = document.createElement('a');
		a.classList.add('nav-link');
		a.setAttribute('href', `#${classArr[i]}`);
		a.innerHTML = classArr[i];
		li.appendChild(a);
		classes.appendChild(li);
		
		if(i === active) {
			a.setAttribute('aria-current', 'page');
			a.classList.add('active');
		}
	}
	collapse.appendChild(classes);

	// add class button
	const addClassForm = document.createElement('form');
	addClassForm.classList.add('d-flex', 'ms-auto', 'logo-icon-padded');
	const addClassButton = document.createElement('button');
	addClassButton.classList.add('btn', 'btn-outline-success');
	addClassButton.setAttribute('type', 'button');
	addClassButton.setAttribute('data-bs-toggle', 'modal');
	addClassButton.setAttribute('data-bs-target', '#addClassModal');
	addClassButton.innerHTML = 'Add Class';
	addClassForm.appendChild(addClassButton);
	collapse.appendChild(addClassForm);
	
	// user profile buttons
	const userProfileButton = document.createElement('button');
	userProfileButton.classList.add('btn', 'btn-secondary', 'dropdown-toggle');
	userProfileButton.setAttribute('type', 'button');
	userProfileButton.setAttribute('id', 'dropdownMenuButton1');
	userProfileButton.setAttribute('data-bs-toggle', 'dropdown');
	userProfileButton.setAttribute('aria-expanded', 'false');
	userProfileButton.innerHTML = user;
	collapse.appendChild(userProfileButton);

	// user profile dropdown
	const userProfileDropdownUl = document.createElement('ul');
	userProfileDropdownUl.classList.add('dropdown-menu', 'dropdown-menu-end');
	userProfileDropdownUl.setAttribute('aria-labeledby', 'dropdownMenuButton1');
	
	const editProfileLi = document.createElement('li');
	const editProfile = document.createElement('a');
	editProfile.classList.add('dropdown-item');
	editProfile.addEventListener('click', () => {
		const url = window.location.pathname;       // reads url
		const split = url.split('/');
		window.location.href = `/${split[1]}/${split[2]}/user-profile.html`;
	});
	editProfile.innerHTML = 'Edit Profile';
	editProfileLi.appendChild(editProfile);
	
	const logoutLi = document.createElement('li');
	const logout = document.createElement('a');
	logout.classList.add('dropdown-item');
	logout.addEventListener('click', () => {
		window.location.href = "/index.html";
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