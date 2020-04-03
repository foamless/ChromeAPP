const title=document.querySelector("#titlee");

const CLICKED_CLASS = "clicked";

function handleClick(){
    title.classList.toggle(CLICKED_CLASS);
    // const hasCalss = title.classList.contains(CLICKED_CLASS)
    // if(!hasCalss){
    //     title.classList.add(CLICKED_CLASS);
    // } else{
    //     title.classList.remove(CLICKED_CLASS);
    // }
}

function init(){
    title.addEventListener("click", handleClick);
}

init();
