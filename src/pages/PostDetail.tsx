import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getPost } from '../services/api'
import type { Post } from '../types'

// PostDetail-sidan som visar detaljerna för ett enskilt inlägg, hämtar data från backend baserat på URL-parametern och hanterar loading och error states
function PostDetail() {
    // Hämta id från URL-parametern, skapa state för inlägg, loading status och eventuella felmeddelanden
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return

            try {
                const response = await getPost(parseInt(id))
                setPost(response.data)
            } catch (err) {
                setError('Kunde inte hämta inlägget')
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    }, [id])

    if (loading) return <div style={{ padding: '2rem' }}>Laddar...</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>
    if (!post) return <div style={{ padding: '2rem' }}>Inlägget hittades inte</div>

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <button
                onClick={() => navigate('/')}
                style={{ marginBottom: '1rem', padding: '0.5rem 1rem', cursor: 'pointer' }}
            >
                ← Tillbaka
            </button>
            <h1>{post.title}</h1>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>
                <strong>{post.category}</strong> | {new Date(post.createdAt).toLocaleDateString('sv-SE')}
            </p>
            <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                {post.content}
            </div>
        </div>
    )
}

export default PostDetail