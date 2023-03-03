import { useEffect, useState } from "react";
import "./History.css";
import { ReactComponent as WhatsappIcon } from "../assets/Images/WhatsappIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/Images/PhoneIcon.svg";
import { ReactComponent as DeleteIcon } from "../assets/Images/DeleteIcon.svg";
import { getLocalStorage } from "../Hooks/LocalStorage";

function HistoryCard({ contacts }) {
    const baseUrl = "https://wa.me/";

    useEffect(() => {
        const header = document.querySelector("header");
        const home = document.querySelector(".home");
        const history = document.querySelector(".history");
        const totalHeight = window.innerHeight;

        const height = totalHeight - (header.offsetHeight + home.offsetHeight);
        history.style.height = height + "px";
        history.style.bottom = 20 + "px";
    }, []);

    // async function copyText({ num }) {
    //     try {
    //         await navigator.clipboard.writeText(num);
    //     } catch (err) {
    //         console.log("failed to copy: ", err);
    //     }
    // }

    return contacts.map((val) => (
        <div className="contact-card" key={val.id}>
            <p className="phone-num">+{val.num}</p>
            <div className="contact-card-options">
                <a href={`${baseUrl}${val.num}`}>
                    <WhatsappIcon />
                </a>
                <a href={`tel:${val.num}`}>
                    <PhoneIcon />
                </a>
            </div>
        </div>
    ));
}

function History() {
    const [contacts, setContacts] = useState(getLocalStorage("contacts"));

    function clearHistory() {
        localStorage.setItem("contacts", JSON.stringify([]));
        setContacts([]);
    }

    return (
        <>
            <section className="history" id="history">
                <div className="history-wrapper">
                    <div className="history-heading-wrapper">
                        <p>History</p>
                        <p className="clear-all" onClick={clearHistory}>
                            <DeleteIcon />
                        </p>
                    </div>
                    <div className="history-card-wrapper">
                        {contacts.length === 0 ? (
                            <p className="no-chats">No Chats</p>
                        ) : (
                            <>
                                <HistoryCard contacts={contacts} />
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default History;
