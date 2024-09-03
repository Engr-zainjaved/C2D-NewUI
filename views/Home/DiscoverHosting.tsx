import React from 'react';
import VideoPlayer from './comps/VideoPlayer';

const DiscoverHosting = () => {
    return (
        <section className="discover-hosting-section" id="discover-hosting">
            <div className="container">
                <div className="row gutter-10">
                    <div className="col col-lg-7 pe-lg-5">
                        <VideoPlayer minHeight={440} />
                    </div>
                    <div className="col col-lg-5 ps-lg-5 d-flex flex-column justify-content-center align-items-start gap-4">
                        <h2 className='section-heading'>Discover the<br /> <span>Official Hosting</span></h2>
                        <p className='sub-text'>you all-in-one platform.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DiscoverHosting
