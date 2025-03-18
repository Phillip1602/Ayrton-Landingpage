document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    if (email.includes("@")) {
        document.getElementById("signup-message").innerText = "Thank you for signing up!";
        document.getElementById("signup-message").style.color = "green";
    } else {
        document.getElementById("signup-message").innerText = "Please enter a valid email.";
        document.getElementById("signup-message").style.color = "red";
    }
});

// PayPal Checkout Integration
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: '9.99' // Price in EUR
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert("Thank you, " + details.payer.name.given_name + "! Your payment was successful.");
        });
    },
    onError: function(err) {
        alert("Error processing the payment. Please try again.");
    }
}).render('#paypal-button-container');