"use strict";

const projects = Object.freeze({
  recipe: {
    title: "Recipe Finder",
    kind: "REACT / RECIPE SEARCH",
    image: "Images/recipefinder.png",
    description:
      "A recipe discovery interface i built using React. The project explores food ingredients and cooking methods. My Inspiration for crreating this project came from my love for cooking and exploring new recipes.",
    tags: ["React", "JavaScript"],
  },
  globo: {
    title: "Globo News",
    kind: "REACT / NEWS",
    image: "Images/globonews.png",
    description:
      "A React-based news interface exploring countries stories and headlines. I built this project to practice creating dynamic news feeds and take inspiration to the design of Rappler news page.",
    tags: ["React", "JavaScript"],
  },
  bussin: {
    title: "Bussin",
    kind: "JAVASCRIPT / WEB PROJECT",
    image: "Images/bussin.png",
    description:
      "A web project built using HTML, CSS and JavaScript, i try making a video background homepage here.",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  weather: {
    title: "Weather App",
    kind: "JAVASCRIPT / API",
    image: "Images/weatherapp.png",
    description:
      "A weather application focused on fetching remote data with JavaScript and translating it into a useful interface.",
    tags: ["HTML", "CSS", "JavaScript", "Fetch API"],
  },
  bugtong: {
    title: "Bugtong Game",
    kind: "REACT / INTERACTIVE GAME",
    image: "Images/bugtonggame.png",
    description:
      "An interactive Filipino riddle game built with React, using JSON to structure its game content. As a kid i used to play this game with my friends and i wanted to create a digital version of it.",
    tags: ["React", "JavaScript", "JSON"],
  },
  todo: {
    title: "To-Do List",
    kind: "JAVASCRIPT / PRODUCTIVITY",
    image: "Images/todolist.png",
    description:
      "A compact task-management project that practices interactive behavior using JavaScript and jQuery.",
    tags: ["HTML", "CSS", "JavaScript", "jQuery"],
  },
});

const menuButton = document.querySelector("#menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
const closeMenu = () => {
  menuButton?.setAttribute("aria-expanded", "false");
  menuButton?.setAttribute("aria-label", "Open menu");
  if (mobileNav) mobileNav.hidden = true;
};
menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  mobileNav.hidden = !open;
});
mobileNav
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
window.addEventListener("resize", () => {
  if (window.innerWidth > 680) closeMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

const filters = [...document.querySelectorAll("[data-filter]")];
const cards = [...document.querySelectorAll("[data-category]")];
const emptyState = document.querySelector("#empty-state");
function setFilter(category) {
  filters.forEach((button) => {
    const active = button.dataset.filter === category;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  let visible = 0;
  cards.forEach((card) => {
    card.hidden = category !== "all" && card.dataset.category !== category;
    if (!card.hidden) visible++;
  });
  emptyState.hidden = visible > 0;
}
filters.forEach((button) =>
  button.addEventListener("click", () => setFilter(button.dataset.filter)),
);
document
  .querySelector("#reset-filter")
  ?.addEventListener("click", () => setFilter("all"));

const dialog = document.querySelector("#project-dialog");
const dialogImage = document.querySelector("#dialog-image");
const dialogLink = document.querySelector("#dialog-link");
const closeDialogButton = document.querySelector("#dialog-close");
let lastTrigger = null;

/* Function to open project details dialog */
document.querySelectorAll("[data-project] .project-open").forEach((button) => {
  button.addEventListener("click", () => {
    const project = projects[button.closest("[data-project]")?.dataset.project];
    if (!project || !dialog || typeof dialog.showModal !== "function") return;
    lastTrigger = button;
    document.querySelector("#dialog-title").textContent = project.title;
    document.querySelector("#dialog-kind").textContent = project.kind;
    document.querySelector("#dialog-description").textContent =
      project.description;
    dialogImage.src = project.image;
    dialogImage.alt = `Screenshot of ${project.title}`;
    dialogLink.href = `${project.image}`;
    dialogLink.textContent = `View ${project.title} ↗`;
    dialogLink.setAttribute("aria-label", `View ${project.title} in a new tab`);
    const tags = document.querySelector("#dialog-tags");
    tags.replaceChildren(
      ...project.tags.map((tag) => {
        const el = document.createElement("span");
        el.textContent = tag;
        return el;
      }),
    );
    dialog.showModal();
    document.body.classList.add("dialog-open");
    closeDialogButton.focus();
  });
});
closeDialogButton?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});
dialog?.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  lastTrigger?.focus();
});

// Images are optional enhancements: show a useful fallback if an asset cannot be read.
document.querySelectorAll("img[data-fallback]").forEach((img) => {
  const parent = img.parentElement;
  if (!parent) return;
  const fail = () => {
    parent.classList.remove("image-loading");
    parent.classList.add("media-failed");
    parent.dataset.message = img.dataset.fallback;
  };
  img.addEventListener("error", fail, { once: true });
  if (img.complete) {
    if (!img.naturalWidth) fail();
  } else {
    parent.classList.add("image-loading");
    img.addEventListener(
      "load",
      () => parent.classList.remove("image-loading"),
      { once: true },
    );
  }
});
dialogImage?.addEventListener("error", () => {
  dialogImage.alt = "Project screenshot could not be loaded";
});
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
