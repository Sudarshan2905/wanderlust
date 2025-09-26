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


// taxSwitch 
    let taxSwitch = document.getElementById("switchCheckDefault");
    taxSwitch.addEventListener("click",()=>{
        console.log("CLicked");
        let tax_info=document.getElementsByClassName("tax-info");
        for(info of tax_info){
            if(info.style.display!="inline"){
            info.style.display="inline";
            }
            else{
                info.style.display="none";
            }
        }
    })

// filters-category icon
  const filters = document.querySelectorAll("#filters .filter");

  filters.forEach(filter => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-category");
      // Navigate to listings with the selected category
      window.location.href = `/listings?category=${category}`;
    });
  });


