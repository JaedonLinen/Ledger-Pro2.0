import React from 'react'

function statementDoc({option, dateStart, dateEnd}) {
  return (
    <div>
      <p>{option}</p>
      <p>{dateStart}</p>
      <p>{dateEnd}</p>
    </div>
  )
}

export default statementDoc