import axios from "axios";

export const calculateNetworth = async (req, res) => {
    try {
        const {liabilities, assets} = req.body;

        if (liabilities === undefined || assets === undefined) {
            return res.status(400).send("Invalid data");
        }
        
        let asset = 0;
        assets.forEach(fundType => {
            fundType.fund.forEach(fund => {
                asset += fund.amount
            })
        })

        let liability = 0;
        liabilities.forEach(fundType => {
            fundType.fund.forEach(fund => {
                liability += fund.amount
            })
        })

        res.status(200).json({asset: asset, liability: liability, networth: asset - liability})
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
}

export const calculateNetworthWithCurrency = async (req, res) => {
    try {
        const {liabilities, assets, currency, prevCurrency} = req.body;

        if (liabilities === undefined || assets === undefined 
            || currency === undefined || prevCurrency === undefined) {
                return res.status(400).send("Invalid data");
            }   

        // let response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=96954540-9607-11ec-8b07-a393a4ccad8e&base_currency=${prevCurrency}`);
        // let conversion = response.data.data[currency];
        let conversion = await getConversion(prevCurrency, currency);

        let asset = 0;
        assets.forEach(fundType => {
            fundType.fund.forEach(fund => {
                fund.amount = Math.round(fund.amount * conversion * 100) / 100;
                asset += fund.amount;
            })
        })

        let liability = 0;
        liabilities.forEach(fundType => {
            fundType.fund.forEach(fund => {
                fund.amount = Math.round(fund.amount * conversion * 100) / 100;
                liability += fund.amount;
            })
        })

        asset = Math.round(asset * 100) / 100;
        liability = Math.round(liability * 100) / 100;
        let networth = Math.round((asset-liability) * 100) / 100;

        res.status(200).json({
            assets: assets, 
            liabilities: liabilities, 
            asset: asset, 
            liability: liability, 
            networth: networth,
        })
    } catch(err) {
        console.log(err)
        res.status(500).send(err);
    }
}

export const getConversion = async (prevCurrency, currency) => {
    try {
        let response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=96954540-9607-11ec-8b07-a393a4ccad8e&base_currency=${prevCurrency}`);
        return response.data.data[currency]
    } catch(err) {
        console.log(err);
    }
}