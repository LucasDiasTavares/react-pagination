import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'
import Posts from './components/Posts'
import Pagination from './components/Pagination'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(8)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const indexLastPost = currentPage * postsPerPage
  const indexFirstPost = indexLastPost - postsPerPage
  const currentPosts = posts.slice(indexFirstPost, indexLastPost)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className="container">
      <h1 className="my-3">Exemplo de Paginação</h1>
      {/* aki se eu passar posts={posts} vou receber todos os 100 posts, porém se eu passar currentPosts eu vou receber apenas os 10 primeiros; lá na cima tem const [postsPerPage, setPostsPerPage] = useState(5) o número que eu colocar será a quantidade que irá aparecer na tela*/}
      <Posts posts={currentPosts} loading={loading} />
      <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </div>
  );
}

export default App;
