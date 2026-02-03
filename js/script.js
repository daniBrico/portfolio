const d = document

const changeExpressIcon = (theme) => {
  const route = './assets/svg'
  const $imgExpressIcon = d.getElementById('express-icon')

  if (theme === 'dark') {
    $imgExpressIcon.setAttribute('src', `${route}/express-icon-dark.svg`)
  } else {
    $imgExpressIcon.setAttribute('src', `${route}/express-icon-light.svg`)
  }
}

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
        changeExpressIcon('dark')
        localStorage.setItem('theme', 'dark')

        $svgLunaIcon.classList.add('none')
        $svgSolIcon.classList.remove('none')

        return
      }

      changeExpressIcon('light')
      localStorage.setItem('theme', 'light')

      $svgLunaIcon.classList.remove('none')
      $svgSolIcon.classList.add('none')
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

        $ventanaModal.querySelector('h3').innerHTML =
          `Error ${error.statusText}:${message}`
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
    { svgName: 'html-icon', label: 'HTML' },
    { svgName: 'css-icon', label: 'CSS' },
    { svgName: 'javascript-icon', label: 'JavaScript' },
    { svgName: 'figma-icon', label: 'Figma' },
    { svgName: 'github-icon', label: 'Git/GitHub' },
    { svgName: 'java-icon', label: 'Java' },
    { svgName: 'c-icon', label: 'C' },
    { svgName: 'obsidian-icon', label: 'Obsidian' },
    { svgName: 'sql-icon', label: 'SQL' },
    { svgName: 'react-icon', label: 'React' },
    { svgName: 'node-icon', label: 'Node' },
    { svgName: 'tailwindcss-icon', label: 'tailwindcss' },
    { svgName: 'typescript-icon', label: 'TypeScript' },
    { svgName: 'mongodb-icon', label: 'MongoDB' },
    { svgName: 'zustand-icon', label: 'Zustand' },
    { svgName: 'express-icon', label: 'Express' },
    { svgName: 'zod-logo', label: 'Zod' },
    { svgName: 'tanstack-icon', label: 'Tanstack Query' },
    { svgName: 'react-router-icon', label: 'React Router' },
    { svgName: 'jest-icon', label: 'Jest' },
    { svgName: 'jwt-icon', label: 'JWT' },
  ]

  const route = './assets/svg'

  svgNames.forEach((el) => {
    const $cloneTemplateSkill = $templateSkill.cloneNode(true),
      $img = $cloneTemplateSkill.querySelector('img')

    if (el.svgName === 'express-icon') {
      $img.setAttribute(
        'src',
        `${route}/${d.body.classList.contains('dark') ? 'express-icon-dark' : 'express-icon-light'}.svg`,
      )
    } else {
      $img.setAttribute('src', `${route}/${el.svgName}.svg`)
      $img.setAttribute('alt', `Icono de ${el.svgName}`)
    }

    $img.setAttribute('id', `${el.svgName}`)
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
      title: 'plan-de-estudios-web',
      description:
        'Aplicación web que permite visualizar e interactuar con el plan de estudios de la carrera de Informática de la UNO. Consume una API REST conectada a MongoDB para obtener la información de la carrera y persiste las modificaciones realizadas por los usuarios mediante Local Storage.',
      linkToPage: 'https://danibrico.github.io/plan-estudios-web-ts/',
      repositoryLink: 'https://github.com/daniBrico/plan-estudios-web-ts',
      tecnologies:
        'React (zustand, zod, react router, tanstack query) • TypeScript • TailwindCSS',
    },
    {
      title: 'api-plan-de-estudios-web',
      description:
        'API REST para la aplicación web de Plan de Estudios, con autenticación de usuarios mediante JWT y gestión de carreras. Implementa arquitectura MVC y un diseño modular y escalable. Aplica validaciones con Zod, gestión correcta de errores, middlewares y límite de consultas.',
      repositoryLink: 'https://github.com/daniBrico/api-plan-de-estudios-ts',
      tecnologies:
        'Node • TypeScript • Express • MongoDB • JWT • Mongoose • Zod',
    },
  ]

  projectsInformation.forEach((project) => {
    const $cloneTemplateProject = $templateProject.cloneNode(true)

    $cloneTemplateProject
      .querySelector('a')
      .setAttribute('href', project.repositoryLink)

    if (project.linkToPage) {
      const $templateLinkToPage = d.getElementById(
          'linkToPage-template',
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
  const currentTheme = localStorage.getItem('theme')

  !currentTheme
    ? localStorage.setItem('theme', 'light')
    : d.body.classList.add(currentTheme)

  menu()
  contactForm()
  generateDivSkills()
  generateProjects()
})
