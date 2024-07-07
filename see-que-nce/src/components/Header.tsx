import React from 'react';
import { Button } from '@mui/material';
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header>
            <span className={styles.logoTitle}>
                see-que-nce
            </span>
            <Button color="inherit">Login</Button>
        </header>
    );
};

export default Header;
 