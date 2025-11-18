import React from 'react';
import { Post } from '../data/posts';

interface BlogPostCardProps {
  post: Post;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
      <p className="text-sm text-gray-500 mb-4">{post.date}</p>
      <p className="text-gray-600">{post.excerpt}</p>
    </div>
  );
};

export default BlogPostCard;
