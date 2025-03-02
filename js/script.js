const d = document

const menu = function () {
  const $btnMenu = d.querySelector('.menu-button'),
    $menu = d.querySelector('.menu'),
    $scrollBtn = d.querySelector('.scroll-top-btn'),
    $svgLunaIcon = d.getElementById('svg-luna-icon'),
    $svgSolIcon = d.getElementById('svg-sol-icon')

  d.addEventListener('click', (e) => {
    if ($btnMenu.contains(e.target)) {
      $menu.classList.toggle('is-active')
      return false
    }

    if ($menu.classList.contains('is-active')) {
      if (e.target.classList.contains('menu')) {
        return false
      }
      $menu.classList.toggle('is-active')
    }

    if (e.target.closest('.scroll-top-btn')) {
      window.scrollTo({
        behavior: 'smooth',
        top: 0,
      })
    }

    if (
      e.target.matches('.light-container-icon') ||
      e.target.closest('.light-container-icon')
    ) {
      d.body.classList.toggle('dark')
      if (d.body.classList.contains('dark')) {
        $svgLunaIcon.classList.add('none')
        $svgSolIcon.classList.remove('none')
      } else {
        $svgLunaIcon.classList.remove('none')
        $svgSolIcon.classList.add('none')
      }
    }
  })

  window.addEventListener('scroll', (e) => {
    let scrollTop = d.documentElement.scrollTop

    if (scrollTop > 600) {
      $scrollBtn.classList.remove('hidden')
    } else {
      $scrollBtn.classList.add('hidden')
    }
  })
}

const contactForm = function () {
  const $form = d.querySelector('.contact-form'),
    $loader = d.querySelector('.dots-container'),
    $ventanaModal = d.querySelector('.ventana-modal')

  // Faltan las validaciones
  $form.addEventListener('submit', (e) => {
    e.preventDefault()

    $loader.classList.remove('none')

    fetch('https://formsubmit.co/ajax/e09df0dd8452051535d4d7cdee38307c', {
      method: 'POST',
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json)
        $ventanaModal.classList.remove('hidden')
        $form.reset()
      })
      .catch((err) => {
        console.log(err)
        let message =
          err.statusText ||
          'Ocurrio un error al enviar el mensaje, intenta nuevamente'

        $ventanaModal.querySelector(
          'h3'
        ).innerHTML = `Error ${error.statusText}:${message}`
      })
      .finally(() => {
        $loader.classList.add('none')
        setTimeout(() => {
          $ventanaModal.classList.add('hidden')
        }, 3000)
      })
  })
}

const generateDivSkills = function () {
  const $templateSkill = d.getElementById('skill-template').content,
    $skillsContainer = d.getElementById('skills-container'),
    $fragment = d.createDocumentFragment()

  const svgNames = [
    { svgName: 'html', label: 'HTML' },
    { svgName: 'css', label: 'CSS' },
    { svgName: 'javascript', label: 'JavaScript' },
    { svgName: 'figma', label: 'Figma' },
    { svgName: 'github', label: 'GitHub' },
    { svgName: 'java', label: 'Java' },
    { svgName: 'c', label: 'c' },
    { svgName: 'obsidian', label: 'Obisidian' },
    { svgName: 'sql', label: 'SQL' },
    { svgName: 'react', label: 'React' },
    { svgName: 'node', label: 'Node' },
    { svgName: 'tailwindcss', label: 'tailwindcss' },
    { svgName: 'typescript', label: 'TypeScript' },
  ]

  const route = './assets/svg'

  svgNames.forEach((el) => {
    const $cloneTemplateSkill = $templateSkill.cloneNode(true),
      $img = $cloneTemplateSkill.querySelector('img')

    $img.setAttribute('src', `${route}/${el.svgName}.svg`)
    $img.setAttribute('alt', `Icono de ${el.svgName}`)

    $cloneTemplateSkill.querySelector('p').textContent = el.label

    $fragment.appendChild($cloneTemplateSkill)
  })

  $skillsContainer.appendChild($fragment)
}

const generateProjects = function () {
  const $templateProject = d.getElementById('project-template').content,
    $projectsContainer = d.getElementById('projects-container'),
    $fragment = d.createDocumentFragment()

  const projectsInformation = [
    {
      title: 'Take-attendance-app',
      description: `Aplicación orientada al ambito académico que permite al profesor tomar asistencia en tiempo real a los alumnos adheridos al curso y realizar otras acciones relacionadas. Esto se logra gracias a WebSockets con el modulo de socket-io y socket-io-client. <b>En desarrollo</b>`,
      linkToPage: false,
      repositoryLink: `https://github.com/daniBrico/take-attendance`,
      tecnologies: `React.JS • Tailwindcss • Node.JS • MongoDB`,
    },
    {
      title: 'Tasks Calendar',
      description:
        'Calendario con diferentes funciones para Obsidian. Fue diseñado para mostrar las tareas definidas en las notas .md con las que esta herramienta trabaja. Obisidian permite, con ciertas limitaciones, ejecutar código HTML, CSS y JavaScript, dandole mucha libertad y creatividad a los usuarios para crear pequeñas aplicaciones.',
      linkToPage: false,
      repositoryLink: 'https://github.com/daniBrico/tasks-calendar',
      tecnologies:
        'HTML • CSS • JavaScript • Obsidian, plugin: Dataview, Tasks',
    },
  ]

  projectsInformation.forEach((project) => {
    const $cloneTemplateProject = $templateProject.cloneNode(true)

    $cloneTemplateProject
      .querySelector('a')
      .setAttribute('href', project.repositoryLink)

    if (project.linkToPage) {
      const $templateLinkToPage = d.getElementById(
          'linkToPage-template'
        ).content,
        $cloneLinkToPageTemplate = $templateLinkToPage.cloneNode(true)

      $cloneLinkToPageTemplate
        .querySelector('a')
        .setAttribute('href', project.linkToPage)

      $cloneTemplateProject
        .querySelector('.div-iconsLinksContainer')
        .appendChild($cloneLinkToPageTemplate)
    }

    $cloneTemplateProject.querySelector('h4').textContent = project.title
    $cloneTemplateProject.querySelector('.div-p-descriptionProject').innerHTML =
      project.description
    $cloneTemplateProject.querySelector('.div-p-tecnologies').textContent =
      project.tecnologies

    $fragment.appendChild($cloneTemplateProject)
  })

  $projectsContainer.appendChild($fragment)
}

d.addEventListener('DOMContentLoaded', () => {
  const currentDate = new Date()
  const day = String(currentDate.getDate()).padStart(2, '0')
  const month = String(currentDate.getMonth() + 1).padStart(2, '0')
  const year = currentDate.getFullYear()

  const lastUpdateText = `Últ. Act. ${day}/${month}/${year}`

  const $lastUpdate = d.getElementById('last-update')
  $lastUpdate.textContent = lastUpdateText

  menu()
  contactForm()
  generateDivSkills()
  generateProjects()
})
