document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const msg = document.getElementById("msg");

  /* MENU */
  window.toggleMenu = function(){
    document.getElementById("menu").classList.toggle("open");
  }

  window.showSection = function(id){
    document.querySelectorAll(".section").forEach(section=>{
      section.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
    document.getElementById("menu").classList.remove("open");
  }

  window.openMaps = function(){
    window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
  }

  /* CREA ORARI SOLO DOPO CHE LA DATA È SCELTA */
  dateInput.addEventListener("change", () => {
    if(!dateInput.value) return;
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
  form.addEventListener("submit", async function(e){
    e.preventDefault();
    msg.textContent = "Invio prenotazione...";

    const nome = document.getElementById("nome").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servizio = document.getElementById("servizio").value;
    const data = dateInput.value;
    const ora = timeSelect.value;

    if(!data || !ora){
      msg.textContent="Seleziona data e orario";
      return;
    }

    /* BLOCCO DOMENICA E LUNEDÌ SOLO QUI */
    const giorno = new Date(data).getDay();
    if(giorno === 0 || giorno === 1){
      msg.textContent="Chiuso domenica e lunedì";
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

      msg.textContent="Prenotazione confermata ✔";
      form.reset();
      timeSelect.innerHTML="";
    }
    catch(err){
      console.error(err);
      msg.textContent="Errore salvataggio ❌";
    }
  });

});
