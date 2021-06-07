import React from 'react'

const PersonForm = ({
    onSubmitHandler,
    name,
    onChangeNameHandler,
    number,
    onChangeNumberHandler
}) => {
    return (
        <form onSubmit={onSubmitHandler}>
            <div>
                Name: <input value={name} onChange={onChangeNameHandler} />
            </div>
            <div>
                Number: <input value={number} onChange={onChangeNumberHandler} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>)
}

export default PersonForm