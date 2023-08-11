
const cartQtd = document.querySelector("#cart-qtd");
let qtd = 0;
let countProduto = 0;
let produtoArr = [];

const produtos = [
  "Óleo de soja Liza - 1L;10,90;oleo.png",
  "Leite UHT Integral Jussara - 1L;5,49;leite.png",
  "Arroz Namorado - 5kg;29,99;arroz.png",
  "Feijão carioca Kicaldo - 1kg;14,49;feijao.png",
  "Chikenitos Seara - 300g;10,49;nuggets.png",
  "Margarina Claybom - 1kg;8,99;manteiga.png",
  "Refrigerante Guaraná Dolly - 2L;6,50;dolly.png",
  "Bolacha Recheada Bono - 140g;2,49;bolacha.png",
  "Farinha de trigo Dona Benta - 1kg;8,99;farinha.png",
  "Ovo de páscoa chocolate Talento;38,99;ovo-pascoa.png",
  "Sal Cisne - 1kg;4,49;sal.png",
  "Açucar União - 1kg;9,99;açucar.png",
  "Achocolatado em pó Toddy - 400g;10,49;toddy.png",
  "Café Três Corações - 500g;20,49;cafe.png",
  "Bolacha salgada Club Social - 144g;3,49;club-social.png"
];

let cartBtn = document.querySelectorAll(".add-cart");

cartBtn.forEach((element) => {
  produtoArr.push("");
})

const produtosJS = JSON.parse(localStorage.getItem('produtoAdd')) || [];
const produtosDiv = document.querySelector('#row');

produtosJS.forEach((produto) => {
  produtoArr.push("");
  produtos.push(`${produto.nome};${produto.preco.replace("R$","")};${produto.image}`);
  produtosDiv.innerHTML += 
  `<article class="produto">
    <img src="images/${produto.image}">
    <div class="produto-info">
      <p>${produto.nome}</p>
      <span>${produto.preco}</span>
      <button class="add-cart" id="${produtoArr.length-1}">Adicionar ao carrinho</button>
    </div>
  </article>`
})

cartBtn = document.querySelectorAll(".add-cart");

cartBtn.forEach((element) => {
  element.addEventListener('click', () => {
    addCart(element);
  })
})

checkCart();

function btnStyle(isAdded, element) {
  if (isAdded) {
    element.style.backgroundColor = "#327a05";
    element.style.backgroundImage =  "url('images/check.png')";
    element.textContent = "Adicionado ao carrinho";
    element.style.backgroundSize = "26px"
  } else {
    element.style.backgroundColor = "#e22328";
    element.style.backgroundImage =  "url('images/shopping-cart.png')";
    element.textContent = "Adicionar ao carrinho";
    element.style.backgroundSize = "32px";
  }
}

function checkCart() {
  cartBtn.forEach((element) => {
    if (localStorage.getItem(element.id.toString()) !== null) {
      btnStyle(true, element)
      qtd += 1;
  } else {
      btnStyle(false, element)
    }
    cartQtd.innerHTML = `Carrinho de compras (${qtd.toString()})`;
  })
}

function addCart(element) {
  if (localStorage.getItem(element.id.toString()) === null) {
    produtoArr[element.id] = produtos[element.id];
    btnStyle(true, element)
    localStorage.setItem(`${element.id}`, produtoArr[element.id]);
    qtd += 1;
  } else {
    produtoArr[element.id] = "";
      btnStyle(false, element)
      qtd -= 1;
      localStorage.removeItem(`${element.id}`);
    }

    cartQtd.innerHTML = `Carrinho de compras (${qtd.toString()})`;
}

