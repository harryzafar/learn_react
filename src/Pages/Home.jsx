

function Home() {
  return (
    <>
     
    <div className="container">
      <div className="row">
        <div className="col-md-12">
            <h1>Welcome to Zafar !</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Zafar</td>
                        <td>husain.zafar13@gmail.com</td>
                        <td>8564900906</td>
                        <td>
                            <button className="btn btn-primary">Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>

            </table>
          
        </div>
      </div>
    </div>
    </>
    
  );
}
export default Home;
