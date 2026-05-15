const myForm = document.getElementById('login');

myForm.addEventListener('submit', function (event) {

    event.preventDefault();

    fetch('https://localhost:7095/pessoa/login', {
        method: 'POST',
        credentials:'include',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            nome:"vini",
            email: document.getElementById("email").value,
            senha: document.getElementById("senha").value
        }),
    })

    .then(response => response.text())
        .then(data => {
          
             window.location.href="index.html";
        })
    
    });


