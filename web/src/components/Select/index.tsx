import React, {SelectHTMLAttributes, useEffect} from "react";

import "./styles.css";

interface OptionProps {
    value: string;
    label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: OptionProps[];
    blankOption?: boolean;
}

function Select({label, name, options, blankOption, ...props}: SelectProps) {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select {...props} id={name}>
                {blankOption && (  <option selected value="" disabled>Selecione uma opção</option>)}
                {
                    options.map(({label, value}) => (
                        <option key={label} value={value}>{label}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default Select;
