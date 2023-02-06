import "./Styles/Header.css";

function Header() {
    return (
        <>
            <header>
                <div className="header-wrapper">
                    <a href="/">WaChat</a>
                    <p className="header-intro">
                        Chat with <span className="violet">anyone</span> with
                        ease
                    </p>
                </div>
            </header>
        </>
    );
}

export default Header;
