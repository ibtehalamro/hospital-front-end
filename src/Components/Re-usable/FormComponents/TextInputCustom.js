import React from 'react';
import ClassNames from 'classnames';

const TextInputCustom = ({field, form: {register, errors, registerObject}, label, errorMessages, onChange}, placeHolder,defaultValue) => {

    return (
        <div className="form-group text-input-wrapper">

            <label htmlFor={field}>
                {label}:
            </label>
            <input className={ClassNames('text-input', {"is-invalid": errors[field]})}
                   key={field}
                   name={field}
                   ref={register(registerObject)}
                   onChange={onChange}
                   placeholder={typeof placeHolder === "object" ? '' : placeHolder}

            />
            {errors[field] && errors[field].type === "required" &&
            <p className=" invalid-feedback">
                {errorMessages &&
                label + errorMessages[errors[field].type]}
            </p>
            }

            {errors[field] && errors[field].type === "minLength" &&
            <p className=" invalid-feedback">
                {errorMessages &&
                label + errorMessages[errors[field].type]}
            </p>
            }

            {errors[field] && errors[field].type === "invalid" &&
            <p className=" invalid-feedback">
                {errorMessages &&  errors[field].message}
            </p>
            }
        </div>
    );
};

export default TextInputCustom;