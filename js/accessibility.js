// Funtcion of Enlarge Pic -> reference: https://www.youtube.com/watch?v=4gcy-qT9kGw&t=27s&ab_channel=GreatStack
const lightboxTriggers = document.querySelectorAll('.lightbox-trigger');
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox-content');

lightboxTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
        const imgurl = trigger.getAttribute('data-src');
        lightboxContent.setAttribute('src', imgurl);
        lightbox.style.display = 'flex';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

