import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../services/api'
import type { Post } from '../types'

// Home-sidan som visar en lista av inlägg, hämtar data från backend och hanterar loading och error states
function Home() {
    // State för att lagra inlägg, loading status och eventuella felmeddelanden
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const navigate = useNavigate()

    // useEffect som körs vid komponentens uppstart, hämtar inlägg från backend och uppdaterar state
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await getPosts()
                setPosts(response.data)
            } catch (err) {
                setError('Kunde inte hämta inlägg')
            } finally {
                setLoading(false)
            }
        }

        fetchPosts()
    }, [])

    if (loading) return <div className="status">Laddar...</div>
    if (error) return <div className="status status--error">{error}</div>

    return (
        <div className="container">
            <h1>Senaste nyheterna</h1>
            {posts.length === 0 ? (
                <p>Inga inlägg ännu.</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="post-card"
                            onClick={() => navigate(`/posts/${post.id}`)}
                        >
                            <h2 className="post-card__title">{post.title}</h2>
                            <p className="post-card__meta">
                                <span className="post-card__category">{post.category}</span>
                                {' '}&bull;{' '}
                                {new Date(post.createdAt).toLocaleDateString('sv-SE')}
                            </p>
                            <p className="post-card__excerpt">
                                {post.content.substring(0, 150)}{post.content.length > 150 ? '...' : ''}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Home