    // Fun Fact list slide in animation
    const aboutStickyView = document.querySelector('.aboutStickyView');

    const aboutScrollFraction = (scrollPosition - 2500) / aboutStickyView.scrollHeight;

    // const aboutMaxScroll = aboutStickyView.scrollHeight - window.innerHeight;
    // // 1800 is the height of scroll space until about section comes to sight
    //     // aboutScrollFraction = 0 means the about section just arrives top of viewport
    //     // when aboutScrollFraction starts to > 1, the about section starts to leave viewport
    // const aboutScrollFraction = (scrollPosition - 1800) / aboutMaxScroll;

    // const aboutMeLi = document.querySelector('.aboutMeUl').children;
    // const aboutMeLiArray = Array.from(aboutMeLi);

    // const kickInPoint = [
    //     0.10,
    //     0.18,
    //     0.26
    // ]

    // const slideInAnimation = (kickInPoint, li) => {
    //     if (aboutScrollFraction > kickInPoint) {
    //         li.style.transform = "translateX(0)"
    //     } else {
    //         li.style.transform = "translateX(-120%)"
    //     }
    // }

    // for (let i = 0; i < kickInPoint.length; i++) {
    //     slideInAnimation(kickInPoint[i], aboutMeLiArray[i])
    // }
// END: list slide in animation