const myForm = document.getElementById('cadastrar');

myForm.addEventListener('submit', function (event) {

    event.preventDefault();
    fetch('https://localhost:7095/pessoa', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            nome: document.getElementById("nome").value,
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value,
        }),
    })
      
    .then(response => response.json())
    .then(data => {

        console.log("Sucesso:", data);

        alert("Conta criada com sucesso!");

        myForm.reset();

    })
    .catch(error => {
       
    });

});


