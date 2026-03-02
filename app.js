function toggleMenu(){
  document.getElementById("menu").classList.toggle("open");
}

function showSection(id){
  document.querySelectorAll(".section").forEach(section=>{
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  document.getElementById("menu").classList.remove("open");
}

function openMaps(){
  window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
}

const dateInput = document.getElementById("date");
const timeSelect = document.getElementById("time");

/* ORARI SEMPRE DISPONIBILI DOPO SCELTA DATA */
dateInput.addEventListener("input", function(){
  if(!this.value) return;
  generaOrari();
});

function generaOrari(){
  timeSelect.innerHTML = "<option value=''>Seleziona orario</option>";

  function add(startH,startM,endH,endM){
    let h=startH;
    let m=startM;

    while(h < endH || (h===endH && m<=endM)){
      const hh = String(h).padStart(2,'0');
      const mm = String(m).padStart(2,'0');

      const opt = document.createElement("option");
      opt.value = hh+":"+mm;
      opt.textContent = hh+":"+mm;
      timeSelect.appendChild(opt);

      m+=30;
      if(m>=60){m=0;h++;}
    }
  }

  add(9,30,12,30);
  add(15,30,19,30);
}

/* PRENOTAZIONE */
document.getElementById("bookingForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const nome = document.getElementById("nome").value;
  const telefono = document.getElementById("telefono").value;
  const servizio = document.getElementById("servizio").value;
  const data = dateInput.value;
  const ora = timeSelect.value;

  if(!data || !ora){
    document.getElementById("msg").textContent="Seleziona data e orario";
    return;
  }

  const giorno = new Date(data).getDay();
  if(giorno === 0 || giorno === 1){
    document.getElementById("msg").textContent="Il negozio è chiuso domenica e lunedì";
    return;
  }

  try{
    const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

    await addDoc(collection(window.db, "prenotazioni"), {
      nome,
      telefono,
      servizio,
      data,
      ora,
      creato: new Date()
    });

    document.getElementById("msg").textContent="Prenotazione inviata ✔";
    this.reset();
    timeSelect.innerHTML="";
  }
  catch(err){
    document.getElementById("msg").textContent="Errore salvataggio ❌";
    console.error(err);
  }
});
