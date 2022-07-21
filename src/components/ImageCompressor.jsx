import { useS3Upload } from "next-s3-upload";
import React, { useState } from "react";

import Card from "react-bootstrap/Card";

const ImageCompressor = () => {
  const [imageData, setImageData] = useState({
    compressedLink:
      "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
    originalImage: "",
    originalLink: "",
  });
  const [clicked, setClicked] = useState(false);
  const [uploadImage, setUploadImage] = useState(false);
  const { uploadToS3 } = useS3Upload();

  const handle = (e) => {
    const imageFile = e.target.files[0];
    setImageData((prev) => ({
      ...prev,
      originalLink: URL.createObjectURL(imageFile),
      originalImage: imageFile,
      outputFileName: imageFile.name,
    }));
    setUploadImage(true);
  };

  const uploadImageFiles = async (compressedImage) => {
    try {
      const [{ url: originalUrl }, { url: compressedUrl }] = await Promise.all([
        uploadToS3(imageData.originalImage),
        uploadToS3(compressedImage),
      ]);
      let resp = await fetch("/api/images", {
        method: "POST",
        body: JSON.stringify({
          originalUrl,
          compressedUrl,
          name: imageData.outputFileName,
          size: imageData.originalImage.size,
        }),
      });
      if (!resp.ok) {
        resp = await resp.json();
        throw new Error(resp.message);
      }
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  const click = async (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= imageData.originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!");
      return 0;
    }

    const imageCompression = (await import("browser-image-compression"))
      .default;

    const output = await imageCompression(imageData.originalImage, options);
    const downloadLink = URL.createObjectURL(output);
    setImageData((prev) => ({
      ...prev,
      compressedLink: downloadLink,
    }));

    await uploadImageFiles(output);

    setClicked(true);
    return 1;
  };

  return (
    <div className="m-5">
      <div className="text-light text-center">
        <h1>Three Simple Steps</h1>
        <h3>1. Upload Image</h3>
        <h3>2. Click on Compress</h3>
        <h3>3. Download Compressed Image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img
              className="ht"
              variant="top"
              src={imageData.originalLink}
            ></Card.Img>
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
            ></Card.Img>
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={(e) => handle(e)}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          <br />
          {imageData.outputFileName ? (
            <button
              type="button"
              className=" btn btn-dark"
              onClick={(e) => click(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
          <Card.Img variant="top" src={imageData.compressedLink}></Card.Img>
          {clicked ? (
            <div className="d-flex justify-content-center">
              <a
                href={imageData.compressedLink}
                download={imageData.outputFileName}
                className="mt-2 btn btn-dark w-75"
              >
                Download
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
