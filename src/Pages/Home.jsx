import React, { useEffect,useState} from 'react';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading,setLoading] = useState(true);
  const [eror, setError] = useState(null);
  useEffect( ()=>{
    const fetchProducts = async ()=>{
      try{
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        setProducts(data);
      } catch (error) {
        setError(error);
      }
      finally{
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])

   if(loading){
    return <div className="text-center">Loading...</div>
   }
   if(eror){
    return <div className="text-center">Error: {eror.message}</div>
   }  


  return (
    
   
    <div className="container">
      <div className="row">
        <div className="col-md-12">
            <h1>Welcome to Zafar !</h1>
            <table className="table table-striped">
                <thead className='thead-dark'>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Category</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                  {products.map((product)=>{
                    return (
                    <tr key = {product.id}>
                      <td>{product.title}</td>
                      <td>₨. {product.price}</td>
                      <td>{product.description}</td>
                      <td>{product.category.name}</td>
                      <td><img src={product.images[0]} alt={product.title} width="50" /></td>
                    </tr>
                    )
                  } )}
                    
                </tbody>

            </table>
          
        </div>
      </div>
    </div>
    
    
  );
}
export default Home;
