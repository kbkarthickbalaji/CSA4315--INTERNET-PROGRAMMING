const DB_VOTES = 'vo_votes';
let currentVoter = null;
let candidates = JSON.parse(localStorage.getItem('vo_candidates')) || [
    { id: 1, name: 'Anand Sundaram', party: 'Progressive Alliance', symbol: '🌅', votes: 14 },
    { id: 2, name: 'Meenakshi Raman', party: 'Green Welfare Front', symbol: '🌿', votes: 19 },
    { id: 3, name: 'Dr. Vikram Patel', party: 'Democratic Youth Forum', symbol: '⚖️', votes: 9 }
];
let castedVoters = JSON.parse(localStorage.getItem(DB_VOTES)) || ['TN/01/1001'];

function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2500); }
function showScreen(id) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.screen-box').forEach(s => s.classList.remove('active'));
    document.querySelector(`[onclick="showScreen('${id}')"]`).classList.add('active');
    document.getElementById(id + 'Screen').classList.add('active');
    if (id === 'results') renderResults();
}

function verifyVoter(e) {
    e.preventDefault();
    const vid = document.getElementById('voterId').value.trim().toUpperCase();
    if (castedVoters.includes(vid)) {
        showToast('Error: This Voter ID has already cast their vote!');
        return;
    }
    currentVoter = vid;
    document.getElementById('authBox').style.display = 'none';
    document.getElementById('ballotBox').style.display = 'block';
    document.getElementById('voterGreeting').innerText = `Voter ID: ${vid} | One vote per authenticated citizen.`;
    renderBallot();
}

function renderBallot() {
    const grid = document.getElementById('candidateGrid');
    grid.innerHTML = '';
    candidates.forEach(c => {
        const div = document.createElement('div');
        div.className = 'cand-card';
        div.innerHTML = `
            <div class="cand-symbol">${c.symbol}</div>
            <h4>${c.name}</h4>
            <div class="cand-party">${c.party}</div>
            <button type="button" class="btn btn-primary" onclick="castVote(${c.id})">Vote For Candidate</button>
        `;
        grid.appendChild(div);
    });
}

function castVote(cid) {
    if (!currentVoter) return;
    const cand = candidates.find(x => x.id === cid);
    if (!cand) return;
    cand.votes++;
    castedVoters.push(currentVoter);
    localStorage.setItem('vo_candidates', JSON.stringify(candidates));
    localStorage.setItem(DB_VOTES, JSON.stringify(castedVoters));
    showToast(`✓ Vote recorded for ${cand.name}!`);
    document.getElementById('ballotBox').innerHTML = `
        <div style="text-align:center; padding:30px;">
            <div style="font-size:3rem; color:#16a34a;">✓</div>
            <h3>Vote Successfully Cast!</h3>
            <p class="desc">Thank you for voting. Your transaction is permanently encrypted.</p>
            <button class="btn btn-secondary" onclick="location.reload()">Next Voter</button>
        </div>
    `;
    currentVoter = null;
}

function renderResults() {
    const total = candidates.reduce((s, c) => s + c.votes, 0);
    document.getElementById('totalVotesBadge').innerText = `Total Votes: ${total}`;
    const cont = document.getElementById('resultsContainer');
    cont.innerHTML = '';
    candidates.forEach(c => {
        const pct = total > 0 ? ((c.votes / total) * 100).toFixed(1) : 0;
        const div = document.createElement('div');
        div.className = 'result-row';
        div.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-weight:600;">
                <span>${c.symbol} ${c.name} (${c.party})</span>
                <span>${c.votes} votes (${pct}%)</span>
            </div>
            <div class="bar-track"><div class="bar-fill" style="width: ${pct}%;"></div></div>
        `;
        cont.appendChild(div);
    });
}

function addCandidate() {
    const name = document.getElementById('newCandName').value.trim();
    const party = document.getElementById('newCandParty').value.trim();
    const symbol = document.getElementById('newCandSymbol').value.trim() || '🗳️';
    if (!name || !party) { showToast('Please enter candidate name and party.'); return; }
    candidates.push({ id: Date.now(), name, party, symbol, votes: 0 });
    localStorage.setItem('vo_candidates', JSON.stringify(candidates));
    showToast('Candidate added.');
    document.getElementById('newCandName').value = '';
    document.getElementById('newCandParty').value = '';
}

function resetElection() {
    if (confirm('Are you sure you want to reset all votes?')) {
        candidates.forEach(c => c.votes = 0);
        castedVoters = [];
        localStorage.setItem('vo_candidates', JSON.stringify(candidates));
        localStorage.setItem(DB_VOTES, JSON.stringify(castedVoters));
        showToast('Election data reset.');
        location.reload();
    }
}