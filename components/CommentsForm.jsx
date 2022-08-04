import React, { useState, useEffect, useRef } from 'react'


const CommentsForm = ({ slug }) => {
  const [error, setError] = useState(false)
  const [localStorage, setLocalStorage] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const commentEL = useRef();
  const nameEL = useRef();
  const emailEL = useRef();
  const storeDataEL = useRef();

  const handleCommentSubmission = () => {
    //error handling
    setError(false);
    const { value: comment } = commentEL.current;
    const { value: name } = nameEL.current;
    const { value: email } = emailEL.current;
    const { checked: storeData } = storeDataEL.current;
    if (!comment || !name || !email) {
      setError(true)
      return;
    }
    const commentObj = {
      name, email, comment, slug
    }

    if(storeData){
      localStorage.setItem('name', name);
      localStorage.setItem('email', email);
    } else {
      localStorage.removeItem('name', name);
      localStorage.removeItem('email', email);
    }

  }



  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4'>Comment Form</h3>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <textarea ref={commentEL}
          className="p-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Comment'
          name='comment'
        />
      </div>
      <div className='grid grid-cols-1  lg:grid-cols-2 gap-4 mb-4'>
        <input
          type="text"
          ref={nameEL}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Name'
          name='name'
        />
        <input
          type="text"
          ref={emailEL}
          className="py-2 px-4 outline-none w-full rounded-lg focus:ring-gray-200 bg-gray-100 text-gray-700"
          placeholder='Email'
          name='email'
        />
      </div>
      <div className='grid grid-cols-1 gap-4 mb-4'>
        <div>
        {/* id 和htmlfor，有了这个两个，所以点击文字就trigger了这个checkbox */}
          <input ref={storeDataEL} type="checkbox" id="storeData" name="storeData" value="true"/>
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData' >
            Save my email and name for the next time I comment.
          </label>
        </div>
      </div>
      {error && <p className='text-xs text-red-500'>All fields are required</p>}
      <div className='mt-8'>
        <button
          className='transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full text-white px-8 py-3 cursor-pointer'
          type='button'
          onClick={handleCommentSubmission}
        >
          Post Comment
        </button>
        {showSuccess && <span className='text-xl float-right font-semibold mt-3 tetx-green-500'></span>}
      </div>
    </div>
  )
}

export default CommentsForm