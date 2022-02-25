import { useState } from "react"
import { useEffect } from "react"
import CurrencyComponent from "../components/CurrencyComponent"
import TableComponent from "../components/TableComponent"
import axios from "axios";
import {Assets, Liabilities, CurrencySymbols} from "../util/constants"
import {CContainer, CRow, CCol, CFormLabel, CHeader} from "@coreui/react";
import ChartComponent from "../components/ChartComponent";

export default function Networth() {
    const [assets, setAssets] = useState(Assets);
    const [liabilities, setLiabilities] = useState(Liabilities)
    const [asset, setAsset] = useState(0.00);
    const [liability, setLiability] = useState(0.00);
    const [networth, setNetworth] = useState(0.00);
    const [currency, setCurrency] = useState("CAD")
    const [prevCurrency, setPrevCurrency] = useState("CAD");

    useEffect(() => {
        getNetworth();
    },[])

    useEffect(() => {
        const getConversion = async (currency) => {
            try {
                let response = await axios.post("http://localhost:8080/api/v0/currency", {
                    liabilities: liabilities,
                    assets: assets,
                    prevCurrency: prevCurrency,
                    currency: currency,
                })
                setAssets(response.data.assets);
                setLiabilities(response.data.liabilities);
                setAsset(response.data.asset);
                setLiability(response.data.liability);
                setNetworth(response.data.networth);
            } catch(err) {
                console.log(err);
                alert(err);
            }
        }

        getConversion(currency);
    }, [currency])

    const getNetworth = async () => {
        try {
            let response = await axios.post("http://localhost:8080/api/v0/networth", {
                liabilities: liabilities,
                assets: assets,
            })
            setAsset(response.data.asset);
            setLiability(response.data.liability);
            setNetworth(response.data.networth);
        } catch(err) {
            console.log(err);
            alert(err);
        }
    }

    const updateFundAmount = (event) => {
        let amount = event.target.value;
        let fundName = event.target.id;
        let fundType = event.target.getAttribute('fundType');
        let fundTypeIdx = event.target.getAttribute('fundTypeIdx');
        let fundIdx = event.target.getAttribute('fundIdx');

        switch(fundType) {
            case "asset":
                let copyAssets = [...assets];
                copyAssets[fundTypeIdx].fund[fundIdx] = {name: fundName, amount: parseInt(amount)};
                setAssets(copyAssets);
                break;
            case "liability":
                let copyLiabilities = [...liabilities];
                copyLiabilities[fundTypeIdx].fund[fundIdx] = {name: fundName, amount: parseInt(amount)};;
                setLiabilities(copyLiabilities);
                break;
            default:
                break;
        }

        getNetworth();
    }

    const updateCurrency = async (event) => {
        setPrevCurrency(currency)
        setCurrency(event.target.value)    
        getNetworth();  
    }

    return (
        <CContainer>
            <CRow className="py-2">
                <CCol sm={2} />
                <CCol sm={8} className="text-center">
                    <CFormLabel htmlFor="currencySelect">Select Currency: </CFormLabel>
                    <CurrencyComponent 
                        id="currencySelect" 
                        key="currency" 
                        currency={currency}
                        updateCurrency={updateCurrency} />
                </CCol>
                <CCol sm={2} />
            </CRow>
            <CRow className="py-2">
                <CCol>
                    <h3>Assets</h3>
                    <TableComponent key="table_assets" funds={assets} currency={currency} fundType="asset" updateFund={updateFundAmount}/>
                </CCol>
                <CCol>
                    <h3>Liabilities</h3>
                    <TableComponent key="table_liabilities" funds={liabilities} currency={currency} fundType="liability" updateFund={updateFundAmount}/>
                </CCol>
            </CRow>
            <CRow className="py-2">
                <CCol>
                    <CFormLabel htmlFor="asset"><h3>Total Asset:</h3></CFormLabel>
                    <h4 id="asset">{`${CurrencySymbols[currency]} ${asset}`}</h4>
                </CCol>
                <CCol>
                    <CFormLabel htmlFor="liability"><h3>Total Liability:</h3></CFormLabel>
                    <h4 id="liability">{`${CurrencySymbols[currency]} ${liability}`}</h4>
                </CCol>
                <CCol>
                    <CFormLabel htmlFor="networth"><h3>Net Worth: </h3></CFormLabel>
                    <h4 id="networth">{`${CurrencySymbols[currency]} ${networth}`}</h4>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <ChartComponent assets={assets} liabilities={liabilities} />
                </CCol>
            </CRow>
        </CContainer>
    )
}