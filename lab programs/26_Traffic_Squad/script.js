let challans = [
    { id: 'CH-901', veh: 'TN-01-AB-1234', offense: 'Without Helmet', loc: 'Poonamallee High Rd', fine: 1000, status: 'Pending' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function updateFineAmt() {
    const val = document.getElementById('newOffense').value;
    document.getElementById('newFine').value = val.split('|')[1];
}
function searchChallan() {
    const q = document.getElementById('vehSearch').value.trim().toUpperCase();
    const res = document.getElementById('challanResult');
    const list = challans.filter(c => c.veh === q);
    if (!list.length) { res.innerHTML = '<p style="color:#16a34a; font-weight:600;">✓ No pending challans found for vehicle ' + q + '</p>'; return; }
    res.innerHTML = list.map(c => `
        <div class="challan-card">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${c.id}: ${c.veh}</span>
                <span style="color:#e11d48;">₹${c.fine} (${c.status})</span>
            </div>
            <p style="font-size:0.85rem; margin:4px 0;">Offense: ${c.offense} at ${c.loc}</p>
            <button class="btn btn-primary" onclick="payChallan('${c.id}')">Pay Fine Online</button>
        </div>
    `).join('');
}
function payChallan(id) {
    const c = challans.find(x => x.id === id);
    if (c) c.status = 'Paid (Settled)';
    showToast(`✓ Fine for ${id} paid successfully. Digital receipt generated.`);
    searchChallan();
}
function issueChallan(e) {
    e.preventDefault();
    const token = 'CH-' + Math.floor(900 + Math.random() * 99);
    const offenseVal = document.getElementById('newOffense').value.split('|')[0];
    const fineVal = parseInt(document.getElementById('newFine').value);
    challans.unshift({
        id: token,
        veh: document.getElementById('newVehNo').value.trim().toUpperCase(),
        offense: offenseVal,
        loc: document.getElementById('newLoc').value.trim(),
        fine: fineVal,
        status: 'Pending'
    });
    showToast(`e-Challan ${token} registered on national VAHAN portal.`);
    e.target.reset();
}