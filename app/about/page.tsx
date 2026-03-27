// app/about/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Modern Blog',
  description: 'Learn more about Modern Blog and our mission',
}

export default function AboutPage() {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
          About Modern Blog
        </h1>
        
        <div className="prose prose-lg dark:prose-invert">
          <p>
            Welcome to Modern Blog, a platform dedicated to sharing insightful content,
            stories, and perspectives from around the world.
          </p>
          
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide a space where ideas can flourish and where readers
            can discover new perspectives. We believe in the power of words to inspire,
            educate, and connect people across cultures and backgrounds.
          </p>
          
          <h2>What We Offer</h2>
          <ul>
            <li>High-quality articles on various topics</li>
            <li>Community-driven discussions</li>
            <li>A platform for writers to share their voice</li>
            <li>Curated content from diverse perspectives</li>
          </ul>
          
          <h2>Join Our Community</h2>
          <p>
            Whether you're a reader looking for inspiration or a writer wanting to share
            your thoughts, we invite you to join our growing community. Create an account
            today to start engaging with our content and connecting with like-minded
            individuals.
          </p>
        </div>
      </div>
    </div>
  )
}