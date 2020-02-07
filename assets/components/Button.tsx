import React from 'react'

interface Props {
    isSubmit: boolean;
    icon: string | undefined;
    text: string;
    className: string;
}

const Button: React.SFC<Props> = ({ isSubmit, icon, text, className }) => {
    return <button
        type="submit"
        className={`btn ${className} ${isSubmit ? "btn--disabled" : ""}`}
    >
        {(!isSubmit && (
            <>
                {icon && <svg>
                    <use xlinkHref={`../img/sprite.svg#icon-${icon}`} />
                </svg>}
                {text}
            </>
        )) || <>Loading...</>}
    </button>
}

export default Button;