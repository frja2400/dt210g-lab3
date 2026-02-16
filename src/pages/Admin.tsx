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

    if (loading) return <div style={{ padding: '2rem' }}>Laddar...</div>
    if (error) return <div style={{ padding: '2rem', color: 'red' }}>{error}</div>

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Hantera inlägg</h1>

            {/* Formulär för att skapa nytt inlägg */}
            <div style={{
                border: '2px solid #007bff',
                padding: '1.5rem',
                marginBottom: '2rem',
                borderRadius: '4px',
                backgroundColor: '#f8f9fa'
            }}>
                <h2>Skapa nytt inlägg</h2>
                <form onSubmit={handleCreatePost}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Titel:
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    setFormError('')
                                }}
                                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                required
                            />
                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Kategori:
                            <select
                                value={category}
                                onChange={(e) => {
                                    setCategory(e.target.value)
                                    setFormError('')
                                }}
                                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                required
                            >
                                <option value="">Välj kategori...</option>
                                <option value="Info">Info</option>
                                <option value="Viktigt">Viktigt</option>
                                <option value="Event">Event</option>
                                <option value="Underhåll">Underhåll</option>
                            </select>
                        </label>
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label>
                            Innehåll:
                            <textarea
                                value={content}
                                onChange={(e) => {
                                    setContent(e.target.value)
                                    setFormError('')
                                }}
                                rows={6}
                                style={{ display: 'block', width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                                required
                            />
                        </label>
                    </div>
                    {formError && <p style={{ color: 'red' }}>{formError}</p>}
                    <button type="submit" style={{ padding: '0.5rem 1.5rem', cursor: 'pointer' }}>
                        Skapa inlägg
                    </button>
                </form>
            </div>

            {/* Lista över befintliga inlägg */}
            <h2>Befintliga inlägg</h2>
            {posts.length === 0 ? (
                <p>Inga inlägg ännu.</p>
            ) : (
                <div>
                    {posts.map((post) => (
                        <div key={post.id} style={{
                            border: '1px solid #ddd',
                            padding: '1rem',
                            marginBottom: '1rem',
                            borderRadius: '4px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ margin: '0 0 0.5rem 0' }}>{post.title}</h3>
                                <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>
                                    <strong>{post.category}</strong> | {new Date(post.createdAt).toLocaleDateString('sv-SE')}
                                </p>
                                <div style={{ marginTop: '2rem', lineHeight: '1.6' }}>
                                    {post.content}
                                </div>
                            </div>
                            <button
                                onClick={() => handleDelete(post.id)}
                                style={{
                                    padding: '0.5rem 1rem',
                                    backgroundColor: '#dc3545',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer'
                                }}
                            >
                                Ta bort
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Admin