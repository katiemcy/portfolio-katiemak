const html = document.documentElement;

// Hamburger Menu
    // *** COMING SOON ***
const hamburger = document.querySelector('.hamburger');
const navDiv = document.querySelector('.navDiv');

hamburger.addEventListener('click', function(){
    this.classList.toggle('open')
    navDiv.classList.toggle('openMenu')

    navDiv.style.width = "30%";

    // navDiv.style.position = "fixed";
})

// END: Hamburger Menu

// top nav bar slide-in/ slide-out
const aside = document.querySelector('aside');

    // *** should add some screen changing listener to this ***
if (!navDiv.style.width) {
    aside.style.height = "65px";
} else {
    aside.style.height = "0";
}
// END: top nav bar slide-in/ slide-out


function roundAsPercentString (num) {
    const roundedNum = num.toFixed(2);
    return roundedNum + "%";
}

function addAnimation (element, animation) {
    element.style.animation = animation
}

// Scrolling Animations
const scrollListening = () => {
    // header page animation
        const header = document.querySelector('header');
        const footer = document.querySelector('footer');
        const navH2 = document.querySelector('.navH2');

        const headerStickyView = document.querySelector('.headerStickyView');
    
        // reference: https://css-tricks.com/lets-make-one-of-those-fancy-scrolling-animations-used-on-apple-product-pages/
        const scrollPosition = html.scrollTop;
        const maxScrollTop = headerStickyView.scrollHeight - window.innerHeight;
        const scrollFraction = scrollPosition / maxScrollTop;
    
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
    
            footer.style.display = "block";
                
        } else {
    
            navDiv.style.width = "0";
            aside.style.height = "65px";
            navH2.style.opacity = "0";
    
        } 
    // END: header page animation
    
    // Fun Fact list slide in animation
        const aboutStickyView = document.querySelector('.aboutStickyView');
    
        const aboutMaxScroll = aboutStickyView.scrollHeight - window.innerHeight;
        // 1800 is the height of scroll space until about section comes to sight
            // aboutScrollFraction = 0 means the about section just arrives top of viewport
            // when aboutScrollFraction starts to > 1, the about section starts to leave viewport
        const aboutScrollFraction = (scrollPosition - 1800) / aboutMaxScroll;
    
        const aboutMeLi = document.querySelector('.aboutMeUl').children;
        const aboutMeLiArray = Array.from(aboutMeLi);
    
        const kickInPoint = [
            0.10,
            0.18,
            0.26
        ]
    
        const slideInAnimation = (kickInPoint, li) => {
            if (aboutScrollFraction > kickInPoint) {
                li.style.transform = "translateX(0)"
            } else {
                li.style.transform = "translateX(-120%)"
            }
        }
    
        for (let i = 0; i < kickInPoint.length; i++) {
            slideInAnimation(kickInPoint[i], aboutMeLiArray[i])
        }
    // END: list slide in animation
    
    // Languages & tools slide in animation
        const content1Div = document.querySelector('.content1');
        const content2Div = document.querySelector('.content2');
    
        const fractionPoint = {
            startPoint: 0.5,
            endPoint: 0.65
        }
    
        const translateFraction =  (aboutScrollFraction - fractionPoint.startPoint) / (fractionPoint.endPoint - fractionPoint.startPoint);
        // translateNum for content1
        const translateNum1 = translateFraction * 120
        // translateNum for content2 
        const translateNum2 = ( 1 - translateFraction ) * 120;
        const translatePercentage1 = roundAsPercentString(translateNum1);
        const translatePercentage2 = roundAsPercentString(translateNum2)
        ;
    
        if (aboutScrollFraction < fractionPoint.startPoint ) {
            content1Div.style.transform = "translateX(0)"
            content2Div.style.transform = "translateX(120%)"
        } else if (aboutScrollFraction >= fractionPoint.startPoint && aboutScrollFraction <= fractionPoint.endPoint) {
            
            content1Div.style.transform = `translateX(-${translatePercentage1})`
            content2Div.style.transform = `translateX(${translatePercentage2})`
    
        } else {
            content1Div.style.transform = "translateX(-120%)"
            content2Div.style.transform = "translateX(0)"
        }
    
    // Fix Say-Hi and contact form to top
        const sayHiDiv = document.querySelector('.sayHi')
        const getInTouchDiv = document.querySelector('.getInTouchDiv')
    
        const fixToTop = (element) => {
            element.style.position = 'fixed';
            element.style.top = '0';
        }
    
        const resetPosition = (element) => {
            element.style.position = '';
            element.style.top = '';
        }
    
        // when window.scrollY = abosoluteDiv.top, the absoluteDiv just arrived top of viewport
        if (window.scrollY >= 9587) {
            fixToTop(sayHiDiv);
            fixToTop(getInTouchDiv);
        } else {
            resetPosition(sayHiDiv);
            resetPosition(getInTouchDiv);
        }
    
    // Say-Hi fade out effect
        if (window.scrollY >= 9850) {
            sayHiDiv.style.opacity = "0";
            setTimeout(() => {
                sayHiDiv.style.visibility = 'hidden'
            }, 1500) // duration depends on sayHi transition time
        } else {
            sayHiDiv.style.opacity = "1";
            sayHiDiv.style.visibility = 'visible'
        }
    }

    // depends on initial screen size only
function screenChange(x) {
    if (x.matches) { // If media query matches
        window.addEventListener('scroll', scrollListening, true)
    } else {
        window.removeEventListener('scroll', scrollListening, true)
    }
  }
  
let x = window.matchMedia("(min-width: 768px)")
screenChange(x); // Call listener function at run time

// END: Scrolling Animations
  

// Play video on hover
const videos = document.querySelectorAll('video');

videos.forEach(function(v){
    v.addEventListener('mouseover', function(video){
        this.play();
    })
})
// END: Play video on hover
