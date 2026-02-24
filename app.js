/* MENU */
function toggleMenu(){
  document.getElementById("sideMenu").classList.toggle("show");
}

function showSection(id){
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  toggleMenu();
}

/* SERVIZI */
const services = [
  "Taglio",
  "Taglio Baby 0-8",
  "Barba",
  "Barba con macchinetta",
  "Barba sfumata",
  "Taglio + Barba + Shampoo",
  "Sfumatura lato",
  "Trattamenti",
  "Trattamento lisciante"
];

const serviceSelect = document.getElementById("service");
if(serviceSelect){
  services.forEach(s=>{
    const option=document.createElement("option");
    option.text=s;
    option.value=s;
    serviceSelect.add(option);
  });
}

/* ORARI */
const openingHours = {
  "martedì":["09:30-13:00","15:30-20:00"],
  "mercoledì":["09:30-13:00","15:30-20:00"],
  "giovedì":["09:30-13:00","15:30-20:00"],
  "venerdì":["09:30-13:00","15:30-20:00"],
  "sabato":["09:30-13:00","15:30-20:00"]
};

const dateInput=document.getElementById("date");
const timeInput=document.getElementById("time");

if(dateInput && timeInput){
  dateInput.addEventListener("change",()=>{
    const dayName=new Date(dateInput.value)
      .toLocaleDateString('it-IT',{weekday:'long'})
      .toLowerCase();

    const slots=openingHours[dayName];
    timeInput.innerHTML="";

    if(!slots){
      const option=document.createElement("option");
      option.text="Chiuso";
      timeInput.add(option);
      return;
    }

    slots.forEach(slot=>{
      const [start,end]=slot.split("-");
      let [sh,sm]=start.split(":").map(Number);
      let [eh,em]=end.split(":").map(Number);

      let current=sh*60+sm;
      const endMinutes=eh*60+em;

      while(current<endMinutes){
        const h=String(Math.floor(current/60)).padStart(2,'0');
        const m=String(current%60).padStart(2,'0');

        const option=document.createElement("option");
        option.value=`${h}:${m}`;
        option.text=`${h}:${m}`;
        timeInput.add(option);

        current+=30;
      }
    });
  });
}

/* PRENOTAZIONE */
const form=document.getElementById("bookingForm");

if(form){
  form.addEventListener("submit",e=>{
    e.preventDefault();
    alert("Prenotazione inviata! Ti aspettiamo 💈");
    form.reset();
  });
}
