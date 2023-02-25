import { useState } from "react";
import "./History.css";
import { ReactComponent as WhatsappIcon } from "../assets/Images/WhatsappIcon.svg";
import { ReactComponent as PhoneIcon } from "../assets/Images/PhoneIcon.svg";
import { ReactComponent as CopyIcon } from "../assets/Images/CopyIcon.svg";
import { getLocalStorage } from "../Hooks/LocalStorage";

function HistoryCard({ contacts }) {
    const baseUrl = "https://wa.me/";

    async function copyText({ num }) {
        try {
            await navigator.clipboard.writeText(num);
        } catch (err) {
            console.log("failed to copy: ", err);
        }
    }

    return contacts.map((val) => (
        <div className="contact-card" key={val.id}>
            <p className="phone-num">{val.num}</p>
            <div className="contact-card-options">
                <a href={`${baseUrl}${val.num}`}>
                    <WhatsappIcon />
                </a>
                <a href={`tel:${val.num}`}>
                    <PhoneIcon />
                </a>
                <p onClick={() => copyText(val)}>
                    <CopyIcon />
                </p>
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
            <section className="history">
                <div className="history-wrapper">
                    <h1>History</h1>
                    <div className="history-card-wrapper">
                        {contacts.length === 0 ? (
                            <p>No History</p>
                        ) : (
                            <>
                                <HistoryCard contacts={contacts} />
                                <p className="clear-all" onClick={clearHistory}>
                                    clear all
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default History;
