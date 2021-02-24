import React from 'react';
import ClassNames from 'classnames';

const SelectCustom = ({field, form: {register, errors, registerObject}, label, errorMessages, options}) => {
    return (
        <div className="form-group">
            <label htmlFor={field}>
                {label} :
            </label>
            <select className={ClassNames('custom-select', {"is-invalid": errors[field]})} id={field}
                    key={field}
                    name={field}
                    ref={register(registerObject)}>

                {options !== undefined &&
                options.map((option,index) => {
                 return    <option key={ index} value={option.value}>{option.text}</option>

                })}
            </select>

            {errors[field] && errors[field].type === "required" &&
            <p className=" p-2 invalid-feedback fa fa-exclamation-triangle">
                {errorMessages &&
                label + errorMessages[errors[field].type]}
            </p>
            }
        </div>
    );
};

export default SelectCustom;