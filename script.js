// Menu

// Lo estoy haciendo en una función anonima autoejecutable porque si este mismo menú lo implemento en otro proyecto, al tenerlo en una función de este tipo, que es un cerrada, está no colisionara en sus variables con las del otro proyecto si es que estas coinciden.

((d) => {
  const $btnMenu = d.querySelector(".menu-button"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", e => {
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", e => {
    if (!e.target.matches(".menu a")) return false;

    $menu.classList.toggle("is-active");
  })
})(document);