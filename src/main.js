// l'apparition de la pop Up d'ajout d'une tache
document.getElementById('btn-00').addEventListener('click', function() {
    console.log("hello");
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "flex"; 
});
// l'apparition de la pop Up d'ajout d'une tache
document.getElementById('cancelBtn').addEventListener('click', function() {
    const textContainer = document.getElementById('ajout-tache-Container');
    textContainer.style.display = "none";
});

