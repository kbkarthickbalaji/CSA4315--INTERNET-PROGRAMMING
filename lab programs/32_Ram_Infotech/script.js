let tickets = [
    { id: 'JOB-441', model: 'Lenovo ThinkPad E14', issue: 'RAM / NVMe SSD Speed Upgrade', status: 'Ready for Delivery' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function renderTickets() {
    document.getElementById('serviceQueue').innerHTML = tickets.map(t => `
        <div class="srv-item">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${t.id}: ${t.model}</span>
                <span style="color:#0284c7;">${t.status}</span>
            </div>
            <p style="font-size:0.85rem; color:#64748b;">Issue: ${t.issue}</p>
        </div>
    `).join('');
}
function bookService(e) {
    e.preventDefault();
    const token = 'JOB-' + Math.floor(400 + Math.random() * 599);
    tickets.unshift({
        id: token,
        model: document.getElementById('lapModel').value.trim(),
        issue: document.getElementById('lapIssue').value,
        status: 'Assigned to Hardware Engineer'
    });
    showToast(`Service ticket created! Job Sheet: ${token}`);
    e.target.reset();
    renderTickets();
}
window.addEventListener('DOMContentLoaded', renderTickets);