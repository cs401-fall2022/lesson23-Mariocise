function populateDeleteFields(idStr) {
    let id = idStr.substring(16);

    document.getElementById("delete-id").value = id;
}