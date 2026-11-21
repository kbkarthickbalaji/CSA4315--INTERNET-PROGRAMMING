function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function enrollStudent(e) {
    e.preventDefault();
    const name = document.getElementById('studName').value.trim();
    showToast(`✓ Enrollment registered for ${name}! Demo class slot allotted.`);
    e.target.reset();
}