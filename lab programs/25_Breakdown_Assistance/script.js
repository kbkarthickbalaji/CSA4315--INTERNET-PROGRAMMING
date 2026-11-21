const mechanics = [
    { name: 'Karthik Auto Care', loc: 'Poonamallee Bypass (2.1 km)', phone: '9876501122', eta: '12 Mins' },
    { name: 'Balaji 24/7 Road Assistance', loc: 'Thandalam Junction (1.4 km)', phone: '9845012345', eta: '8 Mins' },
    { name: 'Saveetha Fast Towing', loc: 'Chennai Outer Ring Rd (3.8 km)', phone: '9123499887', eta: '18 Mins' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function renderMechanics() {
    document.getElementById('mechList').innerHTML = mechanics.map(m => `
        <div class="mech-item">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${m.name}</span>
                <span style="color:#d97706;">ETA: ${m.eta}</span>
            </div>
            <p style="font-size:0.85rem; color:#64748b;">${m.loc} • Ph: ${m.phone}</p>
            <button class="btn btn-primary" style="margin-top:6px; padding:6px 12px; font-size:0.8rem;" onclick="callMech('${m.name}')">Dispatch Mechanic to Location</button>
        </div>
    `).join('');
}
function requestHelp(e) { e.preventDefault(); showToast('SOS sent! Dispatching closest patrol unit to your location.'); }
function callMech(n) { showToast(`✓ ${n} has accepted your request. Tracking link dispatched via SMS.`); }
window.addEventListener('DOMContentLoaded', renderMechanics);