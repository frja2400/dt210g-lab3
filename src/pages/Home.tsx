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

    if (loading) return <div style={{ padding: '2rem' }}>Laddar...</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>

    return (
        <div style={{ padding: '2rem' }}>
            <h1>Senaste nyheterna</h1>
            {posts.length === 0 ? (
                <p>Inga inlägg ännu.</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => navigate(`/posts/${post.id}`)}
                            style={{
                                border: '1px solid #ddd',
                                padding: '1rem',
                                marginBottom: '1rem',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s'
                            }}
                            >
                            <h2 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h2>
                            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 0.5rem 0' }}>
                                <strong>{post.category}</strong> | {new Date(post.createdAt).toLocaleDateString('sv-SE')}
                            </p>
                            <p style={{ margin: 0 }}>
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