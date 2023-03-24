const Board = (props) => {
  
  const data = props.data;

  return (
    <table>
      <thead>
        <tr>
          <th>순번</th>
          <th>제목</th>
          <th>등록자명</th>
          <th>등록일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        { data.map((data) => {
          return (
            <tr key={data.number}>
              <td>{data.number}</td> 
              <td><a href='board'>{data.title}</a></td> 
              <td>{data.name}</td> 
              <td>{data.date}</td> 
              <td>{data.hit}</td> 
            </tr>
          )
        })
        }
      </tbody>
    </table>
  )
}

export default Board;