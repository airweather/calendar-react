const Write = () => {
  function getToday() {
    const date = new Date();
    const today = date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate();
    return today;
  }

  
  const today = getToday();


  function writeBoard(event) {
    event.preventDefault();
    const title = event.target.title.value;
    const content = event.target.content.value;

    const data = {
      number: 0,
      title,
      content,
      today,
      hit: 0,
    }

  }

  return (
    <>
      <form onSubmit={writeBoard}>
        제목 <input type="text" id="title" />
        <br/>
        내용 <input type="textArea" id="content" />
        <br/>
        <button>작성</button>
      </form>
    </>
  )
}

export default Write;