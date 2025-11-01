'use client'

import { useState } from 'react'
import { Star, ThumbsUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Review } from '@/types'
import toast from 'react-hot-toast'

export default function ReviewSection({ reviews, hotelId }: { reviews: Review[], hotelId: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    comment: ''
  })

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // In a real app, this would submit to your API
    toast.success('Review submitted for moderation!')
    setShowReviewForm(false)
    setReviewData({ rating: 5, title: '', comment: '' })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Guest Reviews ({reviews.length})</h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="btn-primary px-4 py-2"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="card p-6 space-y-4">
          <div>
            <label className="label mb-2 block">Rating</label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewData({ ...reviewData, rating: star })}
                  className="text-2xl"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= reviewData.rating
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label mb-2 block">Title</label>
            <input
              type="text"
              className="input"
              value={reviewData.title}
              onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="label mb-2 block">Your Review</label>
            <textarea
              className="input h-32"
              value={reviewData.comment}
              onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
              required
            />
          </div>

          <button type="submit" className="btn-primary px-6 py-2">
            Submit Review
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-600">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="card p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{review.metadata?.title}</h4>
                  <div className="flex items-center mt-1">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < (review.metadata?.rating || 0)
                              ? 'fill-current'
                              : 'fill-none'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      by {review.metadata?.user?.title || 'Guest'}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(review.metadata?.created_at || review.created_at)}
                </span>
              </div>

              <p className="text-gray-600 mb-3">{review.metadata?.comment}</p>

              <button className="flex items-center text-sm text-gray-600 hover:text-primary-600">
                <ThumbsUp className="w-4 h-4 mr-1" />
                Helpful ({review.metadata?.helpful_count || 0})
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}