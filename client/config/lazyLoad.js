import React from 'react';
import Boundle from './bundle';

const lazyLoad = (loadComponent,title) => props => (
    <Boundle load={loadComponent}>
        {
            Comp => {
                window.document.title = title;
                return <Comp title={title || ''} {...props}/>;
            }
        }
    </Boundle>
);

export default lazyLoad;