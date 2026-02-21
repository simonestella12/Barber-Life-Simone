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

const serviceSelect = document.getElementById("service");

if (serviceSelect) {
  services.forEach(s => {
    const option = document.createElement("option");
    option.value = s.name;
    option.text = `${s.name} — €${s.price}`;
    serviceSelect.add(option);
  });
}
