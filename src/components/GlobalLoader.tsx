import ReactDOM from 'react-dom';
import { Spiral } from 'ldrs/react';
import 'ldrs/react/Spiral.css';
import 'ldrs/react/TailChase.css';

interface GlobalLoaderProps {
    show: boolean;
}

export default function GlobalLoader({show}: GlobalLoaderProps) {
    // If not showing, render nothing
    if (!show){
        return null;
    }

    // target will be the whole page (document.body)
    // We can also target a specifc component container if prefered. 
    const target = document.body;

    return ReactDOM.createPortal(
        <div className="global-loader-overlay">
            <div className="global-loader-inner">
                <Spiral size="100" speed="0.9" color='#f7f7f7ff'/>
            </div>
        </div>,
        target
    )

}