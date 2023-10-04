var gotopbtn = document.querySelector('.gotopbtn');

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 500) {
        gotopbtn.classList.add('show');
    } else {
        gotopbtn.classList.remove('show');
    }
});

gotopbtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});