import React from 'react';
import Image from 'next/image';
import logo from '../../assets/landing-page/light-logo-icon.svg';
import { links } from './utils/social';

const Footer = () => {
    return (
        <footer className='home-footer'>
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6">
                        <Image
                            src={logo}
                            alt="C2D Logo"
                            width={92}
                            height={40}
                            className="logo"
                        />
                    </div>
                    <div className="col col-lg-6 d-flex justify-content-lg-end justify-content-center align-items-center">
                        <div className="social-links d-flex align-items-center gap-2">
                            {links.map((item, i) => (
                                <a key={i} href={item?.link}>
                                    <Image
                                        src={item?.icon}
                                        alt="links"
                                        width={24}
                                        height={24}
                                        className="icon"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
