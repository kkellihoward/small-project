function addDisplay() {
    document.getElementById("addContactDisplay").style.display = 'flex';
    document.getElementById("searchResults").style.display = 'none';
    document.getElementById("addDisplayButton").style.background = "#f2a5a2"
    document.getElementById("searchDisplayButton").style.background = "#f34841"
    document.getElementById("addDisplayButton").style.opacity = "50%"
    document.getElementById("searchDisplayButton").style.opacity = "100%"
}

function searchDisplay() {
    document.getElementById("searchResults").style.display = 'flex';
    document.getElementById("addContactDisplay").style.display = 'none';
    document.getElementById("addDisplayButton").style.background = "#f34841"
    document.getElementById("searchDisplayButton").style.background = "#f2a5a2"
    document.getElementById("searchDisplayButton").style.opacity = "50%"
    document.getElementById("addDisplayButton").style.opacity = "100%"

}

function backToSearch() {
    document.getElementById("contactContainer").style.display = 'none';
    document.getElementById("addSearchDisplay").style.display = 'contents';    
}