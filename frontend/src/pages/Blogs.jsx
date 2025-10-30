// src/pages/Blog.jsx
import React, { useState } from 'react'
import {
  Calendar,
  User,
  Tag,
  Search,
  ArrowRight,
  Share2,
  Bookmark,
} from 'lucide-react'
import { useGetAllBlogsQuery } from '../redux/slices/BlogApi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const Blog = () => {
  const { t } = useTranslation('blogs')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(t('categories.all'))

  // ✅ Fetch all blogs from backend
  const { data: blogs = [], isLoading, isError } = useGetAllBlogsQuery()

  if (isLoading) {
    return (
      <div className='min-h-screen flex justify-center items-center text-gray-500 text-lg'>
        {t('loading')}
      </div>
    )
  }

  if (isError) {
    return (
      <div className='min-h-screen flex justify-center items-center text-red-500 text-lg'>
        {t('error')}
      </div>
    )
  }

  // ✅ Generate dynamic categories from blogs
  const existingCategories = [
    t('categories.all'),
    ...new Set(blogs.map(blog => blog.category || t('categories.uncategorized')))
  ]

  // ✅ Apply search and category filters
  const filteredPosts = blogs.filter(blog => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (blog.description &&
        blog.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (blog.author &&
        blog.author.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory =
      selectedCategory === t('categories.all') ||
      blog.category?.toLowerCase() === selectedCategory.toLowerCase()
    return matchesSearch && matchesCategory
  })

  // ✅ Sort recent posts
  const recentPosts = [...blogs]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  // ✅ Popular tags
  const popularTags = [
    t('tags.AI'),
    t('tags.React'),
    t('tags.MachineLearning'),
    t('tags.WebDevelopment'),
    t('tags.DataScience'),
    t('tags.Programming'),
  ]

  return (
    <div className='min-h-screen bg-gray-50 text-gray-800'>
      {/* ===== Hero Section ===== */}
      <section className='relative bg-gradient-to-r from-[#253F83] to-[#253F83] text-white py-20'>
        <div className='absolute inset-0 bg-black/10'></div>
        <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight'>
            {t('hero.title')}
          </h1>
          <p className='text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed'>
            {t('hero.subtitle')}
          </p>
          <div className='max-w-2xl mx-auto'>
            <div className='relative'>
              <Search
                className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400'
                size={20}
              />
              <input
                type='text'
                placeholder={t('hero.searchPlaceholder')}
                className='w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50'
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Main Content ===== */}
      <section className='py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto'>
        <div className='grid lg:grid-cols-4 gap-8'>
          {/* ===== Blog List ===== */}
          <div className='lg:col-span-3'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
              <h2 className='text-2xl font-bold text-gray-900 mb-4 sm:mb-0'>
                {selectedCategory === t('categories.all')
                  ? t('allArticles')
                  : selectedCategory}
              </h2>
             <div className="text-gray-500 text-sm">
  {t(filteredPosts.length === 1 ? "articleFound" : "articlesFound", {
    count: filteredPosts.length,
  })}
</div>

            </div>

            {/* ===== Category Buttons ===== */}
            <div className='flex flex-wrap gap-2 mb-8'>
              {existingCategories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-[#0B055A] to-[#5A51D3] text-white shadow-sm'
                      : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* ===== Blog Cards ===== */}
            {filteredPosts.length > 0 ? (
              <div className='grid gap-6'>
                {filteredPosts.map(blog => (
                  <article
                    key={blog._id}
                    className='bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100'
                  >
                    <div className='md:flex'>
                      <div className='md:w-48 flex-shrink-0'>
                        {blog.posterImage ? (
                          <img
                            src={blog.posterImage}
                            alt={blog.title}
                            className='w-full h-48 md:h-full object-cover group-hover:scale-105 transition duration-500'
                          />
                        ) : (
                          <div className='w-full h-48 bg-gray-100 flex items-center justify-center text-gray-400 italic'>
                            {t('card.noImage')}
                          </div>
                        )}
                      </div>
                      <div className='flex-1 p-6'>
                        <div className='flex items-center gap-4 text-sm text-gray-500 mb-3 flex-wrap'>
                          <div className='flex items-center gap-1'>
                            <User size={14} /> {blog.author || t('card.authorFallback')}
                          </div>
                          <div className='flex items-center gap-1'>
                            <Calendar size={14} />{' '}
                            {new Date(blog.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        <h3 className='text-lg font-bold text-gray-900 mb-2 group-hover:text-[#5A51D3] transition-colors line-clamp-2'>
                          {blog.title}
                        </h3>
                        <p className='text-gray-600 mb-4 leading-relaxed line-clamp-2 text-sm'>
                          {blog.description}
                        </p>

                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
                          <span className='inline-flex items-center gap-1 bg-blue-50 text-[#5A51D3] px-3 py-1 rounded-full text-sm font-medium'>
                            <Tag size={14} /> {blog.category || t('card.categoryFallback')}
                          </span>
                          <div className='flex items-center gap-4'>
                           
                            <Link to={`/blog-detail/${blog._id}`}>
                              <button className='flex items-center gap-2 text-[#0B055A] font-semibold hover:text-[#5A51D3] transition-colors group'>
                                {t('card.readMore')}{' '}
                                <ArrowRight
                                  size={16}
                                  className='group-hover:translate-x-1 transition-transform'
                                />
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className='text-center py-16 bg-white rounded-xl border border-gray-200'>
                <div className='text-6xl mb-4'>🔍</div>
                <h3 className='text-xl font-bold text-gray-600 mb-2'>
                  {t('noArticles.title')}
                </h3>
                <p className='text-gray-500'>{t('noArticles.subtitle')}</p>
              </div>
            )}
          </div>

          {/* ===== Sidebar ===== */}
          <aside className='space-y-6 sticky top-20'>
            {/* Recent Posts */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-gray-900 mb-4 pb-3 border-b border-gray-100'>
                {t('sidebar.recentPosts')}
              </h3>
              <div className='space-y-4'>
                {recentPosts.map(post => (
                  <div
                    key={post._id}
                    className='flex gap-3 group cursor-pointer'
                  >
                    {post.posterImage ? (
                      <img
                        src={post.posterImage}
                        alt={post.title}
                        className='w-12 h-12 object-cover rounded-lg group-hover:scale-110 transition duration-300 flex-shrink-0'
                      />
                    ) : (
                      <div className='w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 text-xs'>
                        {t('card.noImage')}
                      </div>
                    )}
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-gray-800 group-hover:text-[#5A51D3] transition-colors line-clamp-2 text-sm leading-tight'>
                        {post.title}
                      </h4>
                      <p className='text-xs text-gray-500 mt-1'>
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-bold text-gray-900 mb-4'>
                {t('sidebar.popularTags')}
              </h3>
              <div className='flex flex-wrap gap-2'>
                {popularTags.map(tag => (
                  <span
                    key={tag}
                    className='px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-blue-100 hover:text-[#5A51D3] transition-colors cursor-pointer'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className='bg-gradient-to-br from-[#0B055A] to-[#3127b8] text-white rounded-xl p-6'>
              <h3 className='text-lg font-bold mb-3'>
                {t('sidebar.newsletter.title')}
              </h3>
              <p className='text-blue-100 text-sm mb-4 leading-relaxed'>
                {t('sidebar.newsletter.subtitle')}
              </p>
              <div className='space-y-3'>
                <input
                  type='email'
                  placeholder={t('sidebar.newsletter.placeholder')}
                  className='w-full px-3 py-2 rounded-lg bg-white/90 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white/50'
                />
                <button className='w-full bg-white text-[#0B055A] py-2 rounded-lg font-semibold text-sm hover:bg-blue-50 transition-colors'>
                  {t('sidebar.newsletter.button')}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}

export default Blog
