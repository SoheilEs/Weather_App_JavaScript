const modal = document.querySelector("#modal")
const modalCloseBtn = document.getElementById("modal-btn")
const modalText = modal.querySelector("p")

const showModal = (text) => {
    modalText.innerText = text 
    modal.style.display = "flex";
}
const removeModal = () => {
    modal.style.display = "none";
}

modalCloseBtn.addEventListener("click", removeModal)

