import React, { useState } from 'react';
import { useSelector } from 'react-redux';

/** Show Spot Form
 * 
 * Can be used fro editing/adding --- it just calls the parent with edit 
 * or cancel actions.
 */


function SpotForm(spot, save, cancel) {
    
    const [spotData, setSpotData] = useState({
        title: spot.title,
        type: spot.type,
    });

    function handleChange(evt) {
        const {name, value} = evt.target;
        setSpotData(data => ({
            ...data,
            [name]: value
        }));
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        save(spotData);
    }
    
    const cords = useSelector(store => store.coordinates);
    if (cords == null) {
        return (
            <div>
                fix this so that if page is refreshed that it remembers cords in state. 
            </div>
        )
    }

    
    return (
        <form className="mb-4" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="editform-title">Title:</label> 
                <input onChange={handleChange}
                        id="editform-title"
                        name="title"
                        className="form-control"
                        value={spotData.title} />
            </div>
            <div className="form-group">
                <label htmlFor="editform-type">Type:</label>
                <input onChange={handleChange}
                        id="editform-type" 
                        name="type"
                        className="form-control"
                        value={spotData.type} />
            </div>

            <button className="btn btn-primary mr-2">Save</button>
            <button onClick={cancel} className="btn btn-secondary">Cancel</button>

            
        </form>
    )
}
SpotForm.defaultProps = {
    post: {title: "", type: ""},
};

export default SpotForm