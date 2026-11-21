function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function updateStages() {
    const f = parseInt(document.getElementById('stageFrom').value);
    const t = parseInt(document.getElementById('stageTo').value);
    const diff = Math.max(2, Math.abs(t - f));
    document.getElementById('stageDist').innerText = `${diff} Stages (~${diff * 2} km)`;
    document.getElementById('stageCost').innerText = `₹${diff * 50} / Month`;
}
function calcRoute(e) {
    e.preventDefault();
    showToast('✓ Route Pass confirmed and stored in conductor scanner system.');
}