import React from 'react';
import Image from 'next/image';
import DevImage from '../../assets/landing-page/dev-image.jpg';

const DevFirst = () => {
    return (
        <section className="dev-first-section" id="dev-first">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-5 d-flex flex-column justify-content-center align-items-start gap-4">
                        <h2 className='section-heading'><span>Developer</span> First</h2>
                        <p className='sub-text'>Tightly integrated with Github</p>
                    </div>
                    <div className="col col-lg-7">
                        <Image
                            src={DevImage}
                            alt="Developer First"
                            width={1200}
                            height={574}
                            className="dev-image"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DevFirst
