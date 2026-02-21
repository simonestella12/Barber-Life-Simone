const services = [
  { name: "Taglio", price: 14 },
  { name: "Taglio Baby 0-8", price: 10 },
  { name: "Barba", price: 5 },
  { name: "Barba con Macchinetta", price: 5 },
  { name: "Barba Sfumata", price: 5 },
  { name: "Trattamento Lisciante", price: 15 },
  { name: "Basette e collo", price: 3 },
  { name: "Shampoo", price: 3 },
  { name: "Trattamenti", price: 10 },
  { name: "Taglio, Barba e Shampoo", price: 20 },
  { name: "Sopracciglia", price: 3 },
  { name: "Pettinata e Shampoo", price: 5 },
  { name: "Sfumatura Lato", price: 10 }
];
// ORARI DI APERTURA
const openingHours = {
  "lunedì": null,
  "martedì": ["09:30-13:00", "15:30-20:00"],
  "mercoledì": ["09:30-13:00", "15:30-20:00"],
  "giovedì": ["09:30-13:00", "15:30-20:00"],
  "venerdì": ["09:30-13:00", "15:30-20:00"],
  "sabato": ["09:30-13:00", "15:30-20:00"],
  "domenica": null
};

const dateInput = document.getElementById("date");
const timeInput = document.getElementById("time");

if (dateInput && timeInput) {
  dateInput.addEventListener("change", () => {
    const dayName = new Date(dateInput.value)
      .toLocaleDateString('it-IT', { weekday: 'long' })
      .toLowerCase();

    const slots = openingHours[dayName];
    timeInput.innerHTML = "";

    if (!slots) {
      const option = document.createElement("option");
      option.text = "Chiuso";
      timeInput.add(option);
      return;
    }

    slots.forEach(slot => {
      const [start, end] = slot.split("-");
      let [sh, sm] = start.split(":").map(Number);
      let [eh, em] = end.split(":").map(Number);

      let current = sh * 60 + sm;
      const endMinutes = eh * 60 + em;

      while (current < endMinutes) {
        const h = String(Math.floor(current / 60)).padStart(2, '0');
        const m = String(current % 60).padStart(2, '0');

        const option = document.createElement("option");
        option.value = `${h}:${m}`;
        option.text = `${h}:${m}`;
        timeInput.add(option);

        current += 30;
      }
    });
  });
}
const serviceSelect = document.getElementById("service");

if (serviceSelect) {
  services.forEach(s => {
    const option = document.createElement("option");
    option.value = s.name;
    option.text = `${s.name} — €${s.price}`;
    serviceSelect.add(option);
  });
}
