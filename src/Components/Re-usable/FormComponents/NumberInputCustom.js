import React from 'react';
import ClassNames from 'classnames';


const NumberInputCustom = ({field, form: {register, errors, registerObject}, label, errorMessages, onChange}) => {
    return (
        <div className="form-group">
            <label htmlFor={field}>
                {label} :
            </label>
            <input className={ClassNames('form-control', {"is-invalid": errors[field]})}
                   key={field}
                   name={field}
                   ref={register(registerObject)}
                   onChange={onChange}
                   type="number"
            />
            {errors[field] && errors[field].type === "required" &&
            <p className=" p-2 invalid-feedback fa fa-exclamation-triangle">
                {errorMessages &&
                label + errorMessages[errors[field].type]}
            </p>
            }
        </div>
    );
};

export default NumberInputCustom;
/*
* Example to use it
   <NumberInputCustom field="socialNumber" label="Social Number" errorMessages={messages}
                                       form={{register, errors}}/>
* */