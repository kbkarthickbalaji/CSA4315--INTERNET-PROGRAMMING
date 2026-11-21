function showToast(m) { const t = document.getElementById('toast'); t.innerText = m; t.style.display = 'block'; setTimeout(() => t.style.display = 'none', 2200); }
function calcPassFare() {
    const rate = parseInt(document.getElementById('passType').value.split('|')[1]);
    const dur = parseInt(document.getElementById('passDur').value);
    document.getElementById('passTotal').value = rate * dur;
}
function applyPass(e) {
    e.preventDefault();
    const token = 'PASS-' + Math.floor(1000 + Math.random() * 8999);
    const name = document.getElementById('passName').value.trim();
    const pType = document.getElementById('passType').value.split('|')[0];
    const from = document.getElementById('fromStop').value.trim();
    const to = document.getElementById('toStop').value.trim();
    const tot = document.getElementById('passTotal').value;
    const dur = document.getElementById('passDur').value;
    document.getElementById('passCardArea').innerHTML = `
        <div class="smart-pass">
            <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.2); padding-bottom:10px;">
                <strong>METRO COMMUTER SMART PASS</strong>
                <span>${token}</span>
            </div>
            <h2 style="margin:12px 0 4px 0;">${name}</h2>
            <p style="font-size:0.85rem; color:#99f6e4;">Category: ${pType} (${dur} Month Validity)</p>
            <p style="font-size:0.9rem; margin:8px 0;"><strong>Route:</strong> ${from} ➔ ${to}</p>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:12px; border-top:1px solid rgba(255,255,255,0.2); padding-top:8px;">
                <span>Pass Fee Paid: ₹${tot}</span>
                <span style="background:#5eead4; color:#0f766e; padding:3px 8px; border-radius:4px; font-weight:700; font-size:0.75rem;">VERIFIED ACTIVE</span>
            </div>
        </div>
    `;
    showToast('✓ E-Pass generated successfully!');
}