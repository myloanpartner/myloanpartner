import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import './BlogPost.css';

const BlogPost = () => {
    const { id } = useParams();
    const post = blogPosts.find(p => p.id === parseInt(id));

    useEffect(() => {
        window.scrollTo(0, 0);
        if (post) {
            document.title = `${post.title} | My Loan Partner`;
        }
    }, [post]);

    if (!post) {
        return (
            <div className="container section-padding text-center">
                <h2>Post not found</h2>
                <Link to="/blog" className="back-link">Back to Blog</Link>
            </div>
        );
    }

    return (
        <article className="blog-post-page section-padding">
            <div className="container">
                <Link to="/blog" className="back-link">
                    <ArrowLeft size={20} /> Back to Blog
                </Link>

                <motion.div
                    className="post-content-wrapper"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <header className="post-header">
                        <span className="post-date">
                            <Calendar size={16} /> {post.date}
                        </span>
                        <h1 className="post-title">{post.title}</h1>
                    </header>

                    <div
                        className="post-body"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </motion.div>
            </div>
        </article>
    );
};

export default BlogPost;
