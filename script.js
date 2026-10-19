// ---------- Menu data ----------
const menuItems = [
  { name: "Smoked aubergine dip", image: "images/dip-aubergine.svg", price: 7,  category: "starters", desc: "Charred aubergine, tahini, lemon and olive oil, served with warm flatbread.", tag: "Vegetarian" },
  { name: "Grilled halloumi", image: "images/halloumi.svg",     price: 9,  category: "starters", desc: "Seared over coals with thyme honey and pistachios.", tag: "Vegetarian" },
  { name: "Lamb kofta skewers", image: "images/kofta.svg",   price: 18, category: "grill",    desc: "Hand-minced lamb, parsley and sumac, marinated for 24 hours." },
  { name: "Charcoal chicken", image: "images/chicken.svg",     price: 16, category: "grill",    desc: "Half chicken with garlic, lemon and smoked paprika." },
  { name: "Ribeye on the bone", image: "images/ribeye.svg",   price: 34, category: "grill",    desc: "Dry-aged for 28 days, finished with rosemary butter." },
  { name: "Grilled sea bass", image: "images/seabass.svg",     price: 24, category: "grill",    desc: "Whole fish with fennel, olives and charred lemon." },
  { name: "Clay oven flatbread", image: "images/flatbread.svg",  price: 4,  category: "sides",    desc: "Baked to order. Plain, garlic or za'atar.", tag: "Vegan" },
  { name: "Olive oil potatoes", image: "images/potatoes.svg",   price: 6,  category: "sides",    desc: "Roasted until crisp, with rosemary and sea salt.", tag: "Vegan" },
  { name: "Burnt honey cake", image: "images/honey-cake.svg",     price: 8,  category: "desserts", desc: "Layered sponge with caramelised honey cream.", tag: "Vegetarian" },
  { name: "Cardamom rice pudding", image: "images/rice-pudding.svg",price: 7,  category: "desserts", desc: "Slow-cooked, topped with toasted almonds.", tag: "Vegetarian" }
];

const menuList = document.getElementById("menuList");
const tabs = document.querySelectorAll(".tab");

function renderMenu(filter = "all") {
  const items = filter === "all" ? menuItems : menuItems.filter(i => i.category === filter);
  menuList.innerHTML = items.map(i => `
    <li class="menu-item">
      <img src="${i.image}" alt="${i.name}" width="104" height="104" loading="lazy">
      <div class="info">
        <div class="top"><h3>${i.name}</h3><span class="price">$${i.price}</span></div>
        <p>${i.desc}</p>
        ${i.tag ? `<span class="tag">${i.tag}</span>` : ""}
      </div>
    </li>`).join("");
}

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");
    renderMenu(tab.dataset.filter);
  });
});

renderMenu();

// ---------- Mobile navigation ----------
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

function setNav(open) {
  nav.classList.toggle("open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => setNav(!nav.classList.contains("open")));
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => setNav(false)));

// ---------- Reservation form ----------
const form = document.getElementById("reserveForm");
const success = document.getElementById("formSuccess");
const dateInput = document.getElementById("date");

// Block past dates
dateInput.min = new Date().toISOString().split("T")[0];

function showError(id, message) {
  const field = document.getElementById(id);
  document.getElementById(id + "Error").textContent = message;
  field.classList.toggle("invalid", Boolean(message));
  return !message;
}

function validate() {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const guests = Number(form.guests.value);

  const results = [
    showError("name", name.length < 2 ? "Enter your full name." : ""),
    showError("email", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "" : "Enter a valid email address."),
    showError("date", form.date.value ? "" : "Choose a date."),
    showError("time", form.time.value ? "" : "Choose a time."),
    showError("guests", guests >= 1 && guests <= 12 ? "" : "We seat 1 to 12 guests online.")
  ];
  return results.every(Boolean);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  success.hidden = true;
  if (!validate()) return;

  const d = new Date(form.date.value + "T00:00").toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
  success.textContent = `Thank you, ${form.name.value.trim()}. We've received your request for ${form.guests.value} on ${d} at ${form.time.value}. A confirmation will be sent to ${form.email.value.trim()}.`;
  success.hidden = false;
  form.reset();
  form.guests.value = 2;
});

// Clear an error as soon as the person fixes the field
form.querySelectorAll("input, select").forEach(el =>
  el.addEventListener("input", () => showError(el.id, ""))
);

// ---------- Footer year ----------
document.getElementById("year").textContent = new Date().getFullYear();
