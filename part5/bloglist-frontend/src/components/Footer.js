import React from 'react'

const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }
    return (
      <div style={footerStyle}>
        <br />
        <hr />
        <em>Blog app, by GreenVan.<br/>
             FullStackOpen course at 
            University of Helsinki 2021</em>
      </div>
    )
  }

  export default Footer