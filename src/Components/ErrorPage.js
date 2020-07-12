import React from 'react';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='ui segment'>
      <Image
        fluid
        src='https://i1.wp.com/saedx.com/blog/wp-content/uploads/2019/01/saedx-blog-featured-70.jpg?fit=1200%2C500&ssl=1'
      />
      <Link to='/'>
        <div class='ui floating message'>
          <h1 class='ui white header'>Return Home...</h1>
        </div>
      </Link>
    </div>
  );
}

export default ErrorPage;
