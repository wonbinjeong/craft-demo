import TableComponent from "../components/TableComponent"

const Assets = [
    {
      fundType : "Cash and Investments",
      fund : [
        {name:"Chequing", amount: 2000.00},
        {name:"Savings for Taxes", amount: 4000.00},
        {name:"Rainy Day Fund", amount: 506.00},
        {name:"Savings for Fun", amount: 5000.00},
        {name:"Savings for Travel", amount: 400.00},
        {name:"Savings for Personal Development", amount: 200.00},
        {name:"Investment 1", amount: 5000.00},
        {name:"Investment 2", amount: 60000.00},
        {name:"Investment 3", amount: 24000.00}
      ]
    },
    {
      fundType: "Long Term Assets",
      fund: [
        {name:"Primary Home", amount: 455000.00},
        {name:"Second Home", amount: 1564321.00},
        {name:"Other", amount: 0.00},
      ]
    }
  ]
  
  const Liabilities = [
    {
      fundType: "Short Term Liabilities",
      fund: [
        {name:"Credit Card 1", amount: 4342.00},
        {name:"Credit Card 2", amount: 322.00}
      ]
    },
    {
      fundType: "Long Term Debt",
      fund: [
        {name:"Mortgage 1", amount: 250999.00},
        {name:"Mortgage 2", amount: 632634.00},
        {name:"Line of Credit", amount: 10000.00},
        {name:"Investment Loan", amount: 10000.00},
      ]
    }
  ]
  
  const NetAssets = {
    "asset" : 0.00,
    "liability" : 0.00,
    "networth" : 0.00,
  }

export default function Networth() {
    return (
        <div>
        <TableComponent key="table_assets" funds={Assets} />
        <TableComponent key="table_liabilities" funds={Liabilities} />
    </div>
    )
}