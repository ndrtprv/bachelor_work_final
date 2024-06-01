import React from 'react';
import './Header.css';
import brand from '../../resources/brand.png';
import NavigationPanel from './nav_panel/NavigationPanel';
import avatar from '../../resources/people.png';

function Header(props) {

    return (
        <header className="sticky-top">
            <NavigationPanel data1={props.data1} data2={props.data2} data3={props.data3} brand={brand} avatar={avatar} />
        </header>
    );
}

export default Header;