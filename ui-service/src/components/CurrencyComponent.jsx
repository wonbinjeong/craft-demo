import PropTypes from "prop-types";
import {CFormSelect} from "@coreui/react"
import {Currencies, CurrencySymbols} from "../util/constants"

const CurrencyComponentPropTypes = {
    currency: PropTypes.string.isRequired,
    updateCurrency: PropTypes.func.isRequired,
}

const CurrencyComponent = (props) => {
    const {currency, updateCurrency} = props;
    return (
        <>
            <CFormSelect
                value={currency}
                onInput={updateCurrency}
            >
                {
                    Currencies.map((code, idx) => <option 
                            value={code}
                            key={idx}>
                                {`(${CurrencySymbols[code]}) ${code}`}
                        </option>)
                }
            </CFormSelect>
        </>
    );
}

CurrencyComponent.propTypes = CurrencyComponentPropTypes;

export default CurrencyComponent;