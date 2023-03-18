const html = document.documentElement;

const stickyViewDiv = document.querySelector('.stickyView');

const navDiv = document.querySelector('.navDiv');
const introFlex = document.querySelector('#introFlex');
const navWrap = document.querySelector('.navWrap');

const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');
const aside = document.querySelector('aside');
const navH2 = document.querySelector('.navH2');

const sectionAbout = document.querySelector('.about');

let animationFlag;

function roundAsPercentString (num) {
    const roundedWidth = num.toFixed(2);
    return roundedWidth + "%";
}

function addAnimation (element, animation) {
    element.style.animation = animation
}

if (!navDiv.style.width) {
    aside.style.height = "0";
} else {
    aside.style.height = "65px";
}


window.addEventListener('scroll', () => {
    const scrollPosition = html.scrollTop;
    const maxScrollTop = stickyViewDiv.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScrollTop;

    console.log(scrollFraction);
    console.log(animationFlag);

    const navWidth = 0.3 * (1 - scrollFraction / 10) * 100;
    const headerWidth = 0.7 * (1 + scrollFraction) * 100;

    
    if(scrollFraction <= 0.39) {
        animationFlag = true;
        
        navDiv.style.width = roundAsPercentString(navWidth);
        aside.style.height = "0";
        navH2.style.opacity = "1";

        if (headerWidth < 100) {
            header.style.width = roundAsPercentString(headerWidth);
        } else {
            header.style.width = "100%"
        }

        if (animationFlag === false) {
            animationFlag = true
        };

        footer.style.display = "block";
            
    } else {
        animationFlag = false;

        navDiv.style.width = "0";
        aside.style.height = "65px";
        navH2.style.opacity = "0";

        if (animationFlag) {
            animationFlag = false;
            
            
        }
    } 
})

