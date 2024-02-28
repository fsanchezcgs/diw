export default {
  name: "Postheader",
  template: `<header class="bg-primary">
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="./../index.html"
        ><img src="./../img/logoDoggie.png" width="150px"
      /></a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse justify-content-end"
        id="navbarNavDropdown"
      >
        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item" id="admin">
            <a class="nav-link" href="./admin.html">Admin</a>
          </li>
          <li class="nav-item" id="postsManager"></li>
          <li class="nav-item" id="settings">
            <a class="nav-link" href="./settings.html">Settings</a>
          </li>
          <li class="nav-item" id="login">
            <a class="nav-link" href="./login.html">Log in</a>
          </li>
          <li class="nav-item" id="register">
            <a class="nav-link" href="./register.html">Register</a>
          </li>
          <li class="nav-item">
            <img
              src="./../img/"
              width="50px"
              id="profile"
              class="rounded-5 p-0 nav-link ms-2"
            />
          </li>
          <li class="nav-item" id="user_name"></li>
          <li class="nav-item" id="logout"></li>
        </ul>
      </div>
    </div>
  </nav>
</header>`,
};
