function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function sendArtInquiry(e) {
    e.preventDefault();
    showToast('✓ Commission request received. Emily Harris Studio will reply within 48 hours.');
    e.target.reset();
}