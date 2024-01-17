import React, { useState } from "react";
import { IoMdImages } from "react-icons/io";
import "../styles/Post.css";
import { v4 as uuidv4 } from "uuid";
import { usePostContext } from "../components/PostContext";
import { useNavigate } from "react-router-dom";

export default function Post() {
  const [img, setImg] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { addPost } = usePostContext(); // PostContext를 사용하기 위한 커스텀 훅
  const navigate = useNavigate();

  // 이미지 크기 조정 함수
  const resizeImg = (imgFile) => {
    const maxWidth = 384;
    const maxHeight = 256;

    // canvas element를 생성하고 2D Context를 얻음
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // img element를 생성하고 입력 이미지 파일로 설정
    const img = new Image();
    img.src = URL.createObjectURL(imgFile);

    // 조절된 이미지 Blob으로 resolve되는 Promis를 반환
    return new Promise((resolve) => {
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // 이미지 높이가 256보다 작은 경우, 높이를 256으로 확장
        if (height < maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        // 이미지 높이가 256보다 큰 경우, 높이를 256으로 축소
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = maxWidth;
        canvas.height = maxHeight;

        // 이미지 가운데 정렬
        const xOffset = (maxWidth - width) / 2;
        const yOffset = (maxHeight - height) / 2;
        canvas.width = maxWidth;
        canvas.height = maxHeight;
        ctx.drawImage(img, xOffset, yOffset, width, height);

        // canvas 내용을 Blob으로 변환하고 Promise를 resolove
        canvas.toBlob((blob) => {
          resolve(blob);
        }, imgFile.type);
      };
    });
  };

  // 이미지 업로드를 위한 uploadImg 함수
  // const uploadImg = async (imgFile) => {
  //   const formData = new FormData();
  //   formData.append("image", imgFile);

  //   const response = await fetch("https://searcheshouse.net/api/interior", {
  //     method: "POST",
  //     body: formData,
  //   });

  //   if (!response.ok) {
  //     throw new Error("Image upload failed");
  //   }

  //   const responseData = await response.json();
  //   return responseData.imgURL;
  // };

  const handleImgChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const droppedImg = e.dataTransfer.items[0];
      if (droppedImg.kind === "file" && droppedImg.type.startsWith("image/")) {
        const file = droppedImg.getAsFile();
        setImg(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChangeTitle = (e) => setTitle(e.target.value);

  const handleChangeContent = (e) => setContent(e.target.value);

  // 네트워크 통신
  // const handleCompleteBtnClick = async () => {
  //   if (title.trim().length === 0 || !img) return;

  //   const imgURL = await uploadImg(img);

  //   const newItem = {
  //     id: uuidv4(),
  //     img: imgURL,
  //     title,
  //     content,
  //   };

  //   addPost(newItem);
  //   setImg(null);
  //   setTitle("");
  //   setContent("");
  // };

  const handleCompleteBtnClick = async () => {
    if (title.trim().length === 0 || !img) return;

    const resizedImgBlob = await resizeImg(img);

    const newItem = {
      id: uuidv4(),
      img: URL.createObjectURL(resizedImgBlob), // 이미지 크기 조정
      title,
      content,
    };

    addPost(newItem);
    setImg(null);
    setTitle("");
    setContent("");
    navigate("/");
  };

  return (
    <div className="post__section">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="post__label"
      >
        <div className="post__icon__container">
          <IoMdImages className="post__icon" />
        </div>
        <input onChange={handleImgChange} type="file" className="post__file" />
        <p className="post__text">
          드래그 앤 드롭으로 커버 사진을 업로드해주세요.
        </p>
        {img && (
          <div className="post__preview">
            <img
              className="post__preview__img"
              src={URL.createObjectURL(img)}
              alt="preview"
            />
          </div>
        )}
      </label>
      <div className="post__input__container">
        <input
          className="post__input__title"
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={handleChangeTitle}
        />
        <textarea
          className="post__textarea__content"
          type="text"
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={handleChangeContent}
        />
      </div>
      <div className="post__btn__container">
        <button className="post__btn__temp">임시저장</button>
        <button
          onClick={handleCompleteBtnClick}
          className="post__btn__complete"
        >
          완료
        </button>
      </div>
    </div>
  );
}
