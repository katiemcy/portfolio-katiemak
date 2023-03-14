const html = document.documentElement;

const stickyViewDiv = document.querySelector('.stickyView');

const navFlex = document.querySelector('#navFlex');
const introFlex = document.querySelector('#introFlex');
const navWrap = document.querySelector('.navWrap');

const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');




let animationFlag = true;

function roundAsPercentString (num) {
    const roundedWidth = num.toFixed(2);
    return roundedWidth + "%";
}

function addAnimation (element, animation) {
    element.style.animation = animation
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = stickyViewDiv.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    console.log(scrollFraction);
    console.log(animationFlag);

    const navWidth = 0.25 * (1 - scrollFraction) * 100;
    const headerWidth = 0.75 * (1 + scrollFraction) * 100;

    if(scrollFraction <= 0.39) {

        navFlex.style.width = roundAsPercentString(navWidth);

        if (headerWidth < 100) {
            header.style.width = roundAsPercentString(headerWidth);
        } else {
            header.style.width = "100%"
        }

        if (animationFlag === false) {
            animationFlag = true

            nav.classList.remove("navFlexRow");
            introFlex.classList.replace( "introFlexCol", "introFlexRow");
        };

        navFlex.style.width = "25%";
        navWrap.style.width = "60%";

        footer.style.display = "block";
            
    } else {
        
        if (animationFlag) {
            animationFlag = false;
            
            addAnimation(navFlex, "shrink ease-in-out 1s");
            
            setTimeout(() => {
                footer.style.display = "none";
                
                nav.classList.add("navFlexRow");
                introFlex.classList.replace("introFlexRow", "introFlexCol");
                
                addAnimation(navFlex, "expand ease-in-out 1s")

                navFlex.style.width = "100%";
                navWrap.style.width = "85%";

            }, 100)
        }
    }
})
