// 🔥 rende le funzioni globali (menu funzionante)
window.toggleMenu = function () {
  document.getElementById("menu").classList.toggle("open");
};

window.showSection = function (id) {
  document.querySelectorAll(".section").forEach(section => {
    section.classList.remove("active");
  });
  document.getElementById(id).classList.add("active");
  document.getElementById("menu").classList.remove("open");
};

window.openMaps = function () {
  window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
};


// ⏳ aspetta che la pagina sia pronta
document.addEventListener("DOMContentLoaded", function () {

  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const form = document.getElementById("bookingForm");

  // ✅ BLOCCA DOMENICA E LUNEDÌ
  dateInput.addEventListener("change", function () {
    const d = new Date(this.value);
    const day = d.getDay();

    if (day === 0 || day === 1) {
      alert("Il negozio è chiuso domenica e lunedì");
      this.value = "";
      timeSelect.innerHTML = "<option value=''>Seleziona orario</option>";
      return;
    }

    generaOrari();
  });


  // ✅ GENERA ORARI CORRETTI
  function generaOrari() {
    timeSelect.innerHTML = "<option value=''>Seleziona orario</option>";

    function add(startH, startM, endH, endM) {
      let h = startH;
      let m = startM;

      while (h < endH || (h === endH && m <= endM)) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');

        const opt = document.createElement("option");
        opt.value = hh + ":" + mm;
        opt.textContent = hh + ":" + mm;
        timeSelect.appendChild(opt);

        m += 30;
        if (m >= 60) {
          m = 0;
          h++;
        }
      }
    }

    add(9, 30, 12, 30);
    add(15, 30, 19, 30);
  }


  // 🔥 genera orari iniziali
  generaOrari();


  // ✅ SALVATAGGIO FIRESTORE
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = form.querySelector("input[type='text']").value;
    const telefono = form.querySelector("input[type='tel']").value;
    const servizio = form.querySelector("select").value;
    const data = dateInput.value;
    const ora = timeSelect.value;

    if (!nome || !telefono || !servizio || !data || !ora) {
      alert("Compila tutti i campi");
      return;
    }

    try {
      const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js");

      await addDoc(collection(window.db, "prenotazioni"), {
        nome,
        telefono,
        servizio,
        data,
        ora,
        creato: new Date()
      });

      document.getElementById("msg").textContent = "Prenotazione salvata ✔";
      form.reset();
      generaOrari();

    } catch (err) {
      console.error(err);
      document.getElementById("msg").textContent = "Errore salvataggio ❌";
    }
  });

});
