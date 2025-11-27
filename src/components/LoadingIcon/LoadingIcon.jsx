import './LoadingIcon.css'
import spinnerGIF from '../../assets/spinner.gif'

const LoadingIcon = () => {
  return (
    <div className="loading-icon">
      <img src={spinnerGIF} alt="Spinning icon" />
    </div>
  )
}

export default LoadingIcon