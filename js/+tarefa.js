const myForm = document.getElementById('Cadastrar');
myForm.addEventListener('submit', function (event) {
   
    event.preventDefault();
       fetch('https://localhost:7095/tarefa/Cadastrar', {
        method: 'POST', 
          credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Descricao: document.getElementById("Descricao").value,
            Statuss: "Afazer"
           
        }),
    }).
        then(response => response.text())
            .then(data => {
            console.log("Sucesso:", data);
            alert("Conta criada com sucesso!");
            myForm.reset();
    })
});




