const products = ["apple", "banana", "orange", "pear", "grape"];
const prices = [8.50, 5.10, 11.90, 13.60, 17.00];

function displayProducts() {
    console.log("Available Products:");
    for (let i = 0; i < products.length; i++) {
        console.log(`${i + 1}. ${products[i]} - R${prices[i].toFixed(2)}`);
    }
}

function selectProducts() {
    let selections = [];
    while (true) {
        displayProducts();
        let productIndex = parseInt(prompt("Enter the product number to add to cart (or 0 to finish):")) - 1;
        if (productIndex === -1) break;
        if (productIndex < 0 || productIndex >= products.length) {
            console.log("Invalid product selection. Please try again.");
            continue;
        }
        let quantity = parseInt(prompt(`How many ${products[productIndex]} do you want?`));
        if (!isNaN(quantity) && quantity > 0) {
            selections.push({ index: productIndex, quantity: quantity });
        } else {
            console.log("Invalid quantity. Please enter a positive number.");
        }
    }
    return selections;
}

function calculateTotal(selections) {
    return selections.reduce((total, item) => total + prices[item.index] * item.quantity, 0);
}

function runShop() {
    let budget = parseFloat(prompt("Enter your budget in Rand:"));
    if (isNaN(budget) || budget <= 0) {
        console.log("Invalid budget. Please restart the program with a valid amount.");
        return;
    }

    let selections = selectProducts();
    
    let totalCost = calculateTotal(selections);
    
    if (totalCost > budget) {
        console.log(`Insufficient funds. Your total is R${totalCost.toFixed(2)}, but you only have R${budget.toFixed(2)}.`);
        return;
    }

    let change = budget - totalCost;
    console.log(`\nPurchase Summary:`);
    selections.forEach(item => {
        console.log(`${item.quantity} ${products[item.index]} - R${(prices[item.index] * item.quantity).toFixed(2)}`);
    });
    console.log(`Total: R${totalCost.toFixed(2)}`);
    console.log(`Change: R${change.toFixed(2)}`);
}

runShop();