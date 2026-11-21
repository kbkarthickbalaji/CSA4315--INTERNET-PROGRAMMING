const DB_KEY = 'ce_complaints';
let complaints = JSON.parse(localStorage.getItem(DB_KEY)) || [
    { id: 'CMP-101', name: 'Karthick Balaji', phone: '9876543210', category: 'Roads & Transport', urgency: 'High', location: 'Saveetha Nagar Ring Road', desc: 'Large deep pothole creating severe accident risk during evening rain.', status: 'Under Review', date: '2026-11-20' },
    { id: 'CMP-102', name: 'Priya Sundar', phone: '9845123456', category: 'Water Supply', urgency: 'Medium', location: 'Ward 12, Gandhi Street', desc: 'Contaminated low-pressure water pipeline since 3 days.', status: 'Resolved', date: '2026-11-18' }
];

function saveDB() {
    localStorage.setItem(DB_KEY, JSON.stringify(complaints));
    renderAdminTable();
}

function showToast(msg) {
    const t = document.getElementById('toast');
    t.innerText = msg;
    t.style.display = 'block';
    setTimeout(() => { t.style.display = 'none'; }, 2500);
}

function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`[onclick="switchTab('${tabId}')"]`).classList.add('active');
    document.getElementById(`${tabId}-tab`).classList.add('active');
    if (tabId === 'admin') renderAdminTable();
}

function submitComplaint(e) {
    e.preventDefault();
    const token = 'CMP-' + Math.floor(100 + Math.random() * 900);
    const newComp = {
        id: token,
        name: document.getElementById('compName').value.trim(),
        phone: document.getElementById('compPhone').value.trim(),
        category: document.getElementById('compCategory').value,
        urgency: document.getElementById('compUrgency').value,
        location: document.getElementById('compLocation').value.trim(),
        desc: document.getElementById('compDesc').value.trim(),
        status: 'Submitted',
        date: new Date().toISOString().slice(0, 10)
    };
    complaints.unshift(newComp);
    saveDB();
    e.target.reset();
    showToast(`Complaint lodged successfully! Token: ${token}`);
    switchTab('track');
    document.getElementById('trackInput').value = token;
    trackComplaint();
}

function trackComplaint() {
    const q = document.getElementById('trackInput').value.trim().toUpperCase();
    const res = document.getElementById('trackResult');
    if (!q) { res.innerHTML = '<p class="subtitle">Please enter a complaint token.</p>'; return; }
    const c = complaints.find(x => x.id === q);
    if (!c) {
        res.innerHTML = `<div class="status-card" style="border-left-color: #ef4444;"><p>No complaint found with token <strong>${q}</strong>. Please check your token number.</p></div>`;
        return;
    }
    const badgeCls = c.status === 'Resolved' ? 'badge-success' : 'badge-warning';
    res.innerHTML = `
        <div class="status-card">
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <h3>Token: ${c.id}</h3>
                <span class="badge ${badgeCls}">${c.status}</span>
            </div>
            <p style="margin-top:8px;"><strong>Category:</strong> ${c.category} | <strong>Urgency:</strong> ${c.urgency}</p>
            <p><strong>Location:</strong> ${c.location}</p>
            <p><strong>Description:</strong> ${c.desc}</p>
            <small style="color:#64748b;">Filed on: ${c.date}</small>
        </div>
    `;
}

function renderAdminTable() {
    const tbody = document.getElementById('adminTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';
    let pending = 0, resolved = 0;
    complaints.forEach((c, idx) => {
        if (c.status === 'Resolved') resolved++; else pending++;
        const badgeCls = c.status === 'Resolved' ? 'badge-success' : 'badge-warning';
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><strong>${c.id}</strong></td>
            <td>${c.name}<br><small>${c.phone}</small></td>
            <td>${c.category}</td>
            <td>${c.location}</td>
            <td><span class="badge ${badgeCls}">${c.status}</span></td>
            <td>
                <select onchange="updateStatus(${idx}, this.value)" style="padding:4px 8px; font-size:0.8rem;">
                    <option value="Submitted" ${c.status === 'Submitted' ? 'selected' : ''}>Submitted</option>
                    <option value="Under Review" ${c.status === 'Under Review' ? 'selected' : ''}>Under Review</option>
                    <option value="In Progress" ${c.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                    <option value="Resolved" ${c.status === 'Resolved' ? 'selected' : ''}>Resolved</option>
                </select>
            </td>
        `;
        tbody.appendChild(tr);
    });
    document.getElementById('statTotal').innerText = `Total: ${complaints.length}`;
    document.getElementById('statPending').innerText = `Pending: ${pending}`;
    document.getElementById('statResolved').innerText = `Resolved: ${resolved}`;
}

function updateStatus(idx, val) {
    complaints[idx].status = val;
    saveDB();
    showToast(`Status updated to ${val}`);
}

window.addEventListener('DOMContentLoaded', renderAdminTable);