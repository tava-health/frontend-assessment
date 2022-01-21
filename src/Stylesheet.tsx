import "normalize.css";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --primary-color: #c80203;
        --secondary-color: #ffff99;
        --text-primary: #374343;
        --border-radius: 8px;
    }
    
    html {
        box-sizing: border-box;
    }

    body {
        font-family: 'Helvetica', 'Arial', sans-serif;
        color: var(--text-primary)
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    html, body, #root {
        height: 100%;
    }

    #root {
        display: flex;
    }

    h1, h2, h3, h4, h5 {
        margin: 0 0 8px 0;
    }

    a {
        text-decoration: none;
        color: #1e3894;
    }
`;
