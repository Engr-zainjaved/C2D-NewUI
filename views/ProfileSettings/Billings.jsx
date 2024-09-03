import React, { useState, useMemo } from 'react';
import Button from '../../components/bootstrap/Button';
import Input from '../../components/bootstrap/forms/Input';
import Checks from '../../components/bootstrap/forms/Checks';
const Billings = () => {
    const [monthly, setMonthly] = useState(true);
    const [data, setData] = useState({
        workers: 1,
        storage: 1,
        environment: 0,
        dedicated: false,
    });

    const options = [
        {
            title: 'Workers',
            name: 'workers',
            min: 1,
            max: 8,
            price: '$57.60/worker/month'
        },
        {
            title: 'Storage',
            name: 'storage',
            min: 1,
            max: 512,
            price: '$0.20/GB/month'
        },
        // {
        //     title: 'Hosting type',
        //     name: 'dedicated',
        //     checks: true,
        //     price: 'Dedicated $480.00/month'
        // },
        {
            title: 'Staging env.',
            name: 'environment',
            min: 0,
            max: 20,
            price: '$14.40/environment/month'
        }
    ];

    const price = useMemo(() => {
        const { workers, storage, environment } = data;

        const workersPrice = (workers * 57.60).toFixed(2);
        const storagePrice = (storage * 0.20).toFixed(2);
        const environmentPrice = (environment * 14.40).toFixed(2);

        const totalPrice = (parseFloat(workersPrice) + parseFloat(storagePrice) + parseFloat(environmentPrice)).toFixed(2);

        return {
            workers: workersPrice,
            storage: storagePrice,
            environment: environmentPrice,
            total: totalPrice
        };
    }, [data]);

    return (
        <div className='row gx-5 billings c2d-light-form mb-5'>
            <div className="col-12 col-md-7 pricing-controls">
                <h4>Pricing</h4>
                <div className="w-100 d-flex flex-column gap-4">
                    {options.map((item, i) => (
                        <div key={i} className="control-item d-flex align-items-center gap-4 w-100">
                            <div className="title">
                                {item.title}
                            </div>
                            {/* inputs */}
                            {Boolean(item?.checks) ? (
                                <div className="switch d-flex align-items-center gap-3">
                                    <label htmlFor="switch-input" className={!data[item?.name] && 'active'}>Shared</label>
                                    <Checks
                                        type='switch'
                                        name={item.name}
                                        checked={data[item?.name]}
                                        id='switch-input'
                                        onChange={(e) => setData(prev => ({ ...prev, [item.name]: e.target.checked }))}
                                    />
                                    <label htmlFor="switch-input" className={data[item?.name] && 'active'}>Dedicated</label>
                                </div>
                            ) : (
                                <div className="inputs d-flex align-items-center gap-3">
                                    <div className="slider d-flex flex-column">
                                        <Input
                                            type="range"
                                            class="form-range w-100"
                                            name={item.name}
                                            min={item.min}
                                            max={item.max}
                                            value={data[item?.name] || item.min}
                                            onChange={(e) => setData(prev => ({ ...prev, [item.name]: e.target.value }))}
                                        />
                                        <div className="d-flex justify-content-between w-100">
                                            <small>{item.min}</small>
                                            <small>{item.max}</small>
                                        </div>
                                    </div>
                                    <Input
                                        type="number"
                                        size="lg"
                                        name={item.name}
                                        min={item.min}
                                        max={item.max}
                                        value={data[item?.name] || item.min}
                                        onChange={(e) => setData(prev => ({ ...prev, [item.name]: e.target.value }))}
                                    />
                                </div>
                            )}
                            {/* price */}
                            <div className="price flex-grow-1">
                                {item.price}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="info mt-3">
                    The hosting price does not include the enterprise licence.
                </div>
            </div>
            <div className="col-12 col-md-5">
                <div className="price-details-wrapper">
                    <div className="plans-switch d-flex align-items-center justify-content-center gap-3 w-100">
                        <label htmlFor="plan-input" className={!monthly && 'active'}>Annual</label>
                        <Checks
                            type='switch'
                            checked={monthly}
                            id='plan-input'
                            onChange={(e) => setMonthly(e.target.checked)}
                        />
                        <label htmlFor="plan-input" className={monthly && 'active'}>Monthly</label>
                    </div>
                    <div className="pricing-details d-flex flex-column gap-3">
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="title">Workers</div>
                            <div className="price">US$ {price?.workers || 0.00}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="title">Storage</div>
                            <div className="price">US$ {price?.storage || 0.00}</div>
                        </div>
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="title">Staging env.</div>
                            <div className="price">US$ {price?.environment || 0.00}</div>
                        </div>
                        <div className="discount d-flex align-items-center justify-content-between">
                            <div className="title">Initial discount during the first year</div>
                            <div className="price">US$ -2.70</div>
                        </div>
                        <div className="separator" />
                        <div className="d-flex align-items-center justify-content-between">
                            <div className="title">Total/month(*)</div>
                            <div className="price">US$ {price?.total ? (price.total - 2.70).toFixed(2) : 0.00}</div>
                        </div>
                        {!monthly && (
                            <div className="annually d-flex align-items-center justify-content-center">
                                (*) Billed annually: US$ {((price.total - 2.70) * 12).toFixed(2)}
                            </div>
                        )}
                        <Button
                            type='submit'
                            color='primary'
                            size={'lg'}
                            className='c2d-btn w-100'
                            rounded={3}
                        >
                            Pay now
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Billings
