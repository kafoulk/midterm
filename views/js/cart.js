// Ensure cart persists between pages
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Run this only when the page has fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Attach event listeners for shop page buttons
    document.querySelectorAll(".smimg-overlay-button").forEach(button => {
        button.addEventListener("click", function () {
            let product = this.parentElement;
            let name = product.querySelector("h3").textContent.split("|")[0].trim();
            let price = parseFloat(product.querySelector("h3").textContent.split("$")[1]);

            let existingProduct = cart.find(item => item.name === name);
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`${name} added to cart!`);
        });
    });

    // If on cart.html, update the cart display
    if (document.getElementById("cart-content")) {
        updateCart();
    }
});

function updateCart() {
    let cartContent = document.getElementById("cart-content");
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (cartContent) {
        cartContent.innerHTML = cart.length > 0
            ? `<ul>${cart.map(item => `<li>${item.name} - $${item.price} (Qty: ${item.quantity})</li>`).join("")}</ul>`
            : "Empty";
    }

    validateButtons();
}

function validateButtons() {
    let name = document.getElementById("name")?.value || "";
    let email = document.getElementById("email")?.value || "";
    let invoiceButtons = [document.getElementById("view-invoice"), document.getElementById("download-invoice")];

    let isValid = cart.length > 0 && name.trim() !== "" && email.trim() !== "";
    invoiceButtons.forEach(btn => {
        if (btn) btn.disabled = !isValid;
    });
}

document.getElementById("name")?.addEventListener("input", validateButtons);
document.getElementById("email")?.addEventListener("input", validateButtons);


document.addEventListener("DOMContentLoaded", function () {
    let viewInvoiceBtn = document.getElementById("view-invoice");
    let downloadInvoiceBtn = document.getElementById("download-invoice");

    if (viewInvoiceBtn) {
        viewInvoiceBtn.addEventListener("click", function () {
            console.log("View Invoice Clicked");
        });
    } else {
        console.log("View Invoice Button Not Found");
    }

    if (downloadInvoiceBtn) {
        downloadInvoiceBtn.addEventListener("click", function () {
            console.log("Download Invoice Clicked");
        });
    } else {
        console.log("Download Invoice Button Not Found");
    }
});

