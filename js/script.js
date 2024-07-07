// Ham-menu si padding logo ↓

const hamMenu = document.querySelector('.ham-menu');

const offScreenMenu = document.querySelector('#div_ul');

const logoRight = document.querySelector('.logo');

hamMenu.addEventListener('click', function() {
    hamMenu.classList.toggle('active');
    offScreenMenu.classList.toggle('active');
    logoRight.classList.toggle('active');
})

// Ham-menu si padding logo ↑



// Change logo 500px ↓
window.addEventListener('load', function() {
    let img = document.getElementById('img');
    if (window.innerWidth < 550) {
        img.src = 'img/true2.png';
    } else {
        img.src = 'img/true.png';
    }
});

window.addEventListener('resize', function() {
    let img = document.getElementById('img');
    if (window.innerWidth < 550) {
        img.src = 'img/true2.png';
    } else {
        img.src = 'img/true.png';
    }
})

// Change logo 500px ↑


// overlay search icon ↓

const overlay = document.getElementById("myOverlay");

function openSearch() {
    overlay.style.display = "block";
    setTimeout(function() {
        overlay.classList.add("show");
      }, 10);
}

// overlay = document.getElementById("myOverlay");

function closeSearch() {
    
    overlay.classList.remove("show");
    setTimeout(function() {
      overlay.style.display = "none";
    }, 500); 
  }

//   overlay search icon ↑



// login singup ↓

let loginBtn = document.getElementById("loginBtn");
let singupBtn = document.getElementById("singupBtn");
let nameField = document.getElementById("nameField");
let title = document.getElementById("title");

function login() {
    nameField.style.display = "none";
}

// login singup ↑



// shoppingcart ↓
let closeCart = document.querySelector('.close');
let iconCart = document.querySelector('#shoppigCart');
let cartTab = document.querySelector('.cartTab');

let listProductHTML = document.querySelector('.box-area');
let listCartHTML = document.querySelector('.listCart');
let iconCartSpan = document.querySelector('#shoppigCart span');

let listProducts = [];
let carts = [];

iconCart.addEventListener('click', function() {
    cartTab.classList.toggle('showCart')
})
closeCart.addEventListener('click', function() {
    cartTab.classList.toggle('showCart')
})


const addDataToHTML = () => {
    listProductHTML.innerHTML = '';
    if(listProducts.length > 0){
        listProducts.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('box');
            newProduct.dataset.id = product.id;
            newProduct.innerHTML = `
            <img alt="" src="${product.image}">
            <div class="overlaycard">
                <h3>${product.name}</h3>
                <p>$${product.price}</p>
                <button class="addCart">Add to cart</button>
             </div>
            `;
            listProductHTML.appendChild(newProduct);
        })
    }
}

listProductHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('addCart')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        addToCart(product_id);
    }
})

const addToCart = (product_id) => {
    let positionThisProductInCart = carts.findIndex((value) => value.product_id == product_id);
    if(carts.length <= 0){
        carts = [{
            product_id: product_id,
            quantity: 1,
        }]
    }else if(positionThisProductInCart < 0){
        carts.push({
            product_id: product_id,
            quantity: 1
        });
    }else{
        carts[positionThisProductInCart].quantity += 1;
    }
    addCartToHTML();
    addCartToMemory();
}

const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(carts));
}

const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    let totatQuantity = 0;
    if(carts.length >0){
        carts.forEach(cart => {
            totatQuantity = totatQuantity + cart.quantity;
            let newCart = document.createElement('div');
            newCart.classList.add('box');
            newCart.dataset.id = cart.product_id;
            let positionProduct = listProducts.findIndex((value) => value.id == cart.product_id);
            let info = listProducts[positionProduct];
            newCart.innerHTML = `
            <div class="image">
                        <img src="${info.image}" alt="">
                    </div>
                    <div class="name">
                        ${info.name}
                    </div>
                    <div class="totalPrice">
                        $${info.price * cart.quantity}
                    </div>
                    <div class="quantity">
                        <span class="minus"><</span>
                        <span>${cart.quantity}</span>
                        <span class="plus">></span>
                    </div>
                    `;
                    listCartHTML.appendChild(newCart);
        })
    }
    iconCartSpan.innerText = totatQuantity;
}

listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantity(product_id, type);
    }
})
const changeQuantity = (product_id, type) => {
    let positionItemInCart = carts.findIndex((value) => value.product_id == product_id)
    if(positionItemInCart => 0){
        switch (type) {
            case 'plus':
                carts[positionItemInCart].quantity = carts[positionItemInCart].quantity + 1;
                break;
        
            default:
                let valueChange = carts[positionItemInCart].quantity - 1;
                if(valueChange > 0){
                    carts[positionItemInCart].quantity = valueChange;
                }else{
                    carts.splice(positionItemInCart,1);
                }
                break;
        }
    }
    addCartToMemory();
    addCartToHTML();
}
const initApp = () => {
    fetch('js/products.json')
    .then(response => response.json())
    .then(data => {
        listProducts = data;
        addDataToHTML();

        if(localStorage.getItem('cart')){
            carts = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();