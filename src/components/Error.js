import React from 'react';

const Error = ({mensage}) => {
  return (
    <div className="card-panel red darken-4 error col s12">
        {mensage}
    </div>
  );
};

export default Error;