import React from "react";
import PropTypes from "prop-types";
import {CRow, CCol, CFormInput, CFormLabel, CTableRow, CTableDataCell} from '@coreui/react';
import { CurrencySymbols } from "../util/constants";

const TableRowComponentTypes = {
    fundName: PropTypes.string.isRequired,
    fundAmount: PropTypes.number.isRequired,
    fundType: PropTypes.string.isRequired,
    fundTypeIdx: PropTypes.number.isRequired,
    fundIdx: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    updateFund: PropTypes.func.isRequired,
}

const TableRowComponent = (props) => {
    const {fundName, fundAmount, fundType, fundTypeIdx, fundIdx, currency, updateFund} = props;

    return (
        <CTableRow>
            <CTableDataCell key={fundName}>{fundName}</CTableDataCell>
            <CTableDataCell>
                <CRow>
                    <CFormLabel htmlFor={fundName} className="col-sm-2 col-form-label">
                        {CurrencySymbols[currency]}
                    </CFormLabel>
                    <CCol sm={10}>
                        <CFormInput 
                        id={fundName}
                        key={fundName}
                        type="number"
                        placeholder="Enter Value..."
                        value={fundAmount}
                        fundType={fundType}
                        fundTypeIdx={fundTypeIdx}
                        fundIdx={fundIdx}
                        onChange={updateFund}
                        />
                    </CCol>
                </CRow>
            </CTableDataCell>
        </CTableRow>
    )
}

TableRowComponent.propTypes = TableRowComponentTypes;

export default TableRowComponent;