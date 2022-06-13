// EXEMPLE HERITAGE PROTOTYPE

function Voiture(marque) {
  this.marque = marque;
  this.roues = 4;
}

function Camion(marque, consomation) {
  // Mettre le this à l'interieur du .call pour récupérer le contexte
  Voiture.call(this, marque);
  this.ptac = 1500;
  this.consomation = consomation;
}

let camion = new Camion("Iveco", 150);

let camion2 = new Camion("Mercedes", 70);

console.log(camion);
console.log(camion2);

/*
 * Prototype: Un objet servant de "modèle parent" à de nouveaux objects
 * et donnant accès à ses propriétés et méthodes.
 */

/*************************************************/
/* 1. Utiliser un objet existant comme Prototype */
/*************************************************/

// L'objet utilisateur1 existant
let utilisateur1 = {
  username: "Jean",
  email: "j@lebocal.academy",
  admin: false,
  presentation: function () {
    console.log("coucou je suis " + this.username);
  },
};

// On crée un nouvel objet utilisateur 2 en utilisant utilisateur1 comme Prototype
let utilisateur2 = Object.create(utilisateur1);

// L'objet utilisateur2 n'a aucune propriété qui lui est propre
console.log("UTILISATEUR2", utilisateur2);

// Pour lui attribuer un username et un email, il faut lui ajouter ces propriétés (surcharge)
utilisateur2.username = "Michel";
utilisateur2.email = "m@lebocal.academy";

// L'objet utilisateur2 possède 2 propriétés
console.log("UTILISATEUR2 AJOUT", utilisateur2);

// - utilisateur1 est un objet existant précédement ET un Prototype
// - utilisateur2 est un objet créé à partir du Prototype utilisateur 1
// - Le Prototype utilisateur1 n'a PAS de constructeur. Il n'y a pas de fonction permettant
//   de construire de nouveaux objets utilisateurs basés sur utilisateur 1

/**********************************************/
/* 2. Créer un constructeur (et un prototype) */
/**********************************************/

// Fonction constructeur
function Utilisateur(username, email) {
  this.username = username; // Cette propriété appartiendra directement à l'objet créé (et pas au prototype)
  this.email = email; // Cette propriété appartiendra directement à l'objet créé (et pas au prototype)
}

// On obtient un Prototype créé automatiquement et accessible via Constructeur.prototype
console.log("PROTO VIDE", Utilisateur.prototype);

// Pour lui ajouter des propriétés, il faut le modifier comme n'importe quel objet
Utilisateur.prototype.admin = false; // Cette propriété appartient au prototype
Utilisateur.prototype.presentation = function () {
  console.log("coucou je suis " + this.username);
}; // Cette propriété appartient au prototype

// On créer un nouvel objet utilisateur3 avec la fonction Utilisateur (constructeur)
let utilisateur3 = new Utilisateur("Paul", "p@lebocal.academy");

// On constate que l'objet utilisateur possède ses proriétés et a accès aux propriétés de son prototype
console.log("UTILISATEUR3", utilisateur3);
console.log("UTILISATEUR3 ADMIN", utilisateur3.admin);
utilisateur3.presentation();
