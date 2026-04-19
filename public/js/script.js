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

