const Card = () => {
    return (

        <>
            <div className="container my-5">

                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                    <div className="col border border-2 p-3 text-white rounded " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                        <h1 className="fs-2
         fw-bold lh-1 mb-3">Call For Paper</h1>
                        <p className="lead">The 16th Asian Conference  on Education </p>
                        <p className="lead text-white "><i>Nov 26-29,2024 | Join us in Tokyo,Japan and Online</i></p>
                        <div className="d-grid  d-md-flex justify-content-md-start">
                            <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                        </div>
                    </div>
                    <div className="col border border-2 p-3 text-white rounded " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                        <h1 className="fs-2 fw-bold lh-1 mb-3">About Institute</h1>
                        <p className="lead">The 16th Asian Conference  on Education </p>
                        <p className="lead text-white "><i>Nov 26-29,2024 | Join us in Tokyo,Japan and Online</i></p>
                        <div className="d-grid  d-md-flex justify-content-md-start">
                            <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                        </div>
                    </div>
                    <div className="col border border-2 p-3 text-white rounded " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                        <h1 className="fs-2 fw-bold lh-1 mb-3">Organizing committee</h1>
                        <p className="lead">The 16th Asian Conference  on Education </p>
                        <p className="lead text-white "><i>Nov 26-29,2024 | Join us in Tokyo,Japan and Online</i></p>
                        <div className="d-grid  d-md-flex justify-content-md-start">
                            <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                        </div>
                    </div>

                </div>
            </div>

            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
                    <div className="col card-item " >
                        <div className="card text-center  " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                            <img className="card-img-top" src="./images/c1.png" style={{ height: "30vh", width: "100%" }} />
                            <div className="card-body text-white">
                                <h5 className="card-title fs-3">Special title treatment</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className="d-grid  d-md-flex justify-content-md-start">
                                    <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col card-item " >
                        <div className="card text-center  " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                            <img className="card-img-top" src="./images/c1.png" style={{ height: "30vh", width: "100%" }} />
                            <div className="card-body text-white">
                                <h5 className="card-title fs-3">Special title treatment</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className="d-grid  d-md-flex justify-content-md-start">
                                    <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col card-item " >
                        <div className="card text-center  " style={{ backgroundColor: "#168aad", boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset" }}>
                            <img className="card-img-top" src="./images/c1.png" style={{ height: "30vh", width: "100%" }} />
                            <div className="card-body text-white">
                                <h5 className="card-title fs-3">Special title treatment</h5>
                                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                <div className="d-grid  d-md-flex justify-content-md-start">
                                    <button type="button" className="btn btn-outline-light btn-lg w-100 my-3 px-4 me-md-2">more</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;