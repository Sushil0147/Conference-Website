import React from 'react';
import { Link } from 'react-router-dom';

function ThankYouPage() {

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body justify-content-center">
          <h1 className="card-title">Thank You</h1>
          <p className="card-text">Your research paper has been submitted successfully.</p>
          
            <p className="text-success">An email has been sent confirming the submission along with application number</p>
    
          <Link className="btn btn-secondary" to={"/user"}>Go Back</Link>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;