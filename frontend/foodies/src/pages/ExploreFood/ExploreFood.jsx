import React,{useState} from 'react'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'

const ExploreFood = () => {
  const [category,setCategory] = useState('All');
  const [searchText , setSearchText] = useState('');
  const [avgRating, setAvgRating] = useState(0.0);

  const loadReviewData = async () => {
    try {
        const avg = await fetchAverageRating(id);
        setAvgRating(avg);
    } catch (error) {
        console.error('Error fetching reviews:', error);
    }
  };
  

  return (
    <>
    <div className="container">
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className = 'input-group mb-3'>
              <select className='form-select mt-2' style={{"maxWidth":"220px"}} onChange={(e) => setCategory(e.target.value)}>
                <option value ="All"> All Categories </option>
                <option value = "Veg Biryani">Veg Biryani</option>
                <option value = "Desserts & Ice cream">Desserts & Ice cream</option>
                <option value = "Veg Burgers">Veg Burgers</option>
                <option value = "Eggless Cakes">Eggless Cakes</option>
                <option value = "Pure Veg Pizza">Pure Veg Pizza</option>
                <option value = "Veg Rolls">Veg Rolls</option>
                <option value = "Fresh Salads">Fresh Salads</option>
                </select>
                <input type="text" className='form-control mt-2' placeholder='Search your favourite dish ...' onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
                <button className='btn btn-primary mt-2' type='submit'> 
                  <i className='bi bi-search'></i>
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <FoodDisplay category={category} searchText={searchText}/>
    </>
  )
}
export default ExploreFood
