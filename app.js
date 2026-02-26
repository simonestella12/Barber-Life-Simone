function toggleMenu(){
document.getElementById("menu").classList.toggle("open");
}

function showSection(id){
document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"));
document.getElementById(id).classList.add("active");
toggleMenu();
}

function openMaps(){
window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
}

/* BLOCCA DOMENICA E LUNEDI */
const dateInput = document.getElementById("date");

dateInput.addEventListener("change", function(){
const d = new Date(this.value);
const day = d.getDay();

if(day === 0 || day === 1){
alert("Il negozio è chiuso domenica e lunedì");
this.value="";
}
});

/* ORARI */
const timeSelect = document.getElementById("time");

function generaOrari(){
timeSelect.innerHTML = "<option value=''>Seleziona orario</option>";

function add(startH,startM,endH,endM){
let h=startH;
let m=startM;

while(h < endH || (h===endH && m<=endM)){
const hh = String(h).padStart(2,'0');
const mm = String(m).padStart(2,'0');

const opt = document.createElement("option");
opt.textContent = hh+":"+mm;
timeSelect.appendChild(opt);

m+=30;
if(m>=60){m=0;h++;}
}
}

add(9,30,12,30);
add(15,30,19,30);
}

generaOrari();

/* CONFERMA */
document.getElementById("bookingForm").addEventListener("submit", function(e){
e.preventDefault();
document.getElementById("msg").textContent="Prenotazione inviata ✔";
});
