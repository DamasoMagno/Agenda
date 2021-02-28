const todoField = document.querySelector("input");
const createToDo = document.querySelector("button");
const dateInput = document.querySelector("input[type=date]");

createToDo.addEventListener("click",()=>{
    const id = Date.now();

    if(!todoField.value || !dateInput.value){
        return alert("Você está tentando criar um tarefa sem nenhum valor!")
    }

    const dateFormatted = dateInput.value.split("-").reverse().join("/");

    console.log(dateFormatted);

    let TODO = JSON.parse(localStorage.getItem("todo")) || [];

    TODO.push({
        id:id,
        title:todoField.value,
        date:dateFormatted
    });

    localStorage.setItem("todo",JSON.stringify(TODO));

    const item = createItem(id);
    document.querySelector(".items").append(item)

    todoField.value = "";
    dateInput.value = "";

    deleteItem(id);
    updateItem(id);
});

function updateItem(id){
    let buttonUpdate = document.querySelector(`.UPDATE-${id}`);

    let idButton = buttonUpdate .classList[1].split("-");
    idButton = Number(idButton[1]);

    buttonUpdate.addEventListener("click",()=>{
        let TODOs = JSON.parse(localStorage.getItem("todo"));
        TODOs.forEach( (TODO,index) => {
            if(idButton === TODO.id){
                let newTODO = prompt("Digite um novo nome");
                alert("Digite uma data estilo 12/02/2021");
                let newDate = prompt("Digite uma nova data");

                let divFather = buttonUpdate.parentElement.parentElement;

                if(newTODO){
                    TODOs[index].title = newTODO;
                    divFather.querySelector(".content p").innerHTML = newTODO;
                }

                if(newDate){
                    TODOs[index].date = newDate;
                    divFather.querySelector(".content span").innerHTML = newDate;
                }

                localStorage.setItem("todo",JSON.stringify(TODOs));
            }
        });
    })
}


function deleteItem(id){
    let buttonDelete = document.querySelector(`.DELETE-${id}`);
    
    let idButton = buttonDelete.classList[1].split("-");
    idButton = Number(idButton[1]);
    
    buttonDelete.addEventListener("click",()=>{
        let TODOs = JSON.parse(localStorage.getItem("todo"));
        TODOs.forEach( (TODO,index) => {
            if(idButton === TODO.id){
                TODOs.splice(index,1);
                localStorage.setItem("todo",JSON.stringify(TODOs));
                buttonDelete.parentElement.parentElement.remove();
            }
        });
    });
}

function createItem(id){
    const item = document.createElement("div");
    item.classList.add("item")

    const content = document.createElement("div");
    content.classList.add("content");

    const edit = document.createElement("div");
    edit.classList.add("edit");

    const title = document.createElement("p");
    const date = document.createElement("span");

    const buttonDelete = document.createElement("span");
    const buttonUpdate = document.createElement("span");

    const TODO = JSON.parse(localStorage.getItem("todo"));
    TODO.forEach(dados => {
        if(dados.id === id){
            title.innerHTML = `${dados.title}`;
            const currentDate = new Date().toLocaleDateString("pt-Br");

            if(currentDate == dados.date){
                item.classList.add("favorite");
            }

            date.innerHTML = `${dados.date}`;   
        } 
    });

    buttonDelete.classList.add(`material-icons`);
    buttonUpdate.classList.add(`material-icons`);

    buttonDelete.classList.add(`DELETE-${id}`);
    buttonUpdate.classList.add(`UPDATE-${id}`);

    buttonDelete.innerHTML = "delete";
    buttonUpdate.innerHTML = "edit";

    content.append(title);
    content.append(date);

    edit.append(buttonUpdate);
    edit.append(buttonDelete);
    
    item.append(content);
    item.append(edit);

    return item;
}

window.onload = () => {
    let TODO = JSON.parse(localStorage.getItem('todo'));

    if (TODO) {
        TODO.forEach(dado => {
            let item = createItem(dado.id);
            document.querySelector(".items").append(item);        
            deleteItem(dado.id);
            updateItem(dado.id);
        });
    }

}