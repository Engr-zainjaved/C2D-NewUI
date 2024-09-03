import React from 'react';
import Image from 'next/image';
import HeroImage from '../../assets/landing-page/hero-image.jpg';

const EnterpriseGrade = () => {
    return (
        <section className="enterprise-grade-section" id="enterprise-grade">
            <div className="container">
                <div className="text-center d-flex flex-column gap-4 align-items-center">
                    <p className='sub-text'>Out of the box</p>
                    <h2 className='section-heading'><span>Enterprise grade</span> release cycle</h2>
                </div>
                <Image
                    src={HeroImage}
                    alt="Enterprise Grade"
                    width={1200}
                    height={574}
                    className="enterprise-image"
                />
                <div className="text-center d-flex flex-column gap-5 align-items-center">
                    <h2 className='section-heading'><span>Unlimited</span> for<br />development branches.</h2>
                    <a
                        className="btn btn-primary btn-public btn-lg rounded-pill mt-3"
                        href={'#login'}
                    >
                        Deploy Your Platform
                    </a>
                </div>
            </div>
        </section>
    )
}

export default EnterpriseGrade
