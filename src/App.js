import React, {useState, useEffect} from 'react';
import Collection from './Collections'

const categories = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
]

function App() {
    const [data, setData] = useState([])
    const [categoryId, setCategoryId] = useState(0)
    const [page, setPage] = useState(1)
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const category = categoryId ? `category=${categoryId}` : '';

        fetch(`https://632220ccfd698dfa29079e45.mockapi.io/PhotoCollections?page=${page}&limit=3&${category}`)
            .then((res) => res.json())
            .then((json) => setData(json))
            .catch((err) => console.log(err))
            .finally(() => setLoading(false))
    },[categoryId , page])

    console.log(data)

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
            {categories.map((cat, index) => (
                <li onClick={() => setCategoryId(index)} className={categoryId === index ? 'active' : ''} key={index}>{cat.name}</li>
            ))}
        </ul>
        <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
          {loading ? <h1>Loading...</h1> :
              <>
                  {data.filter((obj)=>{
                      return obj.name.toLowerCase().includes(searchValue.toLowerCase())
                  }).map((obj, index) => (
                      <Collection
                      key={index}
                      name={obj.name}
                      images={obj.photos}
                      />
                      ))}
              </>
          }
      </div>
      <ul className="pagination">
          {[...Array(5)].map((_,i) => (
              <li key={i} onClick={() => setPage(i+1)} className={page === i+1 ? 'active' : ''}>{i + 1}</li>
          ))}
      </ul>
    </div>
  );
}

export default App;
