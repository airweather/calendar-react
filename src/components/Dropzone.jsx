import styled from "styled-components";

const Dropzone = () => {
  return (
    <>
      <DropzoneContainer
        onDrop={(e) => {
          e.preventDefault();
          // console.log(e.dataTransfer.files[0].name);
          console.log(e.dataTransfer);
        }}
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDragEnter={(e) => {
          e.preventDefault();
        }}
      >
        drop Zone
        <DropzoneArea />
      </DropzoneContainer>
    </>
  );
};

const DropzoneContainer = styled.div`
  width: 1000px;
  height: 500px;
  background-color: pink;
`;

const DropzoneArea = styled.div`
  width: 700px;
  height: 50px;
  background-color: #fff;
`;

export default Dropzone;
