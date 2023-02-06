import { useState, useRef } from "react";
import "./Home.css";
import { ReactComponent as SearchIcon } from "../assets/Images/SearchIcon.svg";
import { ReactComponent as WhatsappIcon } from "../assets/Images/WhatsappIcon.svg";
import allDailCodes from "../Data/DailCode.json";

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
    const baseUrl = "https://wa.me/";

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
        link.current.href = `${baseUrl}${dailCode.code}${num.current.value}/?text=Hello%20World..`;
        link.current.click();
    }

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
                                placeholder="Enter Number"
                                autoComplete="off"
                            />
                        </p>
                    </div>
                    <button
                        className="start-chat-btn"
                        type="button"
                        onClick={handleStartChat}
                    >
                        <WhatsappIcon />
                        <span>Start Chat</span>
                    </button>
                </div>
                <a ref={link} className="visibility" href={`https://wa.me/`}>
                    link
                </a>
            </section>
        </>
    );
}

export default Home;
