import React from 'react';

const SubmitButton = ({ text, onClick }) => {
  return (
    <button className="w-full p-3 bg-indigo-600 text-white text-base font-bold rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition ease-in-out duration-300" onClick={onClick}>
      {text}
    </button>
  );
};

export default SubmitButton;