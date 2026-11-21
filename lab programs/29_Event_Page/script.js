function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function registerDelegate(e) {
    e.preventDefault();
    const name = document.getElementById('delName').value.trim();
    showToast(`✓ Delegate Pass confirmed for ${name}! Badge sent to email.`);
    e.target.reset();
}