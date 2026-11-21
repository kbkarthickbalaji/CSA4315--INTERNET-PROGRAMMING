const jobs = [
    { id: 1, title: 'Full Stack Web Developer', comp: 'Zoho Corporation', loc: 'Chennai', sal: '₹6.5 - 10 LPA', skills: 'HTML5, CSS3, JavaScript, Node.js' },
    { id: 2, title: 'Frontend UI Engineer', comp: 'Freshworks', loc: 'Chennai / Hybrid', sal: '₹8 - 12 LPA', skills: 'React, Vue, REST APIs, CSS Grid' },
    { id: 3, title: 'Junior Python Developer', comp: 'TCS Innovation Labs', loc: 'Bangalore', sal: '₹4.5 - 7 LPA', skills: 'Python, Flask, SQLite, Linux' }
];
let activeJob = null;
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function renderJobs(list) {
    const cont = document.getElementById('jobList');
    cont.innerHTML = list.map(j => `
        <div class="job-item">
            <div>
                <span class="company">${j.comp} • ${j.loc}</span>
                <h3>${j.title}</h3>
                <small style="color:#64748b;">Skills: ${j.skills}</small>
                <div class="salary">${j.sal}</div>
            </div>
            <button class="btn btn-primary" onclick="openModal('${j.title}')">Apply Now</button>
        </div>
    `).join('');
}
function filterJobs() {
    const q = document.getElementById('jobSearch').value.toLowerCase();
    renderJobs(jobs.filter(j => j.title.toLowerCase().includes(q) || j.skills.toLowerCase().includes(q)));
}
function openModal(title) {
    activeJob = title;
    document.getElementById('modalJobTitle').innerText = title;
    document.getElementById('applyModal').style.display = 'flex';
}
function closeModal() { document.getElementById('applyModal').style.display = 'none'; }
function submitApplication(e) {
    e.preventDefault();
    showToast(`✓ Application for ${activeJob} submitted successfully!`);
    closeModal();
    e.target.reset();
}
window.addEventListener('DOMContentLoaded', () => renderJobs(jobs));