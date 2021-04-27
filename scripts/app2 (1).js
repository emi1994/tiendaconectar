// Internal database
const menu = [
  {
    id: 1,
    title: 'Desodorante Natural Lavanda y Tea Tree',
    text:
      'Evitan la obstruccion de los poros de la axila, lo que permite que la eliminacion de toxinas fluya naturalmente y son ecoloogicos.',
    price: 550,
    imgClass: 'deodorant',
    category: 'breakfast',
    quantity: 0,
  },

  {
    id: 2,
    title: 'Bolsa compostable biodegradable',
    text:
      'Están hechas con almidón y aprobadas para su uso en contacto con los alimentos.Podes reutilizarlas o compostarlas, ya que se degradan en 180 días tienen una medida de 15x30 y contiene 150 unidades',
    price: 500,
    imgClass: 'bag',
    category: 'higiene',
    quantity: 0,
  },
  {
    id: 3,
    title: 'Leche de Almendras',
    text:
      'No contiene lactosa ni gluten, reduce los niveles de colesterol malo, es una fuente de potasio y calcio ademas de ser rica en acidos grasos esenciales, tambien es fuente de vitaminas y minerales',
    price: 230,
    imgClass: 'milk',
    category: 'comida',
    quantity: 0,
  },
  {
    id: 4,
    title: 'Pasta de diente sin fluor',
    text:
      'Esta elaborada con hierbas naturales, tiene propiedades anti-inflamatorias y anti-bacteriales, un excelente sabor y frescura. Pero además es:Libre de Parabenos, Cruelty Free, Apto Vegano, Apto Celiaco, contiene 100gr',
    price: 400,
    imgClass: 'paste',
    category: 'higiene',
    quantity: 0,
  },
  {
    id: 5,
    title: 'Mantequilla de Mani',
    text:
      'Exquisita mantequilla de mani sin azúcar, sin conservantes, sin Lactosa, sin Aceites Agregados , vegana y 100% natural',
    price: 300,
    imgClass: 'mani',
    category: 'comida',
    quantity: 0,
  },
  {
    id: 6,
    title: 'Esponja vegetal Grande',
    text:
      'Estimulan la circulación, exfolian eliminando células muertas, también podemos usarlas para la cocina, sustituyendo la esponja tradicional de espuma de poliuretano!',
    price: 120,
    imgClass: 'esponja',
    category: 'higiene',
    quantity: 0,
  },
]

$(function () {
  $.ajax({
    url: 'ajax.json',
    success: function (data) {
      let menu = data.menu

      //1.agregar productos en el dom
      let container = document.getElementById('productosData')
      container.innerHTML = ''

      //2.variable html vacia para llenar con el foreach
      let html = ''

      //3. foreach para iterar todos los productos
      menu.forEach((product) => {
        console.log(product)
        html = html + buildGallery(product)
      })

      //4. template string, aca hay que personalizar con tu html
      function buildGallery(product) {
        console.log(product)
        return `
                <div id="lista-productos" class="card col-xs-2 col-s-3 col-md-3 col-lg-3 col-xl-3 product-effect m-4 "> 
                <div class="product-image ${product.imgClass}" style="margin-top: 10px;"></div>
                <div class="card-body">
                    <h5 class="card-title spandex-product">${product.title}</h5>
                    <p class="card-text">${product.text}</p>
                </div>
                <div class="product-info">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"> <i class="fas fa-dollar-sign"
                                style="font-size: 15px; color: green;"></i><span class="spandex-product price"> ${product.price}</span>
                        </li>
                        <li class="list-group-item">Popularidad <i class="fas fa-fire" style="color: #fda50f;"></i> <i
                                class="fas fa-fire" style="color: #fda50f;"></i> <i class="fas fa-fire"
                                style="color: #fda50f;"></i>
                            <i class="fas fa-fire" style="color: #fda50f;"></i>
                        </li>
                        <li class="list-group-item">Eco Friendly
                            <i class="fas fa-leaf" style="color: RGB(128, 202, 29);"></i>
                            <i class="fas fa-leaf" style="color: RGB(128, 202, 29);"></i>
                        </li>
                    </ul>
                    <div class="card-body">
                        <a href="#"
                            class="card-link btn btn-outline-primary agregar-carrito sku_${product.id}" onClick=insertarCarritoHtml(${product.id})>Comprar Producto</a>
                    </div>
                </div>
                </div>`
      }

      //5.agrego
      container.innerHTML = html
    },
    error: function (data) {
      console.log(data)
    },
  })
})

