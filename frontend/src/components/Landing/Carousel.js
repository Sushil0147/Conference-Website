import React from "react";
import '../../index.css';
const Carousel = () => {
    return (
        <>
            <div id="myCarousel" className="carousel slide " data-bs-ride="carousel" style={{ height: "80vh" }}>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
                </div>
                <div className="carousel-inner" >
                    <div className="carousel-item" >

                        <img src="./images/bg1.jpg" className="bd-placeholder-img" alt="..." style={{ width: "100%", height: "80vh" }} />

                        <div className="container">
                            <div className="carousel-caption text-start ">
                                <h3 className=" text-white" style={{ boxShadow: " blue 0px 22px 70px 4px" }}>Advancing Technology for Humanity</h3>
                                <p className=" text-white" style={{ boxShadow: " blue 0px 22px 70px 4px" }}>IEEE and its members inspire a global community through highly cited publications, conferences, technology standards, and professional and educational activities, envisioning a sustainable future</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <img src="./images/bg2.png" className="bd-placeholder-img" alt="..." style={{ width: "100%", height: "80vh" }} />
                        <div className="container">
                            <div className="carousel-caption">
                                <h3 className=" text-white" style={{ boxShadow: " blue 0px 22px 70px 4px" }}>Advancing Technology for Humanity</h3>
                                <p className="text-white" style={{ boxShadow: " blue 0px 22px 70px 4px" }}>IEEE and its members inspire a global community through highly cited publications, conferences, technology standards, and professional and educational activities, envisioning a sustainable future</p>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="./images/bg3.jpg" className="bd-placeholder-img" alt="..." style={{ width: "100%", height: "80vh" }} />
                        <div className="container">
                            <div className="carousel-caption text-end">
                                <h3 className="text-white" style={{ boxShadow: " blue 0px 22px 70px 4px" }}>Advancing Technology for Humanity</h3>
                                <p className="text-white" style={{ boxShadow: "blue 0px 22px 70px 4px" }}>IEEE and its members inspire a global community through highly cited publications, conferences, technology standards, and professional and educational activities, envisioning a sustainable future</p>

                            </div>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}

export default Carousel;