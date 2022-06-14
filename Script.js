const fs = require('fs');
//Open the google takeout, go to google pay files and check if there is a MyActivity folder
//Save this file in the root of Google Pay folder

//Choose month in the format MMM YYYY
const Month = 'Jun 2022';

//First print all Payments by putting fil1 = "", then find the word that you want to filter and put it in here
//For example, if you have amul put amul inside the quotes
const fil1 = "";

const Payments =  [];

class Payment{
    constructor(line){
        let paymentDetails = line.split("<br>")[0];
        let dateDetails = line.split("<br>")[1];
        this.type = paymentDetails.split(" ")[0];
        this.amount = paymentDetails.split(" ")[1].split("₹")[1];
        this.date = dateDetails.split(", ")[0];
        this.paymentInfo = paymentDetails;
    }
}

fs.readFile('Google Pay/My Activity/My Activity.html', (err, data) => {
    data.toString()
    .split(`</style></head><body><div class="mdl-grid"><div class="outer-cell mdl-cell mdl-cell--12-col mdl-shadow--2dp"><div class="mdl-grid"><div class="header-cell mdl-cell mdl-cell--12-col">`)[1]
    .split('<p class="mdl-typography--title">Google Pay<br></p></div><div class="content-cell mdl-cell mdl-cell--6-col mdl-typography--body-1">')
    .forEach(elem => {
        if(elem){
            if(elem.split("</div>")[0].split("<br>")[1].split(Month)[1]){
                if(elem.split("</div>")[0].split("<br>")[0].split(fil1)[1]){
                    Payments.push(new Payment(elem.split("</div>")[0]));
                }
                
            }
        }
    });

    console.log(Payments);

    let paid = 0;
    let received = 0;
    
    Payments.forEach(payment => {
        if(payment.type == 'Paid' || payment.type == 'Sent'){
            paid += parseInt(payment.amount);
        }else if(payment.type == 'Received'){
            received += parseInt(payment.amount);
        }
    })

    console.log("Payment Analysis for " + Month)
    console.log("Paid: ₹" + paid, "Received: ₹" + received);

})