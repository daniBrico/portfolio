// Menu

// Lo estoy haciendo en una función anonima autoejecutable porque si este mismo menú lo implemento en otro proyecto, al tenerlo en una función de este tipo, que es un cerrada, está no colisionara en sus variables con las del otro proyecto si es que estas coinciden.

((d) => {
  const $btnMenu = d.querySelector(".menu-button"),
    $menu = d.querySelector(".menu"),
    $scrollBtn = d.querySelector(".scroll-top-btn"),
    $svgLunaIcon = d.getElementById("svg-luna-icon"),
    $svgSolIcon = d.getElementById("svg-sol-icon");

  d.addEventListener("click", e => {
    if ($btnMenu.contains(e.target)) {
      $menu.classList.toggle("is-active");
      return false;
    }

    if ($menu.classList.contains("is-active")) {
      if (e.target.classList.contains("menu")) {
        return false;
      }
      $menu.classList.toggle("is-active");
    }

    if (e.target.matches(".scroll-top-btn")) {
      window.scrollTo({
        behavior: "smooth",
        top: 0
      });
    }

    if (e.target.matches(".light-container-icon") || e.target.closest(".light-container-icon")) {
      d.body.classList.toggle("dark");
      if (d.body.classList.contains("dark")) {
        $svgLunaIcon.classList.add("none");
        $svgSolIcon.classList.remove("none");
      } else {
        $svgLunaIcon.classList.remove("none");
        $svgSolIcon.classList.add("none");
      }
    }
  })


  window.addEventListener("scroll", e => {
    let scrollTop = d.documentElement.scrollTop;

    if (scrollTop > 600) {
      $scrollBtn.classList.remove("hidden");
    } else {
      $scrollBtn.classList.add("hidden");
    }
  });

})(document);

// Funcionamiento del formulario de contacto

((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".dots-container"),
    $ventanaModal = d.querySelector(".ventana-modal");

  // Faltan las validaciones 
  $form.addEventListener("submit", e => {
    e.preventDefault();

    $loader.classList.remove("none");

    fetch("https://formsubmit.co/ajax/e09df0dd8452051535d4d7cdee38307c", {
      method: "POST",
      body: new FormData(e.target)
    })
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(json => {
        console.log(json);
        $ventanaModal.classList.remove("hidden");
        $form.reset();
      })
      .catch(err => {
        console.log(err);
        let message = err.statusText || "Ocurrio un error al enviar el mensaje, intenta nuevamente";

        $ventanaModal.querySelector("h3").innerHTML = `Error ${error.statusText}:${message}`;
      }).finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          $ventanaModal.classList.add("hidden")
        }, 3000);
      });
  });

})(document);