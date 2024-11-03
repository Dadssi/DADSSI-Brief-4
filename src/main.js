document.getElementById('btn-00').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "flex"; 
    textContainer.style.scale = "1";
    textContainer.style.opacity = "1";
});
// l'apparition de la pop Up d'ajout d'une tache
document.getElementById('cancelBtn').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "none";
});
// ----------------------------------------------------------------------------------------------------------------
const formulaire = document.getElementById("formulaire-tache");
formulaire.addEventListener("submit", function(event){
    event.preventDefault(); // c'est juste pour arreter le chargement de la page
    // Récupération des valeurs du formulaire
    const titreTache = document.getElementById("tit-tache").value;
    const dateEcheance = document.getElementById("ech-tache").value;
    const prioriteTache = document.getElementById("prio-tache").value;
    const descriptionTache = document.getElementById("desc-tache").value;
    const statutTache = document.getElementById("stat-tache").value;
    // création d'une nouvelle tache
    const nouvelleTache = document.createElement("div");
    nouvelleTache.classList.add("style-tache");
    nouvelleTache.innerHTML = `
        <h4>Titre de la tâche : <span id="titre-tache">${titreTache}</span></h4>
        <h5>Date d'échéance : <span id="deadline">${dateEcheance}</span></h5>
        <h5>Priorité de la tâche : <span id="priorité">${prioriteTache}</span></h5>
        <h5 class="titre-descript-tache">Description de la tâche <a href="#description-tache"><i class="fa-solid fa-caret-down"></i></a></h5>
        <div id="description-tache">
            <p>${descriptionTache}</p>
        </div>
        <div class="modif-supp-section">
            <button id="modifier-tache">Modifier</button>
            <button id="supprimer-tache">Suprrimer</button>
        </div>
    `;
    // ajouter la condition pour positionner la tache selon son statut
    if (statutTache === "Tache a realiser"){
        document.getElementById("taches-a-realiser").appendChild(nouvelleTache);
    } else if (statutTache === "Tache en cours"){
        document.getElementById("taches-encours").appendChild(nouvelleTache)
    } else if (statutTache === "Tache accomplie"){
        document.getElementById("taches-accomplies").appendChild(nouvelleTache)
    };
    formulaire.reset();
});


