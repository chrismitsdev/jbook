import './preview.css'
import * as React from 'react'

interface PreviewProps {
  code: string
  error: string
}

const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (error) => {
          const root = document.getElementById('root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + error + '</div>';
          console.error(error);
        }

        window.addEventListener('error', function(event) {
          event.preventDefault();
          handleError(event.error);
        })
      
        window.addEventListener('message', function(event) {
          try {
            eval(event.data);
          } catch(error) {
            handleError(error);
          }
        }, false)
      </script>
    </body>
  </html>
`

const Preview: React.FC<PreviewProps> = ({code, error}) => {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)

  React.useEffect(
    function () {
      const iframe = iframeRef.current

      if (!iframe?.contentWindow) return

      iframe.srcdoc = html

      setTimeout(function () {
        iframe.contentWindow?.postMessage(code, '*')
      }, 50)
    },
    [code]
  )

  return (
    <div className='preview-wrapper'>
      <iframe
        title='preview'
        srcDoc={html}
        sandbox='allow-scripts'
        ref={iframeRef}
      />
      {error && <div className='preview-error'>{error}</div>}
    </div>
  )
}

Preview.displayName = 'Preview'

export default Preview
