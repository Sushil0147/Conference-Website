import React from 'react'

const NotFound = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center" style={{ width: "100vw", height: "100vh" }}>
                <div className="m-5 text-center  bg-light bg-gradient shadow-lg rounded-5">
                    <img src="/images/error.png" width={"100%"} alt="" ></img>
                    <h1 className="fw-bold">404</h1>
                    <p className="lead">The Page you are looking for doesn't exist or any error occurred.</p>
                </div>
            </div>
        </>
    )
}

export default NotFound;