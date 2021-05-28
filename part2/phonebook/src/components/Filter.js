import React from 'react'

const Filter = ({ filter, onChangeHandler }) =>
    <div>
        Filter shown with: <input value={filter} onChange={onChangeHandler} />
    </div>

export default Filter