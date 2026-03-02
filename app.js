document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("bookingForm");
  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const msg = document.getElementById("msg");

  /* ===== MENU ===== */
  window.toggleMenu = () => {
    document.getElementById("menu").classList.toggle("open");
  };

  window.showSection = id => {
    document.querySelectorAll(".section").forEach(section=>{
      section.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
    document.getElementById("menu").classList.remove("open");
  };

  window.openMaps = () => {
    window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
  };

  /* ===== GENERAZIONE ORARI ===== */
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

  /* ===== QUANDO SCEGLI DATA ===== */
  dateInput.addEventListener("change", () => {
    if(!dateInput.value) return;

    const giorno = new Date(dateInput.value).getDay();

    if(giorno === 0 || giorno === 1){
      msg.textContent = "Il negozio è chiuso domenica e lunedì";
      dateInput.value = "";
      timeSelect.innerHTML = "<option value=''>Prima scegli la data</option>";
      return;
    }

    generaOrari();
    msg.textContent = "";
  });

  /* ===== PRENOTAZIONE ===== */
  form.addEventListener("submit", async e => {
    e.preventDefault();

    if(!window.db){
      msg.textContent = "Errore connessione database";
      return;
    }

    const nome = document.getElementById("nome").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servizio = document.getElementById("servizio").value;
    const data = dateInput.value;
    const ora = timeSelect.value;

    if(!nome || !telefono || !servizio || !data || !ora){
      msg.textContent = "Compila tutti i campi";
      return;
    }

    msg.textContent = "Invio prenotazione...";

    try{
      const { collection, addDoc } = await import(
        "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js"
      );

      await addDoc(collection(window.db, "prenotazioni"), {
        nome,
        telefono,
        servizio,
        data,
        ora,
        creatoIl: new Date()
      });

      msg.textContent = "Prenotazione confermata ✔";
      form.reset();
      timeSelect.innerHTML = "<option value=''>Prima scegli la data</option>";
    }
    catch(err){
      console.error(err);
      msg.textContent = "Errore salvataggio ❌";
    }
  });

});
