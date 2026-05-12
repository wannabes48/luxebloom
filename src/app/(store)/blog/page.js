"use client";

import styles from "./Blog.module.css";

const blogPosts = [
  {
    id: 1,
    title: "How to Choose the Perfect Graduation Money Bouquet",
    excerpt: "Discover the best color palettes and denominations to celebrate your graduate's big milestone.",
    date: "May 5, 2026",
    category: "Gifting Guide",
    image: "https://res.cloudinary.com/dgp7jehvx/image/upload/v1778430098/graduationflowers_fvbiez.avif"
  },
  {
    id: 2,
    title: "5 Anniversary Traditions That Never Go Out of Style",
    excerpt: "From classic roses to modern money arrangements, find the perfect way to say 'I love you'.",
    date: "April 28, 2026",
    category: "Anniversary",
    image: "https://res.cloudinary.com/dgp7jehvx/image/upload/v1778430099/anniversary_yo5wod.webp"
  },
  {
    id: 3,
    title: "The Art of Floral Preservation: Keep Your Blooms Longer",
    excerpt: "Pro tips from our master florists on how to extend the life of your fresh arrangements.",
    date: "April 15, 2026",
    category: "Floral Tips",
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&q=80&w=800"
  }
];

export default function BlogPage() {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className="container">
          <h1 className={styles.title}>The Bloom Journal</h1>
          <p className={styles.subtitle}>Insights, inspiration, and the art of luxury gifting.</p>
        </div>
      </header>

      <div className="container">
        <div className={styles.featuredPost}>
          <div className={styles.featuredImage}>
             <img 
               src="https://res.cloudinary.com/dgp7jehvx/image/upload/v1778430100/freshflorals_lhf7kc.webp" 
               alt="Sustainable Luxury" 
               className={styles.img} 
             />
          </div>
          <div className={styles.featuredContent}>
            <span className={styles.category}>Featured</span>
            <h2>Sustainable Luxury: Our Commitment to the Planet</h2>
            <p>How BloomStacks Gifts Co. is partnering with eco-friendly farms to bring you beautiful arrangements without the environmental footprint.</p>
            <button className="btn btn-outline">Read More</button>
          </div>
        </div>

        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <div className={styles.postImage}>
                <img src={post.image} alt={post.title} className={styles.img} />
              </div>
              <div className={styles.postMeta}>
                <span>{post.date}</span>
                <span>•</span>
                <span>{post.category}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <a href="#" className={styles.readMore}>Read Article →</a>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
