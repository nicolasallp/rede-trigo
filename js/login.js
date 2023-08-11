const btnEntrar = document.querySelector("#btn-entrar")
const email = document.querySelector("#email")
const senha = document.querySelector("#senha")

function validar() {
    if (email.value == "" || senha.value == "") {
        alert("Preencha todos os campos");
        return;
    }
    if (email.value == "admin" && senha.value == "admin") {
        window.location.href = "index.html";
    }
    else {
        alert("Usuário ou senha inválidos");
    }
}