function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function calcMonthlyCost() {
    const l = parseInt(document.getElementById('subLitres').value);
    document.getElementById('subTotal').innerText = '₹' + (l * 75 * 30).toLocaleString('en-IN');
}
function subscribeMilk(e) {
    e.preventDefault();
    showToast('✓ Ko-Matha subscription activated! Morning deliveries start tomorrow.');
    e.target.reset();
}