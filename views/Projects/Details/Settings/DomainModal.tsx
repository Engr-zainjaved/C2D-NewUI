import React from 'react';
import C2DModal from '../../../components/Modal';

interface Props {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}

const DomainModal: React.FC<Props> = (props) => {

    return (
        <C2DModal
            {...props}
            title="Domain Configuration"
        >
            <p style={{ fontSize: 14 }} className="mb-3 text-secondary">
                Perform the following operations in your domain manager:
            </p>
            <ul style={{ fontSize: 14 }} className="text-secondary">
                <li>Create a CNAME record www.yourdomain.com pointing to nomanjallal-tesh2.odoo.com.</li>
                <li>If you want to use the naked domain (e.g. yourdomain.com), you need to redirect yourdomain.com to www.yourdomain.com.</li>
            </ul>
            <h3 style={{ fontWeight: 600 }}>SSL/HTTPS</h3>
            <p style={{ fontSize: 14 }} className="text-secondary">
                If the redirection is correctly set up, the platform will automatically generate an SSL certificate with Let's Encrypt within the hour and your domain will be accessible through HTTPS.It is currently not possible to configure your own SSL certificates on the Odoo.sh platform.
            </p>
        </C2DModal>
    )
}

export default DomainModal
