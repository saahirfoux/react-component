import React from "react";

const ListItem = ({ data, isSelected, onClick, ItemComponent }) => {
    return (
        <div onClick={() => onClick(data._id, data)} key={data._id} className={isSelected ? 'selector_list-item-selected' : 'selector_list-item'}>
            <ItemComponent data={data} />
        </div>
    );
}
export default ListItem;

