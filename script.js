const html = document.documentElement;

const headerStickyView = document.querySelector('.headerStickyView');
const aboutStickyView = document.querySelector('.aboutStickyView');

const navDiv = document.querySelector('.navDiv');
const introFlex = document.querySelector('#introFlex');
const navWrap = document.querySelector('.navWrap');

const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');
const aside = document.querySelector('aside');
const navH2 = document.querySelector('.navH2');

let animationFlag;

function roundAsPercentString (num) {
    const roundedNum = num.toFixed(2);
    return roundedNum + "%";
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
    const maxScrollTop = headerStickyView.scrollHeight - window.innerHeight;
    const scrollFraction = scrollPosition / maxScrollTop;

    // console.log(scrollFraction);
    // console.log(animationFlag);

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

        // if (animationFlag === false) {
        //     animationFlag = true
        // };

        footer.style.display = "block";
            
    } else {
        animationFlag = false;

        navDiv.style.width = "0";
        aside.style.height = "65px";
        navH2.style.opacity = "0";

        // if (animationFlag) {
        //     animationFlag = false;
        // }
    } 

    // List slide in animation
    const aboutMaxScroll = aboutStickyView.scrollHeight - window.innerHeight;
    // 1800 is the height of scroll space until about section comes to sight
        // aboutScrollFraction = 0 means the about section just arrives top of viewport
        // when aboutScrollFraction starts to > 1, the about section starts to leave viewport
    const aboutScrollFraction = (scrollPosition -1800) / aboutMaxScroll;

    // console.log('stickView scrollheight', aboutStickyView.scrollHeight)
    // console.log("aboutScroll", aboutScrollFraction)

    // console.log("header sticky", headerStickyView.scrollHeight
    // )

    // console.log("html scrollTop", scrollPosition)

    console.log("aboutScrollFraction", aboutScrollFraction)

    const aboutMeLi = document.querySelector('.aboutMeUl').children;
    const aboutMeLiArray = Array.from(aboutMeLi);

    const kickInPoint = [
        0.10,
        0.25,
        0.40
    ]

    const slideInAnimation = (kickInPoint, li) => {
        if (aboutScrollFraction > kickInPoint) {
            li.style.transform = "translateX(0)"
        } else {
            li.style.transform = "translateX(-120%)"
        }
    }

    for (var i = 0; i < kickInPoint.length; i++) {
        slideInAnimation(kickInPoint[i], aboutMeLiArray[i])
    }
// END: list slide in animation

// Languages & tools slide in animation
    const content1Div = document.querySelector('.content1');
    const content2Div = document.querySelector('.content2');

    const translateFraction =  (aboutScrollFraction - 0.5) / (0.8 - 0.5);
    // translateNum for content1
    const translateNum1 = translateFraction * 120
    // translateNum for content2 
    const translateNum2 = ( 1 - translateFraction ) * 120;
    const translatePercentage1 = roundAsPercentString(translateNum1);
    const translatePercentage2 = roundAsPercentString(translateNum2)
    ;

    console.log(translateNum1, translateNum2);

    if (aboutScrollFraction < 0.55 ) {
        content1Div.style.transform = "translateX(0)"
        content2Div.style.transform = "translateX(120%)"
    } else if (aboutScrollFraction >= 0.515 && aboutScrollFraction <= 0.8) {
        
        content1Div.style.transform = `translateX(-${translatePercentage1})`
        content2Div.style.transform = `translateX(${translatePercentage2})`

    } else {
        content1Div.style.transform = "translateX(-120%)"
        content2Div.style.transform = "translateX(0)"
    }

    // Open animation
    // const sectionAbout = document.querySelector('.about');
    // const leftSticky = document.querySelector('.leftSticky');
    // if (aboutScrollFraction >= 0.95) {
    //     sectionAbout.style.transform = 'translateX(120%)';
    //     leftSticky.style.transform = 'translateX(-120%)';
    // } else {
    //     sectionAbout.style.transform = 'translateX(0)';
    //     leftSticky.style.transform = 'translateX(0)';
    // }


})

// Play video on hover
const videos = document.querySelectorAll('video');
console.log(videos);
const projectsLi = document.querySelectorAll('.projectsUl li')

console.log(projectsLi)

projectsLi.forEach(function(li){
    const video = li.querySelector('video');
    li.addEventListener('mouseenter', function(event){
        console.log(video)
    })
})

// projectsLi.forEach(function(v){
//     v.addEventListener('mouseenter', function(event){
//         console.log(event.target)
//     })
// })

// videos.forEach(function(v){
//     v.addEventListener('mouseenter', function(event){
//         console.log(event.target)
//     })
// })