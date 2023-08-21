document.addEventListener("DOMContentLoaded", () => {
  fetchpets();
});

function fetchpets() {
  fetch("/api/v1/pets")
    .then((res) => res.json())
    .then((data) => {
      displayPets(data);
    })
    .catch((err) => console.log(err));
}

function displayPets(pets) {
  const petContainer = document.createElement("div");
  petContainer.setAttribute("class", "pet-container");

  pets.forEach((pet) => {
    const petInfo = document.createElement("div");
    petInfo.setAttribute("class", "pet-info");

    petInfo.innerHTML = `
            <h2>${pet.name}</h2>
            <p>Breed: ${pet.breed}</p>
            <p>Age: ${pet.age}</p>
            <p>Owner: ${pet.owner}</p>
            <p>Telephone: ${pet.telephone}</p>
            <p>Appointments:</p>
            <ul>
                ${pet.appointments
                  .map(
                    (appointment) =>
                      `<li>${appointment.date} at ${appointment.time}: ${appointment.reason}</li>`
                  )
                  .join("")}
            </ul>
        `;

    petContainer.appendChild(petInfo);
  });

  document.body.appendChild(petContainer);
}
