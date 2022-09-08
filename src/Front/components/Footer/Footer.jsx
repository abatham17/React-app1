import React, { Component } from 'react';

class Footer extends Component {
    render(){
        return (
            <footer className={"footer" + (this.props.transparent !== undefined ? " footer-transparent":"")}>
                <div className={"container" + (this.props.fluid !== undefined ? "-fluid":"")}>
                    {/*<nav className="pull-left">
                        <ul>
                            <li>
                                <a href="#pablo">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Company
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Portfolio
                                </a>
                            </li>
                            <li>
                                <a href="#pablo">
                                    Blog
                                </a>
                            </li>
                        </ul>
                    </nav>*/}
                    <p className="copyright pull-right">
                        &copy; {1900 + (new Date()).getYear()} 
                        <a href="http://practice-aid.com" target="_blank" rel="noopener noreferrer">PracticAid</a>, Powered by <i className="fa fa-globe heart"></i> Synergytop Soft Lab. 
                        <a href="http://synergytop.com" target="_blank" rel="noopener noreferrer"><i className="fa fa-external-link-square"></i></a>
                    </p>
                </div>
            </footer>
        );
    }
}
export default Footer;
