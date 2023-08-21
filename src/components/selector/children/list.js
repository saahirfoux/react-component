import React from "react";

const List = ({ children }) => {
    // if the Filter is the only child of the list
    if (React.Children.count(children) === 1) {
        return (
            <div className={"selector_list"}>
                <div key={0} className={'selector_list-empty'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <p>No Items Remaining</p>
                </div>
            </div>
        )
    }
    return (
        <div className={"selector_list"}>{children}</div>
    );
}
export default List;