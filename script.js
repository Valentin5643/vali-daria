const CHECKLIST_KEY = "vd_public_checklist";

document.addEventListener("DOMContentLoaded", () => {
  const loading = document.querySelector("[data-loading]");
  const shell = document.querySelector("[data-site-shell]");
  const enterButton = document.querySelector("[data-enter-site]");

  enterButton.addEventListener("click", () => {
    loading.hidden = true;
    shell.hidden = false;
    document.querySelector('.hero-actions a[href="#album"]')?.focus({ preventScroll: true });
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  setupAccordion();
  setupChecklist();
});

function setupAccordion() {
  const cards = [...document.querySelectorAll(".joke-card")];
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const isOpen = card.getAttribute("aria-expanded") === "true";
      cards.forEach((item) => item.setAttribute("aria-expanded", "false"));
      card.setAttribute("aria-expanded", String(!isOpen));
    });
  });
}

function setupChecklist() {
  const checklist = document.querySelector("[data-checklist]");
  if (!checklist) return;

  const saved = readJSON(CHECKLIST_KEY, []);
  const inputs = [...checklist.querySelectorAll("input[type='checkbox']")];

  inputs.forEach((input) => {
    input.checked = saved.includes(input.value);
    input.addEventListener("change", () => {
      const checked = inputs.filter((item) => item.checked).map((item) => item.value);
      localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checked));
    });
  });
}

function readJSON(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}
