import './Loader.css'

function Loader({ text = 'Загрузка...' }) {
  return (
    <div className="loader">
      <div className="loader__spinner">
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
        <div className="loader__circle"></div>
      </div>
      <p className="loader__text">{text}</p>
    </div>
  )
}

export default Loader
