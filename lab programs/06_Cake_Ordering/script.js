
const KEY = "LAB_DEMO_cake";
function readData(){try{return JSON.parse(localStorage.getItem(KEY))||{records:[],extra:[]}}catch(e){return {records:[],extra:[]}}}
function saveData(d){localStorage.setItem(KEY,JSON.stringify(d))}
function escapeHTML(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function showMessage(msg){const el=document.getElementById("message");if(el)el.innerHTML='<div class="notice">'+escapeHTML(msg)+'</div>'}
function renderRecords(){const d=readData(),el=document.getElementById("records");if(!el)return;
 if(!d.records.length){el.innerHTML='<p class="muted">No records yet. Add a demo entry using the form.</p>';return}
 el.innerHTML=d.records.map((r,i)=>'<div class="item"><strong>'+escapeHTML(r.title)+'</strong><p>'+escapeHTML(r.detail||"")+'</p><span class="tag">'+escapeHTML(r.status||"Saved")+'</span> <button class="secondary" onclick="removeRecord('+i+')">Remove</button></div>').join('')
}
function addRecord(title,detail,status="Saved"){const d=readData();d.records.unshift({title,detail,status,created:new Date().toISOString()});saveData(d);renderRecords()}
function removeRecord(i){const d=readData();d.records.splice(i,1);saveData(d);renderRecords()}
function resetDemo(){if(confirm("Clear all locally saved demo data for this experiment?")){localStorage.removeItem(KEY);renderRecords();showMessage("Demo data cleared.")}}
document.addEventListener("DOMContentLoaded",()=>{renderRecords();const f=document.getElementById("demoForm");if(f)f.addEventListener("submit",e=>{e.preventDefault();const fd=new FormData(f);addRecord(fd.get("title"),fd.get("detail"),fd.get("status")||"Saved");f.reset();showMessage("Saved in this browser only.")})})

const cakes=[["Chocolate Truffle","Chocolate","₹650"],["Vanilla Birthday Cake","Birthday","₹550"],["Red Velvet","Birthday","₹850"],["Wedding Fondant Cake","Wedding","₹2,500"]];
function filterCakes(){const c=document.getElementById("category").value,q=document.getElementById("cakeSearch").value.toLowerCase();document.getElementById("cakeList").innerHTML=cakes.filter(x=>(c==="All"||x[1]===c)&&x[0].toLowerCase().includes(q)).map(x=>'<div class="item"><b>'+x[0]+'</b><p>'+x[1]+' · <span class="price">'+x[2]+'</span></p></div>').join("")||"No cakes found"}
document.addEventListener("DOMContentLoaded",()=>{filterCakes();document.getElementById("category").onchange=filterCakes;document.getElementById("cakeSearch").oninput=filterCakes});
