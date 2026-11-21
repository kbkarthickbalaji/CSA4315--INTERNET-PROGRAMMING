let papers = [
    { id: 'IJSSE-2026-041', title: 'Smart Patient Record & Appointment Architecture for E-Health Clinics', author: 'Karthick Balaji', status: 'Published (DOI: 10.1109/IJSSE.2026.041)' }
];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function renderPapers() {
    document.getElementById('papersList').innerHTML = papers.map(p => `
        <div class="paper-item">
            <span style="font-size:0.75rem; color:#0284c7; font-weight:bold;">${p.id}</span>
            <h4 style="margin:4px 0;">${p.title}</h4>
            <small style="color:#64748b;">Author: ${p.author} • Status: ${p.status}</small>
        </div>
    `).join('');
}
function submitPaper(e) {
    e.preventDefault();
    const token = 'IJSSE-2026-' + Math.floor(100 + Math.random() * 899);
    papers.unshift({
        id: token,
        title: document.getElementById('paperTitle').value.trim(),
        author: document.getElementById('paperAuthor').value.trim(),
        status: 'Under Peer Review'
    });
    showToast(`Manuscript submitted! Tracking ID: ${token}`);
    e.target.reset();
    renderPapers();
}
window.addEventListener('DOMContentLoaded', renderPapers);