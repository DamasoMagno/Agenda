const toDo = document.querySelector("input");
const createToDo = document.querySelector("button");
const dateInput = document.querySelector("input[type=date]");

if (!localStorage.getItem("alert")) {
    alert("Atenção: Quando for fazer alguma alteração recarregue a página");
    localStorage.setItem("alert", true);
}

//Função para criar uma tarefa
createToDo.addEventListener("click",()=>{
    let todoID = Date.now();

    if(!toDo.value || !dateInput.value){
        return alert("Digite numeros válidos")
    }

    let toDoTeste = JSON.parse(localStorage.getItem("teste")) || [];

    toDoTeste.push({
        id: todoID,
        todo:toDo.value,
        date:dateInput.value
    })

    localStorage.setItem("teste",JSON.stringify(toDoTeste));

    let item = create(todoID)
    document.querySelector(".items").append(item);

    //Está sendo chamada escopo local para que ao ser criada a todo a mesma possa ser modificada
    updateAndDelete();
})

//Função criada com o intuito de atualizar ou apagar alguma tarefa minha
let updateAndDelete = () => {
    const button = document.querySelectorAll("span");
    button.forEach((item)=>{
        if (!item.dataset.carregado) {
            item.dataset.carregado = 1;
            
            item.addEventListener("click",()=>{
                if(item.innerHTML === "update"){
                    let update = prompt("Digite novas infomações");
                    if(update){
                        let todo = JSON.parse(localStorage.getItem("teste"));
                        let findIndex  = todo.findIndex(element => element.id === Number(item.classList[1]));
        
                        todo[findIndex].todo = update;
                        
                        return localStorage.setItem("teste",JSON.stringify(todo));
                    }else {
                        alert("Digite informações válidas");
                    }
                }
                if(item.innerHTML === "delete"){
                    let todo = JSON.parse(localStorage.getItem("teste"));
                    let find = todo.findIndex(element => element.id === Number(item.classList[1]));
                    todo.splice(find,1);
                    localStorage.setItem("teste",JSON.stringify(todo));
                }
            });        
        }
    });
}

updateAndDelete();

function create(id){
    const item = document.createElement("div");
    item.classList.add("item")

    const content = document.createElement("div");
    content.classList.add("content");

    const edit = document.createElement("div");
    edit.classList.add("edit");

    const spanDate = document.createElement("span");
    const title = document.createElement("p");
    const buttonDelete = document.createElement("span");
    const buttonUpdate = document.createElement("span");

    let data = JSON.parse(localStorage.getItem("teste"));

    data ? data.forEach(dados => {
        if (dados.id == id) {
            title.innerHTML = `${dados.todo}`;
            date = dados.date.split("-").reverse().join("/");
            spanDate.innerHTML = `${date}`;    
        }
    }) : (
        title.innerHTML = "Atividade Exemplo",
        spanDate = "20/10/2020",
        buttonDelete.classList.add(1),
        buttonUpdate.classList.add(1)
    );

    buttonDelete.classList.add(`material-icons`);
    buttonUpdate.classList.add(`material-icons`);
    buttonDelete.classList.add(`${id}`);
    buttonUpdate.classList.add(`${id}`);
    buttonUpdate.innerHTML = "update";
    buttonDelete.innerHTML = "delete";

    content.append(title);
    content.append(spanDate)
    edit.append(buttonUpdate);
    edit.append(buttonDelete);

    
    item.append(content);
    item.append(edit);

    return item;
}

window.onload = ()=>{
    let dados = JSON.parse(localStorage.getItem('teste'));
    if (dados) {
        dados.forEach(dado => {
            let item = create(dado.id);
            document.querySelector(".items").append(item);        
        });
    }
    
    updateAndDelete();
}