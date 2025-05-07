function ImageToText() {
 const browse_btn = document.querySelector(".browse_btn");
 const imageInput = document.querySelector("#imageInput");
 const img_preview = document.querySelector(".img_preview");

  return (
    <div className="container-fluid img_to_text_main_wrapper">
      <div className="container text-center p-4">
        <h1 className="">Image to Text Converter</h1>
        <p>Convert images to text using OCR (Optical Character Recognition).</p>
        {/* <form action="" className=""> */}
        <div className="row mt-4 bg-white rounded-3 p-4 ">
          <div className="col-md-6">
            <div className="p-4 rounded-3 dashed_wrapper">
              <div className="">
                <img
                  src="https://www.imagetotext.info/web_assets/frontend/img/icons/tool-box-image-home-new.svg?"
                  alt=""
                />
                <p>Drop, Drag or Paste Image</p>
                <p className="text-muted">
                  Supported formats: JPG, PNG, GIF, JFIF (JPEG), HEIC
                </p>
                <button className="btn btn-secondary browse_btn">
                  Browse
                </button>

                <input
                  type="file"
                  className="form-control"
                  id="imageInput"
                  accept="image/*"
                />
              </div>
            </div>

          </div>
          <div className="col-md-6">
            <div className="d-flex flex-column justify-content-center align-items-center p-4 rounded-3 dashed_wrapper">
              <div className="img_preview" >
                <p className="img_name">Whatsapp.jpg</p>
                <img src="https://picsum.photos/500" style={{width:"200px"}} alt="" />
              </div>
              <div className="img_action mt-4 d-flex justify-content-between align-items-center w-100">
                <div>
                   <button className="btn btn-secondary" >Cancel</button>
                 </div>
                 <div>
                   <button className="btn btn-dark" >Convert</button>
                 </div>
              </div>

            </div>
          </div>



        </div>
        {/* </form> */}
      </div>
    </div>
  );
}
export default ImageToText;
