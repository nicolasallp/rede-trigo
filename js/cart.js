const carrinho = document.querySelector(".carrinho");
let produto = [];

inserirProduto();

function inserirProduto() {
  produto = [];
  carrinho.innerHTML = "";
  for (let i = 0; i <= 999; i++) {
      produto.push(localStorage.getItem(i.toString()));
  }
  
  for (let index in produto) {
    if (produto[index] !== null) {
      carrinho.innerHTML += `
      <article class="produto" id="${index}">
        <div class="produto-info">
          <img src="images/${produto[index].split(";")[2]}">
          <p>${produto[index].split(";")[0]}</p>
        </div>
        <div class="quantidade">
          <p>Quantidade</p>
          <div style="display: flex; align-items: center;" id="qtd-div">
            <button id="menos"></button>
            <span id="qtd">1</span>
            <button id="mais"></button>
          </div>
        </div>
        <span class="preco">R$${produto[index].split(";")[1]}</span>
        <button class="lixeira"></button>
      </article>`;
    }
  }
  cart();
}

console.log(localStorage.length)

  if ((localStorage.length === 1 && localStorage.getItem('produtoAdd') !== null) || localStorage.length === 0) {
    emptyCart();
  }


function emptyCart() {
  const h1 = document.querySelector("h1");
  const checkout = document.querySelector(".checkout");
  h1.style.display = 'none';
  checkout.style.display = 'none';
  carrinho.style.minHeight = "calc(100vh - 300px)";
  carrinho.innerHTML = `<h2>O carrinho está vazio!</h2><button class="btnVoltar" onclick="location.href='index.html'">Ver produtos</button>`;
}

const precoTotal = document.querySelector('#preco-total');
let total = 0;

checkPreco();
function checkPreco() {
  total = 0;
  const precoArr = document.querySelectorAll('.preco');
  precoArr.forEach((element) => {
    total += parseFloat(element.textContent.substring(2).replace(",", "."));
  })
  precoTotal.innerHTML = `R$${total.toFixed(2).replace(".", ",")}`;
}



function cart() {
    const produtoDiv = document.querySelectorAll('.produto');
    produtoDiv.forEach((element) => {
      const qtdSpan = element.querySelector("#qtd");
      const btnMais = element.querySelector('#mais');
      const btnMenos = element.querySelector('#menos');
      const preco = element.querySelector('.preco');
      const btnLixo = element.querySelector('.lixeira');
      let quantidade = 1;
      let precoProduto = parseFloat(preco.textContent.substring(2).replace(",", ".")) / quantidade;
      btnMais.addEventListener('click', () => { 
        quantidade += 1;
        qtdSpan.textContent = quantidade;
        total += precoProduto;
        preco.innerHTML = `R$${(parseFloat(preco.textContent.substring(2).replace(",", ".")) + precoProduto).toFixed(2).replace(".", ",")}`;
        precoTotal.innerHTML = `R$${total.toFixed(2).replace(".", ",")}`;
      })
      btnMenos.addEventListener('click', () => {
        if (quantidade > 1) {
          quantidade -= 1;
          qtdSpan.textContent = quantidade;
          total -= precoProduto;
          preco.innerHTML = `R$${(parseFloat(preco.textContent.substring(2).replace(",", ".")) - precoProduto).toFixed(2).replace(".", ",")}`;
          precoTotal.innerHTML = `R$${total.toFixed(2).replace(".", ",")}`;
        }
      })
      btnLixo.addEventListener('click', () => {
        localStorage.removeItem(`${element.id}`)
        checkPreco();
         if ((localStorage.length === 1 && localStorage.getItem('produtoAdd') !== null) || localStorage.length === 0) {
          emptyCart();
        } else {
          inserirProduto();
          checkPreco();
        }
      })
    })
}

const compra = document.querySelector(".compra");

function openCompra() {
  compra.style.display = "flex";
  Object.keys(localStorage).forEach((key) => {
    if (key !== "produtoAdd") {
      localStorage.removeItem(key);
    }
  })
}

function closeCompra() {
  compra.style.display = "none";
  emptyCart();
}

