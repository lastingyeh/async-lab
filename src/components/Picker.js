import React, {PropTypes} from 'react'
import {Flex} from 'react-flex'
import 'react-flex/index.css';

const Picker = ({value, onChange, options}) => (
    <Flex row alignItems='center'>
        <select onChange={e => onChange(e.target.value) }
                value={value}
                className="selectStyle">
            {options.map(option =>
                <option value={option} key={option}>
                    {option}
                </option>)
            }
        </select>
        <h5>{`selected value : ${value}`}</h5>
    </Flex>
)

Picker.propTypes = {
    options: PropTypes.arrayOf(
        PropTypes.string.isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default Picker