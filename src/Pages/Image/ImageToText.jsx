function ImageToText() {
  return (
    <div className="container-fluid img_to_text_main_wrapper">
      <div className="container text-center p-4">
        <h1 className="">Image to Text Converter</h1>
        <p>Convert images to text using OCR (Optical Character Recognition).</p>
        <form action="" className="mt-4 bg-white rounded-3 p-4 ">
          <div className="p-4 rounded-3 dashed_wrapper">
            <div className="">
              <img
                src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image-home-new.svg?"
                alt=""
              />
              <p>Drop, Drag or Paste Image</p>
              <p className="text-muted">
                Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC, PDF
              </p>
              <button className="btn btn-secondary">
                <label htmlFor="imageInput" className="form-label">
                  Upload Image
                </label>
              </button>

              <input
                type="file"
                className="form-control"
                id="imageInput"
                accept="image/*"
              />
            </div>
          </div>

          
        </form>
      </div>
    </div>
  );
}
export default ImageToText;
