import React from 'react';
import { Phone, Mail, Linkedin, MapPin } from 'lucide-react';

function ContactDetailPreview({ resumeInfo }) {
    return (
        <div style={{ marginTop: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <Phone size={16} style={{ marginRight: '8px', color: resumeInfo?.themeColor }} />
                <span style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
                    {resumeInfo?.phoneNumber}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <Mail size={16} style={{ marginRight: '8px', color: resumeInfo?.themeColor }} />
                <span style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
                    {resumeInfo?.email}
                </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                <Linkedin size={16} style={{ marginRight: '8px', color: resumeInfo?.themeColor }} />
                <span style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
                    {resumeInfo?.linkedIn}
                </span>
            </div>
            {/* <div style={{ display: 'flex', alignItems: 'center' }}>
                <MapPin size={16} style={{ marginRight: '8px', color: resumeInfo?.themeColor }} />
                <span style={{ fontSize: '0.875rem', color: resumeInfo?.themeColor }}>
                    {resumeInfo?.address}
                </span>
            </div> */}
        </div>
    );
}

export default ContactDetailPreview;
