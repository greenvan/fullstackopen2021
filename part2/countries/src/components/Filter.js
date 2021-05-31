import React from 'react'

const Filter = ({ filter, onChangeHandler }) =>
    <div>
        Find countries with: <input value={filter} onChange={onChangeHandler} />
    </div>

export default Filter