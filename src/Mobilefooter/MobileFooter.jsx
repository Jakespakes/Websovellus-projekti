import "./MobileFooter.css";

export default function MobileFooter({ onMenuClick }) {
    return (
        <footer className="mobileFooter">
            {() =>
                setMobileSidebarOpen(!mobileSidebarOpen)}
                < button className="MobileSBB"
            onClick={onMenuClick}>
            ☰ Valikko
        </button>
        </footer >
    );
}
