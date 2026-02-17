import { useState, useEffect, type SubmitEvent } from 'react'
import { getPosts, createPost, deletePost } from '../services/api'
import type { Post } from '../types'

function Admin() {
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // Formulärdata för nytt inlägg
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('')
    const [formError, setFormError] = useState('')

    // Hämta alla inlägg
    useEffect(() => {
        fetchPosts()
    }, [])

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

    // Skapa nytt inlägg
    const handleCreatePost = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
        setFormError('')

        try {
            await createPost({ title, category, content })
            // Rensa formulär
            setTitle('')
            setCategory('')
            setContent('')
            // Uppdatera listan
            fetchPosts()
        } catch (err) {
            setFormError('Kunde inte skapa inlägget')
        }
    }

    // Ta bort inlägg
    const handleDelete = async (id: number) => {
        if (!confirm('Är du säker på att du vill ta bort detta inlägg?')) return

        try {
            await deletePost(id)
            fetchPosts()
        } catch (err) {
            alert('Kunde inte ta bort inlägget')
        }
    }

    if (loading) return <div className="status">Laddar...</div>
    if (error) return <div className="status status--error">{error}</div>

    return (
        <div className="container">
            <h1>Hantera inlägg</h1>

            {/* Formulär för att skapa nytt inlägg */}
            <div className="admin-form-box">
                <h2>Skapa nytt inlägg</h2>
                <form onSubmit={handleCreatePost} style={{ marginTop: '1rem' }}>
                    <div className="form-group">
                        <label htmlFor="title">Titel</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => { setTitle(e.target.value); setFormError('') }}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Kategori</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value); setFormError('') }}
                            required
                        >
                            <option value="">Välj kategori...</option>
                            <option value="Info">Info</option>
                            <option value="Viktigt">Viktigt</option>
                            <option value="Event">Event</option>
                            <option value="Underhåll">Underhåll</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Innehåll</label>
                        <textarea
                            id="content"
                            value={content}
                            onChange={(e) => { setContent(e.target.value); setFormError('') }}
                            rows={6}
                            required
                        />
                    </div>
                    {formError && <p className="form-error">{formError}</p>}
                    <button type="submit" className="btn btn--primary">Skapa inlägg</button>
                </form>
            </div>

            {/* Lista över befintliga inlägg */}
            <h2>Befintliga inlägg</h2>
            {posts.length === 0 ? (
                <p>Inga inlägg ännu.</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div key={post.id} className="admin-post-item">
                            <div className="admin-post-item__info">
                                <h3>{post.title}</h3>
                                <p className="admin-post-item__meta">
                                    <span className="admin-post-item__category">{post.category}</span>
                                    {' '}&bull;{' '}
                                    {new Date(post.createdAt).toLocaleDateString('sv-SE')}
                                </p>
                                <p className="admin-post-item__content">{post.content}</p>
                            </div>
                            <button
                                className="btn btn--danger"
                                onClick={() => handleDelete(post.id)}
                            >
                                TA BORT
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Admin