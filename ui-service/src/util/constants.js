export const Assets = [
    {
      fundType : "Cash and Investments",
      fund : [
        {name:"Chequing", amount: 2000},
        {name:"Savings for Taxes", amount: 4000},
        {name:"Rainy Day Fund", amount: 506},
        {name:"Savings for Fun", amount: 5000},
        {name:"Savings for Travel", amount: 400},
        {name:"Savings for Personal Development", amount: 200},
        {name:"Investment 1", amount: 5000},
        {name:"Investment 2", amount: 60000},
        {name:"Investment 3", amount: 24000}
      ]
    },
    {
      fundType: "Long Term Assets",
      fund: [
        {name:"Primary Home", amount: 455000},
        {name:"Second Home", amount: 1564321},
        {name:"Other", amount: 0},
      ]
    }
  ]
  
export const Liabilities = [
    {
        fundType: "Short Term Liabilities",
        fund: [
        {name:"Credit Card 1", amount: 4342},
        {name:"Credit Card 2", amount: 322}
        ]
    },
    {
        fundType: "Long Term Debt",
        fund: [
        {name:"Mortgage 1", amount: 250999},
        {name:"Mortgage 2", amount: 632634},
        {name:"Line of Credit", amount: 10000},
        {name:"Investment Loan", amount: 10000},
        ]
    }
]

export const Currencies = [
    "CAD", "USD", "KRW", "JPY", "GBP", 
    "EUR", "CHF", "ZAR", "AUD", "CNY"
];

export const CurrencySymbols = {
    "CAD" : "C$",
    "USD" : "$",
    "KRW" : "₩",
    "JPY" : "¥",
    "GBP" : "£",
    "EUR" : "€",
    "CHF" : "CHf",
    "ZAR" : "R",
    "AUD" : "A$",
    "CNY" : "C¥",
}