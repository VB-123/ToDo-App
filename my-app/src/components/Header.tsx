import React from 'react';

interface HeaderProps {
    appTitle: string;
    toggleTheme: () => void;
    theme: string;
}

const Header: React.FC<HeaderProps> = ({ appTitle, toggleTheme, theme }) => {
    return (
        <header className="header">
            <h1>{appTitle}</h1>
            <button onClick={toggleTheme}>
                {theme === 'dark' ? '🌞' : '🌜'}
            </button>
        </header>
    );
};

export default Header;
