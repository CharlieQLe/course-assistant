# Some DOM Surgeries


Page navbar
```
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
```

Calandar
```
<div class="row text-center">
	<div class="d-flex justify-content-between">
		<div class="col" id="days">1</div>
		<div class="col" id="days">2</div>
		<div class="col" id="days">3</div>
		<div class="col" id="days">4</div>
		<div class="col" id="days">5</div>
		<div class="col" id="days">6</div>
		<div class="col" id="days">7</div>
    ...
	</div>
</div>
```

Task(not modal task)
```
<div class="form-check">
	<input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
	<label class="form-check-label" for="flexCheckDefault">
		Task 1
		<button class="btn btn-outline-light btn-sm rounded-0" type="button" data-bs-toggle="modal" data-bs-target = "#editTasks" data-placement="top" title="Add"><i class="fa fa-table"></i>Edit</button>
	</label>
</div>
```

Task(modal task)
```
<tr>
    <th scope="row">Class 1</th>
    <td>Project Milestone Due</td>
    <td>3/4/4</td>
    <td>yyyy-MM-dd</td>
</tr>
```

Flashcard
```
<div class="row d-flex justify-content-center flex-nowrap p-4">
	<div class="col-3 text-center">
    my term
	</div>
	<div class="col-3 text-center">
		my definition
	</div>
	<div class="col-1 text-center">
		<i class="bi bi-x hov"></i>
	</div>
</div>
```

Study Flashcard
```
<div id="study-flashcard">
  <div class="row d-flex justify-content-center flex-nowrap p-4">
    <div class="col box text-center">
      <!-- CARD + BUTTONS -->
      <div class="row d-flex justify-content-center flex-nowrap p-4">
        <!-- CARD ON THE LEFT SIDE -->
        <div class="col box text-center">
          <div class="card" id="study-flashcard-card">
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up
                the bulk of the card's content.</p>
            </div>
          </div>
        </div>
        <!-- 2 BUTTONS ON THE LEFT SIDE -->
        <div class="col box text-center align-self-center">
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="button">Button</button>
            <button class="btn btn-danger" type="button">Button</button>
          </div>
        </div>
      </div>
    </div>

    <div class="col box text-center">
      <!-- CARD + BUTTONS -->
      <div class="row d-flex justify-content-center flex-nowrap p-4">
        <!-- CARD ON THE RIGHT SIDE -->
        <div class="col box text-center">
          <div class="card" id="study-flashcard-card">
            <div class="card-body">
              <p class="card-text">Some quick example text to build on the card title and make up
                the bulk of the card's content.
                Some quick example text to build on the card title and make up
                the bulk of the card's content
                Some quick example text to build on the card title and make up
                the bulk of the card's content</p>
              Some quick example text to build on the card title and make up
              the bulk of the card's content
            </div>
          </div>
        </div>
        <!-- 2 BUTTONS ON THE RIGHT SIDE -->
        <div class="col box text-center align-self-center">
          <div class="d-grid gap-2">
            <button class="btn btn-success" type="button">Button</button>
            <button class="btn btn-danger" type="button">Button</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```




