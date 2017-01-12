import React, { PropTypes } from 'react';
import { container } from '../styles/app.scss';

const App = ({ children }) =>
    <div className={container}>
        { children }
    </div>;

App.propTypes = {
    children: PropTypes.object
};

export default App;
