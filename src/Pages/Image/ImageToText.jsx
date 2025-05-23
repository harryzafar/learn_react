import { useEffect, useState, useRef } from "react";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

function ImageToText() {
  const ImageInputRef = useRef(null);
  const [imageName, setImageName] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCopy, setIsCopy] = useState("Copy");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isConverted, setIsConverted] = useState(false);
  const [isStartConverting, setIsStartConverting] = useState(false);
  const [extractedText, setExtractedText] = useState(null);
  const ConvertButton = useRef(null);

  const apiKey = import.meta.env.VITE_OCR_API_KEY;
  const apiEndpoint = import.meta.env.VITE_OCR_API_URL;

  useEffect(() => {
    // Select all tooltip-enabled elements
    const tooltipTriggerList = document.querySelectorAll(
      '[data-bs-toggle="tooltip"]'
    );
    tooltipTriggerList.forEach((el) => {
      let tooltip = window.bootstrap.Tooltip.getInstance(el);
      if (!tooltip) {
        tooltip = new window.bootstrap.Tooltip(el);
      }

      // Only update the Copy tooltip content
      if (
        el.title === "Copy" ||
        el.getAttribute("data-bs-original-title") === "Copy"
      ) {
        el.setAttribute("data-bs-original-title", isCopy);
        tooltip.setContent?.({ ".tooltip-inner": isCopy });
      }

      // Update expand/shrink tooltip
      if (el.title === "Expand" || el.title === "Shrink") {
        const updatedTitle = isExpanded ? "Shrink" : "Expand";
        el.setAttribute("data-bs-original-title", updatedTitle);
        tooltip.setContent?.({ ".tooltip-inner": updatedTitle });
      }
    });
  }, [isCopy, isExpanded, isConverted]);

  const handleBrowseClick = (e) => {
    e.stopPropagation();
    ImageInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlefile(file);
    }
  };

  const handlefile = (file) => {
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
    setImageFile(file); 
    setIsUploaded(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handlefile(file);
    }
  };

  const handleCancel = () => {
    setIsUploaded(false);
    setImageName(null);
    setImagePreview(null);
    // ImageInputRef.current.value = null;
  };

  const handleCopy = async () => {
    const textToCopy = document.getElementById("extracted_content")?.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopy("Copied!");
    } catch (err) {
      console.error("Failed to copy:", err);
      setIsCopy("Failed!");
    }

    setTimeout(() => {
      setIsCopy("Copy");
    }, 1000);
  };

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const image2textApi = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
          "x-api-key": apiKey,
        },
      })
      return response.data
      
      
    } catch (error) {
      // console.error("Error converting image to text:", error);
      return JSON.stringify({
        status: "error",
        message: "Error converting image to text",
      });
     
    }
  };

  const handleConvert = () => {

    setIsStartConverting(true);
    // Call the OCR API here
    image2textApi(imageFile)
      .then((data) => {
        if (data.status === "success") {
          setExtractedText(data.text);
          setIsConverted(true);
        } else {
          setExtractedText(data.message);
          setIsConverted(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setExtractedText("Error converting image to text");
        setIsConverted(false);
      });
  };

  const handleStartOver = () => {
    setIsConverted(false);
    setIsStartConverting(false);
    handleCancel();
  };

  

  return (
    <div className="container-fluid img_to_text_main_wrapper">
      <div className="container p-4">
        <div className="text-center">
          <h1 className="">Image to Text Converter</h1>
          <p>
            Convert images to text using OCR (Optical Character Recognition).
          </p>
        </div>

        <div className="row mt-4 bg-white rounded-3 p-4 ">
          {!isUploaded && (
            <>
              <div className="col-md-12 text-center">
                <div
                  className={`p-4 rounded-3 dashed_wrapper ${isDragging ? "dragover" : ""
                    } `}
                  onClick={handleBrowseClick}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  style={{ cursor: "pointer" }}
                >
                  <div className="">
                    <img
                      src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image-home-new.svg?"
                      alt=""
                    />
                    <p>Drop, Drag or Paste Image</p>
                    <p className="text-muted">
                      Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC
                    </p>
                    <button
                      className="btn btn-secondary browse_btn"
                      onClick={handleBrowseClick}
                    >
                      Browse
                    </button>

                    <input
                      type="file"
                      className="form-control"
                      ref={ImageInputRef}
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
          {isUploaded && !isStartConverting && (
            <>
              <div className="col-md-12 text-center">
                <div className="d-flex flex-column justify-content-center align-items-center p-4 rounded-3 dashed_wrapper">
                  <div className="img_preview">
                    <p className="img_name">{imageName}</p>
                    <img
                      src={imagePreview}
                      style={{ width: "200px", height: "200px" }}
                      alt="Preview"
                    />
                  </div>
                  <div className="img_action mt-4 d-flex justify-content-between align-items-center w-100">
                    <div className="d-flex align-items-center">
                      <button
                        className="btn btn-secondary"
                        onClick={handleCancel}
                      >
                        Cancel
                      </button>
                    </div>
                    <div>
                      <button
                        className="btn btn-dark"
                        ref={ConvertButton}
                        onClick={handleConvert}
                      >
                        Convert
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {isStartConverting ? (
            <>
              <div className="col-md-12">
                <div className="d-flex justify-content-end py-2">
                  <button
                    className="btn btn-secondary text-light d-flex align-items-center"
                    onClick={handleStartOver}
                  >
                    <span className="material-symbols-outlined">refresh</span>
                    Start Over
                  </button>
                </div>
                <div
                  className="p-4 rounded-3"
                  style={{ border: "1px solid #eaeaea" }}
                >
                  <div className="row">
                    <div className="col-md-2 p-0">
                      <div
                        className="pe-2"
                        style={{ borderRight: "2px solid #eaeaea" }}
                      >
                        <div className="img_preview">
                          <img
                            src={imagePreview}
                            style={{ width: "100%" }}
                            alt="Preview"
                          />
                          <p className="img_name">{imageName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-10">
                      {isConverted ? (
                        <div className="row">
                          <div className="col-md-11">
                            <div
                              id="extracted_content"
                              className=""
                              style={{
                                maxHeight: isExpanded ? "none" : "250px",
                                overflowY: isExpanded ? "visible" : "auto",
                              }}
                            >
                              {extractedText}
                            </div>
                          </div>
                          <div className="col-md-1">
                            <div className="content_actions d-flex flex-column align-items-end">
                              <p
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={isCopy}
                                onClick={handleCopy}
                              >
                                <span className="material-symbols-outlined">
                                  content_copy
                                </span>
                              </p>
                              <p
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title={isExpanded ? "Shrink" : "Expand"}
                                onClick={handleToggleExpand}
                              >
                                <span className="material-symbols-outlined">
                                  {isExpanded ? "hide" : "pan_zoom"}
                                </span>
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                        <Spinner
                          animation="border"
                          role="status"
                          style={{ width: "2rem", height: "2rem" }}
                        >
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
export default ImageToText;
