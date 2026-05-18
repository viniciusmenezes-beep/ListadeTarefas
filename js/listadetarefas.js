
document.addEventListener("DOMContentLoaded", function () {
   
    fetch('https://localhost:7095/tarefa/Amostrar/',{  credentials:"include"
})

     
    .then(response => response.json())
        .then(data => {
            console.log (data);

           var resposta = document.getElementById("listadetarefas");
           resposta.innerHTML ="<h4>Segue Lista de Tarefas</h4> ";      

         for (let i = 0; i < data.length; i++) {

    resposta.innerHTML += `
        <ul>
            <li>
                Descrição: ${data[i].tarefa}
                <button onclick="apagarTarefa(${data[i].id})">
                    apagar
                </button>
                <select name="" id="status">
                    <option disabled selected>Status</option>
                    <option>Afazer</option>
                    <option>Feito</option>
                </select>
            </li>
        </ul>
    `;
}
    var resposta = document.getElementById("nome");
           resposta.innerHTML =data[0].pessoa;         
        })


});



function apagarTarefa(id) {

    fetch(`https://localhost:7095/tarefa/Deletar/${id}`, {
        method: "DELETE",
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Erro ao apagar tarefa");
        }
        return response.text(); 
    })
    .then(() => {
        alert("Tarefa apagada com sucesso!");

      
        carregarTarefas();
    })
    .catch(error => {
        console.error(error);
        alert("Erro ao apagar tarefa");
    });
}


