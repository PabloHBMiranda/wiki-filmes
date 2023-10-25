import {Button} from "@mui/material";
import classnames from "classnames";
import {useNavigate} from "react-router-dom";

interface HeaderProps {
    activePage: string;
}

const menuItems = [
    {label: 'Início', path: '/', name: 'home'},
    {label: 'Filmes', path: '/filmes', name: 'filmes'},
    {label: 'Contato', path: '/contato', name: 'contato'},
];

const Header = ({activePage}: HeaderProps) => {
    const navigate = useNavigate();

    return (
        <header>
            <div className="container">
                <div className="logo">
                    WIKI<b>FILMES</b>
                </div>
                <div className="menu-navigation">
                    {menuItems.map((item, index) => {
                        const isActive = activePage === item.name;

                        return (
                            <Button
                                key={index}
                                className={classnames('menu-item', {'active': isActive})}
                                variant="text"
                                color="inherit"
                                onClick={() => navigate(item.path)}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </div>
            </div>
        </header>
    );
};

export default Header;
