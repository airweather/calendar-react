import styled from "styled-components";
import React, { useState } from "react";

const Dropzone = () => {
  const [fileContent, setFileContent] = useState(null); // 파일 내용을 저장할 state 변수
  const [fileArr, setFileArr] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const file = e.dataTransfer.files[0]; // 드래그한 파일 가져오기
    const reader = new FileReader(); // 파일 읽기 객체 생성
    reader.onload = (e) => {
      const data = e.target.result;
      setFileContent(data); // 파일 내용 state 변수에 저장
      const id = fileArr.length <= 0 ? 0 : fileArr[fileArr.length - 1].id + 1;
      setFileArr([...fileArr, { id, file, data }]);
    };
    // reader.readAsText(file); // 파일 읽기 시작
    reader.readAsDataURL(file); // 파일 읽기 시작
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작 방지
  };

  console.log(fileArr);

  const removeFile = (id) => {
    // id를 매개변수로 받는 removeFile 함수 선언
    const newFileArr = fileArr.filter((data) => data.id !== id); // fileArr에서 id와 일치하지 않는 file들만 필터링하여 newFileArr에 할당
    setFileArr(newFileArr); // newFileArr을 setFileArr 함수를 통해 업데이트
  };

  // const videoThumbnailExtractor = (file) => {
  //   console.log("videoThumbnailExtractor");
  //   const video = document.createElement("video");
  //   video.preload = "metadata";
  //   video.onloadedmetadata = function () {
  //     URL.revokeObjectURL(video.src);
  //     const canvas = document.createElement("canvas");
  //     canvas.width = video.videoWidth;
  //     canvas.height = video.videoHeight;
  //     canvas
  //       .getContext("2d")
  //       .drawImage(video, 0, 0, canvas.width, canvas.height);
  //     const thumbnail = canvas.toDataURL("image/png");
  //     // console.log(thumbnail);
  //   };
  //   video.src = URL.createObjectURL(file);
  // };

  return (
    <>
      <DropzoneContainer
        onDrop={handleDrop} // 드롭 이벤트 핸들러 등록
        onDragOver={handleDragOver} // 드래그 오버 이벤트 핸들러 등록
      >
        <h5>파일을 드래그해서 이곳에 놓으세요</h5>

        {fileArr.map((file) => {
          return (
            <div
              key={file.id}
              style={{
                backgroundColor: "#ddd",
                margin: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <div style={{ padding: "5px" }}>
                <img
                  src={file.data}
                  alt=""
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "5px",
                    objectFit: "cover",
                    //fill, cover, contain, scale-down
                  }}
                />
                <span>{file.id} : </span>
                <span>{file.file.name}</span>
                <span> - {file.file.type === "video" ? "Video" : "No"}</span>
                <b
                  onClick={() => removeFile(file.id)}
                  style={{ float: "right", cursor: "pointer" }}
                >
                  X
                </b>
              </div>
              <UploadProgressContainer>
                <UploadProgressBar></UploadProgressBar>
              </UploadProgressContainer>
            </div>
          );
        })}
      </DropzoneContainer>
    </>
  );
};

const DropzoneContainer = styled.div`
  width: 400px;
  height: 500px;
  background-color: pink;
  overflow-y: scroll;
`;

const DropzoneArea = styled.div`
  width: 700px;
  height: 50px;
  background-color: #fff;
`;

const UploadProgressContainer = styled.div`
  width: 90%;
  height: 5px;
  background-color: #888;
`;

const UploadProgressBar = styled.div`
  width: 60%;
  height: 5px;
  background-color: lightblue;
`;

export default Dropzone;
