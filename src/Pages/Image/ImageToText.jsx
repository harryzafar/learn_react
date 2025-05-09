import { useEffect, useState, useRef } from "react";

function ImageToText() {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
console.log(apiKey);

  const ImageInputRef = useRef(null);
  const [imageName, setImageName] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isCopy, setIsCopy] = useState('Copy');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isConverted, setIsConverted] = useState(false);

  useEffect(() => {
    // Select all tooltip-enabled elements
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((el) => {
      let tooltip = window.bootstrap.Tooltip.getInstance(el);
      if (!tooltip) {
        tooltip = new window.bootstrap.Tooltip(el);
      }

      // Only update the Copy tooltip content
      if (el.title === "Copy" || el.getAttribute("data-bs-original-title") === "Copy") {
        el.setAttribute("data-bs-original-title", isCopy);
        tooltip.setContent?.({ '.tooltip-inner': isCopy });
      }

      // Update expand/shrink tooltip
      if (el.title === "Expand" || el.title === "Shrink") {
        const updatedTitle = isExpanded ? "Shrink" : "Expand";
        el.setAttribute("data-bs-original-title", updatedTitle);
        tooltip.setContent?.({ '.tooltip-inner': updatedTitle });
      }

    });
  }, [isCopy, isExpanded,isConverted]);




  const handleBrowseClick = (e) => {
    e.stopPropagation();
    ImageInputRef.current.click();
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handlefile(file);

    }
  }

  const handlefile = (file) => {
    setImageName(file.name);
    setImagePreview(URL.createObjectURL(file));
    setIsUploaded(true);

  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  }

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  }
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handlefile(file);
    }
  }

  const handleCancel = () => {
    setIsUploaded(false);
    setImageName(null);
    setImagePreview(null);
    // ImageInputRef.current.value = null;
  }

  const handleCopy = async () => {
    const textToCopy = document.getElementById("extracted_content")?.innerText;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopy('Copied!');
    } catch (err) {
      console.error("Failed to copy:", err);
      setIsCopy('Failed!');
    }

    setTimeout(() => {
      setIsCopy('Copy');
    }, 1000);
  };

  const handleToggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleConvert = () => {
    setIsConverted(true);
  }
  const handleStartOver = () => {
    setIsConverted(false);
    handleCancel();
  }



  return (
    <div className="container-fluid img_to_text_main_wrapper">
      <div className="container p-4">
        <div className="text-center">
          <h1 className="">Image to Text Converter</h1>
          <p>Convert images to text using OCR (Optical Character Recognition).</p>

        </div>


        <div className="row mt-4 bg-white rounded-3 p-4 ">
          {!isUploaded && (
            <>
              <div className="col-md-12 text-center">
                <div className={`p-4 rounded-3 dashed_wrapper ${isDragging ? "dragover" : ""} `}
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
                    <button className="btn btn-secondary browse_btn" onClick={handleBrowseClick} >
                      Browse
                    </button>

                    <input
                      type="file"
                      className="form-control"
                      ref={ImageInputRef}
                      id="imageInput"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{display:"none"}}
                    />
                  </div>
                </div>

              </div>
            </>
          )
          }
          {isUploaded && !isConverted &&
            (
              <>
                <div className="col-md-12 text-center">
                  <div className="d-flex flex-column justify-content-center align-items-center p-4 rounded-3 dashed_wrapper">
                    <div className="img_preview"  >
                      <p className="img_name">{imageName}</p>
                      <img src={imagePreview} style={{ width: "200px", height: "200px" }} alt="Preview" />
                    </div>
                    <div className="img_action mt-4 d-flex justify-content-between align-items-center w-100">
                      <div>
                        <button className="btn btn-secondary" onClick={handleCancel} >Cancel</button>
                      </div>
                      <div>
                        <button className="btn btn-dark" onClick={handleConvert}>Convert</button>
                      </div>
                    </div>

                  </div>
                </div>
              </>
            )
          }




          {isConverted ? (
            <>
              <div className="col-md-12">
                <div className="d-flex justify-content-end py-2">
                  <button className="btn btn-secondary text-light d-flex align-items-center" onClick={handleStartOver}><span className="material-symbols-outlined">
                    refresh
                  </span>Start Over</button>
                </div>
                <div className="p-4 rounded-3" style={{ border: "1px solid #eaeaea" }}>
                  <div className="row">
                    <div className="col-md-2 p-0">
                      <div className="pe-2" style={{ borderRight: "2px solid #eaeaea" }}>
                        <div className="img_preview">
                          <img src="https://picsum.photos/500" style={{ width: "100%" }} alt="Preview" />
                          <p className="img_name">Image Name dff fdfdf dsfdf dfdf fdfd ffd</p>
                        </div>

                      </div>


                    </div>
                    <div className="col-md-10">
                      <div className="row">
                        <div className="col-md-11">
                          <div id="extracted_content"
                            className=""
                            style={{
                              maxHeight: isExpanded ? "none" : "250px",
                              overflowY: isExpanded ? "visible" : "auto"
                            }}
                          >
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis minus temporibus quod veritatis, cupiditate voluptate magnam repudiandae tempora provident cum illo delectus velit at, explicabo quas repellat atque sed consectetur quia, dolor eos excepturi voluptates quaerat iste. Molestias sed rem quisquam excepturi accusamus error, vero deserunt repellendus unde commodi id et eos alias quia optio iure quas. Ducimus tempore accusantium inventore aliquam impedit ratione ullam eos debitis harum blanditiis. Provident, quod amet. Rem praesentium ratione animi culpa qui cumque, consectetur nam minima ullam sapiente sit quaerat libero tempore nesciunt iure! Dolorum sit enim quas accusantium repudiandae nostrum, quidem nobis consequatur provident quibusdam reprehenderit totam itaque dolor deleniti ullam sapiente maxime. Sed impedit natus vitae similique laborum quaerat perferendis id facilis itaque eaque provident, nisi labore eius expedita explicabo! Doloremque fugiat qui cumque debitis. Nobis quam modi aliquid enim, totam, non suscipit temporibus at nostrum laborum quos dicta deleniti tenetur possimus a asperiores odit doloremque! Omnis non quae magni ut debitis molestias blanditiis, itaque, at aperiam perspiciatis asperiores aut necessitatibus officia nam? Maiores nostrum inventore nisi reprehenderit nam! Sed debitis ullam ratione illo aspernatur iure quisquam, saepe corporis! Voluptatum deleniti est ullam. Quis dolorem id cumque dicta, odit excepturi iste fugit?


                          </div>
                        </div>
                        <div className="col-md-1">
                          <div className="content_actions d-flex flex-column align-items-end">

                            <p data-bs-toggle="tooltip" data-bs-placement="top" title={isCopy} onClick={handleCopy}><span className="material-symbols-outlined" >
                              content_copy
                            </span></p>
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


                    </div>
                  </div>



                </div>
              </div>
            </>
          ) : ('')
          }








        </div>

      </div>
    </div>
  );
}
export default ImageToText;
