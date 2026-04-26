// enhancement
// const menu = document.getElementById('menu');
// const mobileNav = document.getElementById('mobileNav');

// menu.addEventListener('click', () => {
//   mobileNav.classList.toggle('open');
// });


// const form = document.querySelector(".reactie-form");

// if (form) {
//     form.addEventListener("submit", async function (event) {
//         event.preventDefault();

//         const formData = new FormData(form);

//         try {
//             await fetch("/reacties", {
//                 method: "POST",
//                 body: formData
//             });

//             // check of er al een message is
//             const existingMessage = document.querySelector(".success-message-outer");

//             if (!existingMessage) {
//                 const message = document.createElement("div");
//                 message.classList.add("success-message-outer");
//                 message.innerHTML = `<p class="success-message">Je reactie is geplaatst!</p>`;
//                 form.parentElement.prepend(message);
//             }

//             form.reset();

//         } catch (error) {
//             alert("Er ging iets mis");
//         }
//     });
// }

console.log("JS loaded");
const reactieForm = document.querySelector("#reactieForm")

if (reactieForm) {
    const formButton = document.querySelector("#formButton")
    const reacties = document.querySelector("#comments")

    reactieForm.addEventListener("submit", async function (event) {
        console.log("SUBMIT START");

        event.preventDefault()

        formButton.classList.add("loading")

        let formData = new FormData (reactieForm);

        console.log("FINAL URL:", reactieForm.action);
        
        const response = await fetch("/reacties", {
            method: "POST",
            body: new URLSearchParams(formData)
        });

        console.log("FETCH DONE");
        
        const responseData = await response.text()
        console.log(responseData);

        const parser = new DOMParser ()
        const responseDOM = parser.parseFromString(responseData, 'text/html')

        const newState = responseDOM.querySelector ('#comments')
        console.log(newState.innerHTML);

        reacties.innerHTML = newState.innerHTML

        reactieForm.reset();

        console.log("Loading state weghalen")
        formButton.classList.remove("loading")

        formButton.classList.add("success")
        formButton.textContent = "Geplaatst!"

        setTimeout(() => {
            formButton.classList.remove("success")
            formButton.textContent = "Reageer"
        }, 2200);
    })
}

// FILTER (progressive enhancement)
const filterLinks = document.querySelectorAll('.filter-link')
const cardsContainer = document.querySelector('.cards-medium')

if (filterLinks.length && cardsContainer) {

    filterLinks.forEach(link => {
        link.addEventListener('click', async (e) => {
            e.preventDefault()

            const url = link.getAttribute('href')

            // active state
            filterLinks.forEach(filterLink => { 
                filterLink.classList.remove('active')
            })
            
            link.classList.add('active')

            // Nieuwe content ophalen van server
            const response = await fetch(url)
            const html = await response.text()

            // HTML omzetten naar DOM zodat we kunnen selecteren
            const parser = new DOMParser()
            const newDOM = parser.parseFromString(html, 'text/html')

            // Alleen de cards vervangen
            const newCards = newDOM.querySelector('.cards-medium')

            cardsContainer.innerHTML = newCards.innerHTML

            // URL updaten
            history.pushState(null, '', url)
        })
    })

    // back/forward support
    window.addEventListener('popstate', async () => {
        const response = await fetch(window.location.href)
        const html = await response.text()

        const parser = new DOMParser()
        const newDOM = parser.parseFromString(html, 'text/html')

        const newCards = newDOM.querySelector('.cards-medium')

        cardsContainer.innerHTML = newCards.innerHTML

        // active fix bij back button
        const currentUrl = window.location.href
    })
}

const images = document.querySelectorAll(".text-detail img");

images.forEach((imageElement) => {
  if (imageElement.complete) {
    imageElement.classList.add("loaded");
  } else {
    imageElement.addEventListener("load", () => {
      imageElement.classList.add("loaded");
    });
  }
});


// const images = document.querySelectorAll(".text-detail img");

// images.forEach(img => {
//   let src = img.src;
//   const alt = img.alt || "";

//   // haal query params weg
//   src = src.split("?")[0];

//   // haal .jpg/.png weg
//   src = src.replace(/\.(jpg|jpeg|png|webp)$/i, "");

//   img.outerHTML = `
//     <picture>
//       <source type="image/webp" srcset="${src}?format=webp">
//       <img src="${img.src}" alt="${alt}">
//     </picture>
//   `;
// });