//Selecting the DOM items
const sectionCenter = document.querySelector('.row')
const filterBtns = document.querySelectorAll('.filter-btn')

const carrito = document.querySelector('#carrito') // carrito
const contenedorCarrito = document.querySelector('#lista-carrito tbody') //body del carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const deleteBtn = document.querySelector('borrar-producto')
let articulosCarritos = []

//Display menu when content loads
window.addEventListener('DOMContentLoaded', function () {
  displayMenuItems(menu)
})

//Click events
vaciarCarritoBtn.addEventListener('click', vaciarCarrito) // Vaciar carrito
sectionCenter.addEventListener('click', agregarProducto) //Lista de productos
// carrito.addEventListener('click', borrar); // Borrar producto

//Add product//
function agregarProducto(e) {
  e.preventDefault()
  if (e.target.classList.contains('agregar-carrito')) {
    const sku = [...e.target.classList].find((item) => item.includes('sku'))
    obtenerDatosProducto(sku)
  }
}

// Getting all the product data//
function obtenerDatosProducto(producto) {
  console.log(producto)
  const productoAgregado = menu.find((item) => producto === `sku_${item.id}`)
}

// Filter system //
filterBtns.forEach(function (btn) {
  btn.addEventListener('click', function (e) {
    const category = e.currentTarget.dataset.id
    const menuCategory = menu.filter(function (menuItem) {
      if (menuItem.category === category) {
        return menuItem
      }
    })
    if (category == 'all') {
      displayMenuItems(menu)
    } else {
      displayMenuItems(menuCategory)
    }
  })
})

//Creating cards for products//
function displayMenuItems(menuItems) {
  let displayMenu = menuItems.map(function (item) {
    // console.log(item);
    return `
        <div id="lista-productos" class="card col-xs-2 col-s-3 col-md-3 col-lg-3 col-xl-3 product-effect m-4 "> 
        <div class="product-image ${item.imgClass}" style="margin-top: 10px;"></div>
        <div class="card-body">
            <h5 class="card-title spandex-product">${item.title}</h5>
            <p class="card-text">${item.text}</p>
        </div>
        <div class="product-info">
            <ul class="list-group list-group-flush">
                <li class="list-group-item"> <i class="fas fa-dollar-sign"
                        style="font-size: 15px; color: green;"></i><span class="spandex-product price"> ${item.price}</span>
                </li>
                <li class="list-group-item">Popularidad <i class="fas fa-fire" style="color: #fda50f;"></i> <i
                        class="fas fa-fire" style="color: #fda50f;"></i> <i class="fas fa-fire"
                        style="color: #fda50f;"></i>
                    <i class="fas fa-fire" style="color: #fda50f;"></i>
                </li>
                <li class="list-group-item">Eco Friendly
                    <i class="fas fa-leaf" style="color: RGB(128, 202, 29);"></i>
                    <i class="fas fa-leaf" style="color: RGB(128, 202, 29);"></i>
                </li>
            </ul>
            <div class="card-body">
                <a href="#"
                    class="card-link btn btn-outline-primary agregar-carrito sku_${item.id}" onClick=insertarCarritoHtml(${item.id})>Comprar Producto</a>
            </div>
        </div>
        </div>`
    //https://wa.me/541122660799
  })
  displayMenu = displayMenu.join('')
  sectionCenter.innerHTML = displayMenu
}

// Function to clean the cart//
function vaciarCarrito() {
  borrarHTML()
  articulosCarritos = []
}

function borrarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild)
  }
}

// en esta funcion me la copie de la tuya pero con un ID asi depsues con un foreach busca el id del producto y si lo encuentra agrega el html
function insertarCarritoHtml(id) {
  // console.log(menu)
  menu.forEach((producto) => {
    if (producto.id == id) {
      const { title, price, imgClass, id, quantity } = producto
      const row = document.createElement('tr')
      row.innerHTML = `
                <td>
                <div class="product-image cart-img-sizing ${imgClass}"></div>
                </td>
                <td>
                    <p class="td-text">${title}</p>
                </td>
                <td>
                  <p class="td-text"><i class="fas fa-dollar-sign"
                  style="font-size: 15px; color: green;"></i> ${price}</p>
                </td>
                <td>
                   <p class="td-text">x ${quantity}</p>
                </td>
                <td>
                    <a href="#" class="borrar-producto" data-id="${id}"> X </a>
                </td>
                
            `
      contenedorCarrito.appendChild(row)
    }
  })
}

// AJAX Calls//
