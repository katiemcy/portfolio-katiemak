const html = document.documentElement;

const stickyViewDiv = document.querySelector('.stickyView');

const navContainer = document.querySelector('#navFlex');
const introContainer = document.querySelector('#introFlex');
const navWrap = document.querySelector('.navWrap')

const header = document.querySelector('header');
const nav = document.querySelector('nav');
const footer = document.querySelector('footer');

function roundAsPercentString (num) {
    const roundedWidth = num.toFixed(2);
    return roundedWidth + "%";
}

window.addEventListener('scroll', () => {
    const scrollTop = html.scrollTop;
    const maxScrollTop = stickyViewDiv.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;
    console.log(scrollFraction);

    if(scrollFraction >= 0.39) {
        introContainer.classList = ["introFlexCol sticky"];
        nav.classList = ["navFlexRow"];

        navContainer.style.width = "100%";
        navWrap.style.width = "85%";

        footer.style.display = "none";
    } else {
        introContainer.classList = ["introFlexRow sticky"];
        nav.classList =[""];
            
        const navWidth = 0.25 * (1 - scrollFraction) * 100;
        const headerWidth = 0.75 * (1 + scrollFraction) * 100;
    
        navContainer.style.width = roundAsPercentString(navWidth);
        header.style.width = roundAsPercentString(headerWidth);

        navContainer.style.width = "25%";
        navWrap.style.width = "60%";

        footer.style.display = "none";
    }
})
