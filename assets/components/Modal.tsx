import React, { useState, useEffect, useRef } from 'react'

interface Props {
    isDisplayed: (value: boolean) => void;
    displayStatus: boolean;
    title: string;
    children: JSX.Element[] | JSX.Element;
    boxWidth: number;
}

const Modal: React.SFC<Props> = ({ isDisplayed, displayStatus, title, children, boxWidth }) => {
    const node: React.MutableRefObject<any> = useRef();
    const [opacity, setOpacity] = useState(0);
    const [transform, setTransform] = useState(
        "translate(-50%, -50%) scale(0.25)"
    );

    const handleClickOutside = (e: MouseEvent) => {
        if (node.current.contains(e.target)) {
            return;
        }
        isDisplayed(false);
    };

    useEffect(() => {
        setOpacity(1);
        setTransform("translate(-50%, -50%) scale(1)");

        if (displayStatus) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [displayStatus]);

    return (
        <div className="modal" style={{ opacity: opacity, visibility: "visible" }}>
            <div ref={node}
                className="modal__content"
                style={{ opacity: opacity, transform: transform, width: boxWidth + "%" }}
            >
                <button onClick={() => isDisplayed(false)} className="modal__close">
                    &times;
                </button>
                <div className="modal__body">
                    <h2 className="modal__title heading-2">{title}</h2>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Modal;