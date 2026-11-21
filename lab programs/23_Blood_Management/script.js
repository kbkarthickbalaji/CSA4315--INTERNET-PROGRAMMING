const stocks = { 'O+': 18, 'O-': 4, 'A+': 12, 'A-': 3, 'B+': 16, 'B-': 5, 'AB+': 8, 'AB-': 2 };
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function renderStocks() {
    const grid = document.getElementById('stockGrid');
    grid.innerHTML = '';
    for (const [bg, u] of Object.entries(stocks)) {
        grid.innerHTML += `<div class="stock-box"><div class="bg-name">${bg}</div><div class="units">${u} Units</div></div>`;
    }
}
function requestBlood(e) {
    e.preventDefault();
    const bg = document.getElementById('reqBlood').value;
    const u = parseInt(document.getElementById('reqUnits').value);
    if (stocks[bg] >= u) {
        stocks[bg] -= u;
        renderStocks();
        showToast(`✓ ${u} units of ${bg} approved and reserved for emergency dispatch!`);
    } else {
        showToast(`⚠ Urgent: Only ${stocks[bg]} units of ${bg} currently available. Calling nearby blood banks.`);
    }
    e.target.reset();
}
window.addEventListener('DOMContentLoaded', renderStocks);