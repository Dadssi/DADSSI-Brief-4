//--------------------------------------------------------------------------------------------------
// Fonction pour générer un ID Unique à chaque tâche ajoutée pour qu'on puisse la référencer au moment de suppression ou de recherche
function genererIdUnique() {
    return "tache-" + Date.now() + "-" + Math.floor(Math.random() * 1000);
}

//--------------------------------------------------------------------------------------------------
// Afficher la pop-up d'ajout de tâche
document.getElementById('btn-00').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "flex";
    textContainer.style.scale = "1";
    textContainer.style.opacity = "1";
});

// Masquer la pop-up d'ajout de tâche
document.getElementById('cancelBtn').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "none";
});

// Variable pour stocker l'ID de la tâche à modifier (null si on ajoute une nouvelle tâche)
let tacheEnCoursModification = null;

//--------------------------------------------------------------------------------------------------
// Fonction pour afficher toutes les tâches sauvegardées dans le localStorage
function afficherTaches() {
    const taches = JSON.parse(localStorage.getItem("taches")) || [];
    document.getElementById("taches-a-realiser").innerHTML = '';
    document.getElementById("taches-encours").innerHTML = '';
    document.getElementById("taches-accomplies").innerHTML = '';

    taches.forEach(tache => {
        afficherTache(tache);
    });
}

// Fonction pour afficher une tâche spécifique
function afficherTache(tache) {
    const nouvelleTache = document.createElement("div");
    nouvelleTache.classList.add("style-tache");
    nouvelleTache.setAttribute("data-id", tache.id); // Ajouter l'ID comme attribut
    nouvelleTache.setAttribute("draggable", "true"); // Rendre la tâche draggable

    // Définir la bordure en fonction de la priorité
    let bordureCouleur = "";
    if (tache.prioriteTache === "Haute") {
        bordureCouleur = "red";
    } else if (tache.prioriteTache === "Moyenne") {
        bordureCouleur = "orange";
    } else if (tache.prioriteTache === "Basse") {
        bordureCouleur = "green";
    }
    nouvelleTache.style.border = `1px solid ${bordureCouleur}`;

    nouvelleTache.innerHTML = `
        <h4>Titre de la tâche : <span id="titre-tache">${tache.titreTache}</span></h4>
        <h5>Date d'échéance : <span id="deadline">${tache.dateEcheance}</span></h5>
        <h5>Priorité de la tâche : <span id="priorite">${tache.prioriteTache}</span></h5>
        <h5 class="titre-descript-tache">Description de la tâche <a href="#description-tache"><i class="fa-solid fa-caret-down"></i></a></h5>
        <div>
            <p id="description-tache">${tache.descriptionTache}</p>
        </div>
        <div class="modif-supp-section">
            <button id="modifier-tache">Modifier</button>
            <button id="supprimer-tache">Supprimer</button>
        </div>
    `;

    // Ajouter les événements de drag & drop pour la tâche
    nouvelleTache.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text/plain", tache.id);
    });

    if (tache.statutTache === "Tache a realiser") {
        document.getElementById("taches-a-realiser").appendChild(nouvelleTache);
    } else if (tache.statutTache === "Tache en cours") {
        document.getElementById("taches-encours").appendChild(nouvelleTache);
    } else if (tache.statutTache === "Tache accomplie") {
        document.getElementById("taches-accomplies").appendChild(nouvelleTache);
    }

    // Ajouter l'option de suppression de tâche
    nouvelleTache.querySelector("#supprimer-tache").addEventListener("click", function(){
        supprimerTache(tache.id);
    });

    // Ajouter l'option de modification de tâche
    nouvelleTache.querySelector("#modifier-tache").addEventListener("click", function(){
        modifierTache(tache.id);
    });
}

//--------------------------------------------------------------------------------------------------
// Fonction pour supprimer une tâche
function supprimerTache(id) {
    let taches = JSON.parse(localStorage.getItem("taches")) || [];
    taches = taches.filter(tache => tache.id !== id); // Filtrer pour conserver toutes les taches sauf celle à supprimer
    localStorage.setItem("taches", JSON.stringify(taches));
    afficherTaches();
}

