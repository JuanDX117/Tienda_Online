const { parse } = require("dotenv");

function setCarritoVacio() {
  cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes products en el carrito</div></td>
    </tr>            
    `;
}
function vaciarCarrito() {
  localStorage.removeItem("carrito");
}

function calcularTotal(products) {
  return products.reduce(
    (acum, product) => (acum += product.price * product.quantity),
    0
  );
}

let cartRows = document.querySelector('.cartRows');

if (localStorage.carrito) {
  let carrito = JSON.parse(localStorage.carrito);
  console.log(carrito);
  carrito.array.forEach((item, index) => {
    fetch('/api/product/${item.id}')
    .then((res)=>res.json())
    .then((product)=> {
      cartRows.innerHTML +=
      cartRows.innerHTML += `
      <tr id="row${index}">
          <th scope="row">${index + 1}</th>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td class="text-center">${item.quantity}</td>
          <td class="text-center">${parseFloat(
            product.price * item.quantity, 
            2
            ).toFixed(2)}</td>
      </tr>`;

    });
  });
}