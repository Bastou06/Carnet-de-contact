/**
 * CARNET CONTACT
 *
 *
 */

// Récupération des éléments
let formulaire = document.querySelector("#form");
let divContact = document.querySelector(".contactList");
let select = document.getElementById("selection");
let adresse = document.getElementById("adresse");
let siren = document.getElementById("siren");

let arrayContact = [];

// Remise en format objet Javascript de mon localStorage
let lsParsed = JSON.parse(localStorage.getItem("Contact"));
// CONDITION : SI LE LOCAL STORAGE EST VIDE arrayContact = []
if (!lsParsed) {
  arrayContact = [];
} else {
  // SINON IL EST PAS VIDE arrayContact = LocalStorage.getItem
  // Définir arrayContact avec la valeur du localStorage
  arrayContact = lsParsed;
  // Lance la fonction de l'affichage des contacts
  showContact();
}

// RECUPERATION DU FORMULAIRE ET FONCTION SUBMIT

formulaire.addEventListener("submit", function (e) {
  // Annulation du rechargement de la page
  e.preventDefault();
  // Récupération des données du formulaire
  let formData = new FormData(formulaire);

  // Création du prototype GENERAL

  class Personne {
    constructor(nom, prenom, email, phone) {
      (this.nom = nom),
        (this.prenom = prenom),
        (this.email = email),
        (this.phone = phone);
    }
  }

  // Création du prototype PARTICULIER

  class ProfilPerso extends Personne {
    constructor(nom, prenom, email, phone, adressePostale) {
      super(nom, prenom, email, phone);
      this.adressePostale = adressePostale;
      this.presentation = function () {
        return `Je suis un particulier, je m'appelle ${this.prenom} ${this.nom} mon email: ${this.email} mon numéro de téléphone: ${this.phone}, mon adresse est: ${adressePostale}`;
      };
    }
  }

  // Création du prototype PROFESSIONNEL

  class ProfilPro extends Personne {
    constructor(nom, prenom, email, phone, siren) {
      super(nom, prenom, email, phone);
      this.siren = siren;
      this.presentation = function () {
        return `Je suis un professionnel, je m'appelle ${this.prenom} ${this.nom} mon email: ${this.email} mon numéro de téléphone: ${this.phone}, mon SIREN est: ${siren}`;
      };
    }
  }

  // TEST

  let contact;

  if (select.value === "1") {
    contact = new ProfilPerso(
      formData.get("nom"),
      formData.get("prenom"),
      formData.get("email"),
      formData.get("phone"),
      formData.get("adressePostale")
    );
  } else if (select.value === "2") {
    contact = new ProfilPro(
      formData.get("nom"),
      formData.get("prenom"),
      formData.get("email"),
      formData.get("phone"),
      formData.get("siren")
    );
  } else false;

  // Envoi de l'objet contact dans le tableau avec la méthode push

  arrayContact.push(contact);

  console.table(arrayContact);

  // Enregistrement du tableau dans le local storage
  localStorage.setItem("Contact", JSON.stringify(arrayContact));

  // Récupération du tableau dans le local storage
  let recupContact = localStorage.getItem("Contact");

  console.log("recupContact: ", JSON.parse(recupContact));

  // Appel de la fonction showContact
  showContact();
});

// Création de la fonction show contact avec la méthode forEach
function showContact() {
  // Création d'une variable content
  let content = "";

  arrayContact.forEach(function (element, index) {
    // Ajout à la variable content de mon élément
    content += `<p>${element.presentation()} <br> <button class="deleteButton">Supprimer</button></p> `;
  });

  divContact.innerHTML = content;

  let deleteButton = document.querySelectorAll(".deleteButton");

  deleteButton.forEach(function (button, index) {
    button.addEventListener("click", function () {
      arrayContact.splice(index, 1);

      // Application du local storage au bouton delete
      localStorage.setItem("Contact", JSON.stringify(arrayContact));

      let recupContact = localStorage.getItem("Contact");

      console.log("recupContact: ", JSON.parse(recupContact));

      showContact();
    });
  });
}

// CREATION DE LA CONDITION PRO/PERSO

select.addEventListener("change", function (event) {
  if (event.target.value === "1") {
    adresse.style.display = "block";
  } else {
    adresse.style.display = "none";
  }
  if (event.target.value === "2") {
    siren.style.display = "block";
  } else {
    siren.style.display = "none";
  }
});
