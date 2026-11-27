document.addEventListener("DOMContentLoaded", () => {
  const revealTargets = document.querySelectorAll(
    ".header, .Projects, .project-row, .AboutSec, .ContactSec"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        } else {
          entry.target.classList.remove("is-visible");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -30px 0px",
    }
  );

  revealTargets.forEach((el) => observer.observe(el));

  
  const navLinks = document.querySelectorAll('.top-nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      const targetId = link.getAttribute("href");
      if (!targetId) return;

      
      const targetSection =
        targetId === "#" ? document.body : document.querySelector(targetId);
      if (!targetSection) return;

      const itemsToReplay = [
        ...(targetSection.classList.contains("reveal") ? [targetSection] : []),
        ...targetSection.querySelectorAll(".reveal"),
      ];

      itemsToReplay.forEach((el) => {
        el.classList.remove("is-visible");
        void el.offsetWidth;
      });

      requestAnimationFrame(() => {
        setTimeout(() => {
          itemsToReplay.forEach((el) => el.classList.add("is-visible"));
        }, 120);
      });
    });
  });
});