const html = document.documentElement;

// set to top of page on refresh
document.addEventListener("DOMContentLoaded", function() {
    window.scrollTo(0, 0);
});


// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navDiv = document.querySelector('.navDiv');
const navLinks = document.querySelectorAll('#navList li a')
const aside = document.querySelector('aside');
const dimDiv = document.querySelector('#dim');
const body = document.querySelector('body')
const logo = document.querySelector('#logo')
const contactIcons = document.querySelector('.right')

const toggleMenu = () => {
    hamburger.classList.toggle('open')
    navDiv.classList.toggle('openMenu')
    dimDiv.classList.toggle('dim')
    body.classList.toggle('stopScrolling')

    if (logo.style.visibility === 'hidden') {
        logo.style.visibility = ''
    } else {
        logo.style.visibility = 'hidden'
    }
    
    if (contactIcons.style.visibility === 'hidden') {
        contactIcons.style.visibility = ''
    } else {
        contactIcons.style.visibility = 'hidden'
    }
    
    if (window.innerWidth > 768) {
        if (navDiv.style.width === "30%") {
            navDiv.style.width = "0%";
        } else {
            navDiv.style.width = "30%";
        }
    } else {
        if (navDiv.style.width === "100%") {
            navDiv.style.width = "0%";
        } else {
            navDiv.style.width = "100%";
        }
    }
}

const closeMenu = () => {
    navDiv.style.width = "0%"
    logo.style.visibility = ''
    contactIcons.style.visibility = ''

    hamburger.classList.remove('open')
    navDiv.classList.remove('openMenu')
    dimDiv.classList.remove('dim')
    body.classList.remove('stopScrolling')

    if (aside.style.height = "0px") {
        aside.style.height = "65px";
    }
}

hamburger.addEventListener('click', toggleMenu)
hamburger.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        toggleMenu()
    }
})

navLinks.forEach(li => li.addEventListener('click', closeMenu))
navLinks.forEach(li => li.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
        closeMenu()
    }
}))

// END: Hamburger Menu


// Scrolling Animations
function roundAsPercentString (num) {
    const roundedNum = num.toFixed(2);
    return roundedNum + "%";
}

function addAnimation (element, animation) {
    element.style.animation = animation
}

let sayHiFlag = false;

const scrollListening = () => {
    // header page animation
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');

        const headerStickyView = document.querySelector('.headerStickyView');
    
    // reference: https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/
        const scrollPosition = html.scrollTop;
        // maxScrollTop is the height of headerStickyView before it starts to leave the window
        // const maxScrollTop = headerStickyView.scrollHeight - window.innerHeight;
        const headerScrollFraction = scrollPosition / headerStickyView.scrollHeight;
    
        const navWidth = 0.3 * (1 - headerScrollFraction / 10) * 100;
        const headerWidth = 0.7 * (1 + headerScrollFraction) * 100;
        
        if(headerScrollFraction <= 0.39) {
            animationFlag = true;
            
            navDiv.style.width = roundAsPercentString(navWidth);
            aside.style.height = "0";
    
            if (headerWidth < 100) {
                header.style.width = roundAsPercentString(headerWidth);
            } else {
                header.style.width = "100%"
            }
    
            footer.style.display = "block";
                
        } else if (headerScrollFraction > 0.39 && headerScrollFraction <= 1) {
    
            navDiv.style.width = "0";
            aside.style.height = "65px";
    
        } else {
            header.style.width = "100%"
        }
    // END: header page animation

}

// depends on initial screen size only
function screenChange(x) {
    if (x.matches) { // If media query matches
        window.addEventListener('scroll', scrollListening, true);                                           
    // top nav bar slide-in/ slide-out
        if (!navDiv.style.width) {
            aside.style.height = "0";
        } else {
            aside.style.height = "65px";
        }

    } else {
        window.removeEventListener('scroll', scrollListening, true)
    }
}
  
let x = window.matchMedia("(min-width: 768px)")
screenChange(x); // Call listener function at run time

let addEventFlag = false;
window.addEventListener('resize', () => {
    
    if (window.innerWidth > 768) {
        if (!navDiv.style.width) {
            aside.style.height = "0";
        } else {
            aside.style.height = "65px";
        }

        if (addEventFlag === false){
            addEventFlag = true
            window.addEventListener('scroll', scrollListening)
        }
    } else {
        if (addEventFlag){
            addEventFlag = false
            window.removeEventListener('scroll', scrollListening)
        }
    }
})
// END: Scrolling Animations
  

// Play video on hover
const videos = document.querySelectorAll('video');

videos.forEach(function(v){
    v.addEventListener('mouseover', function(video){
        this.play();
    })
})
// END: Play video on hover


// Contact Form submission
const form = document.querySelector(".contactForm");
async function handleSubmit(event) {
    event.preventDefault();

    const status = document.getElementById("my-form-status");
    const data = new FormData(event.target);
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageField = document.getElementById('messageField');

    if (nameInput.value.trim()!=="" && emailInput.value.trim()!=="" && messageField.value.trim()!=="" ) {
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                form.reset()
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                    } else {
                        status.innerHTML = "Oops! There was a problem submitting your form"
                    }
                })
            }
        }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
        });
    } else {
        status.innerHTML = "Please don't leave field empty!"
    }
}

form.addEventListener("submit", handleSubmit)


// clear form after submission
window.onbeforeunload = () => {
    for(const form of document.getElementsByTagName('form')) {
      form.reset();
    }
  }