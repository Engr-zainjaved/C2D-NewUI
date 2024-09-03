import React from 'react';
import FeatureCard from './comps/FeatureCard';
import { features } from './utils/features';

const PassLaas = () => {

    return (
        <section className="passlaas-section" id="pass-laas">
            <div className="container">
                <div className="text-center d-flex flex-column gap-4 align-items-center">
                    <p className='sub-text text-white'>Out of the box</p>
                    <h2 className='section-heading text-white'><span>Pass + Iaas</span> The full stack platform</h2>
                    <a
                        className="btn btn-primary btn-public-secondary btn-lg mt-5"
                        href={'#view'}
                    >
                        View all features
                    </a>
                </div>
                <div className="custom-grid">
                    {features?.map((feature, i) => (
                        <div className="g-col" key={i}>
                            <FeatureCard {...feature} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PassLaas
