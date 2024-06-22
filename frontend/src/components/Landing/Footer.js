import React from 'react';
// import './Footer.css';

const Footer = () => {
    return (
        <>

            <footer className="bd-footer py-5 mt-5 " style={{ backgroundColor: "#168aad" }}>
                <div className="container py-5 text-light">
                    <div className="row">
                        <div className="col-lg-3 mb-3">
                            <a style={{ color: "white" }} className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none" href="/" aria-label="Bootstrap">
                                <div className='col-3'>
                                    <h2 className='lead fw-bolder fs-2 text-light' style={{ textShadow: "-1px -1px 1px #111, 2px 2px 1px #363636" }}>C<i className='fw-medium'>360</i>C</h2>
                                </div>
                            </a>
                            <ul className="list-unstyled small text-light">
                                <li className="mb-2">Designed and built with all the love in the world by the <a style={{ color: "white" }} href="/docs/5.0/about/team/">Bootstrap team</a> with the help of <a style={{ color: "white" }} href="https://github.com/twbs/bootstrap/graphs/contributors">our contributors</a>.</li>
                                <li className="mb-2">Code licensed <a style={{ color: "white" }} href="https://github.com/twbs/bootstrap/blob/main/LICENSE" target="_blank" rel="license noopener">MIT</a>, docs <a style={{ color: "white" }} href="https://creativecommons.org/licenses/by/3.0/" target="_blank" rel="license noopener">CC BY 3.0</a>.</li>
                                <li className="mb-2">Currently v5.0.2.</li>
                                <li className="mb-2">Analytics by <a style={{ color: "white" }} href="https://usefathom.com/ref/ADZSBE" target="_blank" rel="noopener">Fathom</a>.</li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-2 text-light offset-lg-1 mb-3">
                            <h5>Links</h5>
                            <ul className="list-unstyled ">
                                <li className="mb-2"><a style={{ color: "white" }} href="/">Home</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/">Docs</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/examples/">Examples</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://themes.getbootstrap.com/">books</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://blog.getbootstrap.com/">Blog</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://cottonbureau.com/people/bootstrap">Swag Store</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-2 mb-3">
                            <h5>Guides</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/getting-started/">Getting started</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/examples/starter-template/">Starter template</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/getting-started/webpack/">Webpack</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="/docs/5.0/getting-started/parcel/">Parcel</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-2 mb-3">
                            <h5>Projects</h5>
                            <ul className="list-unstyled ">
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/bootstrap">Bootstrap 5</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/bootstrap/tree/v4-dev">Bootstrap 4</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/icons">Icons</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/rfs">RFS</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/bootstrap-npm-starter">npm starter</a></li>
                            </ul>
                        </div>
                        <div className="col-6 col-lg-2 mb-3">
                            <h5>Community</h5>
                            <ul className="list-unstyled">
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/bootstrap/issues">Issues</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/twbs/bootstrap/discussions">Discussions</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://github.com/sponsors/twbs">Corporate sponsors</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://opencollective.com/bootstrap">Open Collective</a></li>
                                <li className="mb-2"><a style={{ color: "white" }} href="https://stackoverflow.com/questions/tagged/bootstrap-5">Stack Overflow</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    );
};

export default Footer;