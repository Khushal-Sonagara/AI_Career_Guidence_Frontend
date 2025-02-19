import { useState, useEffect, useContext } from "react";
import ResumeImagesService from "../../../../../Services/ResumeImagesService";
import UserResumesService from "../../../../../Services/UserResumesService";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { toast } from "sonner";

const ResumeImageSelection = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const resumeId = resumeInfo?.resume?.resumeID;
    const [images, setImages] = useState([]);
    const [selectedImage, setSelectedImage] = useState(resumeInfo?.resume?.resumeImageID || null);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const data = await ResumeImagesService.getAllImages();
                setImages(data);
            } catch (error) {
                toast.error("Failed to load images. Please try again.");
                console.error("Error fetching resume images:", error);
            }
        };
        fetchImages();
    }, []);

    const handleSelectImage = (imageId, imageUrl) => {
        setSelectedImage(imageId);
        // setSelectedImageURL(imageUrl); 
        setResumeInfo(prevInfo => ({
            ...prevInfo,
            resume: {
                ...prevInfo.resume,
                resumeImageID: imageId 
            }
        }));
    };

    const handleUpdateImage = async () => {
        if (!selectedImage) {
            toast.warning("Please select a resume image first!");
            return;
        }
        if (!resumeId) {
            toast.error("Resume ID is missing. Please try again.");
            return;
        }

        try {
            await UserResumesService.updateResumeImage(resumeId, selectedImage);
            toast.success("Resume image updated successfully!");
        } catch (error) {
            toast.error("Error updating resume image. Please try again.");
            console.error("Error updating resume image:", error);
        }
    };

    return (
        <div className="container p-4">
            <h2 className="text-xl font-bold mb-4">Select Resume Style</h2>
            <div className="row">
                {images.map((image) => (
                    <div key={image.ImageID} className="col-md-6 mb-3">
                        <div
                            className={`card text-center ${selectedImage === image.ImageID ? "border-primary" : ""}`}
                            style={{
                                cursor: "pointer",
                                padding: "10px",
                                border: selectedImage === image.ImageID ? "2px solid blue" : "1px solid #ddd",
                                borderRadius: "8px"
                            }}
                            onClick={() => handleSelectImage(image.ImageID, image.ImageURL)} 
                        >
                            <img
                                src={image.ImageURL}
                                alt="Resume Style"
                                style={{
                                    objectFit: "cover",
                                    borderRadius: "5px",
                                    marginBottom: "10px"
                                }}
                            />
                            <div className="mb-2">
                                <strong className={selectedImage === image.ImageID ? "text-primary" : ""}>
                                    {selectedImage === image.ImageID ? "Selected" : "Select"}
                                </strong>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <button
                className="btn btn-primary mt-4"
                onClick={handleUpdateImage}
                disabled={!selectedImage}
            >
                Update Resume Image
            </button>
        </div>
    );
};

export default ResumeImageSelection;
