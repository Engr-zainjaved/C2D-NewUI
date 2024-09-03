import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signIn } from 'next-auth/react';
import HeroImage from '../../assets/landing-page/hero-image.jpg';
import VideoPlayer from './comps/VideoPlayer';

const Hero = () => {
    const { data: session } = useSession();
    return (
        <section className="hero-section" id="home">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 d-flex flex-column justify-content-center align-items-start gap-4">
                        <h1 className='section-heading'>The Cloud Platform</h1>
                        <p className='sub-text'>Development <span>{'>'}</span> Staging <span>{'>'}</span> Deployment</p>
                        {!session ? (
                            <button
                                onClick={() => signIn("github", { callbackUrl: "/project" })}
                                className="btn btn-primary btn-public btn-lg"
                            >
                                Deploy Your Platform
                            </button>
                        ) : (
                            <Link
                                className="btn btn-primary btn-public btn-lg"
                                href={'/project'}
                            >
                                Deploy Your Platform
                            </Link>
                        )}
                    </div>
                    <div className="col col-lg-6">
                        <VideoPlayer minHeight={440} />
                    </div>
                </div>
                <div className="hero-cover-wrapper">
                    <Image
                        src={HeroImage}
                        alt="C2D Hero cover"
                        width={1200}
                        height={574}
                        className="hero-cover"
                    />
                </div>
            </div>
        </section>
    )
}

export default Hero
