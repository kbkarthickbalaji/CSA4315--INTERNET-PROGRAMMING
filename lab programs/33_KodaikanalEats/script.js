function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function bookTable(e) {
    e.preventDefault();
    const rest = document.getElementById('restSelect').value;
    const guests = document.getElementById('guestCount').value;
    showToast(`✓ Table reserved for ${guests} guests at ${rest}! Confirmation token sent.`);
    e.target.reset();
}