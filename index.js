const BASE_URL = `https://ecommercebackend.fundamentos-29.repl.co/`;

async function getCharacters () {

    try {
        const data = await fetch(BASE_URL);
        const res = await data.json();
        window.localStorage.setItem("products", JSON.stringify(res))
        return res; 

    } catch (error) {
        console.log(error);
    }

}

function generarProductos(db) {

    const productos = document.querySelector(".cards");
    let html = "";

    for (const producto of db.products) {
        
        html += `
        <div class="home">

            <div class="color">
                <img class="img0" id="img0" src="${producto.image}" alt="${producto.name}">
                <div class="mas">
                ${producto.quantity ? `<svg class="icono-mas" id="${producto.id}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/></svg>`: `<span class="agotado">❌</span>`}
                </div>
            </div>

            <div class="texto1">
                <span class="span3">$${producto.price}</span>
                <span class="span4">Stock: ${producto.quantity}</span></span>
                <p class="p2" id="${producto.id}">${producto.name}</p>
            </div>

        </div>`
    }

    productos.innerHTML = html

}

function activearSala() {

    const carroCompraHTML = document.querySelector(".bolsa");
    const salaHtml = document.querySelector(".sala");

    carroCompraHTML.addEventListener("click", function() {
        console.log(salaHtml.classList.toggle("ver-sala"));
    })

    const exit = document.querySelector(".x");

    exit.addEventListener("click", function() {
        console.log(salaHtml.classList.toggle("ver-sala"));
    })
}

function activarMenu() {

    const menuuHtml = document.querySelector(".menu");
    const verMenuHtml = document.querySelector(".menuu");

    menuuHtml.addEventListener("click", function() {
        console.log(verMenuHtml.classList.toggle("ver-sala"));
    })

}

function activeNav() {

    window.addEventListener("scroll", function() {

        const navscroll = document.querySelector(".navbar");
        let y = window.scrollY;

        if (y > 50) {
            navscroll.classList.add('navbar--scroll')
        } else {
            navscroll.classList.remove('navbar--scroll')
        }
    })

}

function loading() {
    setTimeout(function() {
        const cargaHtml = document.querySelector(".fondoLoading");
        cargaHtml.classList.add("fondoLoading-move");
    }, 2000);
}

function addCart(db) {

    const cardsHtml = document.querySelector(".cards");

    cardsHtml.addEventListener("click", function(e) {
        if (e.target.classList.contains("icono-mas")) {
            const id = Number(e.target.id);

            const productFind = db.products.find(
                (product) => product.id === id
            )

            if (db.cart[productFind.id]) {
                if (productFind.quantity === db.cart[productFind.id].amount) {
                    return alert("ya no hay más, sorry");
                }
                db.cart[productFind.id].amount++
            } else {
                db.cart[productFind.id] = {... productFind, amount: 1}
            }

            window.localStorage.setItem("cart", JSON.stringify(db.cart));

            compraDeProducto(db)
            muestrasPrecio(db);
            contador(db)
        }

    })

    window.localStorage.setItem("cart", JSON.stringify(db.cart));
    console.log(db.cart);

}

function compraDeProducto(db) {

    const salaPoductoHtml = document.querySelector(".sala-productos");
    let html = ``;

    for (const product in db.cart) {
        const {quantity, price, name, image, id, amount} = db.cart[product];

        html += `
        <div class = "sala-producto">
            
            <div class = "sala-producto-modifica">
                <div class = "sala-producto--img">
                    <img class="img0" id="img0" src="${image}" alt="${name}">
                </div>

                <div id="${id}" class = "sala-producto--body>
                    <p class="p2">${name}</p>
                    <span class="span8">Stock: ${quantity} | <span class="span9">$${price}</span></span>
                    <span class="span7">Subtotal | $${price}</span>

                    <div class="sala-producto--body--iconos">
                        <div class="menos-compra">
                            <svg class="men-color" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><path class="men-log" fill="currentColor" fill-rule="evenodd" d="M1 10a1 1 0 0 1 1-1h16a1 1 0 1 1 0 2H2a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                            </svg>
                        </div>
                        <p class="p4">${amount}unit</p>
                        <div class="mas-compra">
                            <svg class="mas-color" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="mas-log" fill="currentColor" d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"/>
                            </svg>
                        </div>
                        <div class="basura-compra">
                            <svg class="bas-color" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path class="bas-logo" fill="currentColor" d="m20.37 8.91l-1 1.73l-12.13-7l1-1.73l3.04 1.75l1.36-.37l4.33 2.5l.37 1.37l3.03 1.75M6 19V7h5.07L18 11v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2Z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <hr>

        </div>`;

    }

    salaPoductoHtml.innerHTML = html

}

function sunaRestaBorra(db) {

    const salaPoductoHtml = document.querySelector(".sala-productos");

    salaPoductoHtml.addEventListener("click", function(e) {

        if (e.target.classList.contains("mas-color")) {
            const id = Number(e.target.parentElement.parentElement.parentElement.id)

            const productFind = db.products.find(
                (product) => product.id === id
            )
        
            if (productFind.quantity === db.cart[productFind.id].amount) {
                return alert("ya no hay más, sorry");
            }

            db.cart[id].amount++;
        } 

        if (e.target.classList.contains("men-color")) {
            const id = Number(e.target.parentElement.parentElement.parentElement.id);
        
            if ( db.cart[id].amount === 1) {
                const responde = confirm ("Estas seguro?")

                if (responde) {
                    delete db.cart[id]
                }
            } else {
                db.cart[id].amount--;
            }
        } 

        if (e.target.classList.contains("bas-color")) {
            const id = Number(e.target.parentElement.parentElement.parentElement.id);
            const responde = confirm ("Estas seguro?")

            if (responde) {
                delete db.cart[id]
            }
        }

        window.localStorage.setItem("cart", JSON.stringify(db.cart))
        compraDeProducto(db)
        muestrasPrecio(db)
        contador(db)
    })

}

function muestrasPrecio(db) {

    const span5Html = document.querySelector(".span5");
    const span6Html = document.querySelector(".span6");

    let productos = 0;
    let total = 0;

    for (const product in db.cart) {
        productos += db.cart[product].amount;
        total += db.cart[product].price * db.cart[product].amount;
    }

    span5Html.textContent = productos + " items";
    span6Html.textContent = "$ " + total + ".00";

}

function agotado(db) {

    const boton = document.querySelector(".boton-compra");

    boton.addEventListener("click", function() {

        if(!Object.values(db.cart).length) {
            alert ("primero compra, ¿no?")
        }
        const responde = confirm ("¿Vas a hacer la compra?");

        if (!responde) {
            return
        }

        const loQueQuede = []

        for (const product of db.products) {
            
            const productoSala = db.cart[product.id];

            if (product.id === productoSala?.id) {
                loQueQuede.push({
                    ... product,
                    quantity: product.quantity - productoSala.amount
                })
            } else {
                loQueQuede.push(product)
            }
        }

        db.products = loQueQuede;
        db.cart = {}
        window.localStorage.setItem("products", JSON.stringify(db.products));
        window.localStorage.setItem("cart", JSON.stringify(db.cart));

        muestrasPrecio(db);
        compraDeProducto(db);
        generarProductos(db);
    })

}

function contador(db) {

    const span1Html = document.querySelector(".span1");
    const boton = document.querySelector(".boton-compra");
    let contador = 0;

    for (const product in db.cart) {
        contador += db.cart[product].amount;
    }

    span1Html.textContent = contador;

    boton.addEventListener("click", function() {
        span1Html.textContent = 0;
    })

}

async function main() {

    const db = {
        products: JSON.parse(window.localStorage.getItem("products")) ||
        (await getCharacters()),
        

        cart: JSON.parse(window.localStorage.getItem("cart")) || {},
    }

    generarProductos(db);
    activearSala();
    activarMenu();
    activeNav();
    loading();
    addCart(db);
    compraDeProducto(db);
    sunaRestaBorra(db);
    muestrasPrecio(db);
    agotado(db);
    contador(db);

}

main();