import {CChart} from "@coreui/react-chartjs"
import PropTypes from "prop-types";
import { useEffect } from "react";
import { useState } from "react";

const ChartComponentPropTypes = {
    assets: PropTypes.array.isRequired,
    liabilities: PropTypes.array.isRequired,
}

const ChartComponent = (props) => {
    const {assets, liabilities} = props;
    const [labels, setLabels] = useState([]);
    const [datasets, setDatasets] = useState([]);

    useEffect(() => {
        parseFundArray();
    },[])

    const parseFundArray = () => {
        let totalLabels = [];

        assets.forEach(funding => funding.fund.forEach(fund => totalLabels.push(fund.name)));
        liabilities.forEach(funding => funding.fund.forEach(fund => totalLabels.push(fund.name)));

        let data1 = [];
        let data2 = [];
        assets.forEach(funding => funding.fund.forEach(fund => data1.push(fund.amount)));
        liabilities.forEach(funding => funding.fund.forEach(fund => data2.push(fund.amount)));

        let dataSets = [
            {
                label: "Assets",
                backgroundColor: "green",
                data: data1,
            },
            {
                label: "Liabilities",
                backgroundColor: "red",
                data: data2,
            }
        ]

        setLabels(totalLabels);
        setDatasets(dataSets)
    }

    return (
        <CChart
            type="bar"
            data={{
                labels: labels,
                datasets: datasets,
            }}
        />
    )
}

ChartComponent.propTypes = ChartComponentPropTypes;

export default ChartComponent;