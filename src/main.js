//--------------------------------------------------------------------------------------------------
// Afficher la pop-up d'ajout de tache
document.getElementById('btn-00').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "flex"; 
    textContainer.style.scale = "1";
    textContainer.style.opacity = "1";
});
// Masquer la popUp d'ajout de tache
document.getElementById('cancelBtn').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "none";
});
//--------------------------------------------------------------------------------------------------
// Fonction pour afficher toutes les tâches sauvegardées dans le localStorage
function afficherTaches() {
    const taches = JSON.parse(localStorage.getItem("taches")) || [];
    // Réinitialiser les conteneurs de taches
    document.getElementById("taches-a-realiser").innerHTML = '';
    document.getElementById("taches-encours").innerHTML = '';
    document.getElementById("taches-accomplies").innerHTML = '';
    // Parcourir chaque tâche et l'afficher dans la section appropriée
    taches.forEach(tache => {
        afficherTache(tache);
    });
}
// Fonction pour afficher une tache specifique
function afficherTache(tache) {
    const nouvelleTache = document.createElement("div");
    nouvelleTache.classList.add("style-tache");
    nouvelleTache.innerHTML = `
        <h4>Titre de la tâche : <span>${tache.titreTache}</span></h4>
        <h5>Date d'échéance : <span>${tache.dateEcheance}</span></h5>
        <h5>Priorité de la tâche : <span>${tache.prioriteTache}</span></h5>
        <h5 class="titre-descript-tache">Description de la tâche <a href="#description-tache"><i class="fa-solid fa-caret-down"></i></a></h5>
        <div class="description-tache">
            <p>${tache.descriptionTache}</p>
        </div>
        <div class="modif-supp-section">
            <button class="modifier-tache">Modifier</button>
            <button class="supprimer-tache">Supprimer</button>
        </div>
    `;
    // Ajouter la tache dans sa section selon son statut
    if (tache.statutTache === "Tache a realiser") {
        document.getElementById("taches-a-realiser").appendChild(nouvelleTache);
    } else if (tache.statutTache === "Tache en cours") {
        document.getElementById("taches-encours").appendChild(nouvelleTache);
    } else if (tache.statutTache === "Tache accomplie") {
        document.getElementById("taches-accomplies").appendChild(nouvelleTache);
    }
}
// Enregistrement des données saisis à partir du formulaire
const formulaire = document.getElementById("formulaire-tache");
formulaire.addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    // Récupération des valeurs du formulaire
    const titreTache = document.getElementById("tit-tache").value;
    const dateEcheance = document.getElementById("ech-tache").value;
    const prioriteTache = document.getElementById("prio-tache").value;
    const descriptionTache = document.getElementById("desc-tache").value;
    const statutTache = document.getElementById("stat-tache").value;
    // Création de l'objet tache 
    const nouvelleTache = { titreTache, dateEcheance, prioriteTache, descriptionTache, statutTache };
    // Sauvegarde de la nouvelle tâche dans le localStorage
    const taches = JSON.parse(localStorage.getItem("taches")) || [];
    taches.push(nouvelleTache);
    localStorage.setItem("taches", JSON.stringify(taches));
    // Afficher la tache ajoutée
    afficherTache(nouvelleTache);
    // reinitialisation de formulaire
    formulaire.reset();
    document.getElementById("ajout-tache-Container").style.display = "none";
});
// Charger les taches sauvegardées dès chargement de la page
document.addEventListener("DOMContentLoaded", afficherTaches);

