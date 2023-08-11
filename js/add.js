const imgDiv = document.querySelector('#imgDiv');
let imgFile = "";

function uploadImage() {
    let fileInput = document.querySelector("#imageInput");
    let file = fileInput.files[0];

    let reader = new FileReader();
    reader.onload = function (event) {
      let img = document.querySelector('#image');
      img.src = event.target.result;
      img.style.display = 'block';
    }
  reader.readAsDataURL(file);
  imgFile = file.name;
}

function addProduto() {
  produtoArr.push("")
  produtos.push(
    
  )
}
// rsrs
function formatarNumero(event) {
  let numero = document.getElementById('preco').value;

  // Remove caracteres não numéricos
  numero = numero.replace(/\D/g, '');

  // Limita o número a 5 dígitos (já contando a casa decimal)
  if (numero.length > 5) {
    numero = numero.substr(0, 5);
  }

  // Converte para o formato BRL e deixa com casa decimal
  const valor = parseFloat(numero) / 100;
  const numeroFormatado = valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  // Atualiza o valor dentro do input
  document.getElementById('preco').value = numeroFormatado;

  // Retorna o valor numérico formatado
  return parseFloat(numeroFormatado.replace(/[^0-9.-]+/g,""));
}


// Pega o elemento do formulário e o input de nome
const btnAdicionar = document.getElementById('btnAdd');
const nomeInput = document.getElementById('nome');

btnAdicionar.addEventListener('click', () => {

  const nome = document.getElementById('nome').value;
  const preco = document.getElementById('preco').value;
  const imagem = document.getElementById('imageInput').value;

  if (!validarNome(nome)) { // Verificar se o campo de nome possui pelo menos 3 letras
    alert('O campo nome deve conter pelo menos 3 letras'); 
    return;
  }

  // Verifica se tem algo vazio, o .trim é pra garantir que não esteja preenchido com espaço em branco
  if (nome.trim() === '' || preco.trim() === '' || imagem.trim() === '') {
    alert('Por favor, preencha todos os campos do formulário.');
    return;
  }

  // Limpar a div que exibe a imagem selecionada
  const imgDiv = document.getElementById('imgDiv');
  imgDiv.innerHTML = '';

  const produto = {
    nome: document.getElementById('nome').value,
    preco:  document.getElementById('preco').value,
    image: imgFile
  }

  let produtos = JSON.parse(localStorage.getItem('produtoAdd')) || [];

  produtos.push(produto);

  localStorage.setItem('produtoAdd', JSON.stringify(produtos));

  /*`<article class="produto">
    <img src="images/${imgFile}.png">
    <div class="produto-info">
      <p>${document.getElementById('nome').value}</p>
      <span>${document.getElementById('preco').value}span>
      <button class="add-cart" id="14">Adicionar ao carrinho</button>
    </div>
  </article>`*/

  alert("Produto adicionado com sucesso!");

  // Limpar os campos de input
  document.getElementById('nome').value = '';
  document.getElementById('preco').value = '';
  document.getElementById('imageInput').value = '';
});


function validarNome(nome) {
  const regex = /[a-zA-Z]{3,}/; // verifica se está dentro de "a" a "z" e se tem 3 no minimo
  return regex.test(nome); // testa a variavel pra ver se está formatada
}



function verificarFormulario() {

   
  }


