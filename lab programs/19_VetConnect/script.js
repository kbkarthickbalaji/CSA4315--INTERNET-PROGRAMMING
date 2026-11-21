let cases = [
    { id: 'VET-801', animal: 'Dairy Cow / Cattle', owner: 'Ramasamy', phone: '9845112233', mode: 'Live Video Call', symptoms: 'Fever (103°F) and refusing fodder since yesterday morning.', status: 'Prescription Issued' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function renderCases() {
    const list = document.getElementById('casesList');
    list.innerHTML = cases.map(c => `
        <div class="case-item">
            <div style="display:flex; justify-content:space-between; font-weight:700;">
                <span>${c.id}: ${c.animal}</span>
                <span style="color:#7e22ce;">${c.status}</span>
            </div>
            <p style="margin:4px 0; font-size:0.88rem;"><strong>Owner:</strong> ${c.owner} (${c.phone}) | <strong>Mode:</strong> ${c.mode}</p>
            <p style="font-size:0.85rem; color:#475569;"><strong>Symptoms:</strong> ${c.symptoms}</p>
        </div>
    `).join('');
}
function bookVetConsult(e) {
    e.preventDefault();
    const token = 'VET-' + Math.floor(800 + Math.random() * 199);
    cases.unshift({
        id: token,
        animal: document.getElementById('animalType').value,
        owner: document.getElementById('ownerName').value.trim(),
        phone: document.getElementById('ownerPhone').value.trim(),
        mode: document.getElementById('consultMode').value,
        symptoms: document.getElementById('symptomsText').value.trim(),
        status: 'Doctor Assigned'
    });
    showToast(`Consultation confirmed! Case ID: ${token}`);
    e.target.reset();
    renderCases();
}
window.addEventListener('DOMContentLoaded', renderCases);