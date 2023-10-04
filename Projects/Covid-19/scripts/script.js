// Get the button element
var scrollToTopButton = document.querySelector('.gotopbtn');

// Add a scroll event listener to show/hide the button
window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 500) {
        scrollToTopButton.style.display = 'block';
    } else {
        scrollToTopButton.style.display = 'none';
    }
});

// Add a click event listener to scroll to the top when the button is clicked
scrollToTopButton.addEventListener('click', function() {
    // Scroll to the top of the page smoothly
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});