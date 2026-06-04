// Progressive enhancement: active-section nav highlight, scroll fade-in, and
// the print button. All optional — the page is fully usable without JS.

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// Print / Save as PDF button (replaces the old inline onclick).
document.querySelectorAll<HTMLButtonElement>("[data-print]").forEach((btn) => {
  btn.addEventListener("click", () => window.print());
});

// Highlight the sidebar link for the section currently in view.
const sections = document.querySelectorAll<HTMLElement>(".content section");
const navLinks = document.querySelectorAll<HTMLAnchorElement>(".sidebar-nav a");

if (sections.length && navLinks.length) {
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" },
  );
  sections.forEach((section) => navObserver.observe(section));
}

// Staggered fade-in for cards (skipped when reduced motion is requested).
const fadeItems = document.querySelectorAll<HTMLElement>(
  ".exp-item, .skill-row, .edu-item, .cert-item",
);

if (!prefersReducedMotion && fadeItems.length) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          fadeObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.1 },
  );

  fadeItems.forEach((item, i) => {
    item.style.opacity = "0";
    item.style.transform = "translateY(12px)";
    item.style.transition = `opacity 0.6s ${i * 0.04}s ease, transform 0.6s ${i * 0.04}s ease`;
    fadeObserver.observe(item);
  });
}
