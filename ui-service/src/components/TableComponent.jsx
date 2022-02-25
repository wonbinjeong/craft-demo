import React from "react";
import PropTypes from "prop-types";
import Table from 'react-bootstrap/Table'
import TableRowComponent from "./TableRowComponent"

const TableComponentPropTypes = {
    funds : PropTypes.arrayOf(PropTypes.object),
}

const TableComponent = (props) => {
    const {funds} = props;

    return (
        <Table striped bordered hover variant="dark">
            <thead></thead>
            <tbody>
                {funds.map((funding, index) => 
                    <>
                        <tr>
                            <td colSpan={2}><b>{funding.fundType}</b></td>
                        </tr>
                        {
                            funding.fund.map((f, index) => 
                                <TableRowComponent fundName={f.name} fundAmount={f.amount} />
                            )
                        }
                    </>
                )}
            </tbody>
        </Table>
    )
}

TableComponent.propTypes = TableComponentPropTypes;

export default TableComponent;