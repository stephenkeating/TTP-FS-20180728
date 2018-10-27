
    



$(function(){
let getPriceForm = document.getElementById("getPriceForm")
let confirmTradeContainer = document.getElementById("confirmTradeContainer")
let getPriceButton = document.getElementById("getPriceButton")
let cancelPurchaseBtn = document.getElementById("cancelPurchaseBtn")
const hiddenPortfolioValuation = document.getElementById("hiddenPortfolioValuation").innerText
const hiddenAccountBalance = parseFloat(document.getElementById("hiddenAccountBalance").innerText)

function firstIexCall(stockSymbol, quantity ) {
    console.log("Hey")
    $.ajax({
        url: `https://api.iextrading.com/1.0/stock/${stockSymbol}/price`,
        // dataType: 'jsonp',
        success: function (data) {
            console.log(data)
            console.log(data * quantity)
            fullPrice = data * quantity
            if(fullPrice < hiddenAccountBalance) { 
            fullPrice = fullPrice.toFixed(2)
            document.getElementById("stockQuote").innerText = `$${fullPrice} is the cost for 6 shares of ${stockSymbol}`
            document.getElementById("buyStock").style.display = "none";
            document.getElementById("priceQuoteContainer").style.display = "flex";
            } else {
                alert("Sorry, insufficient funds")
            }
        }, error: function (data) {
            alert("Please check that you submitted a valid ticker symbol")
        }

    });
}

    $("#getPriceForm").submit(function (event) {
        event.preventDefault();
        stockSymbol = document.getElementById("stock_symbol").value
        quantity = document.getElementById("numberOfShares").value
        //   var data = $(this).serializeArray();
        let fullPrice
        console.log(quantity);
        console.log(parseInt(quantity))

        if ((parseInt(quantity)) && (parseInt(quantity) > 0)) {

            // if (symbolsObj[`${stockSymbol.toUpperCase()}`] === 1) {

            
                firstIexCall(stockSymbol, quantity) 

            // } else {
            //     alert("Fake Stock!")
            // }
        } else {
            alert("Please enter a valid quantity")
        }

        



    });


function hideGetPrice(event) {
    event.preventDefault()
    getPriceForm.style.display = "none";
    confirmTradeContainer.style.display = "block"
    event.preventDefault();
        stockSymbol = document.getElementById("stock_symbol").value
        quantity = document.getElementById("numberOfShares").value
        //   var data = $(this).serializeArray();
        let fullPrice
        console.log(quantity);
        console.log(parseInt(quantity))

        if ((parseInt(quantity)) && (parseInt(quantity) > 0)) {

            // if (symbolsObj[`${stockSymbol.toUpperCase()}`] === 1) {

            
                firstIexCall(stockSymbol, quantity) 

            // } else {
            //     alert("Fake Stock!")
            // }
        } else {
            alert("Please enter a valid quantity")
        }
}

function returnToGetPrice(event){
    event.preventDefault()
    getPriceForm.style.display = "block";
    confirmTradeContainer.style.display = "none"
}

getPriceButton.addEventListener("click", hideGetPrice )
cancelPurchaseBtn.addEventListener("click", returnToGetPrice)
});

