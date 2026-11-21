let pickups = [
    { id: 'SW-101', type: 'Dry Recyclable (Paper/Plastic/Glass)', loc: 'Saveetha Campus Block B', date: '2026-11-22', status: 'Truck Dispatched (Vehicle TN-02-G-4412)' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function renderPickups() {
    document.getElementById('pickupList').innerHTML = pickups.map(p => `
        <div class="pickup-item">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${p.id}: ${p.type}</span>
                <span style="color:#16a34a;">${p.status}</span>
            </div>
            <p>Location: ${p.loc} | Date: ${p.date}</p>
        </div>
    `).join('');
}
function schedulePickup(e) {
    e.preventDefault();
    const token = 'SW-' + Math.floor(100 + Math.random() * 899);
    pickups.unshift({
        id: token,
        type: document.getElementById('wasteType').value,
        loc: document.getElementById('wasteLoc').value.trim(),
        date: document.getElementById('pickupDate').value,
        status: 'Scheduled'
    });
    showToast(`Pickup scheduled! Token: ${token}`);
    e.target.reset();
    renderPickups();
}
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('pickupDate').value = new Date().toISOString().slice(0, 10);
    renderPickups();
});