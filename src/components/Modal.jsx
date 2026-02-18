import React from 'react'

const Modal = ({modalTitle,modalTexts,setModalOpen }) => {
  return (
     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-[#071327] border border-gray-200 dark:border-white/6 rounded-lg p-6 max-w-lg w-full text-gray-900 dark:text-white">
            <h4 className="text-lg font-semibold mb-2">{modalTitle}</h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              {modalTexts[modalTitle]}
            </p>
            <div className="flex justify-end">
              <button
                className="py-2 px-4 rounded-md bg-gray-100 dark:bg-gray-500 text-gray-900 dark:text-white"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
  )
}

export default Modal
