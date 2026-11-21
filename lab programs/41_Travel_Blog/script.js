let comments = [{ author: 'Karthick Balaji', text: 'Stunning Himalayan winter itinerary! Adding to my 2027 bucket list.' }];
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000); }
function renderComments() {
    document.getElementById('commentList').innerHTML = comments.map(c => `
        <div class="com-item"><strong>${c.author}:</strong> ${c.text}</div>
    `).join('');
}
function postComment(e) {
    e.preventDefault();
    comments.unshift({
        author: document.getElementById('comAuthor').value.trim(),
        text: document.getElementById('comText').value.trim()
    });
    showToast('Comment posted!');
    e.target.reset();
    renderComments();
}
window.addEventListener('DOMContentLoaded', renderComments);