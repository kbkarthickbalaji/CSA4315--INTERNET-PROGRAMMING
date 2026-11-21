let tInterval;
function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2000); }
function startTimer() {
    clearInterval(tInterval);
    let sec = 600;
    showToast('Kitchen timer started!');
    tInterval = setInterval(() => {
        sec--;
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        document.getElementById('timerDisplay').innerText = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
        if (sec <= 0) { clearInterval(tInterval); alert('Timer complete! Dish is ready.'); }
    }, 1000);
}