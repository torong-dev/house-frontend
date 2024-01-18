import React, { useState } from "react";
import { IoMdImages } from "react-icons/io";
import "../styles/Post.css";
import { v4 as uuidv4 } from "uuid";
import { usePostContext } from "../components/PostContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Post() {
  const [interiorImg, setInteriorImg] = useState(null);
  const [interiorTitle, setInteriorTitle] = useState("");
  const [interiorContents, seInteriorContents] = useState("");
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

  const handleImgChange = (e) => {
    setInteriorImg(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const droppedImg = e.dataTransfer.items[0];
      if (droppedImg.kind === "file" && droppedImg.type.startsWith("image/")) {
        const file = droppedImg.getAsFile();
        setInteriorImg(file);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleChangeTitle = (e) => setInteriorTitle(e.target.value);

  const handleChangeContent = (e) => seInteriorContents(e.target.value);

  // 완료버튼 클릭 시, POST 요청
  const handleCompleteBtnClick = async () => {
    console.log("handleCompleteBtnClick 시작");
    if (interiorTitle.trim().length === 0 || !interiorImg) return;

    // 사용자가 로그인 했는지 확인
    const token = localStorage.getItem("token");
    if (!token) {
      // 로그인하지 않은 경우, 로그인 페이지로 리다이렉트
      navigate("/login");
      return;
    }

    // 이미지 크기 조절
    const resizedImgBlob = await resizeImg(interiorImg);

    // FormData를 사용하여 이미지와 데이터를 서버에 전송
    const formData = new FormData();
    formData.append("interiorImg", resizedImgBlob);
    formData.append("interiorTitle", interiorTitle);
    formData.append("interiorContents", interiorContents);

    // 백엔드에 POST 요청 보내기
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/interior`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 새로운 데이터 업데이트
      const newItem = {
        interiorId: uuidv4(),
        interiorImg: URL.createObjectURL(resizedImgBlob), // 이미지 크기 조정
        interiorTitle,
        interiorContents,
      };

      addPost(newItem);
      setInteriorImg(null);
      setInteriorTitle("");
      seInteriorContents("");
      navigate("/");
    } catch (error) {
      console.error("인테리어 데이터 전송 중 오류: ", error);
    }
    console.log("handleCompleteBtnClick 끝");
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
        {interiorImg && (
          <div className="post__preview">
            <img
              className="post__preview__img"
              src={URL.createObjectURL(interiorImg)}
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
          value={interiorTitle}
          onChange={handleChangeTitle}
        />
        <textarea
          className="post__textarea__content"
          type="text"
          placeholder="내용을 입력해주세요."
          value={interiorContents}
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
