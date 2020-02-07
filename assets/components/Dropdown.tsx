import React, { useRef, useEffect } from 'react'

interface Props {
    isDisplayed: (value: boolean) => void;
    displayStatus: boolean;
    children: JSX.Element[] | JSX.Element;
}

const Dropdown: React.SFC<Props> = ({ isDisplayed, displayStatus, children }) => {
    const node: React.MutableRefObject<any> = useRef();

    const handleClickOutside = (e: any) => {
        if (node.current.contains(e.target)) {
            return;
        }
        isDisplayed(false);
    };

    useEffect(() => {
        if (displayStatus) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [displayStatus]);

    return <div ref={node} className="dropdown__menu">
        {children}
    </div>
}

export default Dropdown;