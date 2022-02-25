import React from "react";
import PropTypes from "prop-types";
import {CTable, CTableBody, CTableRow, CTableDataCell} from '@coreui/react';
import TableRowComponent from "./TableRowComponent";

const TableComponentPropTypes = {
    funds : PropTypes.arrayOf(PropTypes.object).isRequired,
    currency: PropTypes.string.isRequired,
    fundType: PropTypes.string.isRequired,
    updateFund: PropTypes.func.isRequired,
}

const TableComponent = (props) => {
    const {funds, currency, fundType, updateFund} = props;

    return (
        <CTable striped bordered hover>
            <CTableBody>
                {funds.map((funding, fundTypeIdx) => 
                    <>
                        <CTableRow>
                            <CTableDataCell colSpan={2}><b>{funding.fundType}</b></CTableDataCell>
                        </CTableRow>
                        {
                            funding.fund.map((f, fundIdx) => 
                                <TableRowComponent 
                                    key={f.name} 
                                    fundName={f.name} 
                                    fundAmount={f.amount}
                                    fundType={fundType}
                                    fundTypeIdx={fundTypeIdx}
                                    fundIdx = {fundIdx}
                                    currency={currency} 
                                    updateFund={updateFund}/>
                            )
                        }
                    </>
                )}
            </CTableBody>
        </CTable>
    )
}

TableComponent.propTypes = TableComponentPropTypes;

export default TableComponent;