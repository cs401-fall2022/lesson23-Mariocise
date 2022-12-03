function populateEditFields(idStr) {
    let id = idStr.substring(14);
    // console.log("Entry ID is "+id);
    let title = document.getElementById("title-"+id).textContent;
    // console.log(title);
    let entry = document.getElementById("entry-"+id).textContent;

    document.getElementById("edit-title").value = title;
    document.getElementById("edit-entry").textContent = entry;
    document.getElementById("edit-id").value = id;
}