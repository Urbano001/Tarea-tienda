const productos = {
    1: { nombre: 'Anis Cartujo',
        precio: 5,
        stock: 3,
        vendido: 0 },
    2: {nombre: 'Ron Santa Teresa',
        precio: 12,
        stock: 3,
        vendido: 0 }
};

const impuesto = 0.15; // 15% de impuesto

function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity${productId}`);
    const quantity = parseInt(quantityInput.value);
    const product = productos[productId];

    if (quantity > 0 && quantity <= product.stock) {
        product.stock -= quantity;
        product.vendido += quantity;
        document.getElementById(`stock${productId}`).textContent = product.stock;
        quantityInput.max = product.stock;
        quantityInput.value = 0;
        updateInvoice();
    } else {
        alert('Cantidad no válida o stock insuficiente');
    }
}

function updateInvoice() {
    let subtotal = 0;
    let invoiceHtml = '<h3>Detalle de compra:</h3><ul>';

    for (const [id, product] of Object.entries(productos)) {
        if (product.vendido > 0) {
            const productTotal = product.precio * product.vendido;
            subtotal += productTotal;
            invoiceHtml += `
                <li>${product.nombre} - Cantidad: ${product.vendido} - Subtotal: $${productTotal}</li>
            `;
        }
    }

    const calimpuesto = subtotal * impuesto;
    const total = subtotal + calimpuesto;

    invoiceHtml += `</ul>
        <p><strong>Subtotal: $${subtotal.toFixed(2)}</strong></p>
        <p><strong>Impuesto (15%): $${calimpuesto.toFixed(2)}</strong></p>
        <p><strong>Total a pagar: $${total.toFixed(2)}</strong></p>
    `;

    document.getElementById('invoice-content').innerHTML = invoiceHtml;
    document.getElementById('invoice').style.display = 'block';
}