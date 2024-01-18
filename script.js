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

((d) => {
  const $form = d.querySelector(".contact-form");

  // Faltan las validaiones 
  $form.addEventListener("submit", e => {
    e.preventDefault();
    // Mostramos el loader (cuando lo coloquemos en el HTML)
    fetch("https://formsubmit.co/ajax/daniel.jorge96@outlook.com", {
      method: "POST",
      body: new FormData(e.target)
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        console.log(json);
        // Ocultamos el loader (cuando lo coloquemos en el HTML)
        // También activamos el mensaje que querramos mostrar
        $form.reset();
      })
      .catch(err => {
        console.log(err);
        // Mostrar el error en la página web
      });
  });

})(document);