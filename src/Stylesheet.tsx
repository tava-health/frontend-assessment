import "normalize.css";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    :root {
        --primary-color: #c80203;
        --secondary-color: #ffff99;
        --text-primary: #374343;
        --text-secondary: rgb(108, 117, 125);
        --border-radius: 8px;
        --card-shadow: 0 0 0.875rem 0 rgb(41 48 66 / 5%);
        --light-gray: rgb(206, 212, 218);
    }
    
    html {
        box-sizing: border-box;
    }

    body {
        background-color: rgb(247, 249, 252);
        font-family: poppins, 'Helvetica', 'Arial', sans-serif;
        color: var(--text-primary)
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    html, body, #root {
        height: 100%;
        overflow: auto;
    }

    #root {
        display: flex;
    }

    h1, h2, h3, h4, h5 {
        margin: 0 0 8px 0;
    }

    h1 {
        margin-bottom: 24px;
    }

    a {
        text-decoration: none;
        color: #1e3894;
    }
`;
