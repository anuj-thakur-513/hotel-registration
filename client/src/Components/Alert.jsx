import React, { useContext } from 'react'
import { alertContext } from '../Context/AlertContext'

const Alert = () => {
  const { alert } = useContext(alertContext)

  return (
    <div style={{ position: 'absolute', top: '56px', width: '100%' }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible role="alert"`}
        >
          <strong>{alert.type === 'danger' ? 'Removed' : alert.type}</strong>:{' '}
          {alert.msg}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}
    </div>
  )
}

export default Alert
