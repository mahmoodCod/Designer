let $ = document
const navToggleIcon  = $.querySelector (".nav__toggle-icon")
const menu = $.querySelector ('.menu')
const cover = $.querySelector('.cover')
const resumeMenubars = $.querySelectorAll('.resume__menubar')
const PortfolioListItems = $.querySelectorAll ('.Portfolio-list__item')
const menuLinks = $.querySelectorAll ('.menu__link')
const sections = $.querySelectorAll('main > section')
const changeThemeBtn = $.querySelector('.change-theme')
const darkThemeIcon = `<svg viewBox="0 0 24 24"><path d="M12.3,4.9c0.4-0.2,0.6-0.7,0.5-1.1S12.2,3,11.7,3C6.8,3.1,3,7.1,3,12c0,5,4,9,9,9c3.8,0,7.1-2.4,8.4-5.9c0.2-0.4,0-0.9-0.4-1.2c-0.4-0.3-0.9-0.2-1.2,0.1c-1,0.9-2.3,1.4-3.7,1.4c-3.1,0-5.7-2.5-5.7-5.7C9.4,7.8,10.5,5.9,12.3,4.9zM15.1,17.4c0.5,0,1,0,1.4-0.1C15.3,18.4,13.7,19,12,19c-3.9,0-7-3.1-7-7c0-2.5,1.4-4.8,3.5-6c-0.7,1.1-1,2.4-1,3.8C7.4,14,10.9,17.4,15.1,17.4z"/></svg>`
const lightThemeIcon = `<svg viewBox="0 0 24 24"><path d="M7 12c0 2.8 2.2 5 5 5s5-2.2 5-5-2.2-5-5-5S7 9.2 7 12zM12 9c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3S10.3 9 12 9zM13 5V3c0-.6-.4-1-1-1s-1 .4-1 1v2c0 .6.4 1 1 1S13 5.6 13 5zM19.1 4.9c-.4-.4-1-.4-1.4 0l-1.4 1.4c-.4.4-.4 1 0 1.4.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4C19.5 6 19.5 5.3 19.1 4.9zM21 11h-2c-.6 0-1 .4-1 1s.4 1 1 1h2c.6 0 1-.4 1-1S21.6 11 21 11zM17.7 16.2c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4c.2.2.5.3.7.3s.5-.1.7-.3c.4-.4.4-1 0-1.4L17.7 16.2zM11 19v2c0 .6.4 1 1 1s1-.4 1-1v-2c0-.6-.4-1-1-1S11 18.4 11 19zM4.9 19.1c.2.2.5.3.7.3s.5-.1.7-.3l1.4-1.4c.4-.4.4-1 0-1.4s-1-.4-1.4 0l-1.4 1.4C4.5 18 4.5 18.7 4.9 19.1zM2 12c0 .6.4 1 1 1h2c.6 0 1-.4 1-1s-.4-1-1-1H3C2.4 11 2 11.4 2 12zM6.3 4.9c-.4-.4-1-.4-1.4 0s-.4 1 0 1.4l1.4 1.4C6.5 8 6.8 8.1 7.1 8.1S7.6 8 7.8 7.8c.4-.4.4-1 0-1.4L6.3 4.9z"/></svg>`

navToggleIcon.addEventListener('click', function () {
    navToggleIcon.classList.toggle('nav__toggle-icon--open')
    menu.classList.toggle('menu--open')
    cover.classList.toggle('cover--show')
})
changeThemeBtn.addEventListener ('click', function () {
    document.documentElement.classList.toggle('dark-theme')

    if (document.documentElement.classList.contains('dark-theme')) {
        window.localStorage.setItem('theme','dark-theme')
        changeThemeBtn.innerHTML = darkThemeIcon
    } else {
        window.localStorage.setItem('theme','light-theme')
        changeThemeBtn.innerHTML = lightThemeIcon
    }
})

if(window.localStorage.getItem('theme') === 'dark-theme') {
    document.documentElement.classList.add('dark-theme')
    changeThemeBtn.innerHTML = darkThemeIcon
} else {
    document.documentElement.classList.remove('dark-theme')
    changeThemeBtn.innerHTML = lightThemeIcon
}
// resumeMenubars.forEach (resumeMenubare => {
//     resumeMenubare.addEventListener ('click', function () {
//         $.querySelector('.resume__menubar--color').classList.remove('resume__menubar--color')
//         $.querySelector('.resume__contents--show').classList.remove('resume__contents--show')
//         resumeMenubare.classList.add('resume__menubar--color')
//         let contentId =  resumeMenubare.getAttribute('data-content-id')
//         $.querySelector(contentId).classList.add ('resume__contents--show')
//     })

// })
PortfolioListItems.forEach(PortfolioListItem => {
    PortfolioListItem.addEventListener ('click', function () {
        $.querySelector ('.Portfolio-list__item--active').classList.remove ('Portfolio-list__item--active')
        PortfolioListItem.classList.add('Portfolio-list__item--active')
    })
})

function navigationTabsInit(listItems,listItemActiveClass,contentItemShowClass) {
    listItems.forEach (listItem => {
        listItem.addEventListener ('click', function () {
            removeActiveClass(listItemActiveClass)
            removeActiveClass(contentItemShowClass)
            // $.querySelector(`.${listItemActiveClass}`).classList.remove(listItemActiveClass)
            // $.querySelector(`.${contentItemShowClass}`).classList.remove(contentItemShowClass)
            listItem.classList.add(listItemActiveClass)
            let contentId =  listItem.getAttribute('data-content-id')
            $.querySelector(contentId).classList.add (contentItemShowClass)
        })
    
    })

} 

function removeActiveClass(className) {
    $.querySelector(`.${className}`).classList.remove(className)
}

navigationTabsInit (resumeMenubars,'resume__menubar--color','resume__contents--show',)

const observer = new IntersectionObserver (observerHandler, {
    threshold: 0.6
})

function observerHandler(allSections) {
    allSections.map(section => {
        let sectiontargetClassName =  section.target.className
        if (section.isIntersecting) {
            $.querySelector(`.menu__link[data-section= ${sectiontargetClassName}]`).classList.add('menu__link--active')
        } else {
            $.querySelector(`.menu__link[data-section= ${sectiontargetClassName}]`).classList.remove('menu__link--active')
        }

    })
}

sections.forEach (section =>  {
    observer.observe(section)
})

menuLinks.forEach(menulink => {
    menulink.addEventListener ('click', function (el) {

        el.preventDefault()
        removeActiveClass('menu__link--active')

        menulink.classList.add('menu__link--active')

        const sectionClass = menulink.getAttribute("data-section")
        const sectionOffsetTop = $.querySelector(`.${sectionClass}`).offsetTop

        window.scrollTo( {

            top: sectionOffsetTop-120,
            behavior: "smooth"

        })
    })
}) 

