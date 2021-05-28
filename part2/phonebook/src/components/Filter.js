import React from 'react'

const Filter = ({ filter, onChangeHandler }) =>
    <div>
        Filter shown whith: <input value={filter} onChange={onChangeHandler} />
    </div>

export default Filter