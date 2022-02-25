import axios from "axios";

export const calculateNetworth = async (req, res, next) => {
    try {
        const {liability, asset} = req.body;

        res.status(200).json({asset: asset, liability: liability, networth: asset - liability})
    } catch(err) {
        next(err);
    }
}

export const calculateNetworthWithCurrency = async (req, res, next) => {
    try {
        const {liability, asset, currency, prevCurrency} = req.body;

        let response = await axios.get(`https://freecurrencyapi.net/api/v2/latest?apikey=96954540-9607-11ec-8b07-a393a4ccad8e&base_currency=${prevCurrency}`);
        // let conversion = response.data[currency];
        let conversion = response.data["USD"];

        let convertedLiability = liability * conversion;
        let convertedAsset = asset * conversion;
        let networth = convertedAsset - convertedLiability;

        console.log("HERE");
        console.log(liability);
        console.log(convertedLiability);
        console.log(asset);
        console.log(convertedAsset);
        console.log(networth);

        res.status(200).json({asset: convertedAsset, liability: convertedLiability, networth: networth})
    } catch(err) {
        next(err);
    }
}