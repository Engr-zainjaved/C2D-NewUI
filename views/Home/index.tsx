import React from 'react';
import Header from './Header';
import Hero from './Hero';
import DevFirst from './DevFirst';
import DiscoverHosting from './DiscoverHosting';
import PassLaas from './PassLaas';
import EnterpriseGrade from './EnterpriseGrade';
import Footer from './Footer';

const Home = () => {
    return (
        <main className="w-100">
            <Header />
            <Hero />
            <DevFirst />
            <DiscoverHosting />
            <PassLaas />
            <EnterpriseGrade />
            <Footer />
        </main>
    )
}

export default Home