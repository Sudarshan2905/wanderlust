// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()

// filters-category icon
  const filters = document.querySelectorAll("#filters .filter");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-category");
      // Navigate to listings with the selected category
      window.location.href = `/listings?category=${category}`;
    });
  });


