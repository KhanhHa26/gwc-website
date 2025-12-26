document.documentElement.style.scrollBehavior = "smooth";

const forms = document.querySelectorAll("form[data-form-type]");
const toast = document.getElementById("form-toast");

forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const formType = form.dataset.formType;
    const formData = new FormData(form);
    const name = formData.get("teamLead") || formData.get("name") || "there";
    showToast(
      `${capitalize(
        formType
      )} received — thanks, ${name}! We will email you shortly.`
    );
    form.reset();
  });
});

function showToast(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  toast.classList.add("visible");
  setTimeout(() => toast.classList.remove("visible"), 4000);
}

function capitalize(str = "") {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
