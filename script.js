// Menu

((d) => {
  const $btnMenu = d.querySelector(".menu-button"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    // $btnMenu.firstElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });
})(document);