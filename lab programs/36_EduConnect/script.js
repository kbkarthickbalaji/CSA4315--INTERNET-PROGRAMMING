document.querySelectorAll('.cur-item').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.cur-item').forEach(i => i.classList.remove('active'));
        item.classList.add('active');
    });
});