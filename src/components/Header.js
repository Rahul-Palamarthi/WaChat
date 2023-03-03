import { useRef } from "react";
import "./Styles/Header.css";

function About({ about }) {
    return (
        <>
            <section ref={about} className="about">
                <div className="about-wrapper">
                    <h1>Hello world</h1>
                    <div className="close-btn"></div>
                </div>
            </section>
        </>
    );
}

function Header() {
    const about = useRef();
    const handleHandburgerMenu = () => {
        about.current.classList.toggle("open-about");
    };

    return (
        <>
            <header>
                <About about={about} />
                <div className="header-wrapper">
                    <a href="/">WaChat</a>
                    {/* <div
                        className="handburger-menu"
                        onClick={handleHandburgerMenu}
                    >
                        <p className="bar1"></p>
                        <p className="bar2"></p>
                    </div> */}
                </div>
            </header>
        </>
    );
}

export default Header;