// Fonction pour pré-remplir le formulaire pour la modification d'une tâche
function modifierTache(id) {
    const taches = JSON.parse(localStorage.getItem("taches")) || [];
    const tache = taches.find(t => t.id === id);

    if (tache) {
        // Remplir le formulaire avec les valeurs de la tâche à modifier
        document.getElementById("tit-tache").value = tache.titreTache;
        document.getElementById("ech-tache").value = tache.dateEcheance;
        document.getElementById("prio-tache").value = tache.prioriteTache;
        document.getElementById("desc-tache").value = tache.descriptionTache;
        document.getElementById("stat-tache").value = tache.statutTache;

        // Stocker l'ID de la tâche pour la modification
        tacheEnCoursModification = id;

        // Afficher la pop-up de modification
        const textContainer = document.getElementById('ajout-tache-Container');
        textContainer.style.display = "flex";
    }
}

//--------------------------------------------------------------------------------------------------
// Enregistrement des données saisies à partir du formulaire
const formulaire = document.getElementById("formulaire-tache");
formulaire.addEventListener("submit", function(event) {
    event.preventDefault();

    // Récupération des valeurs du formulaire
    const titreTache = document.getElementById("tit-tache").value;
    const dateEcheance = document.getElementById("ech-tache").value;
    const prioriteTache = document.getElementById("prio-tache").value;
    const descriptionTache = document.getElementById("desc-tache").value;
    const statutTache = document.getElementById("stat-tache").value;

    // Si une tâche est en cours de modification, mettre à jour ses informations
    if (tacheEnCoursModification) {
        let taches = JSON.parse(localStorage.getItem("taches")) || [];
        const index = taches.findIndex(t => t.id === tacheEnCoursModification);

        if (index !== -1) {
            taches[index] = {
                ...taches[index],
                titreTache,
                dateEcheance,
                prioriteTache,
                descriptionTache,
                statutTache
            };
        }
        localStorage.setItem("taches", JSON.stringify(taches));
        tacheEnCoursModification = null; // Réinitialiser l'ID de modification
    } else {
        // Sinon, ajouter une nouvelle tâche
        const nouvelleTache = { 
            id: genererIdUnique(),
            titreTache,
            dateEcheance,
            prioriteTache,
            descriptionTache,
            statutTache
        };

        const taches = JSON.parse(localStorage.getItem("taches")) || [];
        taches.push(nouvelleTache);
        localStorage.setItem("taches", JSON.stringify(taches));
        afficherTache(nouvelleTache);
    }

    // Réinitialisation du formulaire
    formulaire.reset();
    document.getElementById("ajout-tache-Container").style.display = "none";
    afficherTaches();
});

//--------------------------------------------------------------------------------------------------
// Charger les tâches sauvegardées dès le chargement de la page
document.addEventListener("DOMContentLoaded", afficherTaches);

//--------------------------------------------------------------------------------------------------
// Gestion des événements de drag and drop pour les colonnes de tâches
["taches-a-realiser", "taches-encours", "taches-accomplies"].forEach(statutId => {
    const colonne = document.getElementById(statutId);

    colonne.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    colonne.addEventListener("drop", function(event) {
        event.preventDefault();
        const tacheId = event.dataTransfer.getData("text/plain");
        let taches = JSON.parse(localStorage.getItem("taches")) || [];
        const tache = taches.find(t => t.id === tacheId);

        if (tache) {
            if (statutId === "taches-a-realiser") {
                tache.statutTache = "Tache a realiser";
            } else if (statutId === "taches-encours") {
                tache.statutTache = "Tache en cours";
            } else if (statutId === "taches-accomplies") {
                tache.statutTache = "Tache accomplie";
            }
            localStorage.setItem("taches", JSON.stringify(taches));
            afficherTaches();
        }
    });
});
