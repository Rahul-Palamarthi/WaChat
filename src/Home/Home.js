import { useState, useRef, useEffect } from "react";
import "./Home.css";
import { ReactComponent as SearchIcon } from "../assets/Images/SearchIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/Images/WhatsappIcon.svg";
import { ReactComponent as HistoryIcon } from "../assets/Images/HistoryIcon.svg";
import allDailCodes from "../Data/DailCode.json";
import { setLocalStroage } from "../Hooks/LocalStorage";

function Home() {
    const [dailCode, setDailCode] = useState({
        country: "India",
        code: "91",
    });
    const [searchDailCodes, setSearchDailCodes] = useState(allDailCodes);
    const num = useRef();
    const link = useRef();
    const dailCodesModal = useRef();
    const dailCodeSearch = useRef();
    const historyLink = useRef();
    const baseUrl = "https://wa.me/";

    useEffect(() => {
        const innerHeight = window.innerHeight;
        const body = document.body;
        body.style.height = `${innerHeight}px`;
    }, []);

    function handleOpenDailCode() {
        dailCodesModal.current.showModal();
        dailCodeSearch.current.blur();
    }
    function handleCloseDailCode() {
        dailCodesModal.current.close();
    }

    function handleDailCodeSearch(e) {
        const sortedDailCodes = allDailCodes.filter((val) =>
            val.country.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setSearchDailCodes(sortedDailCodes);
    }

    function handleDailCode(e) {
        const val = e.target.textContent.replace("+", "").split(" *");
        setDailCode((currState) => ({
            ...currState,
            country: val[1],
            code: val[0],
        }));
        dailCodesModal.current.close();
        dailCodeSearch.current.value = "";
        setSearchDailCodes(allDailCodes);
    }

    function handleStartChat() {
        const val = num.current.value;
        if (val === "") {
            alert("Enter Number");
            return;
        }
        setLocalStroage("contacts", `${dailCode.code}${val}`);
        link.current.href = `${baseUrl}${dailCode.code}${num.current.value}/?text=Hello%20World..`;
        link.current.click();
    }

    const handleHistory = () => {
        const history = document.querySelector(".history");
        history.classList.toggle("open");
    };

    return (
        <>
            <section className="home">
                <dialog ref={dailCodesModal} className="dail-codes">
                    <div className="dail-codes-wrapper">
                        <div className="dail-codes-info">
                            <h3>Select a dail code</h3>
                            <p
                                className="dail-codes-close-wrapper"
                                onClick={handleCloseDailCode}
                            ></p>
                        </div>
                        <div className="dail-code-search-wrapper">
                            <label htmlFor="dail-code-search">
                                <SearchIcon />
                            </label>
                            <input
                                ref={dailCodeSearch}
                                type="text"
                                className="dail-code-search"
                                id="dail-code-search"
                                placeholder="search here..."
                                onChange={handleDailCodeSearch}
                                autoComplete="off"
                            />
                        </div>
                        <div className="dail-code-options">
                            {searchDailCodes.map((val) => (
                                <p key={val.country} onClick={handleDailCode}>
                                    +
                                    <span className="dail-code-code">
                                        {val.code}
                                    </span>{" "}
                                    <span className="visibility">*</span>
                                    {val.country}
                                </p>
                            ))}
                        </div>
                    </div>
                </dialog>
                <div className="home-wrapper">
                    <div className="number-wrapper">
                        <p className="dail-code" onClick={handleOpenDailCode}>
                            +
                            <span className="dail-code-code">
                                {dailCode.code}
                            </span>{" "}
                            <span className="dail-code-country">
                                ({dailCode.country})
                            </span>
                        </p>
                        <p className="flex">
                            <input
                                ref={num}
                                className="number"
                                type="tel"
                                required
                                placeholder="Number"
                                autoComplete="off"
                            />
                        </p>
                    </div>
                    <div className="flex">
                        <button
                            className="chat-btn"
                            type="button"
                            onClick={handleStartChat}
                        >
                            <WhatsappIcon />
                            <span>Chat</span>
                        </button>
                        <button
                            className="history-btn"
                            type="button"
                            onClick={handleHistory}
                        >
                            <HistoryIcon />
                            <span>History</span>
                        </button>
                    </div>
                </div>
                <a ref={link} className="visibility" href={`https://wa.me/`}>
                    link
                </a>
                <a ref={historyLink} className="visibility" href={`#history`}>
                    link
                </a>
            </section>
        </>
    );
}

export default Home;
