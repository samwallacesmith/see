import React from 'react';
import { Button } from '@mui/material';
import styles from './Header.module.scss';
import Logo from './Logo';
import Menu from './Menu';

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <a href='/' title='home' className='title-link'>
                <Logo />
            </a>
            <div className='d-flex'>
                <Menu />
                <Button color="inherit">Login</Button>
            </div>
        </header>
    );
};

export default Header;
 