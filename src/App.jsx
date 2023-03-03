import { marked } from 'marked'
import { useState, useEffect } from 'react'
import { FaMoon, FaSun } from "react-icons/fa"
import { BsDownload } from "react-icons/bs"
import './App.css'

function App() {

  const [text, setText] = useState() // State for getting raw markdown
  const [darkMode, setDarkMode] = useState(true) // State for dark mode

  // Rendering raw markdown to html
  const render = (raw) => {
    let output;

    if (raw) {
      output = marked.parse(raw)
    } else {
      output = ' '
    }

    return output
  }

  // Dark mode button handler
  const handleClick = () => {
    setDarkMode(!darkMode)
  }


  const download = () => {
    const blob = new Blob([text], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'markdown_file.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="App h-screen bg-[#f1f1f1] overflow-hidden lg:flex-col font-sans dark:bg-gray-900 shadow-2xl dark:text-white">
        <div className='h-16 flex items-center justify-between mx-6'>
          <div className='text-2xl font-bold'>Markdown Editor</div>
          <button onClick={handleClick}
            className='h-10 w-12 text-2xl flex items-center justify-center rounded-lg border-none shadow-lg hover:bg-white hover:text-black transition bg-black text-white cursor-pointer'>
            <FaMoon className={darkMode ? "hidden" : ""} /><FaSun className={darkMode ? "" : "hidden"} />
          </button>
        </div>
        <div className='h-[100%] lg:flex lg:w-screen '>
          <div className='h-[40%] lg:w-[50%] lg:h-[90%]'>
            <textarea className='shadow-lg border-none px-5 p-3 h-[100%] w-[100%] dark:bg-gray-800 dark:text-white'
              placeholder='Write some markdown' onChange={(e) => { setText(e.target.value) }} value={text} name="editor" cols="30" rows="10"></textarea>
            <button className='absolute ml-[-5rem] lg:ml-[-7rem] mt-4 text-3xl bg-transparent border-none dark:text-white cursor-pointer group' onClick={download} >
              <BsDownload className='shadow-2xl' />
              <div className='opacity-90 px-1 py-1 rounded-lg text-white text-xs font-thin bg-black scale-0 transition group-hover:scale-100'>Download as a markdown file</div>
            </button>
          </div>
          <div className='shadow-lg p-3 pl-5 h-[55%] overflow-y-scroll lg:w-[50%] lg:h-[90%] dark:bg-gray-900'>
            <div dangerouslySetInnerHTML={{ __html: render(text) }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
