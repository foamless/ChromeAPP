const body=document.querySelector("body");

const IMG_NUMBER=5;

function paintImage(imgNumber){
    // html imgae 삽입.
    // 새로운 object Image 만들기.
    const image = new Image();
    // 0~IMG_NUMBER 이기에 +1 
    image.src=`images/${imgNumber+1}.jpg`;
    image.classList.add("bgImage");
    body.appendChild(image);
}

function genRandom(){
	// floor (소수점 제거)
    const number =Math.floor(Math.random()*IMG_NUMBER);
    return number;
}

function init(){
    const randomNumber = genRandom();
    paintImage(randomNumber)
}

init();