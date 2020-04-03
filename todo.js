    // js-toDoForm 클래스 소환
const toDoForm=document.querySelector(".js-toDoForm"),
    // js-toDoForm 클래스 내 input 태그 소환
    toDoInput=toDoForm.querySelector("input"),
    // js-toDoList 클래스 소환
    toDoList=document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos=[]; 

function deleteToDo(event){
    const btn = event.target;
    // 해당하는 부모주소를 찾고, 삭제
    const lii = btn.parentNode;
    toDoList.removeChild(lii);
    // array안에 있는 모든 toDos들이 함수를 통하게됨
    // 배열 원소의 값을 걸러내어 그 결과로 새로운 배열을 만들자고 하는 경우
    const cleanToDos=toDos.filter(function(toDo){
        // 모든 toDos들이 와서 id가 true 일때만 리턴
        return toDo.id !==parseInt(lii.id);
    });
    toDos = cleanToDos;
    saveToDos();
}

function saveToDos(){
    // 자바스크립트는 local storage에 있는 모든 데이터를 string으로 저장
    // 그렇기에 JSON을 통해 object를 string으로 변환
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    // li, button, span, toObj객체 id 생성
    const li = document.createElement("li");
    const delBtn=document.createElement("button");
    const span=document.createElement("span");
    const newId = toDos.length+1
    
    // 삭제 버튼 및 클릭시 deleteToDo함수 호출
    delBtn.innerText="X";
    delBtn.addEventListener("click",deleteToDo);
    // button 안에 텍스트 넣기
    span.innerText=text;

    // li 하위에 span, butoon 생성
    li.appendChild(span);
    li.appendChild(delBtn);
    // local storage에 todo를 저장하기 위해 li에도 id생성
    li.id=newId;
    // ul 하위(js-toDolist 클래스)에 li 생성
    toDoList.appendChild(li);

    // object 생성
    const toDoObj={
        text: text,
        id:newId
    };
    toDos.push(toDoObj);

    // local storage에 저장하는 saveToDos 함수 호출
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    // input에 값을 입력하고 enter를 쳤을 때 다시 초기화.
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos!==null) {
        // loadedToDos에서 가져온 것을 자바스크립트 object로 변환
        const parsedToDos = JSON.parse(loadedToDos);
        // forEach : array에 담겨있는 것들 각각에 한번씩 함수를 실행
        // 한개씩 돌면서 무언가 하기 (함수 호출 등)
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text); 
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();