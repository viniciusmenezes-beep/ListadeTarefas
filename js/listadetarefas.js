document.addEventListener("DOMContentLoaded", function () {

    fetch('https://localhost:7095/tarefa/reservas/', {
        credentials: "include"
    })

    .then(response => response.json())

    .then(data => {

        console.log(data);

        var resposta = document.getElementById("listadetarefas");

        resposta.innerHTML = "<h4>Segue Lista de Tarefas</h4>";

        for (let i = 0; i < data.length; i++) {

            resposta.innerHTML += `
            
            <div>

                Tarefa:
                
                <input 
                    type="text" 
                    id="Descricao${data[i].id}"
                    value="${data[i].tarefa}"
                >
                status:
                 <input 
                    type="text" 
                    id="Statuss${data[i].id}"
                    value="${data[i].statuss}"
                >

        
                <button onclick="apagarTarefa(${data[i].id})">
                    apagar
                </button>

                <button onclick="editarReserva(${data[i].id})">
                    editar
                </button>

            </div>
            
            `;
        }

        var nome = document.getElementById("nome");
        nome.innerHTML = "Olá " + data[0].pessoa + 
        "    ";

    });

});

function apagarTarefa(id) {

    console.log(id);

    fetch('https://localhost:7095/tarefa/Deletar/' + id, {

        method: "DELETE",
        credentials: "include"

    })

    .then(async response => {

        console.log(response.status);

        const texto = await response.text();

        console.log(texto);

        if(response.ok){
            location.reload();
        }

    })

    .catch(error => console.log(error));

}



function editarReserva(idTarefa) {
console.log(idTarefa);
    fetch('https://localhost:7095/tarefa/Atualizar/' + idTarefa, {

        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({

            descricao: document.getElementById("Descricao"+idTarefa).value,
            statuss: document.getElementById("Statuss"+idTarefa).value

        }),

    })

    .then(response => response.text())

  

}

function logout() {
    fetch('https://localhost:7095/pessoa/logout/', { 
        credentials: 'include' })
        .then(response => {
            console.log(response);
            window.location.href = "login.html"
        })
}