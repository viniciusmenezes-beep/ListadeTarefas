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
                    id="descricao${data[i].id}"
                    value="${data[i].tarefa}"
                >

                <select>
                    <option disabled selected>Status</option>
                    <option>Afazer</option>
                    <option>Feito</option>
                </select>

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

        nome.innerHTML = "Olá " + data[0].pessoa+ " <button id='Logout'>Sair</button>";

    });

});

function apagarTarefa(id) {

    fetch('https://localhost:7095/tarefa/' + id, {

        method: "DELETE",
        credentials: "include"

    })

    .then();

}

function editarReserva(idTarefa) {

    fetch('https://localhost:7095/tarefa/' + idTarefa, {

        method: 'PUT',

        credentials: 'include',

        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({

            descricao: document.getElementById("descricao" + idTarefa).value,

        }),

    })

    .then(response => response.text())

    .then(data => {

        console.log(data);

        location.reload();

    });

}