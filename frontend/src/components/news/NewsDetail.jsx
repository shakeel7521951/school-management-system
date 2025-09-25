import React from 'react'
import { useParams, Link } from 'react-router-dom'
import newsData from './NewsData'
import {
  FaUser,
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight
} from 'react-icons/fa'

export default function NewsDetail () {
  const { slug } = useParams()
  const index = newsData.findIndex(item => item.slug === slug)
  const news = newsData[index]

  if (!news) {
    return (
      <div className='text-center py-20 text-red-600 text-xl'>
        News not found
      </div>
    )
  }

  const prevNews = newsData[index - 1]
  const nextNews = newsData[index + 1]

  return (
    <div className='max-w-5xl mx-auto px-4 sm:px-6 py-12'>
      {/* Title */}
      <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-[#104c80] leading-snug'>
        {news.title}
      </h1>

      {/* Meta */}
      <div className='flex flex-wrap items-center gap-4 mt-3 text-gray-500 text-sm'>
        <span className='flex items-center gap-2'>
          <FaCalendarAlt className='text-[#104c80]' /> {news.date}
        </span>
        <span className='flex items-center gap-2'>
          <FaUser className='text-[#104c80]' /> {news.author || 'Admin'}
        </span>
      </div>

      {/* Cover Image */}
      {news.images && news.images.length > 0 && (
        <div className='mt-8 flex justify-center'>
          <img
            src={news.images[0]}
            alt='Main news'
            className='rounded-2xl shadow-lg w-[500px] max-h-[600px] object-cover bg-gray-100'
          />
        </div>
      )}

      {/* Content */}
      {news.content && (
        <div className='mt-10 text-base sm:text-lg text-gray-700 leading-relaxed space-y-6'>
          {news.content.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* Extra Images - Responsive Grid */}
      {news.images && news.images.length > 1 && (
        <div className='mt-12'>
          <h2 className='text-xl sm:text-2xl font-semibold text-[#104c80] mb-4'>
            Highlights
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {news.images.slice(1).map((img, i) => (
              <div
                key={i}
                className='overflow-hidden rounded-xl shadow-md group'
              >
                <img
                  src={img}
                  alt={`Extra news ${i}`}
                  className='w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110'
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className='flex flex-col sm:flex-row justify-between items-center mt-12 border-t pt-6 text-[#104c80] font-medium gap-4'>
        {prevNews ? (
          <Link
            to={`/news/${prevNews.slug}`}
            className='flex items-center gap-2 hover:underline text-center'
          >
            <FaArrowLeft /> {prevNews.title.slice(0, 40)}...
          </Link>
        ) : (
          <span />
        )}

        {nextNews ? (
          <Link
            to={`/news/${nextNews.slug}`}
            className='flex items-center gap-2 hover:underline text-center'
          >
            {nextNews.title.slice(0, 40)}... <FaArrowRight />
          </Link>
        ) : (
          <span />
        )}
      </div>

      {/* Back Button */}
      <div className='mt-10 text-center'>
        <Link
          to='/news'
          className='px-6 py-2 rounded-lg bg-[#104c80] text-white hover:bg-[#0c3b63] transition'
        >
          ← Back to All News
        </Link>
      </div>
    </div>
  )
}
