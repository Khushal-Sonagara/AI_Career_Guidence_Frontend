import { Button } from '../../../ui/button';
import { ResumeInfoContext } from '../../../dashboard/context/ResumeInfoContext';
import ResumePreview from '../../../dashboard/resume/components/ResumePreview';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumeDataService from '../../../../Services/ResumeDataService'

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState();
    const { id } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, []);


    const GetResumeInfo = async () => {
        try {
            const resp = await ResumeDataService.getByResumeId(id)
            console.log(resp)
            setResumeInfo(resp);
        } catch (error) {
            console.error("Error fetching resume info:", error);
        }
    };

    const handleDownload = () => {
        const printArea = document.getElementById('print-area').cloneNode(true);
        const originalContent = document.body.innerHTML;

        alert("If Resume doesn't display in one page then change scale in more setting in print menu")

        // Set the body to only print the selected area
        document.body.innerHTML = printArea.innerHTML;
        window.print();

        // Restore the original content after printing
        document.body.innerHTML = originalContent;
        window.location.reload(); // Reload to restore events
    };

    // const handleDownload = async () => {
    //     const printArea = document.getElementById('print-area');

    //     if (!printArea) {
    //         console.error("Print area not found");
    //         return;
    //     }

    //     const pdf = new jsPDF({
    //         orientation: "portrait",
    //         unit: "px", // Use pixels for more precision
    //         format: [794, 1123] // A4 size in pixels at 96 DPI (width x height)
    //     });

    //     await pdf.html(printArea, {
    //         callback: (pdf) => {
    //             pdf.save("Resume.pdf");
    //         },
    //         margin: 0, // Remove extra padding
    //         x: 0,
    //         y: 0,
    //         width: 794, // Full width in px (A4)
    //         windowWidth: 794 // Ensure it scales properly
    //     });
    // };
    // const handleDownload = async () => {
    //     const printArea = document.getElementById('print-area');
    
    //     if (!printArea) {
    //         console.error("Print area not found");
    //         return;
    //     }
    
    //     const pdf = new jsPDF({
    //         orientation: "portrait",
    //         unit: "px",
    //         format: [794, 1123] ,
    //     });
    
    //     await pdf.html(printArea, {
    //         callback: (pdf) => {
    //             pdf.save("Resume.pdf");
    //         },
    //         margin: 0, // Adjust margin to ensure proper formatting
    //         x: 0,
    //         y: 0,
    //         width: 794, // A4 width in mm
    //         windowWidth: printArea.scrollWidth, // Ensure full width capture
    //         html2canvas: {
    //             scale: 1, // Use 1 to keep text selectable
    //             useCORS: true,
    //         }
    //     });
    // };
    
    

    const handleShare = async () => {
        const baseUrl = import.meta.env.VITE_BASE_URL || window.location.origin; // Use window.location.origin as fallback
        const shareUrl = `${baseUrl}/my-resume/${id}/view`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${resumeInfo?.firstName} ${resumeInfo?.lastName} Resume`,
                    text: "Hello Everyone, This is my resume. Please open the URL to see it:",
                    url: shareUrl,
                });
                console.log("Shared successfully!");
            } catch (error) {
                console.error("Error sharing:", error);
            }
        } else {
            alert("Web Share API not supported in this browser.");
        }
    };



    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
                <div style={{ margin: '40px 10%', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '500' }}>
                        Congrats! Your AI-generated Resume is ready!
                    </h2>
                    <p style={{ color: 'gray' }}>
                        Now you can download your resume or share your unique resume URL with friends and family.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '30px' }}>
                        <button className="btn btn-primary" onClick={handleDownload}>Download</button>
                        <button className="btn btn-secondary" onClick={handleShare}>Share</button>
                    </div>
                </div>
            </div>
            <div style={{ margin: '40px 10%', justifyContent: 'center' }}>
                <div id="print-area">
                    <ResumePreview resumeInfo={resumeInfo}/>
                </div>
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;

