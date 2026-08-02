import "./ChromeSurface.css";

export default function ChromeSurface({

    children,
    className = "",

}) {

    return (

        <div className={`aether-chrome ${className}`}>

            <div className="chrome-highlight"/>

            <div className="chrome-inner"/>

            <div className="chrome-content">

                {children}

            </div>

        </div>

    );

}