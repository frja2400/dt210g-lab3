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

    if (loading) return <div className="status">Laddar...</div>
    if (error) return <div className="status status--error">{error}</div>
    if (!post) return <div className="status">Inlägget hittades inte</div>

    return (
        <div className="container">
            <div className="post-detail">
                <button className="btn btn--outline" onClick={() => navigate('/')}>
                    ← TILLBAKA
                </button>
                <h1 style={{ marginTop: '1.5rem' }}>{post.title}</h1>
                <p className="post-detail__meta">
                    <span className="post-detail__category">{post.category}</span>
                    {' '}&bull;{' '}
                    {new Date(post.createdAt).toLocaleDateString('sv-SE')}
                </p>
                <div className="post-detail__content">
                    {post.content}
                </div>
            </div>
        </div>
    )
}

export default PostDetail