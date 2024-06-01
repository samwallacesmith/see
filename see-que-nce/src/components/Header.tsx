import React from 'react';
import { Button } from '@mui/material';
import styles from './Header.module.scss';
import eye from '../assets/eye.svg';

const Header: React.FC = () => {
    return (
        <header>
            <span className={styles.logoTitle}>
                <img src={eye} alt="see-que-nce" />
                see-que-nce
            </span>
            <Button color="inherit">Login</Button>
        </header>
    );
};

export default Header;
 