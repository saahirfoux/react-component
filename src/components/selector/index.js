import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { List, Item } from './children';
import { v4 as uuidv4 } from 'uuid';
import { imagesEnum, capitalizeFirstLetter } from '../../utilities';

const ImageItemComponent = ({data}) => {
    return (
        <div>
            <img className={"selector_list-item-image"} src={data.img}/>
            <span>{capitalizeFirstLetter(data.name)}</span>
        </div>
    )
}

const TextItemComponent = ({data}) => {
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span>{capitalizeFirstLetter(data.name)}</span>
        </div>
    )
}

const Selector = () => {
    // when false data is still loading
    const [data, setData] = useState(false);
    const [source, setSource] = useState([]);
    const [target, setTarget] = useState([]);
    const [sourceSelections, setSourceSelections] = useState([]);
    const [targetSelections, setTargetSelections] = useState([]);
    const [sourceFilter, setSourceFilter] = useState('');
    const [targetFilter, setTargetFilter] = useState('');

    const moveAllSource = () => {
        setTarget(data);
        setSource([]);
    }
    const moveAllTargets = () => {
        setSource(data);
        setTarget([]);
    }
    const moveSourceSelections = () => {
        setSource(data.filter((item) => !sourceSelections.includes(item._id)));
        setTarget([...target, ...data.filter((item) => sourceSelections.includes(item._id))]);
    }
    const moveTargetSelections = () => {
        setTarget(target.filter((item) => !targetSelections.includes(item._id)));
        setSource([...source, ...target.filter((item) => targetSelections.includes(item._id))]);
    }
    
    const selectSourceItem = (id) => {
        const updatedSelections = sourceSelections.includes(id) ? sourceSelections.filter(s => s !== id) : [...sourceSelections, id];
        setSourceSelections(updatedSelections)
    }
    const selectTargetItem = (id) => {
        const updatedSelections = targetSelections.includes(id) ? targetSelections.filter(t => t !== id) : [...targetSelections, id];
        setTargetSelections(updatedSelections)
    }
    
    const fetchListData = async () => {
        return await axios.get('https://pokeapi.co/api/v2/pokemon-species/?limit=13')
            .then(res => {
                return res.data.results
            })
            .catch(err => {
                return []
            });
    }
    
    useEffect(() => {
        fetchListData().then(data => {
            data = data.map((item) => {
                item._id = uuidv4();
                item.img = imagesEnum[item.name] || false;
                return item;
            });
            setData(data);
            setSource(data);
            setTarget([]);
        });
    }, [])

    if (data === false) {
        return (<h2>Loading</h2>);
    }

    return (
        <div className='selector_container'>
            <div className='selector_container-left'>
                <List className='selector_list'>
                    <div className='selector_list-filter'>
                        <input type='text' placeholder='Filter' value={sourceFilter} onChange={(e) => setSourceFilter(e.target.value)} />
                    </div>
                    {source
                        .filter((item) => item.name.toLowerCase().includes(sourceFilter.toLowerCase()))
                        .map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    data={item}
                                    isSelected={sourceSelections.includes(item._id)}
                                    onClick={selectSourceItem}
                                    ItemComponent={imagesEnum[item.name] ? ImageItemComponent : TextItemComponent}
                                />
                            )
                        })
                    }
                </List>
                <div className='selector_list-buttons'>
                    <button className='selector_list-button-selections' onClick={moveSourceSelections}>Selected <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                    </button>
                    <button className='selector_list-button-all' onClick={moveAllSource}>All <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg></button>
                </div>
            </div>
            <div className='selector_container-right'>
                <List className='selector_list'>
                    <div className='selector_list-filter'>
                        <input type='text' placeholder='Filter' value={targetFilter} onChange={(e) => setTargetFilter(e.target.value)} />
                    </div>
                    {target
                        .filter((item) => {return item.name.toLowerCase().includes(targetFilter.toLowerCase())})
                        .map((item) => {
                            return (
                                <Item
                                    key={item._id}
                                    data={item}
                                    isSelected={targetSelections.includes(item._id)}
                                    onClick={selectTargetItem}
                                    ItemComponent={item.img ? ImageItemComponent : TextItemComponent}
                                />
                            )
                        })
                    }
                </List>
                <div className='selector_list-buttons'>
                    <button className='selector_list-button-selections' onClick={moveTargetSelections}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                        Selected
                    </button>
                    <button className='selector_list-button-all' onClick={moveAllTargets}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                        </svg>
                        All
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Selector;