/* ==========================================================
   LINKS — the only place you need to edit to add a link.
   Leave a value as "" and every button or row that uses it
   stays hidden. Fill it in and it appears everywhere.
   ========================================================== */
const LINKS = {
  email: "mailto:sakshamsingla8b@gmail.com",
  github: "https://github.com/sakshamsingla2022",
  linkedin: "",      // e.g. "https://www.linkedin.com/in/your-name"
  resume: "",        // set to "assets/resume.pdf" once the file is in assets/
  scoreup: "",       // the live ScoreUp address
  bloomback: "",     // Google Play listing (only once it is public)
  vaqeelsaab: "https://vaqeelsaab.com"
};

const GITHUB_USER = "sakshamsingla2022";

/* ---------- Show or hide linked elements ---------- */
// <a data-link="scoreup">  gets its href from LINKS, or is hidden if empty.
// <li data-row="linkedin"> is shown only if LINKS.linkedin is filled in.
document.querySelectorAll("[data-link]").forEach(function (el) {
  const url = LINKS[el.dataset.link];
  if (url) {
    el.href = url;
    el.hidden = false;
  } else {
    el.hidden = true;
  }
});
document.querySelectorAll("[data-row]").forEach(function (el) {
  el.hidden = !LINKS[el.dataset.row];
});

/* ---------- Phone menu ---------- */
const side = document.querySelector(".side");
const menuBtn = document.querySelector(".menu-btn");
if (side && menuBtn) {
  function setMenu(open) {
    side.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", String(open));
  }
  menuBtn.addEventListener("click", function () {
    setMenu(!side.classList.contains("open"));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && side.classList.contains("open")) {
      setMenu(false);
      menuBtn.focus();
    }
  });
}

/* ---------- GitHub contributions graph (About page) ---------- */
// Uses a free public API that reads GitHub's contribution calendar.
// If it fails, is slow, or shows zero, the whole box stays hidden.
async function loadGraph() {
  const box = document.getElementById("gh");
  const grid = document.getElementById("gh-grid");
  if (!box || !grid) return;

  const controller = new AbortController();
  const timer = setTimeout(function () { controller.abort(); }, 8000);
  try {
    const res = await fetch(
      "https://github-contributions-api.jogruber.de/v4/" + GITHUB_USER + "?y=last",
      { signal: controller.signal }
    );
    if (!res.ok) return;
    const data = await res.json();
    const days = data.contributions || [];
    const total = data.total ? (data.total.lastYear ?? Object.values(data.total)[0]) : 0;
    if (!days.length || !total) return;

    // Line the first column up with the right weekday (Sunday at the top).
    const firstWeekday = new Date(days[0].date + "T00:00:00").getDay();
    const frag = document.createDocumentFragment();
    for (let i = 0; i < firstWeekday; i++) {
      const pad = document.createElement("span");
      pad.className = "gh-cell gh-pad";
      frag.appendChild(pad);
    }
    days.forEach(function (d) {
      const cell = document.createElement("span");
      cell.className = "gh-cell";
      cell.dataset.level = d.level;
      frag.appendChild(cell);
    });
    grid.appendChild(frag);

    const label = total.toLocaleString("en-US") + " contributions in the last year";
    document.getElementById("gh-total").textContent = label;
    grid.setAttribute("aria-label", "GitHub contribution graph: " + label);
    box.hidden = false;

    // On phones, start scrolled to the most recent weeks.
    const scroller = grid.parentElement;
    scroller.scrollLeft = scroller.scrollWidth;
  } catch (e) {
    /* network error or timeout: keep it hidden */
  } finally {
    clearTimeout(timer);
  }
}
loadGraph();
