import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';
import './Blog.css';

const Blog = () => {
    React.useEffect(() => {
        document.title = "Blog | My Loan Partner";
    }, []);

    return (
        <div className="blog-page section-padding">
            <div className="container">
                <h1 className="section-title text-center">Latest Insights</h1>
                <div className="blog-grid">
                    {blogPosts.map((post) => (
                        <motion.div
                            key={post.id}
                            className="blog-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="blog-content">
                                <span className="blog-date">{post.date}</span>
                                <h3>{post.title}</h3>
                                <p>{post.excerpt}</p>
                                <Link to={`/blog/${post.id}`} className="read-more">Read More</Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog;
