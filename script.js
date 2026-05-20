const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const toast = document.querySelector(".toast");
const counters = document.querySelectorAll("[data-count]");
const reveals = document.querySelectorAll(".reveal");
const form = document.querySelector(".contact-form");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
  });
});

form?.addEventListener("submit", (event) => {
  event.preventDefault();
  showToast("문의가 접수되었습니다. 실제 배포 시 수신처를 연결하세요.");
  form.reset();
});

const animateCount = (element) => {
  const target = Number(element.dataset.count || 0);
  const duration = 1200;
  const startTime = performance.now();

  const tick = (time) => {
    const progress = Math.min((time - startTime) / duration, 1);
    const value = Math.floor(target * (0.2 + progress * 0.8));
    element.textContent = Intl.NumberFormat("ko-KR").format(Math.min(value, target));
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      element.textContent = Intl.NumberFormat("ko-KR").format(target);
    }
  };

  requestAnimationFrame(tick);
};

const counterObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

counters.forEach((counter) => counterObserver.observe(counter));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

reveals.forEach((element) => revealObserver.observe(element));
