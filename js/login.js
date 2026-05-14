const myForm = document.getElementById('login');

myForm.addEventListener('submit', function (event) {

    event.preventDefault();

    fetch('http://localhost:5098/pessoa/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },

        body: JSON.stringify({
            email: document.getElementById("email").value,
             senha: document.getElementById("senha").value,
        }),
    })

    .then(response => response.json())
        .then(data => {
            window.location.href="index.html";
        })
      window
    });


