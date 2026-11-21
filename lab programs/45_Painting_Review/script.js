let currentStars = 5;
let reviews = [{ name: 'Karthick Balaji', stars: 5, text: 'Exquisite depth and palette balance! Captures modern urban tension with poetic stillness.' }];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000); }
function setRating(s) { currentStars = s; document.getElementById('ratingScore').innerText = `${s}.0 Stars`; }
function renderCritiques() {
    document.getElementById('critiqueList').innerHTML = reviews.map(r => `
        <div class="crit-item">
            <div style="display:flex; justify-content:space-between; font-weight:bold;">
                <span>${r.name}</span>
                <span style="color:#ea580c;">${'★'.repeat(r.stars)}</span>
            </div>
            <p style="margin-top:4px;">${r.text}</p>
        </div>
    `).join('');
}
function submitCritique(e) {
    e.preventDefault();
    reviews.unshift({
        name: document.getElementById('revName').value.trim(),
        stars: currentStars,
        text: document.getElementById('revText').value.trim()
    });
    showToast('Critique and star rating recorded!');
    e.target.reset();
    renderCritiques();
}
window.addEventListener('DOMContentLoaded', renderCritiques);