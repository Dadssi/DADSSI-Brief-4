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

