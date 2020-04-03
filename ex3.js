const title=document.querySelector("#title");

function handleclick() {
    title.style.color="red";
}

title.addEventListener("click", handleclick);