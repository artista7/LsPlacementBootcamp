import React, { Component } from 'react';
import './LandingPage.css';
import ravi from '../../assets/img/team/Ravi.jpg';
import shubham from '../../assets/img/team/Shubham.jpeg';
import './navBarScroll';
import brochure from '../../assets/Learning-sage.pdf';

class LandingPage extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                    <div className="container">
                        <a className="js-scroll-trigger" id="logo" style={{ color: "white", fontWeight: "bold", fontSize: "18px" }} href="#page-top">Learning-Sage</a>
                        <button className="navbar-toggler navbar-toggler-right collapsed" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            {/* <span className="navbar-toggler-icon"></span> */}
                            <a className="js-scroll-trigger" id="logo" style={{ color: "#F05F40", fontWeight: "bold", fontSize: "18px" }} href="#page-top">Learning-Sage</a>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#services">Services</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#about">About us</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link js-scroll-trigger" href="#contact">Contact us</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <header className="masthead text-center text-white d-flex">
                    <div className="container my-auto">
                        <div className="row">
                            <div className="col-lg-10 mx-auto">
                                <h1 className="text-uppercase">
                                    <strong>Helping Institutes achieve 100% placements</strong>
                                </h1>
                                <hr />
                                <div className="col-lg-8 mx-auto">
                                    <p className="mb-5">We help students transition from student life to professional life by imparting necessary education to bridge industry/college skill gap</p>
                                    <a className="btn btn-primary btn-xl js-scroll-trigger" href="#services">Find Out More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="services">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h2 className="section-heading">Our Services</h2>
                                <hr className="my-4" />
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-pencil text-primary mb-3 sr-icon-1"></i>
                                    <h3 className="mb-3">Study & Info Sessions</h3>
                                    <p className="text-muted mb-0">Sessions on soft. dev, consultancy, finance, PM & soft skills</p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-file text-primary mb-3 sr-icon-2"></i>
                                    <h3 className="mb-3">CV Evaluation</h3>
                                    <p className="text-muted mb-0">One-to-one resume feedback sessions</p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-code text-primary mb-3 sr-icon-3"></i>
                                    <h3 className="mb-3">Interview Preparation</h3>
                                    <p className="text-muted mb-0">One-to-one interviews for different profiles</p>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-users text-primary mb-3 sr-icon-4"></i>
                                    <h3 className="mb-3">Group Discussions</h3>
                                    <p className="text-muted mb-0">Sessions to impart successful GD skills</p>
                                </div>
                            </div>
                            {/* <div className="col-lg-2 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-puzzle-piece text-primary mb-3 sr-icon-4"></i>
                                    <h3 className="mb-3">Puzzles & Guesstimates</h3>
                                    <p className="text-muted mb-0">You have to make your websites with love these days!</p>
                                </div>
                            </div> */}
                            <div className="col-lg-3 col-md-6 text-center">
                                <div className="service-box mt-5 mx-auto">
                                    <i className="fa fa-4x fa-black-tie text-primary mb-3 sr-icon-4"></i>
                                    <h3 className="mb-3">Meet Industry experts</h3>
                                    <p className="text-muted mb-0">Interactions with industry experts to gain deeper insight</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{ marginTop: "45px" }}>
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <a className="btn btn-primary btn-xl js-scroll-trigger" href={brochure} download>Download Brochure</a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-dark text-white" style={{ backgroundColor: "white" }} id="about">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center">
                                <h2 className="section-heading">About us</h2>
                                <hr className="light my-4" />
                                <div className="row">
                                    <div className="col-sm-4">
                                        <div className="service-box mt-5 mx-auto">
                                            <img src={ravi} height="230" width="223px" style={{ borderRadius: "1.5%" }} alt="Ravi Ranjan is missing"></img>
                                            <div style={{ marginTop: "10px", fontSize: "25px" }}>Ravi Ranjan</div>
                                            <div style={{ marginTop: "5px", fontSize: "15px" }}>Co-Founder</div>
                                            <p style={{ marginTop: "5px", fontSize: "15px" }}>An Alumni of IITD & a big-data expert, he is currently pursuing his MBA from IIM A</p>
                                        </div>
                                    </div>

                                    <div className="col-sm-4"></div>
                                    <div className="col-sm-4">
                                        <div className="service-box mt-5 mx-auto">
                                            <img src={shubham} height="230" width="223px" style={{ borderRadius: "1.5%" }} alt="Shubham is missing"></img>
                                            <div style={{ marginTop: "10px", fontSize: "25px" }}>Shubham Gupta</div>
                                            <div style={{ marginTop: "5px", fontSize: "15px" }}>Co-Founder</div>
                                            <p style={{ marginTop: "5px", fontSize: "15px" }}>An Alumni of IITD & an ex-citi employee he likes solving problems with technology</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="contact" className="">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto text-center">
                                <h2 className="section-heading">Let's Get In Touch!</h2>
                                <hr className="my-4" />
                                <p className="mb-5">Ready to start your next project with us? That's great! Give us a call or send us an email and we will get back to you as soon as possible!</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-4 ml-auto text-center">
                                <a href="tel:+919582819710"><i className="fa fa-phone fa-3x mb-3 sr-contact-1"></i></a>
                                <p>
                                    <a href="tel:+919582819710">+91-9582819710</a> / <a href="tel:+918789443040">8789443040</a>
                                </p>
                            </div>
                            <a href="mailto:info@learning-sage.com" className="col-lg-4 mr-auto text-center">
                                <i className="fa fa-envelope fa-3x mb-3 sr-contact-2"></i>
                                <p>
                                    info@learning-sage.com
                                </p>
                            </a>
                            <a href="https://www.linkedin.com/company/learning-sage" target="_blank" rel="noopener noreferrer" className="col-lg-4 mr-auto text-center">
                                <i className="fa fa-linkedin fa-3x mb-3 sr-contact-2"></i>
                                <p>
                                    linkedin
                                </p>
                            </a>
                        </div>
                    </div>
                </section>
            </div >
        );
    }
}

LandingPage.propTypes = {

};

export default LandingPage;