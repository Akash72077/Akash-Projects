// Simple example for testing login button clicks
document.addEventListener("DOMContentLoaded", () => {
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Login functionality to be implemented! 🚀");
    });
  });
});
