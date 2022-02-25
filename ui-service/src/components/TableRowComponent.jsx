import React from "react";
import PropTypes from "prop-types";

const TableRowComponentTypes = {
    fundName: PropTypes.string.isRequired,
    fundAmount: PropTypes.number.isRequired,
}

const TableRowComponent = (props) => {
    const {fundName, fundAmount} = props;

    return (
        <tr>
            <td key={fundName}>{fundName}</td>
            <td>
                <input 
                    key={fundName + fundAmount}
                    type="number"
                    placeholder="Enter Value..."
                    value={fundAmount}
                />
            </td>
        </tr>
    )
}

TableRowComponent.propTypes = TableRowComponentTypes;

export default TableRowComponent;