window.toggleMenu = function () {
  const menu = document.getElementById("menu");
  if (menu) menu.classList.toggle("open");
};

window.showSection = function (id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  const el = document.getElementById(id);
  if (el) el.classList.add("active");
  const menu = document.getElementById("menu");
  if (menu) menu.classList.remove("open");
};

window.openMaps = function () {
  window.open("https://www.google.com/maps/search/?api=1&query=Barber+Life+Simone+Scoglitti");
};


// ⚠️ parte SOLO quando tutto è carico
window.onload = function () {

  const dateInput = document.getElementById("date");
  const timeSelect = document.getElementById("time");
  const form = document.getElementById("bookingForm");

  if (!dateInput || !timeSelect || !form) {
    alert("Errore: campi prenotazione non trovati");
    return;
  }

  function generaOrari() {
    timeSelect.innerHTML = "<option value=''>Seleziona orario</option>";

    function add(h1, m1, h2, m2) {
      let h = h1;
      let m = m1;

      while (h < h2 || (h === h2 && m <= m2)) {
        const hh = String(h).padStart(2, '0');
        const mm = String(m).padStart(2, '0');

        const opt = document.createElement("option");
        opt.value = hh + ":" + mm;
        opt.textContent = hh + ":" + mm;
        timeSelect.appendChild(opt);

        m += 30;
        if (m >= 60) { m = 0; h++; }
      }
    }

    add(9, 30, 12, 30);
    add(15, 30, 19, 30);
  }

  // genera subito
  generaOrari();

  // blocco giorni chiusi
  dateInput.addEventListener("change", function () {
    const d = new Date(this.value);
    const day = d.getDay();

    if (day === 0 || day === 1) {
      alert("Chiuso domenica e lunedì");
      this.value = "";
      generaOrari();
      return;
    }
  });


  // salvataggio
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
        nome, telefono, servizio, data, ora, creato: new Date()
      });

      document.getElementById("msg").textContent = "Prenotazione salvata ✔";
      form.reset();
      generaOrari();

    } catch (err) {
      document.getElementById("msg").textContent = "Errore salvataggio ❌";
    }
  };

};
